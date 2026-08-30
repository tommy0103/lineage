// 本文件由 scripts/build-mapstyle.mjs 生成，请勿手改（调参改生成器里的 ROLES / RASTER_PAINT）。
// 底本：scripts/vendor/bing-style-zh-CN.json（nearcade 线上验证过的 Bing 中国版样式）。
// 完整地理图层栈（道路/铁路/水系/地貌/边界/地名/交通 POI），OKLCH 晨雾玻璃调色，
// glyphs 用 Bing 端点（Roboto-* 栈）；sprite 图标/pattern 已全部剔除（位图调色够不到且高饱和），
// 数据驱动颜色（地铁官方色等）由运行时表达式保色相压饱和（生成器 DD_DESAT/DD_LIFT）。
// 城市点 / 光晕 / 导入动画由 RealMap.tsx 以 GeoJSONSource 叠加在顶层。
export const MAP_STYLE = {
  "version": 8,
  "name": "lineage-bing-morning-glass",
  "glyphs": "https://dynamic.t0.tiles.ditu.live.com/comp/stl?ods=mvt&glyphs={fontstack}&range={range}",
  "sources": {
    "bing-mvt": {
      "type": "vector",
      "tiles": [
        "https://dynamic.t0.tiles.ditu.live.com/comp/ch/{z}-{x}-{y}.mvt?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38",
        "https://dynamic.t1.tiles.ditu.live.com/comp/ch/{z}-{x}-{y}.mvt?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38",
        "https://dynamic.t2.tiles.ditu.live.com/comp/ch/{z}-{x}-{y}.mvt?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38",
        "https://dynamic.t3.tiles.ditu.live.com/comp/ch/{z}-{x}-{y}.mvt?mkt=zh-CN,en-us&it=G,LC,AP,L,LA&jp=0&js=1&tj=1&ur=cn&cstl=s23&mvt=1&features=mvt,mvtfcall,lsoft,mvtfontinfo,mvttxtmaxw&og=1009&st=bld|v:0_g|pv:1&sv=9.38"
      ],
      "maxzoom": 18,
      "promoteId": "id",
      "attribution": "© Microsoft Corporation - GS(2025)3133号"
    },
    "background_LOD1": {
      "type": "raster",
      "tiles": [
        "https://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t1.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t2.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t3.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn"
      ],
      "maxzoom": 1,
      "tileSize": 256
    },
    "background_LOD7": {
      "type": "raster",
      "tiles": [
        "https://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t1.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t2.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t3.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn"
      ],
      "minzoom": 7,
      "maxzoom": 7,
      "tileSize": 256
    },
    "background_LOD12": {
      "type": "raster",
      "tiles": [
        "https://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t1.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t2.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn",
        "https://dynamic.t3.tiles.ditu.live.com/comp/ch/{quadkey}?mkt=zh-CN,en-us&it=GB,LC&n=t&og=1009&&sv=9.38&cstl=s23&o=webp&ur=cn"
      ],
      "minzoom": 12,
      "maxzoom": 12,
      "tileSize": 256
    }
  },
  "layers": [
    {
      "id": "microsoft.bing.maps.base.land",
      "type": "background",
      "paint": {
        "background-color": "#f7fbfc"
      }
    },
    {
      "id": "microsoft.bing.maps.base.backgroundLOD2-9",
      "type": "raster",
      "paint": {
        "raster-fade-duration": 0,
        "raster-saturation": 0.35,
        "raster-contrast": -0.06,
        "raster-brightness-min": 0.06,
        "raster-brightness-max": 1,
        "raster-hue-rotate": 0
      },
      "layout": {
        "visibility": "none"
      },
      "metadata": {
        "delayLoad": true
      },
      "source": "background_LOD1",
      "maxzoom": 9,
      "minzoom": 2
    },
    {
      "id": "microsoft.bing.maps.base.backgroundLOD8-15",
      "type": "raster",
      "paint": {
        "raster-fade-duration": 0,
        "raster-saturation": 0.35,
        "raster-contrast": -0.06,
        "raster-brightness-min": 0.06,
        "raster-brightness-max": 1,
        "raster-hue-rotate": 0
      },
      "layout": {
        "visibility": "none"
      },
      "metadata": {
        "delayLoad": true
      },
      "source": "background_LOD7",
      "maxzoom": 15,
      "minzoom": 8
    },
    {
      "id": "microsoft.bing.maps.base.backgroundLOD14-20",
      "type": "raster",
      "paint": {
        "raster-fade-duration": 0,
        "raster-saturation": 0.35,
        "raster-contrast": -0.06,
        "raster-brightness-min": 0.06,
        "raster-brightness-max": 1,
        "raster-hue-rotate": 0
      },
      "layout": {
        "visibility": "none"
      },
      "metadata": {
        "delayLoad": true
      },
      "source": "background_LOD12",
      "minzoom": 14
    },
    {
      "id": "microsoft.bing.maps.baseFeature.vector_land",
      "type": "fill",
      "source": "bing-mvt",
      "source-layer": "vector_background",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.land_cover_grass_fill",
      "source": "bing-mvt",
      "source-layer": "land_cover_grass",
      "maxzoom": 16,
      "type": "fill",
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#dbf1e4",
          13,
          "#dbf1e4",
          14,
          "#e2efe7",
          15,
          "#ebedec"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.land_cover_forest_fill",
      "source": "bing-mvt",
      "source-layer": "land_cover_forest",
      "maxzoom": 15,
      "type": "fill",
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#d1f2df",
          11,
          "#d1f2df",
          13,
          "#d9f1e3",
          15,
          "#e7edea"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.land_cover_urban_fill",
      "source": "bing-mvt",
      "source-layer": "land_cover_urban",
      "minzoom": 7,
      "type": "fill",
      "paint": {
        "fill-color": "#ebedec"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.generic_reserve_fill",
      "source": "bing-mvt",
      "source-layer": "reserve",
      "type": "fill",
      "paint": {
        "fill-color": "#d1f2df"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.indigenous_peoples_reserve_fill-merged2",
      "source": "bing-mvt",
      "source-layer": "indigenous_peoples_reserve",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            892,
            610
          ]
        ]
      ],
      "minzoom": 4,
      "type": "fill",
      "paint": {
        "fill-outline-color": "#cecece00",
        "fill-color": "#ededed00"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.land_cover_snow_and_ice_fill",
      "source": "bing-mvt",
      "source-layer": "land_cover_snow_and_ice",
      "type": "fill",
      "paint": {
        "fill-color": "#ededed"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.garden_fill-merged2",
      "source": "bing-mvt",
      "source-layer": "garden",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "Polygon",
            "MultiPolygon"
          ]
        ]
      ],
      "minzoom": 14,
      "type": "fill",
      "paint": {
        "fill-color": "#d1f2df"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.airport_fill-merged7",
      "source": "bing-mvt",
      "source-layer": "airport",
      "filter": [
        "all",
        [
          "in",
          [
            "get",
            "bkt"
          ],
          [
            "literal",
            [
              1072,
              1077,
              1079,
              1081,
              1082,
              1083,
              1084
            ]
          ]
        ],
        [
          "in",
          [
            "geometry-type"
          ],
          [
            "literal",
            [
              "Polygon",
              "MultiPolygon"
            ]
          ]
        ]
      ],
      "minzoom": 7,
      "type": "fill",
      "paint": {
        "fill-color": "#e3e7e4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.bus_station_fill",
      "source": "bing-mvt",
      "source-layer": "bus_station",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "bkt"
          ],
          1196
        ],
        [
          "in",
          [
            "geometry-type"
          ],
          [
            "literal",
            [
              "Polygon",
              "MultiPolygon"
            ]
          ]
        ]
      ],
      "minzoom": 11,
      "type": "fill",
      "paint": {
        "fill-color": "#e6e6e6"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.ferry_terminal_polygon_fill",
      "source": "bing-mvt",
      "source-layer": "ferry_terminal",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1350
      ],
      "minzoom": 11,
      "type": "fill",
      "paint": {
        "fill-color": "#e5e5e5"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.airport_runway_fill",
      "source": "bing-mvt",
      "source-layer": "airport_runway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1086
      ],
      "minzoom": 11,
      "type": "fill",
      "paint": {
        "fill-color": "#e6e8e7"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.airport_runway_line_line",
      "source": "bing-mvt",
      "source-layer": "airport_runway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1944
      ],
      "minzoom": 10,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#e6e8e7",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          0.82,
          11,
          1.5,
          12,
          1.5,
          13,
          3.5,
          14,
          5,
          16,
          13,
          17,
          16,
          18,
          25,
          19,
          44,
          20,
          83,
          21,
          167,
          22,
          253
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.airport_line",
      "source": "bing-mvt",
      "source-layer": "airport",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "bkt"
          ],
          1072
        ],
        [
          "in",
          [
            "geometry-type"
          ],
          [
            "literal",
            [
              "LineString",
              "MultiLineString"
            ]
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#dce6e000",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.generic_water_feature_fill",
      "source": "bing-mvt",
      "source-layer": "water_feature",
      "type": "fill",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "Polygon",
            "MultiPolygon"
          ]
        ]
      ],
      "paint": {
        "fill-color": "#cef3ff"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.generic_water_feature_line",
      "source": "bing-mvt",
      "source-layer": "water_feature",
      "minzoom": 9,
      "type": "line",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "LineString",
            "MultiLineString"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cef3ff",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          9,
          0.3,
          12,
          0.75,
          14,
          2,
          16,
          4,
          17,
          6
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.entity_override_cn_china_sea_for_dark_lv6_fill",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2087
      ],
      "minzoom": 5,
      "maxzoom": 6,
      "type": "fill",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.entity_override_cn_china_sea_for_dark_lv7_fill",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2086
      ],
      "minzoom": 6,
      "type": "fill",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.entity_override_cn_china_sea_for_dark_lv5_fill",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2085
      ],
      "minzoom": 4,
      "maxzoom": 5,
      "type": "fill",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.entity_override_cn_china_sea_for_dark_lv4_fill",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2084
      ],
      "minzoom": 3,
      "maxzoom": 4,
      "type": "fill",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.entity_override_cn_china_sea_for_dark_lv3_fill",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2083
      ],
      "minzoom": 2,
      "maxzoom": 3,
      "type": "fill",
      "paint": {
        "fill-color": "#f3f6f4"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.generic_water_pattern_area_dashed_line",
      "source": "bing-mvt",
      "source-layer": "water_pattern_area",
      "minzoom": 13,
      "type": "line",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "LineString",
            "MultiLineString"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cef3ff",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          12,
          0.75,
          14,
          2,
          16,
          4,
          17,
          6
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              16.67,
              10
            ]
          ],
          12,
          [
            "literal",
            [
              6.67,
              4
            ]
          ],
          14,
          [
            "literal",
            [
              2.5,
              1.5
            ]
          ],
          15,
          [
            "literal",
            [
              1.67,
              1
            ]
          ],
          16,
          [
            "literal",
            [
              1.25,
              0.75
            ]
          ],
          17,
          [
            "literal",
            [
              0.83,
              0.5
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.airport_terminal_fill",
      "source": "bing-mvt",
      "source-layer": "airport_terminal",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "Polygon",
            "MultiPolygon"
          ]
        ]
      ],
      "minzoom": 16,
      "type": "fill",
      "paint": {
        "fill-color": "#e3e7e4"
      }
    },
    {
      "id": "microsoft.bing.maps.roads.airport_terminal_line",
      "source": "bing-mvt",
      "source-layer": "airport_terminal",
      "filter": [
        "in",
        [
          "geometry-type"
        ],
        [
          "literal",
          [
            "LineString",
            "MultiLineString"
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#e3e7e4",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.japan_divider_area_fill",
      "source": "bing-mvt",
      "source-layer": "divider",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        975
      ],
      "minzoom": 16,
      "type": "fill",
      "paint": {
        "fill-outline-color": "#a4a4a400",
        "fill-color": "#d0cfcb66"
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_tunnel_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            687,
            683
          ]
        ]
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cfcfcd",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.4,
          14,
          0.6,
          15,
          4,
          16,
          6.4,
          17,
          11.2,
          18,
          16,
          19,
          20.8,
          20,
          22.4,
          21,
          25.6
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_toll_tunnel_one_way_line",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        682
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cfcfcd",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.5,
          14,
          0.75,
          15,
          5,
          16,
          8,
          17,
          14,
          18,
          20
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.arterial_tunnel_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            679,
            674,
            678
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cfcfcd",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.25,
          12,
          0.5,
          13,
          0.75,
          14,
          5,
          15,
          8,
          16,
          14,
          17,
          20,
          18,
          24
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_tunnel_line-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            671,
            666,
            670,
            665
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#cbcbcb",
          13,
          "#cfcfcd"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.5,
          10,
          2,
          11,
          3,
          12,
          4,
          13,
          5,
          14,
          7.5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          37,
          20,
          42,
          21,
          46
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_tunnel_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            662,
            657,
            661
          ]
        ]
      ],
      "minzoom": 5,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#ddc8ba",
          13,
          "#d6d1ce"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          40,
          20,
          44,
          21,
          48
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_toll_tunnel_one_way_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            125,
            656
          ]
        ]
      ],
      "minzoom": 5,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#ddc8ba",
          13,
          "#d6d1ce"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_toll_tunnel_one_way_eu_line",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        124
      ],
      "minzoom": 5,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#dccbc0",
          9,
          "#ddc8ba",
          13,
          "#d6d1ce"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_tunnel_line-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            642,
            639,
            644,
            638
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#dccbc0",
          9,
          "#dfc5b5",
          13,
          "#d6d1ce"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          40,
          20,
          50
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_toll_tunnel_eu_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            129,
            128
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#dccbc0",
          9,
          "#dfc5b5",
          13,
          "#d6d1ce"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_tunnel_line_1-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            671,
            666,
            670,
            665
          ]
        ]
      ],
      "minzoom": 11,
      "maxzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf3",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          2,
          13,
          3
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_tunnel_line_1-merged12",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            662,
            125,
            657,
            661,
            656,
            124,
            642,
            639,
            644,
            129,
            638,
            128
          ]
        ]
      ],
      "minzoom": 9,
      "maxzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          [
            642,
            639,
            644,
            129,
            638,
            128
          ],
          "#fff9ef",
          "#fffaf4"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.autorail_line-merged2",
      "source": "bing-mvt",
      "source-layer": "autorail",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            623,
            626
          ]
        ]
      ],
      "minzoom": 15,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          3,
          16,
          5,
          17,
          7
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_toll_tunnel_eu_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            121,
            120
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#cbcbcb",
          13,
          "#cfcfcd"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.5,
          10,
          2,
          11,
          3,
          12,
          4,
          13,
          5,
          14,
          7.5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          37,
          20,
          42,
          21,
          46
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_unpaved_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1315,
            685
          ]
        ]
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          685,
          "#cbcbcb",
          "#cdcdcd"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.5,
          14,
          0.75,
          15,
          5,
          16,
          8,
          17,
          14,
          18,
          20
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.arterial_unpaved_line",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1313
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cdcdcd",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.25,
          12,
          0.5,
          13,
          0.75,
          14,
          5,
          15,
          8,
          16,
          14,
          17,
          20,
          18,
          24
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ramp_line",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        631
      ],
      "minzoom": 10,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ddc8ba",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.5,
          11,
          0.75,
          13,
          1,
          14,
          3,
          15,
          4.5,
          16,
          7,
          17,
          11,
          18,
          16,
          19,
          21,
          20,
          26,
          21,
          30
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ramp_one_way_line-merged6",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            635,
            1349,
            1011,
            1009,
            1010,
            1007
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ddc8ba",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.75,
          13,
          1,
          14,
          3,
          15,
          4.5,
          16,
          7,
          17,
          11,
          18,
          16,
          19,
          21,
          20,
          26,
          21,
          30
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            680,
            684,
            686
          ]
        ]
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cbcbcb",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.5,
          14,
          0.75,
          15,
          5,
          16,
          8,
          17,
          14,
          18,
          20,
          19,
          28,
          20,
          33,
          21,
          38
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.arterial_line-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            672,
            676,
            677,
            675
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cbcbcb",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.75,
          13,
          1,
          14,
          5,
          15,
          8,
          16,
          14,
          17,
          20,
          18,
          24,
          19,
          31,
          20,
          36,
          21,
          40
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1309,
            663,
            668
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          1309,
          "#cdcdcd",
          "#ddc8ba"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.5,
          10,
          2,
          11,
          3,
          12,
          4,
          13,
          5,
          14,
          7.5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          37,
          20,
          42,
          21,
          46
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_toll_line-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            669,
            123,
            667,
            122
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#cbcbcb",
          11,
          "#ddc8ba"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.5,
          10,
          2,
          11,
          3,
          12,
          4,
          13,
          5,
          14,
          7.5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          37,
          20,
          42,
          21,
          46
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_line",
      "source": "bing-mvt",
      "source-layer": "railway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        616
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ferry_route_line-merged2",
      "source": "bing-mvt",
      "source-layer": "ferry_route",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1208,
            629
          ]
        ]
      ],
      "minzoom": 12,
      "type": "line",
      "paint": {
        "line-color": "#75a8ba",
        "line-width": 1.25,
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              2
            ]
          ],
          12,
          [
            "literal",
            [
              0.8,
              2.4
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ferry_route_hd_is_toll_line",
      "source": "bing-mvt",
      "source-layer": "ferry_route",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1375
      ],
      "minzoom": 4,
      "type": "line",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#79acbe",
          9,
          "#77aabc",
          12,
          "#75a8ba"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          1,
          9,
          1,
          12,
          1.25
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              2
            ]
          ],
          12,
          [
            "literal",
            [
              0.8,
              2.4
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.tramway_line",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1225
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.autorail_line_1-merged2",
      "source": "bing-mvt",
      "source-layer": "autorail",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            623,
            626
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#9fa0a1",
          14,
          "#9fa0a1",
          15,
          "#b3b4b4"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          16,
          3,
          17,
          5
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          15,
          [
            "literal",
            [
              14,
              10
            ]
          ],
          16,
          [
            "literal",
            [
              4.67,
              3.33
            ]
          ],
          17,
          [
            "literal",
            [
              2.8,
              2
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_toll_tunnel_eu_line_1-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            121,
            120
          ]
        ]
      ],
      "minzoom": 11,
      "maxzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf3",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          2,
          13,
          3
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_unpaved_line_1-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1315,
            685
          ]
        ]
      ],
      "minzoom": 15,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          685,
          "#ffffff",
          "#fefefe"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          3,
          16,
          6,
          17,
          12,
          18,
          18
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.arterial_unpaved_line_1",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1313
      ],
      "minzoom": 14,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fefefe",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          3,
          15,
          6,
          16,
          12,
          17,
          18,
          18,
          22
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ramp_line_1-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            631,
            635,
            1349
          ]
        ]
      ],
      "minzoom": 14,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf3",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          15,
          2.5,
          16,
          5,
          17,
          9,
          18,
          14,
          19,
          18,
          20,
          22,
          21,
          26
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_parking_lot_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            265,
            266
          ]
        ]
      ],
      "minzoom": 16,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cacaca80",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          2,
          17,
          3,
          18,
          4
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.street_line_1-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            680,
            684,
            686
          ]
        ]
      ],
      "minzoom": 15,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          3,
          16,
          6,
          17,
          12,
          18,
          18,
          19,
          24,
          20,
          28,
          21,
          34
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.arterial_line_1-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            672,
            676,
            677,
            675
          ]
        ]
      ],
      "minzoom": 14,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          3,
          15,
          6,
          16,
          12,
          17,
          18,
          18,
          22,
          19,
          28,
          20,
          32,
          21,
          36
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_line_1-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1309,
            663,
            668,
            669
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          1309,
          "#fefefe",
          "#fffaf3"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          2,
          13,
          3,
          14,
          5.5,
          15,
          8,
          16,
          16,
          17,
          26,
          18,
          28,
          19,
          32,
          20,
          36,
          21,
          38
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.major_road_toll_one_way_line_1-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            123,
            667,
            122
          ]
        ]
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf3",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          8,
          16,
          16,
          17,
          26
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_tunnel_line",
      "source": "bing-mvt",
      "source-layer": "railway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        908
      ],
      "minzoom": 11,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.japan_divider_boundary_line",
      "source": "bing-mvt",
      "source-layer": "divider",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        918
      ],
      "minzoom": 16,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#c9c8c980",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_line_1",
      "source": "bing-mvt",
      "source-layer": "railway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        616
      ],
      "minzoom": 11,
      "type": "line",
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": 5,
        "line-dasharray": [
          0.2,
          4.4
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_chn_line",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        17
      ],
      "minzoom": 7,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          "#909293e6",
          8,
          "#909293e6",
          10,
          "#9fa0a1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          2.7,
          8,
          3,
          11,
          4,
          12,
          4.5,
          15,
          4.5,
          17,
          6.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.autorail_line_2-merged2",
      "source": "bing-mvt",
      "source-layer": "autorail",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            623,
            626
          ]
        ]
      ],
      "minzoom": 4,
      "maxzoom": 15,
      "type": "line",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#9fa0a1",
          15,
          "#9b9d9e"
        ],
        "line-width": 3,
        "line-dasharray": [
          0.33,
          7.67
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_tunnel_line_1",
      "source": "bing-mvt",
      "source-layer": "railway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        908
      ],
      "minzoom": 11,
      "type": "line",
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": 5.75,
        "line-dasharray": [
          0.17,
          1.22
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_chn_line_1",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        17
      ],
      "minzoom": 7,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          "#a9abad",
          8,
          "#a9abad",
          10,
          "#b3b4b4"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          1.2,
          8,
          1.5,
          11,
          2,
          12,
          2.5,
          15,
          2.5,
          17,
          4.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_chn_line_2",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        17
      ],
      "minzoom": 7,
      "type": "line",
      "paint": {
        "line-color": "#9fa0a1",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          1.7,
          8,
          2,
          11,
          2.5,
          12,
          3,
          15,
          3,
          16,
          4.5,
          17,
          5
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          6,
          [
            "literal",
            [
              5.88,
              5.88
            ]
          ],
          8,
          [
            "literal",
            [
              5,
              5
            ]
          ],
          10,
          [
            "literal",
            [
              4.79,
              4.79
            ]
          ],
          11,
          [
            "literal",
            [
              4.4,
              4.4
            ]
          ],
          12,
          [
            "literal",
            [
              5.33,
              4.67
            ]
          ],
          16,
          [
            "literal",
            [
              3.56,
              3.11
            ]
          ],
          17,
          [
            "literal",
            [
              3.2,
              3.2
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_toll_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1308,
            660,
            658
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          1308,
          "#cdcdcd",
          "#ddc8ba"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          40,
          20,
          44,
          21,
          48
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            654,
            659
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ddc8ba",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          22,
          18,
          26,
          19,
          32,
          20,
          38,
          21,
          44
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_toll_eu_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            127,
            126
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ddc8ba",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.controlled_access_highway_line-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            636,
            640,
            643
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#dfc5b5",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28,
          18,
          32,
          19,
          40,
          20,
          50
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_one_way_line",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        641
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#dfc5b5",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          5,
          1.5,
          6,
          2.5,
          8,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_toll_eu_line-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            131,
            130
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#dccbc0",
          9,
          "#dfc5b5"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          6,
          2,
          8,
          2.5,
          9,
          3,
          12,
          3.6,
          13,
          4.2,
          14,
          5,
          15,
          10,
          16,
          18,
          17,
          28
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.ramp_high_speed_line_1-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1011,
            1009,
            1010,
            1007
          ]
        ]
      ],
      "minzoom": 14,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf3",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          15,
          2.5,
          16,
          5,
          17,
          9,
          18,
          14,
          19,
          18,
          20,
          22,
          21,
          26
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_toll_line_1-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1308,
            660,
            658
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          1308,
          "#fefefe",
          "#fffaf4"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          8,
          16,
          16,
          17,
          26,
          18,
          30,
          19,
          36,
          20,
          38,
          21,
          40
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.highway_line_1-merged2",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            654,
            659
          ]
        ]
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fffaf4",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          7,
          16,
          14,
          17,
          18.5,
          18,
          22,
          19,
          28,
          20,
          33,
          21,
          38
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_toll_eu_line_1-merged4",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            127,
            126,
            131,
            130
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          [
            131,
            130
          ],
          "#fff9ef",
          "#fffaf4"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          8,
          16,
          16,
          17,
          26
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.controlled_access_highway_line_1-merged3",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            636,
            640,
            643
          ]
        ]
      ],
      "minzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fff9ef",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          8,
          16,
          16,
          17,
          26,
          18,
          30,
          19,
          36,
          20,
          46
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.cah_one_way_line_1",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        641
      ],
      "minzoom": 6,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#fff9ef",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          0.5,
          8,
          1,
          12,
          1.6,
          13,
          2.2,
          14,
          3,
          15,
          8,
          16,
          16,
          17,
          26
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.subway_under_construction_chn_line",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        20
      ],
      "minzoom": 12,
      "type": "line",
      "paint": {
        "line-color": "#989a9b",
        "line-width": 1.7,
        "line-dasharray": [
          2.35,
          1.18
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.subway_chn_line",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1357
      ],
      "minzoom": 10,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#b7b7b7",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          3.8,
          11,
          4.8,
          15,
          4.8,
          16,
          4.4,
          17,
          4.4,
          22,
          5.2
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.tramway_jp_line",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        905
      ],
      "minzoom": 13,
      "maxzoom": 15,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#b7b7b7",
          14,
          "#b7b7b7",
          18,
          "#b7b7b7"
        ],
        "line-width": 4
      }
    },
    {
      "id": "microsoft.bing.maps.roads.tramway_high_res_jp_line",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        925
      ],
      "minzoom": 15,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#989a9b",
        "line-width": 2.2
      }
    },
    {
      "id": "microsoft.bing.maps.roads.subway_chn_line_1",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1357
      ],
      "minzoom": 10,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "case",
          [
            "has",
            "official-color"
          ],
          [
            "match",
            [
              "downcase",
              [
                "get",
                "official-color"
              ]
            ],
            "#005389",
            "#3579b2",
            "#005fb3",
            "#3d76b9",
            "#006098",
            "#2b7ab4",
            "#00763d",
            "#2e8851",
            "#007b42",
            "#2c8853",
            "#008187",
            "#0b848a",
            "#008337",
            "#38874c",
            "#008536",
            "#39874b",
            "#008e9c",
            "#008e9c",
            "#008fa5",
            "#008fa5",
            "#00954d",
            "#399058",
            "#009a42",
            "#459357",
            "#009b6b",
            "#27996d",
            "#009bc1",
            "#009bc1",
            "#00a9a9",
            "#00a9a9",
            "#00ab4f",
            "#52a367",
            "#00c5ff",
            "#3fb3e0",
            "#00ca6a",
            "#65ba7f",
            "#00d0bc",
            "#2abdab",
            "#017960",
            "#20876d",
            "#019fde",
            "#399ed3",
            "#0269a4",
            "#267ab5",
            "#049753",
            "#38935c",
            "#059bd8",
            "#349acf",
            "#073765",
            "#4a77aa",
            "#084aa5",
            "#4774ba",
            "#0fa643",
            "#529e5f",
            "#164398",
            "#4c73ba",
            "#17cbe2",
            "#1cb9cd",
            "#1b75ce",
            "#3c77b9",
            "#1e676d",
            "#3b8187",
            "#259cbd",
            "#259cbd",
            "#274ee9",
            "#5371bb",
            "#28aca8",
            "#28aca8",
            "#2a3964",
            "#6173a3",
            "#2b9346",
            "#438f52",
            "#2ec6d6",
            "#18b9c9",
            "#41b6e6",
            "#42b2e1",
            "#435428",
            "#6a7c4f",
            "#4378b4",
            "#4378b4",
            "#47c1cc",
            "#3cb8c3",
            "#52b33e",
            "#6fac63",
            "#530e79",
            "#895faa",
            "#541384",
            "#8561ad",
            "#54c43c",
            "#7ab76e",
            "#59178a",
            "#8560ac",
            "#616020",
            "#79783a",
            "#63b9e9",
            "#59afdf",
            "#69173d",
            "#aa5375",
            "#6bc4d6",
            "#5ab3c5",
            "#6e3d96",
            "#8760ab",
            "#7389b2",
            "#7389b2",
            "#741d50",
            "#a75480",
            "#796cb1",
            "#796cb1",
            "#7cc921",
            "#88b463",
            "#810081",
            "#9a5997",
            "#811c2b",
            "#b05459",
            "#82b82e",
            "#8db35f",
            "#86656d",
            "#8b6a72",
            "#87179d",
            "#935ba0",
            "#892726",
            "#b0554f",
            "#8ec921",
            "#8eb35e",
            "#914798",
            "#965a9c",
            "#91c5db",
            "#7aadc3",
            "#98acab",
            "#95a9a8",
            "#9c3e78",
            "#a55584",
            "#9fce66",
            "#8db35f",
            "#a09200",
            "#9e922c",
            "#a6217f",
            "#a45587",
            "#a77bca",
            "#a67cc9",
            "#a90040",
            "#af5363",
            "#a9cc10",
            "#99b056",
            "#b18854",
            "#b18854",
            "#b2a225",
            "#b0a23f",
            "#b34e20",
            "#ae5a37",
            "#b38112",
            "#b18223",
            "#b8d406",
            "#9daf53",
            "#bd5f54",
            "#bc6055",
            "#c23a30",
            "#b0564b",
            "#c45b03",
            "#b66636",
            "#c4984e",
            "#c4984e",
            "#c52001",
            "#b05646",
            "#c6afd4",
            "#b19bbf",
            "#c8123b",
            "#b05459",
            "#cd0065",
            "#ac536e",
            "#ce4318",
            "#b45d44",
            "#d07b18",
            "#c6803c",
            "#d19447",
            "#d19447",
            "#d5a7a1",
            "#c59892",
            "#d70306",
            "#b0564a",
            "#d7271a",
            "#b2584b",
            "#da0b17",
            "#b0564c",
            "#daf072",
            "#9eaf52",
            "#db241c",
            "#b45a4e",
            "#df7a06",
            "#cf8447",
            "#dfab1a",
            "#c69f41",
            "#e1424a",
            "#c16462",
            "#e2d901",
            "#aea947",
            "#e3718f",
            "#d87a91",
            "#e40077",
            "#b75d7b",
            "#e61925",
            "#ba5e56",
            "#e61a11",
            "#b95e52",
            "#e67016",
            "#d17f4e",
            "#e8cc60",
            "#bca341",
            "#e90208",
            "#b95e52",
            "#e93cac",
            "#c26f9e",
            "#e97216",
            "#d38150",
            "#e999c0",
            "#d788af",
            "#e99cc0",
            "#d58aad",
            "#eab011",
            "#c89e41",
            "#eb6183",
            "#d57689",
            "#ebcd31",
            "#b9a542",
            "#ec333f",
            "#c36662",
            "#ec7823",
            "#d78654",
            "#ed1e3c",
            "#bf6261",
            "#ee782e",
            "#da8658",
            "#efab03",
            "#cc9b42",
            "#f0b200",
            "#c99d41",
            "#f3d100",
            "#baa542",
            "#f57b61",
            "#e58772",
            "#f5964a",
            "#dd9055",
            "#f6c582",
            "#ca9b59",
            "#f7b000",
            "#cc9b43",
            "#f8d032",
            "#bea341",
            "#fa709c",
            "#e2839e",
            "#fc0601",
            "#c5695c",
            "#fcb14d",
            "#d49748",
            "#ff0000",
            "#c76a5d",
            "#ffaa00",
            "#d29846",
            "#ffd823",
            "#bca341",
            "#ffe637",
            "#b5a644",
            [
              "let",
              "rgb",
              [
                "to-rgba",
                [
                  "get",
                  "official-color"
                ]
              ],
              [
                "let",
                "gray",
                [
                  "+",
                  [
                    "*",
                    0.2126,
                    [
                      "at",
                      0,
                      [
                        "var",
                        "rgb"
                      ]
                    ]
                  ],
                  [
                    "*",
                    0.7152,
                    [
                      "at",
                      1,
                      [
                        "var",
                        "rgb"
                      ]
                    ]
                  ],
                  [
                    "*",
                    0.0722,
                    [
                      "at",
                      2,
                      [
                        "var",
                        "rgb"
                      ]
                    ]
                  ]
                ],
                [
                  "rgba",
                  [
                    "max",
                    0,
                    [
                      "min",
                      255,
                      [
                        "+",
                        [
                          "+",
                          [
                            "var",
                            "gray"
                          ],
                          [
                            "*",
                            0.42,
                            [
                              "-",
                              [
                                "at",
                                0,
                                [
                                  "var",
                                  "rgb"
                                ]
                              ],
                              [
                                "var",
                                "gray"
                              ]
                            ]
                          ]
                        ],
                        [
                          "*",
                          [
                            "-",
                            255,
                            [
                              "+",
                              [
                                "var",
                                "gray"
                              ],
                              [
                                "*",
                                0.42,
                                [
                                  "-",
                                  [
                                    "at",
                                    0,
                                    [
                                      "var",
                                      "rgb"
                                    ]
                                  ],
                                  [
                                    "var",
                                    "gray"
                                  ]
                                ]
                              ]
                            ]
                          ],
                          0.16
                        ]
                      ]
                    ]
                  ],
                  [
                    "max",
                    0,
                    [
                      "min",
                      255,
                      [
                        "+",
                        [
                          "+",
                          [
                            "var",
                            "gray"
                          ],
                          [
                            "*",
                            0.42,
                            [
                              "-",
                              [
                                "at",
                                1,
                                [
                                  "var",
                                  "rgb"
                                ]
                              ],
                              [
                                "var",
                                "gray"
                              ]
                            ]
                          ]
                        ],
                        [
                          "*",
                          [
                            "-",
                            255,
                            [
                              "+",
                              [
                                "var",
                                "gray"
                              ],
                              [
                                "*",
                                0.42,
                                [
                                  "-",
                                  [
                                    "at",
                                    1,
                                    [
                                      "var",
                                      "rgb"
                                    ]
                                  ],
                                  [
                                    "var",
                                    "gray"
                                  ]
                                ]
                              ]
                            ]
                          ],
                          0.16
                        ]
                      ]
                    ]
                  ],
                  [
                    "max",
                    0,
                    [
                      "min",
                      255,
                      [
                        "+",
                        [
                          "+",
                          [
                            "var",
                            "gray"
                          ],
                          [
                            "*",
                            0.42,
                            [
                              "-",
                              [
                                "at",
                                2,
                                [
                                  "var",
                                  "rgb"
                                ]
                              ],
                              [
                                "var",
                                "gray"
                              ]
                            ]
                          ]
                        ],
                        [
                          "*",
                          [
                            "-",
                            255,
                            [
                              "+",
                              [
                                "var",
                                "gray"
                              ],
                              [
                                "*",
                                0.42,
                                [
                                  "-",
                                  [
                                    "at",
                                    2,
                                    [
                                      "var",
                                      "rgb"
                                    ]
                                  ],
                                  [
                                    "var",
                                    "gray"
                                  ]
                                ]
                              ]
                            ]
                          ],
                          0.16
                        ]
                      ]
                    ]
                  ],
                  [
                    "at",
                    3,
                    [
                      "var",
                      "rgb"
                    ]
                  ]
                ]
              ]
            ]
          ],
          "#9fa0a1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          1.8,
          12,
          1.9,
          13,
          2.1,
          15,
          2.2,
          16,
          2.3,
          17,
          2.6
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.tramway_jp_line_1",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        905
      ],
      "minzoom": 13,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "step",
          [
            "zoom"
          ],
          "#989a9b",
          15,
          "#adadae"
        ],
        "line-width": 2.2
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_disputed_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        438
      ],
      "minzoom": 1,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          1,
          "#95a89dcc",
          2,
          "#95a99d"
        ],
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv8_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1885
      ],
      "minzoom": 7,
      "maxzoom": 9,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv4_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1995
      ],
      "minzoom": 3,
      "maxzoom": 4,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv5_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1994
      ],
      "minzoom": 4,
      "maxzoom": 5,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv7_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1993
      ],
      "minzoom": 6,
      "maxzoom": 7,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv6_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1992
      ],
      "minzoom": 5,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_cn_sovereign_boundary_disputed_china_lv3_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1988
      ],
      "minzoom": 2,
      "maxzoom": 3,
      "type": "line",
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1.1,
          12,
          1.65
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1,
              0
            ]
          ],
          1,
          [
            "literal",
            [
              2.73,
              2.73
            ]
          ],
          4,
          [
            "literal",
            [
              4.55,
              4.55
            ]
          ],
          5,
          [
            "literal",
            [
              6.36,
              4.55
            ]
          ],
          9,
          [
            "literal",
            [
              9.09,
              9.09
            ]
          ],
          12,
          [
            "literal",
            [
              6.06,
              6.06
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_sovereign_boundary_china_dprk_line_1",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1891
      ],
      "minzoom": 2,
      "maxzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.entity_override_sovereign_boundary_china_line_1",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1873
      ],
      "minzoom": 1,
      "maxzoom": 9,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_cease_fire_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        435
      ],
      "minzoom": 1,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": "#9cbaa9cc",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          1,
          1.2,
          2,
          1.5,
          4,
          1.8,
          5,
          2,
          6,
          2.5
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1.67,
              1.67
            ]
          ],
          2,
          [
            "literal",
            [
              2,
              1.33
            ]
          ],
          3,
          [
            "literal",
            [
              2.41,
              1.8
            ]
          ],
          4,
          [
            "literal",
            [
              2.22,
              1.67
            ]
          ],
          5,
          [
            "literal",
            [
              3.5,
              2.5
            ]
          ],
          6,
          [
            "literal",
            [
              2.8,
              2
            ]
          ],
          7,
          [
            "literal",
            [
              2.55,
              1.82
            ]
          ],
          8,
          [
            "literal",
            [
              2.33,
              1.67
            ]
          ],
          9,
          [
            "literal",
            [
              3.08,
              3.08
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_cease_fire_limit_lods_for_cn_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2091
      ],
      "minzoom": 4,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": "#9cbaa9cc",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          4,
          1.8,
          5,
          2,
          6,
          2.5
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1.67,
              1.67
            ]
          ],
          2,
          [
            "literal",
            [
              2,
              1.33
            ]
          ],
          3,
          [
            "literal",
            [
              2.41,
              1.8
            ]
          ],
          4,
          [
            "literal",
            [
              2.22,
              1.67
            ]
          ],
          5,
          [
            "literal",
            [
              3.5,
              2.5
            ]
          ],
          6,
          [
            "literal",
            [
              2.8,
              2
            ]
          ],
          7,
          [
            "literal",
            [
              2.55,
              1.82
            ]
          ],
          8,
          [
            "literal",
            [
              2.33,
              1.67
            ]
          ],
          9,
          [
            "literal",
            [
              3.08,
              3.08
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_treaty_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        437
      ],
      "minzoom": 1,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": "#b7b7b7",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          1,
          1.2,
          2,
          1.5
        ],
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1.67,
              1.67
            ]
          ],
          2,
          [
            "literal",
            [
              1.33,
              1.33
            ]
          ],
          3,
          [
            "literal",
            [
              1.32,
              1.98
            ]
          ],
          5,
          [
            "literal",
            [
              1.96,
              1.96
            ]
          ],
          7,
          [
            "literal",
            [
              1.95,
              1.95
            ]
          ],
          9,
          [
            "literal",
            [
              4.54,
              4.54
            ]
          ],
          22,
          [
            "literal",
            [
              4.67,
              4.67
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_treaty_limit_lods_for_cn_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2092
      ],
      "minzoom": 4,
      "maxzoom": 6,
      "type": "line",
      "paint": {
        "line-color": "#b7b7b7",
        "line-width": 1.5,
        "line-dasharray": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              1.67,
              1.67
            ]
          ],
          2,
          [
            "literal",
            [
              1.33,
              1.33
            ]
          ],
          3,
          [
            "literal",
            [
              1.32,
              1.98
            ]
          ],
          5,
          [
            "literal",
            [
              1.96,
              1.96
            ]
          ],
          7,
          [
            "literal",
            [
              1.95,
              1.95
            ]
          ],
          9,
          [
            "literal",
            [
              4.54,
              4.54
            ]
          ],
          22,
          [
            "literal",
            [
              4.67,
              4.67
            ]
          ]
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.admin_division1_line",
      "source": "bing-mvt",
      "source-layer": "admin_division1",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        427
      ],
      "minzoom": 5,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          5,
          "#d1d1d1fa",
          6,
          "#d1d1d1fa",
          7,
          "#d1d1d1fa",
          8,
          "#ccccccfa",
          9,
          "#d1d1d1fa",
          13,
          "#d1d1d1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          5,
          10.5,
          9,
          22.5,
          13,
          25.5,
          17,
          31.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.admin_division1_line_1",
      "source": "bing-mvt",
      "source-layer": "admin_division1",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        427
      ],
      "minzoom": 2,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#b1cfbe80",
        "line-width": 1
      }
    },
    {
      "id": "microsoft.bing.maps.roads.country_region_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        434
      ],
      "minzoom": 4,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#bfc6c2ba",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          2,
          2.04,
          22,
          8.99
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.country_region_line_1",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        434
      ],
      "minzoom": 1,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.sovereign_boundary_normal_line",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        764
      ],
      "minzoom": 1,
      "maxzoom": 6,
      "type": "line",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#95a99d",
        "line-width": [
          "step",
          [
            "zoom"
          ],
          1,
          12,
          1.5
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.metro_station_hd_polygon_fill-merged2",
      "source": "bing-mvt",
      "source-layer": "metro_station",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1358,
            494
          ]
        ]
      ],
      "minzoom": 16,
      "type": "fill",
      "paint": {
        "fill-color": [
          "match",
          [
            "get",
            "bkt"
          ],
          494,
          "#cfeada26",
          "#cfeada"
        ],
        "fill-outline-color": "#cecece00"
      }
    },
    {
      "id": "microsoft.bing.maps.roads.railway_station_footprint_overlay_jp_fill",
      "source": "bing-mvt",
      "source-layer": "railway_station",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        456
      ],
      "minzoom": 12,
      "maxzoom": 15,
      "type": "fill",
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          12,
          "#cfe9da",
          14,
          "#d3eadc"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.roads.transportation_structure_jp_footprint_fill",
      "source": "bing-mvt",
      "source-layer": "transportation_structure",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        496
      ],
      "minzoom": 15,
      "type": "fill",
      "paint": {
        "fill-outline-color": "#cecece00",
        "fill-color": [
          "step",
          [
            "zoom"
          ],
          "#cfeadae6",
          16,
          "#cfeadab3"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_feature_linelabel",
      "source": "bing-mvt",
      "source-layer": "water_feature",
      "minzoom": 13,
      "type": "symbol",
      "filter": [
        "has",
        "name"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_feature_polygonlabel",
      "source": "bing-mvt",
      "source-layer": "water_feature",
      "type": "symbol",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "gt"
          ],
          "pg"
        ],
        [
          "in",
          [
            "geometry-type"
          ],
          [
            "literal",
            [
              "Point",
              "MultiPoint"
            ]
          ]
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": [
          "match",
          [
            "get",
            "st-et"
          ],
          [
            "canal",
            "lake",
            "river"
          ],
          0,
          0.08
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_feature_labelonly",
      "source": "bing-mvt",
      "source-layer": "water_feature",
      "type": "symbol",
      "filter": [
        "all",
        [
          "!=",
          [
            "get",
            "gt"
          ],
          "pg"
        ],
        [
          "in",
          [
            "geometry-type"
          ],
          [
            "literal",
            [
              "Point",
              "MultiPoint"
            ]
          ]
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 0.9
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.08,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.airport_runway_line_line_label",
      "source": "bing-mvt",
      "source-layer": "airport_runway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1944
      ],
      "minzoom": 15,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#484848"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_no_label_fill_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        810
      ],
      "minzoom": 9,
      "maxzoom": 17,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.08,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_point_iconlabel",
      "source": "bing-mvt",
      "source-layer": "water_point",
      "minzoom": 13,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-MediumItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right",
          "left",
          "right",
          "bottom",
          "top"
        ],
        "text-justify": "auto",
        "text-radial-offset": [
          "match",
          [
            "get",
            "st"
          ],
          "waterfall",
          0.79,
          0.29
        ],
        "text-padding": 0,
        "text-letter-spacing": 0.08,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a6e80",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_pattern_area_polygonlabel",
      "source": "bing-mvt",
      "source-layer": "water_pattern_area",
      "minzoom": 9,
      "type": "symbol",
      "filter": [
        "==",
        [
          "get",
          "gt"
        ],
        "pg"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_water_pattern_area_labelonly",
      "source": "bing-mvt",
      "source-layer": "water_pattern_area",
      "minzoom": 13,
      "type": "symbol",
      "filter": [
        "!=",
        [
          "get",
          "gt"
        ],
        "pg"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.08,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_neighborhood_labelonly",
      "source": "bing-mvt",
      "source-layer": "neighborhood",
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 0.85
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.08,
        "text-transform": "uppercase",
        "symbol-sort-key": [
          "coalesce",
          [
            "get",
            "st-lblimp"
          ],
          [
            "get",
            "label-importance"
          ],
          255
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.island_bag_fill_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        5
      ],
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.08,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_chiweiyu_symbol_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1925
      ],
      "minzoom": 4,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "bottom-left"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_diaoyudao_symbol_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1926
      ],
      "minzoom": 4,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_xisha_symbol_label-merged4",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1927,
            1930,
            1931,
            1933
          ]
        ]
      ],
      "minzoom": 4,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_huangweiyu_symbol_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1928
      ],
      "minzoom": 6,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_huangyandao_symbol_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1929
      ],
      "minzoom": 4,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "right"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_island_zengmu_symbol_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1932
      ],
      "minzoom": 4,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "bottom-right"
        ],
        "text-justify": "auto",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.island_fill_label",
      "source": "bing-mvt",
      "source-layer": "island",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        27
      ],
      "minzoom": 3,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.08,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#424242",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.archipelago_symbol_label",
      "source": "bing-mvt",
      "source-layer": "archipelago",
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-padding": 0
      },
      "paint": {
        "text-color": "#344551"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_road_linelabel_secondary",
      "source": "bing-mvt",
      "source-layer": "road",
      "minzoom": 6,
      "type": "symbol",
      "filter": [
        "any",
        [
          "has",
          "name2"
        ],
        [
          "has",
          "sec-name"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "coalesce",
          [
            "get",
            "name2"
          ],
          [
            "get",
            "sec-name"
          ]
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 10,
        "text-offset": [
          8,
          0
        ]
      },
      "paint": {
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.ferry_terminal_point_symbol",
      "source": "bing-mvt",
      "source-layer": "ferry_terminal",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        283
      ],
      "minzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.81,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3f505d",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.tramway_line_label",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1225
      ],
      "minzoom": 13,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-transform": "uppercase",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3e3e3e",
        "text-halo-width": 1,
        "text-halo-color": "#fefefc"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.autorail_line_label-merged2",
      "source": "bing-mvt",
      "source-layer": "autorail",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            626,
            623
          ]
        ]
      ],
      "minzoom": 11,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#2e2e2e"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.ferry_route_line_label-merged2",
      "source": "bing-mvt",
      "source-layer": "ferry_route",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            629,
            1208
          ]
        ]
      ],
      "minzoom": 16,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-letter-spacing": 0.08,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.mountain_bag_fill_label",
      "source": "bing-mvt",
      "source-layer": "mountain",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        820
      ],
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Medium"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-padding": 0
      },
      "paint": {
        "text-color": "#354652",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.ferry_terminal_polygon_fill_label",
      "source": "bing-mvt",
      "source-layer": "ferry_terminal",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1350
      ],
      "minzoom": 12,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#474d51",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.bus_station_fill_label",
      "source": "bing-mvt",
      "source-layer": "bus_station",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "bkt"
          ],
          1196
        ],
        [
          "case",
          [
            "has",
            "gt"
          ],
          [
            "==",
            [
              "get",
              "gt"
            ],
            "pg"
          ],
          [
            "in",
            [
              "geometry-type"
            ],
            [
              "literal",
              [
                "Polygon",
                "MultiPolygon"
              ]
            ]
          ]
        ]
      ],
      "minzoom": 12,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#474d51",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.bus_station_symbol",
      "source": "bing-mvt",
      "source-layer": "bus_station",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "bkt"
          ],
          1196
        ],
        [
          "case",
          [
            "has",
            "gt"
          ],
          [
            "==",
            [
              "get",
              "gt"
            ],
            "pt"
          ],
          [
            "in",
            [
              "geometry-type"
            ],
            [
              "literal",
              [
                "Point",
                "MultiPoint"
              ]
            ]
          ]
        ]
      ],
      "minzoom": 16,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            []
          ],
          18,
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.93,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3f505d",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.airport_fill_label-merged6",
      "source": "bing-mvt",
      "source-layer": "airport",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1084,
            1083,
            1082,
            1079,
            1077,
            1072
          ]
        ]
      ],
      "minzoom": 11,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#464b4f",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.china_subway_station_entrance_symbol",
      "source": "bing-mvt",
      "source-layer": "station_entrance",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        133
      ],
      "minzoom": 16,
      "type": "symbol",
      "layout": {
        "text-font": [
          "Roboto-Regular"
        ],
        "text-size": 11,
        "text-field": [
          "get",
          "name"
        ]
      },
      "paint": {
        "text-color": "#3b3f42"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.indigenous_peoples_reserve_polygon_fill_label",
      "source": "bing-mvt",
      "source-layer": "indigenous_peoples_reserve",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        610
      ],
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#354550",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.indigenous_peoples_reserve_fill_label",
      "source": "bing-mvt",
      "source-layer": "indigenous_peoples_reserve",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        892
      ],
      "minzoom": 6,
      "maxzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#354550",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_reserve_polygonlabel",
      "source": "bing-mvt",
      "source-layer": "reserve",
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-MediumItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.04,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#32434f",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.ferry_route_hd_is_toll_line_label",
      "source": "bing-mvt",
      "source-layer": "ferry_route",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1375
      ],
      "minzoom": 10,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-letter-spacing": 0.08,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3a6e80"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_national_park_polygonlabel",
      "source": "bing-mvt",
      "source-layer": "national_park",
      "minzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-MediumItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.04,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#32434f",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_road_linelabel",
      "source": "bing-mvt",
      "source-layer": "road",
      "minzoom": 6,
      "type": "symbol",
      "filter": [
        "has",
        "name"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.road_shield_2nd_name",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "has",
        "shield-type2"
      ],
      "minzoom": 6,
      "type": "symbol",
      "layout": {
        "text-size": [
          "*",
          10,
          [
            "number",
            [
              "get",
              "shield-scale"
            ],
            0.8
          ]
        ],
        "text-letter-spacing": 0.05,
        "symbol-placement": "line-center",
        "symbol-spacing": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          140,
          11,
          140,
          15,
          210,
          19,
          600
        ],
        "text-field": [
          "get",
          "shield-name2"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-rotation-alignment": "viewport",
        "text-max-angle": 90,
        "text-padding": 0
      },
      "paint": {
        "text-color": [
          "match",
          [
            "concat",
            [
              "get",
              "admin-div"
            ],
            "-",
            [
              "get",
              "shield-type2"
            ]
          ],
          [
            "12-1",
            "32-1",
            "32-2",
            "39-2",
            "39-3",
            "166-1",
            "167-1",
            "167-2",
            "167-3",
            "183-2",
            "183-3",
            "244-2",
            "244-3",
            "244-4",
            "113-1",
            "113-2",
            "113-3",
            "227-4",
            "176-6",
            "11-1",
            "11-2",
            "67-1",
            "187-3",
            "205-1",
            "215-3",
            "26-1",
            "51-1",
            "54-1",
            "61-3",
            "77-4",
            "99-1",
            "99-2",
            "157-1",
            "157-2",
            "182-1",
            "182-2",
            "185-1",
            "246-1",
            "246-2",
            "249-1",
            "249-2",
            "251-3"
          ],
          "#515151",
          [
            "237-4",
            "237-5",
            "242-3",
            "39070-4",
            "39070-5",
            "39070-6",
            "45-4",
            "94-4",
            "94-5",
            "94-6",
            "223-4",
            "223-5",
            "223-6",
            "14-6",
            "75-6",
            "200-5",
            "200-6",
            "221-4",
            "221-5",
            "221-6",
            "6-5",
            "21-2",
            "21-4",
            "84-5",
            "110-1",
            "110-2",
            "110-3",
            "110-4",
            "68-3",
            "177-3",
            "193-4",
            "193-5",
            "193-6",
            "203-4",
            "18-1",
            "18-2",
            "18-3",
            "249-4"
          ],
          "#5a5a5a",
          [
            "23-2",
            "28-1",
            "245-1",
            "55-1",
            "44-1",
            "56-1",
            "61-2",
            "71-1",
            "73-1",
            "77-3",
            "87-2",
            "87-3",
            "100-1",
            "141-3",
            "149-1",
            "162-1",
            "162-2",
            "27-1",
            "27-2",
            "173-1",
            "191-3",
            "232-1"
          ],
          "#555555",
          [
            "237-3",
            "45-3",
            "94-3",
            "176-3",
            "176-4",
            "176-5",
            "108-4",
            "19618-4",
            "84-4",
            "147-4",
            "271-4",
            "212-4",
            "100-2",
            "149-2"
          ],
          "#595959",
          [
            "242-2",
            "254-1",
            "254-2",
            "254-3",
            "209-2",
            "209-3",
            "209-4",
            "68-2",
            "168-1"
          ],
          "#62717c",
          [
            "187-1",
            "205-2",
            "205-3",
            "235-2"
          ],
          "#535354",
          [
            "187-2",
            "202-2",
            "271-2"
          ],
          "#424242",
          [
            "12-3",
            "134-1"
          ],
          "#4b5964",
          [
            "12-5",
            "12-6"
          ],
          "#61707b",
          [
            "14-5",
            "54-2"
          ],
          "#565656",
          [
            "109-4",
            "202-4"
          ],
          "#4d4d4d",
          [
            "136-1",
            "136-2"
          ],
          "#505f69",
          [
            "202-3",
            "209-1"
          ],
          "#63727e",
          [
            "197-2",
            "197-3"
          ],
          "#505e69",
          [
            "235-4",
            "17-1"
          ],
          "#55646e",
          "39-1",
          "#4e5c67",
          "166-2",
          "#515151",
          "117-1",
          "#4c5b65",
          "117-2",
          "#52606b",
          "117-3",
          "#4c5a65",
          "117-4",
          "#55636e",
          "98-2",
          "#515f6a",
          "197-1",
          "#606f7a",
          "134-4",
          "#51606b",
          "224-1",
          "#5e6d78",
          "224-2",
          "#606e79",
          "129-2",
          "#4e5c67",
          "#717171"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.labels.road_shield",
      "source": "bing-mvt",
      "source-layer": "road",
      "filter": [
        "has",
        "shield-type"
      ],
      "minzoom": 6,
      "type": "symbol",
      "layout": {
        "text-size": [
          "*",
          10,
          [
            "number",
            [
              "get",
              "shield-scale"
            ],
            0.8
          ]
        ],
        "text-letter-spacing": 0.05,
        "symbol-placement": "line",
        "symbol-spacing": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          6,
          140,
          11,
          140,
          15,
          210,
          19,
          600
        ],
        "text-field": [
          "get",
          "shield-name"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-rotation-alignment": "viewport",
        "text-max-angle": 90,
        "text-padding": 0
      },
      "paint": {
        "text-color": [
          "match",
          [
            "concat",
            [
              "get",
              "admin-div"
            ],
            "-",
            [
              "get",
              "shield-type"
            ]
          ],
          [
            "12-1",
            "32-1",
            "32-2",
            "39-2",
            "39-3",
            "166-1",
            "167-1",
            "167-2",
            "167-3",
            "183-2",
            "183-3",
            "244-2",
            "244-3",
            "244-4",
            "113-1",
            "113-2",
            "113-3",
            "227-4",
            "176-6",
            "11-1",
            "11-2",
            "67-1",
            "187-3",
            "205-1",
            "215-3",
            "26-1",
            "51-1",
            "54-1",
            "61-3",
            "77-4",
            "99-1",
            "99-2",
            "157-1",
            "157-2",
            "182-1",
            "182-2",
            "185-1",
            "246-1",
            "246-2",
            "249-1",
            "249-2",
            "251-3"
          ],
          "#515151",
          [
            "237-4",
            "237-5",
            "242-3",
            "39070-4",
            "39070-5",
            "39070-6",
            "45-4",
            "94-4",
            "94-5",
            "94-6",
            "223-4",
            "223-5",
            "223-6",
            "14-6",
            "75-6",
            "200-5",
            "200-6",
            "221-4",
            "221-5",
            "221-6",
            "6-5",
            "21-2",
            "21-4",
            "84-5",
            "110-1",
            "110-2",
            "110-3",
            "110-4",
            "68-3",
            "177-3",
            "193-4",
            "193-5",
            "193-6",
            "203-4",
            "18-1",
            "18-2",
            "18-3",
            "249-4"
          ],
          "#5a5a5a",
          [
            "23-2",
            "28-1",
            "245-1",
            "55-1",
            "44-1",
            "56-1",
            "61-2",
            "71-1",
            "73-1",
            "77-3",
            "87-2",
            "87-3",
            "100-1",
            "141-3",
            "149-1",
            "162-1",
            "162-2",
            "27-1",
            "27-2",
            "173-1",
            "191-3",
            "232-1"
          ],
          "#555555",
          [
            "237-3",
            "45-3",
            "94-3",
            "176-3",
            "176-4",
            "176-5",
            "108-4",
            "19618-4",
            "84-4",
            "147-4",
            "271-4",
            "212-4",
            "100-2",
            "149-2"
          ],
          "#595959",
          [
            "242-2",
            "254-1",
            "254-2",
            "254-3",
            "209-2",
            "209-3",
            "209-4",
            "68-2",
            "168-1"
          ],
          "#62717c",
          [
            "187-1",
            "205-2",
            "205-3",
            "235-2"
          ],
          "#535354",
          [
            "187-2",
            "202-2",
            "271-2"
          ],
          "#424242",
          [
            "12-3",
            "134-1"
          ],
          "#4b5964",
          [
            "12-5",
            "12-6"
          ],
          "#61707b",
          [
            "14-5",
            "54-2"
          ],
          "#565656",
          [
            "109-4",
            "202-4"
          ],
          "#4d4d4d",
          [
            "136-1",
            "136-2"
          ],
          "#505f69",
          [
            "202-3",
            "209-1"
          ],
          "#63727e",
          [
            "197-2",
            "197-3"
          ],
          "#505e69",
          [
            "235-4",
            "17-1"
          ],
          "#55646e",
          "39-1",
          "#4e5c67",
          "166-2",
          "#515151",
          "117-1",
          "#4c5b65",
          "117-2",
          "#52606b",
          "117-3",
          "#4c5a65",
          "117-4",
          "#55636e",
          "98-2",
          "#515f6a",
          "197-1",
          "#606f7a",
          "134-4",
          "#51606b",
          "224-1",
          "#5e6d78",
          "224-2",
          "#606e79",
          "129-2",
          "#4e5c67",
          "#717171"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_populated_place_labelonly",
      "source": "bing-mvt",
      "source-layer": "populated_place",
      "minzoom": 8,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "symbol-sort-key": [
          "coalesce",
          [
            "get",
            "st-lblimp"
          ],
          [
            "get",
            "label-importance"
          ],
          255
        ],
        "text-variable-anchor-offset": [
          "center",
          [
            0,
            0
          ],
          "top",
          [
            0,
            0.28
          ],
          "bottom",
          [
            0,
            -0.28
          ],
          "left",
          [
            -0.4,
            0
          ],
          "right",
          [
            0.4,
            0
          ],
          "bottom-right",
          [
            0.4,
            -0.28
          ],
          "top-right",
          [
            0.4,
            0.28
          ],
          "bottom-left",
          [
            -0.4,
            -0.28
          ],
          "top-left",
          [
            -0.4,
            0.28
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": [
          "match",
          [
            "get",
            "cn-ppl"
          ],
          "town",
          "#424242",
          "#393939"
        ],
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_populated_place_iconlabel",
      "source": "bing-mvt",
      "source-layer": "populated_place",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right",
          "left",
          "right",
          "bottom",
          "top"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.5,
        "text-padding": 0,
        "symbol-sort-key": [
          "coalesce",
          [
            "get",
            "st-lblimp"
          ],
          [
            "get",
            "label-importance"
          ],
          255
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_sov_capital_labelonly",
      "source": "bing-mvt",
      "source-layer": "sov_capital",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_sov_capital_iconlabel",
      "source": "bing-mvt",
      "source-layer": "sov_capital",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right",
          "left",
          "right",
          "bottom",
          "top"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.57,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_transit_labelonly",
      "source": "bing-mvt",
      "source-layer": "transit",
      "minzoom": 9,
      "maxzoom": 13,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.04,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": [
          "case",
          [
            "boolean",
            [
              "feature-state",
              "hover"
            ],
            false
          ],
          "#2e2e2e",
          "#3f505d"
        ],
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_transit_iconlabel",
      "source": "bing-mvt",
      "source-layer": "transit",
      "minzoom": 9,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name-f"
          ],
          [
            "get",
            "name"
          ],
          ""
        ],
        "text-variable-anchor": [
          "right",
          "bottom",
          "top",
          "left",
          "bottom-right",
          "top-right",
          "bottom-left",
          "top-left"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.04,
        "text-optional": true,
        "text-offset": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "glyph2or3",
          [
            "literal",
            [
              1.7,
              1.2
            ]
          ],
          "glyph4",
          [
            "literal",
            [
              1.7,
              1.7
            ]
          ],
          [
            "literal",
            [
              1.2,
              1.2
            ]
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": [
          "case",
          [
            "boolean",
            [
              "feature-state",
              "hover"
            ],
            false
          ],
          "#2e2e2e",
          "#3f505d"
        ],
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.metro_station_symbol-merged3",
      "source": "bing-mvt",
      "source-layer": "metro_station",
      "filter": [
        "in",
        [
          "get",
          "bkt"
        ],
        [
          "literal",
          [
            1333,
            285,
            1199
          ]
        ]
      ],
      "minzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.85,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#3f505d",
          22,
          "#3d4e5a"
        ],
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.railway_station_point_symbol",
      "source": "bing-mvt",
      "source-layer": "railway_station",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        298
      ],
      "minzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.91,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3b4c58",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.metro_transfer_station_symbol",
      "source": "bing-mvt",
      "source-layer": "metro_transfer_station",
      "minzoom": 12,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            []
          ],
          13,
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.68,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#3f505d",
          22,
          "#3d4e5a"
        ],
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.bus_station_point_symbol",
      "source": "bing-mvt",
      "source-layer": "bus_station",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        282
      ],
      "minzoom": 16,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            []
          ],
          18,
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.93,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3f505d",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.japan_railway_station_entrance_symbol",
      "source": "bing-mvt",
      "source-layer": "station_entrance",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        983
      ],
      "minzoom": 17,
      "type": "symbol",
      "layout": {
        "text-font": [
          "Roboto-Regular"
        ],
        "text-size": 11,
        "text-field": [
          "get",
          "name"
        ]
      },
      "paint": {
        "text-color": "#3b3f42"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.multi_modal_station_point_symbol",
      "source": "bing-mvt",
      "source-layer": "multi_modal_station",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        2057
      ],
      "minzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-variable-anchor": [
          "top",
          "bottom",
          "left",
          "right",
          "bottom-left",
          "bottom-right",
          "top-left",
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.85,
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3f505d",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.admin_division2_fill_label",
      "source": "bing-mvt",
      "source-layer": "admin_division2",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        865
      ],
      "minzoom": 12,
      "maxzoom": 15,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "sec-name"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-transform": "uppercase",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3a4750",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_middle_left_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_middle_left",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "right"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_middle_left_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_middle_left",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.57,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_right_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom_right",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-left"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_right_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom_right",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-left"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.57,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_top_center_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_top_center",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_top_center_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_top_center",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.7,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_top_right_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_top_right",
      "minzoom": 8,
      "maxzoom": 11,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom-left"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_top_right_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_top_right",
      "minzoom": 7,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom-left"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.3,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_left_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom_left",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-right"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_left_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom_left",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-tag"
          ],
          "sovCap",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.57,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_middle_right_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_middle_right",
      "minzoom": 8,
      "maxzoom": 11,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "left"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_middle_right_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_middle_right",
      "minzoom": 6,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "left"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.3,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_admin_division1_labelonly",
      "source": "bing-mvt",
      "source-layer": "admin_division1",
      "minzoom": 5,
      "maxzoom": 9,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 0.75
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.02,
        "text-transform": "uppercase",
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a4750",
        "text-halo-width": 2,
        "text-halo-color": "#fffefd"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_labelonly",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom",
      "minzoom": 8,
      "maxzoom": 12,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_label_orientation_bottom_iconlabel",
      "source": "bing-mvt",
      "source-layer": "label_orientation_bottom",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.57,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_new_taipei_labelonly",
      "source": "bing-mvt",
      "source-layer": "new_taipei",
      "minzoom": 8,
      "maxzoom": 11,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-left"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_new_taipei_iconlabel",
      "source": "bing-mvt",
      "source-layer": "new_taipei",
      "minzoom": 6,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-left"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.3,
        "text-padding": 0,
        "text-allow-overlap": true,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_taoyuan_labelonly",
      "source": "bing-mvt",
      "source-layer": "taoyuan",
      "minzoom": 8,
      "maxzoom": 11,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-right"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_taoyuan_iconlabel",
      "source": "bing-mvt",
      "source-layer": "taoyuan",
      "minzoom": 6,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "top-right"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.3,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_macao_labelonly",
      "source": "bing-mvt",
      "source-layer": "macao",
      "minzoom": 8,
      "maxzoom": 10,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_macao_iconlabel",
      "source": "bing-mvt",
      "source-layer": "macao",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "step",
          [
            "zoom"
          ],
          [
            "literal",
            [
              "bottom-right"
            ]
          ],
          6,
          [
            "literal",
            [
              "top-right"
            ]
          ]
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.4,
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_taipei_labelonly",
      "source": "bing-mvt",
      "source-layer": "taipei",
      "minzoom": 8,
      "maxzoom": 10,
      "type": "symbol",
      "filter": [
        "!",
        [
          "has",
          "has-icon"
        ]
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_taipei_iconlabel",
      "source": "bing-mvt",
      "source-layer": "taipei",
      "minzoom": 4,
      "maxzoom": 8,
      "type": "symbol",
      "filter": [
        "has",
        "has-icon"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-radial-offset": 0.62,
        "text-padding": 0,
        "text-allow-overlap": true,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_beijing_iconlabel",
      "source": "bing-mvt",
      "source-layer": "beijing",
      "minzoom": 3,
      "maxzoom": 10,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Bold"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-variable-anchor": [
          "bottom"
        ],
        "text-justify": "auto",
        "text-radial-offset": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          2,
          0.8,
          19,
          0.56
        ],
        "text-padding": 0,
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#393939",
        "text-halo-width": 2,
        "text-halo-color": "#fffffe"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.airport_terminal_symbol_label",
      "source": "bing-mvt",
      "source-layer": "airport_terminal",
      "minzoom": 14,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-RegularItalic"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#4b4b4b",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.tramway_jp_line_label",
      "source": "bing-mvt",
      "source-layer": "tramway",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        905
      ],
      "minzoom": 13,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3e3e3e",
        "text-halo-width": [
          "step",
          [
            "zoom"
          ],
          2,
          18,
          1,
          22,
          0
        ],
        "text-halo-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          9,
          "#fffefd",
          14,
          "#fefefd",
          16,
          "#fefefd",
          18,
          "#fefefc"
        ]
      }
    },
    {
      "id": "microsoft.bing.maps.labels.airport_major_fill_label",
      "source": "bing-mvt",
      "source-layer": "airport",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1081
      ],
      "minzoom": 15,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-letter-spacing": 0.04,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#464b4f",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.entity_override_continents_for_cn_region_symbol_label",
      "source": "bing-mvt",
      "source-layer": "continent",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1922
      ],
      "maxzoom": 3,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ],
        "text-transform": "uppercase",
        "text-padding": 0
      },
      "paint": {
        "text-color": "#393a3a",
        "text-halo-width": [
          "step",
          [
            "zoom"
          ],
          1,
          2,
          0
        ],
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_railway_cn_linelabel",
      "source": "bing-mvt",
      "source-layer": "railway_cn",
      "minzoom": 11,
      "type": "symbol",
      "filter": [
        "has",
        "name"
      ],
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "Roboto-Regular"
        ],
        "text-field": [
          "get",
          "name"
        ],
        "symbol-placement": "line",
        "text-max-angle": 55,
        "text-padding": 0
      },
      "paint": {
        "text-color": "#3e3e3e",
        "text-halo-width": 2,
        "text-halo-color": "#fefefc"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.exit_symbol",
      "source": "bing-mvt",
      "source-layer": "junction",
      "filter": [
        "==",
        [
          "get",
          "bkt"
        ],
        1198
      ],
      "minzoom": 15,
      "type": "symbol",
      "layout": {
        "text-font": [
          "Roboto-Bold"
        ],
        "text-size": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          15,
          9.6,
          17,
          12,
          18,
          14.4
        ],
        "text-field": [
          "get",
          "name"
        ]
      },
      "paint": {
        "text-color": "#4e4e4e"
      }
    },
    {
      "id": "microsoft.bing.maps.labels.generic_country_region_polygonlabel",
      "source": "bing-mvt",
      "source-layer": "country_region",
      "minzoom": 1,
      "maxzoom": 7,
      "type": "symbol",
      "layout": {
        "text-size": [
          "get",
          "name-f"
        ],
        "text-font": [
          "match",
          [
            "get",
            "st-cn"
          ],
          "country_region_cn",
          [
            "literal",
            [
              "Roboto-Bold"
            ]
          ],
          [
            "literal",
            [
              "Roboto-Regular"
            ]
          ]
        ],
        "text-field": [
          "case",
          [
            "has",
            "name2"
          ],
          [
            "concat",
            [
              "get",
              "name"
            ],
            "\n",
            [
              "get",
              "name2"
            ]
          ],
          [
            "has",
            "sec-name"
          ],
          [
            "format",
            [
              "get",
              "name"
            ],
            {},
            "\n",
            {},
            [
              "get",
              "sec-name"
            ],
            {
              "font-scale": 1
            }
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-justify": "auto",
        "text-padding": 0,
        "text-letter-spacing": 0.1,
        "text-transform": "uppercase",
        "text-max-width": [
          "+",
          [
            "number",
            [
              "get",
              "max-text-width"
            ],
            9
          ],
          1
        ]
      },
      "paint": {
        "text-color": "#3a4750",
        "text-halo-width": 1,
        "text-halo-color": "#fffefd"
      }
    }
  ]
} as const;

// 点亮城市的 Bing 地名剔除是运行时行为：名单来自当前数据（data.ts 的 litCityNames()），
// 新城市被点亮时用新名单重建样式即可，与生成器解耦。
export function buildMapStyle(excludeNames: string[]) {
  if (!excludeNames.length) return MAP_STYLE;
  const layers = (MAP_STYLE.layers as readonly Record<string, unknown>[]).map((l) => {
    const sl = l['source-layer'];
    // populated_place/sov_capital 是常规地名；beijing/taipei/new_taipei/macao 是首都/特区专属层
    if (l.type === 'symbol' && ['populated_place', 'sov_capital', 'beijing', 'taipei', 'new_taipei', 'macao'].includes(sl as string)) {
      const excl = ['!', ['in', ['get', 'name'], ['literal', excludeNames]]];
      return { ...l, filter: l.filter ? ['all', l.filter, excl] : excl };
    }
    return l;
  });
  return { ...MAP_STYLE, layers };
}
