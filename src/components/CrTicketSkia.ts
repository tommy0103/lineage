/**
 * 中国铁路蓝票 — Skia Canvas 渲染器
 *
 * 命令式 Surface 方案：在 JS 线程用 Skia 离屏 Canvas 精确绘制票面，
 * 导出为 PNG base64，供 TicketModal 显示和保存共用同一份绘制逻辑。
 *
 * 绘制坐标系和元素布局移植自 FoskyM/train-ticket-generator 的 renderer2d.ts
 * （AGPL-3.0），这里是独立重写（Canvas 2D API → Skia Canvas），不构成衍生作品。
 * 字体用项目打包的思源宋体/黑体子集（OFL），底图用 bluebg.png。
 */
import { Skia } from '@shopify/react-native-skia';
import type {
  SkCanvas, SkFont, SkImage, SkPaint, SkPath, SkTypeface,
} from '@shopify/react-native-skia';
import * as QRCode from 'qrcode';
import { Asset } from 'expo-asset';
import {
  Trip, ticketSerial, ticketParts, seatParts,
  ticketPassenger, ticketDateCN, stationPinyin, ticketGate, ticketJM,
} from '../data';

// ── 票面基准坐标系（对照 FoskyM renderer2d.ts）──
const W = 876;
const H = 539;
const LEFT = 80; // leftOffset

// ── 资源缓存 ──
let serifTF: SkTypeface | null = null;
let sansTF: SkTypeface | null = null;
let bgImg: SkImage | null = null;
let loading: Promise<void> | null = null;

async function loadBytes(mod: number): Promise<Uint8Array> {
  const asset = Asset.fromModule(mod);
  await asset.downloadAsync();
  if (!asset.localUri) throw new Error('asset download failed');
  const res = await fetch(asset.localUri);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

/** 加载字体和底图（首次调用后缓存） */
async function loadAssets(): Promise<void> {
  if (serifTF && sansTF && bgImg) return;
  if (loading) return loading;
  loading = (async () => {
    const [serifBytes, sansBytes, bgBytes] = await Promise.all([
      loadBytes(require('../../assets/fonts/TicketSerif.ttf')),
      loadBytes(require('../../assets/fonts/TicketSans.ttf')),
      loadBytes(require('../../assets/img/bluebg.png')),
    ]);
    serifTF = Skia.Typeface.MakeFreeTypeFaceFromData(Skia.Data.fromBytes(serifBytes));
    sansTF = Skia.Typeface.MakeFreeTypeFaceFromData(Skia.Data.fromBytes(sansBytes));
    bgImg = Skia.Image.MakeImageFromEncoded(Skia.Data.fromBytes(bgBytes));
  })();
  return loading;
}

// ── Skia 工具函数 ──

function makePaint(color: string, style: 'fill' | 'stroke' = 'fill', strokeWidth = 1): SkPaint {
  const p = Skia.Paint();
  p.setAntiAlias(true);
  p.setColor(Skia.Color(color));
  p.setStyle(style === 'stroke' ? 1 /* Stroke */ : 0 /* Fill */);
  if (style === 'stroke') {
    p.setStrokeWidth(strokeWidth);
    p.setStrokeCap(1 /* Round */);
  }
  return p;
}

function measureText(font: SkFont, text: string): number {
  return font.measureText(text).width;
}

/** 绘制带字间距的文本（Skia 无原生 letterSpacing，逐字绘制） */
function drawSpacedText(
  canvas: SkCanvas, text: string, x: number, y: number,
  font: SkFont, paint: SkPaint, spacing = 0,
): number {
  let cx = x;
  for (let i = 0; i < text.length; i++) {
    canvas.drawText(text[i], cx, y, paint, font);
    cx += measureText(font, text[i]) + spacing;
  }
  return cx;
}

// ── QR 码（qrcode 库 matrix → Skia 矩阵点阵）──

function drawQRCode(canvas: SkCanvas, text: string, x: number, y: number, size: number): void {
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const modules = qr.modules;
  const n = modules.size;
  const cell = size / n;
  const paint = makePaint('#000000b0');
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (modules.get(c, r)) {
        canvas.drawRect(Skia.XYWHRect(x + c * cell, y + r * cell, cell + 0.5, cell + 0.5), paint);
      }
    }
  }
}

// ── 票面元素绘制（移植 FoskyM drawTicketDetails）──

export interface CrTicketResult {
  base64: string;
  width: number;
  height: number;
}

/**
 * 渲染蓝票票面，返回 PNG base64。
 * @param scale 输出倍率（1=876×539，2=1752×1078 高清）
 */
export async function renderCrTicket(trip: Trip, scale = 2): Promise<CrTicketResult> {
  await loadAssets();
  if (!serifTF || !sansTF) throw new Error('font load failed');
  if (!bgImg) throw new Error('bg image load failed');

  const ow = W * scale;
  const oh = H * scale;
  const surface = Skia.Surface.MakeOffscreen(ow, oh);
  if (!surface) throw new Error('Surface.MakeOffscreen failed');
  const canvas = surface.getCanvas();
  canvas.clear(Skia.Color('#ffffffff')); // 白色背景
  canvas.scale(scale, scale); // 之后全部用 876×539 坐标系

  // ── 字体（每次创建轻量对象，共享 typeface）──
  const fs = (tf: SkTypeface, size: number) => Skia.Font(tf, size);
  const fStation = fs(sansTF, 45);        // 站名 黑体
  const fPinyin = fs(serifTF, 30);       // 拼音 宋体
  const fTrain = fs(serifTF, 42);        // 车次 宋体
  const fDate = fs(sansTF, 40);          // 日期 黑体
  const fSeat = fs(serifTF, 28);         // 座位信息 宋体
  const fPrice = fs(sansTF, 40);         // 票价 黑体
  const fPax = fs(serifTF, 40);          // 乘客 宋体
  const fLabel = fs(serifTF, 21);        // 标签小字 宋体
  const fNotice = fs(serifTF, 27);       // 虚线框内 宋体
  const fTicketId = fs(serifTF, 24);     // 底部编码 宋体
  const fRedId = fs(sansTF, 42);         // 左上红票号
  const fGate = fs(serifTF, 24);         // 检票口 宋体

  const inkPaint = makePaint('#000000');
  const redPaint = makePaint('rgba(255,0,0,0.5)');

  // 票面数据
  const serial = ticketSerial(trip);
  const tk = ticketParts(trip);
  const seat = seatParts(trip);
  const pax = ticketPassenger(trip);
  const dt = ticketDateCN(trip, true); // "2025年08月24日"
  const gate = ticketGate(trip);
  const jm = ticketJM(trip);
  const priceStr = tk[3].replace(/^[¥￥]/, '');
  const price = (parseFloat(priceStr) || 0).toFixed(1);

  // 日期拆分
  const dateParts = dt.full.match(/(\d+)/g) || [];
  const year = dateParts[0] || '2025';
  const month = dateParts[1] || '01';
  const day = dateParts[2] || '01';

  // ── 底层背景（完全对齐 FoskyM 原版）──
  // 1. 圆角矩形票框
  const borderPaint = makePaint('rgba(173,216,230,0.2)', 'fill');
  const rrectPath = Skia.Path.MakeFromSVGString(
    `M40,10 L${W - 40},10 Q${W - 20},10 ${W - 20},30 L${W - 20},${H - 30} Q${W - 20},${H - 10} ${W - 40},${H - 10} L40,${H - 10} Q20,${H - 10} 20,${H - 30} L20,30 Q20,10 40,10 Z`
  );
  if (rrectPath) canvas.drawPath(rrectPath, borderPaint);

  // 2. 斜线纹理
  canvas.save();
  if (rrectPath) canvas.clipPath(rrectPath, 0 /* ClipOp.Intersect */, false);
  const linePaint = makePaint('rgba(173,216,230,0.5)', 'stroke', 1);
  const angle = Math.PI / 6; // 30°
  const dx = H / Math.tan(angle);
  for (let i = -H; i < W + H; i += 5) {
    canvas.drawLine(W - i, 0, W - i - dx, H, linePaint);
  }
  canvas.restore();

  // 3. 底部略深蓝区域
  const bottomPaint = makePaint('#94cae0', 'fill');
  const bottomPath = Skia.Path.MakeFromSVGString(
    `M30,${H * 0.9} L${W - 20},${H * 0.9} L${W - 20},${H - 30} Q${W - 20},${H - 10} ${W - 50},${H - 10} L50,${H - 10} Q20,${H - 10} 20,${H - 30} L20,${H * 0.9} Z`
  );
  if (bottomPath) canvas.drawPath(bottomPath, bottomPaint);

  // 4. CR 水印
  const wmPaint = makePaint('#94cae0', 'fill');
  const wmFont = fs(sansTF, 8);
  for (let wx = 30; wx < W - 30; wx += 16) {
    canvas.drawText('CR', wx, H * 0.88 + 14, wmPaint, wmFont);
  }

  // 5. CRH 底纹（5% 透明度）
  const bgPaint = makePaint('#000000');
  bgPaint.setAlphaf(0.05);
  if (bgImg) {
    const bgW = W - 80;
    const bgH = H - 200;
    canvas.drawImageRect(bgImg, Skia.XYWHRect(0, 0, bgImg.width(), bgImg.height()), Skia.XYWHRect(40, 100, bgW, bgH), bgPaint);
  }

  const topOffset = gate !== '' ? 35 : 20;

  // ── 检票口（右上）──
  if (gate !== '') {
    const gateText = '检票:' + gate;
    const gw = measureText(fGate, gateText);
    drawSpacedText(canvas, gateText, W - gw - 100, 60, fGate, inkPaint, 0);
  }

  // ── 发站 / 到站 ──
  const startStation = trip.from;
  const endStation = trip.to;

  // 站名间距：两字两端对齐，三字以上正常
  const startSpacing = startStation.length === 2 ? 30 : 0;
  const endSpacing = endStation.length === 2 ? 30 : 0;

  let startLeft = 110;
  if (startStation.length === 5) startLeft = 70;
  drawSpacedText(canvas, startStation, startLeft, topOffset + 80, fStation, inkPaint, startSpacing);

  let endLeft = W / 2 + 120;
  if (endStation.length === 5) endLeft = W / 2 + 80;
  drawSpacedText(canvas, endStation, endLeft, topOffset + 80, fStation, inkPaint, endSpacing);

  // 站名拼音
  const startPy = stationPinyin(startStation);
  const endPy = stationPinyin(endStation);
  if (startPy) {
    const pw = measureText(fPinyin, startPy);
    drawSpacedText(canvas, startPy, 200 - pw / 2, topOffset + 115, fPinyin, inkPaint, -1);
  }
  if (endPy) {
    const pw = measureText(fPinyin, endPy);
    drawSpacedText(canvas, endPy, W / 2 + 220 - pw / 2, topOffset + 115, fPinyin, inkPaint, -1);
  }

  // ── 车次 + 箭头（中间）──
  const trainNum = trip.train;
  const tnW = measureText(fTrain, trainNum) + 2 * trainNum.length;
  drawSpacedText(canvas, trainNum, W / 2 - tnW / 2, topOffset + 75, fTrain, inkPaint, 2);

  // 箭头
  const arrowPaint = makePaint('#000000', 'stroke', 4);
  const aStartX = W / 2 - 60;
  const aY = topOffset + 82;
  canvas.drawLine(aStartX, aY, aStartX + 120, aY, arrowPaint);
  canvas.drawLine(aStartX + 100, aY - 10, aStartX + 120, aY, arrowPaint);
  canvas.drawLine(aStartX + 100, aY + 10, aStartX + 120, aY, arrowPaint);

  // "站"字
  drawSpacedText(canvas, '站', 270, topOffset + 75, fSeat, inkPaint, 0);
  drawSpacedText(canvas, '站', W - 160, topOffset + 75, fSeat, inkPaint, 0);

  // ── 日期行 ──
  drawSpacedText(canvas, year, LEFT + 10, topOffset + 170, fDate, inkPaint, -2);
  drawSpacedText(canvas, month, LEFT + 118, topOffset + 170, fDate, inkPaint, -2);
  drawSpacedText(canvas, day, LEFT + 180, topOffset + 170, fDate, inkPaint, -2);
  drawSpacedText(canvas, trip.dep, LEFT + 248, topOffset + 170, fDate, inkPaint, -2);

  // 年月日开
  drawSpacedText(canvas, '年', LEFT + 90, topOffset + 164, fLabel, inkPaint, 0);
  drawSpacedText(canvas, '月', LEFT + 155, topOffset + 164, fLabel, inkPaint, 0);
  drawSpacedText(canvas, '日', LEFT + 218, topOffset + 164, fLabel, inkPaint, 0);
  drawSpacedText(canvas, '开', LEFT + 345, topOffset + 164, fLabel, inkPaint, 0);
  drawSpacedText(canvas, '车', LEFT + 515, topOffset + 164, fLabel, inkPaint, 0);
  drawSpacedText(canvas, '号', LEFT + 594, topOffset + 164, fLabel, inkPaint, 0);

  // ── 车厢座位行 ──
  const carNo = String(seat?.car ?? 0).padStart(2, '0');
  let seatNo = String(seat?.seat ?? '000').padStart(3, '0');
  drawSpacedText(canvas, carNo, W / 2 + 120, topOffset + 170, fSeat, inkPaint, -2);

  // 座位号末位如果是字母，缩小字号
  const lastChar = seatNo.slice(-1);
  if (/[A-Z]/.test(lastChar)) {
    const seatNum = seatNo.slice(0, -1);
    drawSpacedText(canvas, seatNum, W / 2 + 182, topOffset + 170, fSeat, inkPaint, -3);
    const fSeatSm = fs(serifTF, 20);
    drawSpacedText(canvas, lastChar, W / 2 + 182 + 38, topOffset + 167, fSeatSm, inkPaint, -3);
  } else {
    drawSpacedText(canvas, seatNo, W / 2 + 182, topOffset + 170, fSeat, inkPaint, -3);
  }

  // 席别
  const seatType = tk[0];
  const stW = measureText(fSeat, seatType);
  drawSpacedText(canvas, seatType, 650 - stW / 2, topOffset + 210, fSeat, inkPaint, 0);

  // ── 票价行 ──
  drawSpacedText(canvas, '￥', LEFT + 15, topOffset + 215, fPrice, inkPaint, 0);
  const pw = measureText(fPrice, price);
  drawSpacedText(canvas, price, LEFT + 50, topOffset + 215, fPrice, inkPaint, -2);
  drawSpacedText(canvas, '元', LEFT + 42 + pw, topOffset + 210, fLabel, inkPaint, 0);

  // ── 身份标记圆圈（成/学/孩/军/惠）──
  const marks: string[] = ['成']; // 默认成人票
  const markFont = fs(serifTF, 32);
  const circleR = 17;
  const gap = 50;
  const totalW = marks.length * circleR * 2 + (marks.length - 1) * (gap - circleR * 2);
  const centerX = W / 2;
  const startCx = centerX - totalW / 2 + circleR;
  for (let i = 0; i < marks.length; i++) {
    const cx = startCx + i * gap;
    const mw = measureText(markFont, marks[i]);
    drawSpacedText(canvas, marks[i], cx - mw / 2, topOffset + 210, markFont, inkPaint, 0);
    canvas.drawCircle(cx, topOffset + 198, circleR, arrowPaint); // 复用 stroke paint
  }

  // ── 仅供报销使用 ──
  drawSpacedText(canvas, '仅供纪念使用', LEFT, 330, fs(serifTF, 32), inkPaint, 0);

  // ── 身份证号 + 姓名 ──
  drawSpacedText(canvas, pax.id, LEFT, 370, fPax, inkPaint, -3);
  drawSpacedText(canvas, pax.name, LEFT + measureText(fPax, pax.id) + 10 - 48, 370, fs(serifTF, 36), inkPaint, 0);

  // ── 虚线框 ──
  const dashW = 440;
  const dashH = 70;
  const dashLeft = 108;
  const dashPaint = makePaint('#000000', 'stroke', 1);
  dashPaint.setPathEffect(Skia.PathEffect.MakeDash([8, 2], 0));
  canvas.drawRect(Skia.XYWHRect(dashLeft, 380, dashW, dashH), dashPaint);
  dashPaint.setPathEffect(null);

  const t1 = '报销凭证 遗失不补';
  const t2 = '退票改签时须交回车站';
  drawSpacedText(canvas, t1, dashLeft + dashW / 2 - measureText(fNotice, t1) / 2, 408, fNotice, inkPaint, 0);
  drawSpacedText(canvas, t2, dashLeft + dashW / 2 - measureText(fNotice, t2) / 2, 440, fNotice, inkPaint, 0);

  // ── 二维码 ──
  const qrText = `https://www.12306.cn/#${serial}`;
  drawQRCode(canvas, qrText, dashLeft + dashW + 60, 330, 120);

  // ── 底部 JM 编码 ──
  const bottomOffset = Math.floor(Math.random() * 25) + 10;
  drawSpacedText(canvas, jm, LEFT, H - 50 + bottomOffset, fTicketId, inkPaint, 0);

  // 来源注记（设计红线）
  const noteFont = fs(serifTF, 18);
  const noteText = 'Lineage 出行档案 · 截图留念，不作乘车凭证';
  drawSpacedText(canvas, noteText, W - measureText(noteFont, noteText) - 30, H - 25, noteFont, makePaint('rgba(0,0,0,0.55)'), 0);

  // ── 左上红色票号 ──
  canvas.drawText(serial, 80, 65, redPaint, fRedId);

  // ── 导出 ──
  const image = surface.makeImageSnapshot();
  const base64 = image.encodeToBase64(4 /* PNG */);
  return { base64, width: ow, height: oh };
}
