// Database.md §3 — Artwork interface
// Phase 3 素材已到位（2026-08-30），四张行草作品全部来自 Steven 本人。
// 图片通过 Vite import 引入，构建时生成哈希 URL。

import artwork1Img from '../assets/art/artwork-1-huaniao.jpg'
import artwork2Img from '../assets/art/artwork-2-dapeng.jpg'
import artwork3Img from '../assets/art/artwork-3-aojin.jpg'
import artwork4Img from '../assets/art/artwork-4-mingyue.jpg'

export interface Artwork {
  id: string;
  src: string | null;
  alt: string;
  orientation: "horizontal" | "vertical";
  captionZh?: string;
}

export const artworksTitle = "Art"

export const artworks: Artwork[] = [
  {
    id: "artwork-1",
    src: artwork1Img,
    alt: "Calligraphy — 花鳥一池書 · 風雲三尺劍",
    orientation: "vertical",
    captionZh: "花鳥一池書 · 風雲三尺劍",
  },
  {
    id: "artwork-2",
    src: artwork2Img,
    alt: "Calligraphy — 大鵬一日同風起",
    orientation: "vertical",
    captionZh: "大鵬一日同風起",
  },
  {
    id: "artwork-3",
    src: artwork3Img,
    alt: "Calligraphy — 龍虎風雨，天下梟雄",
    orientation: "horizontal",
    captionZh: "龍虎風雨，天下梟雄",
  },
  {
    id: "artwork-4",
    src: artwork4Img,
    alt: "Calligraphy — 明月清風酒",
    orientation: "vertical",
    captionZh: "明月清風酒 · 一邱高山流水",
  },
]
