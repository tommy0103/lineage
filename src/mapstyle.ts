// 本文件由 scripts/build-mapstyle.mjs 生成，请勿手改。
// 底本：scripts/vendor/bing-style-zh-CN.json（nearcade 线上验证过的 Bing 中国版样式）。
// 只保留地理底图层（栅格背景 LOD / 陆地 / 地貌 / 水系 / 岛屿 / 国界），
// 无 symbol 层（不需要 glyph 服务）、无 fill-pattern（不需要 sprite）。
// 城市点 / 光晕 / 导入动画由 RealMap.tsx 以 GeoJSONSource 叠加在顶层。
export const MAP_STYLE = {
  "version": 8,
  "name": "lineage-bing-minimal",
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
        "background-color": "#F9FAF7"
      }
    },
    {
      "id": "microsoft.bing.maps.base.backgroundLOD2-9",
      "type": "raster",
      "paint": {
        "raster-fade-duration": 0
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
        "raster-fade-duration": 0
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
        "raster-fade-duration": 0
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
        "fill-color": "#F9FAF7"
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
          "#CBEFD4",
          13,
          "#CBEFD4",
          14,
          "#E0F1DE",
          15,
          "#F9FAF7"
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
          "#B0E5BD",
          11,
          "#B0E5BD",
          13,
          "#C9E9C8",
          15,
          "#EEF3E9"
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
        "fill-color": "#F9FAF7"
      }
    },
    {
      "id": "microsoft.bing.maps.baseFeature.land_cover_snow_and_ice_fill",
      "source": "bing-mvt",
      "source-layer": "land_cover_snow_and_ice",
      "type": "fill",
      "paint": {
        "fill-color": "#FFFFFF"
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
        "fill-color": "#A6D5FF"
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
        "line-color": "#A6D5FF",
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
        "fill-color": "#F9FAF7"
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
        "fill-color": "#F9FAF7"
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
        "fill-color": "#F9FAF7"
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
        "fill-color": "#F9FAF7"
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
        "fill-color": "#F9FAF7"
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
          "hsla(0, 22%, 35%, 0.8)",
          2,
          "#704747"
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
              1
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
        "line-color": "#704747",
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
        "line-color": "#704747",
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
        "line-color": "hsla(8, 72%, 55%, 0.8)",
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
        "line-color": "hsla(8, 72%, 55%, 0.8)",
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
        "line-color": "#9B9B9B",
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
        "line-color": "#9B9B9B",
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
        "line-color": "hsla(13, 22%, 81%, 0.73)",
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
        "line-color": "#704747",
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
        "line-color": "#704747",
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
    }
  ]
} as const;
