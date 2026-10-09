// Database.md §3 — Artwork interface
// Phase 4 Task 4-3：标题 / intro / note / alt 拆 en/zh；作品题跋保持原繁体（spec §5）。
// 四张行草作品来自 Steven 本人；图片经 Vite import，构建时生成哈希 URL。

import type { LocalizedText } from './locales'
import artwork1Img from '../assets/art/artwork-1-huaniao.jpg'
import artwork2Img from '../assets/art/artwork-2-dapeng.jpg'
import artwork3Img from '../assets/art/artwork-3-aojin.jpg'
import artwork4Img from '../assets/art/artwork-4-mingyue.jpg'

// Task 4-10 —— 作品图总开关（唯一需要改的一行）。
//   false → Art 页渲染**与原图完全等比**的占位框：不发起任何图片请求，LCP / 图片体积与页面解耦。
//   true  → 渲染真实作品图（四张图仍在仓库与数据层，src 字段未动，随时可切回）。
// Steven 2026-10-08：艺术版面先以占位符呈现，待下一轮「各独立页面内容与文案调整」定稿后再启用。
export const renderArtworkImages = false

export interface Artwork {
  id: string;
  src: string | null;
  alt: LocalizedText;
  width: number;                // 原始像素宽 —— 渲染为 <img width/height>，让浏览器**预留空间**（CLS 归零）
  height: number;               // 与 CSS 的 `w-full` + preflight `height:auto` 配合得出宽高比
  orientation: 'horizontal' | 'vertical';
  captionZh?: string;           // 题跋：两种语言下均显示原繁体（spec §5）
}

export const artworksTitle: LocalizedText = { en: 'Calligraphy', zh: '書法' }

export const artworksIntro: LocalizedText = {
  en: 'Calligraphy is a practice I return to for focus, patience, and a connection to Chinese literary tradition.',
  zh: '書法讓我練習專注與耐心，也讓我與中國文學傳統保持連結。',
}

export const artworksNote: LocalizedText = {
  en: 'Four works · Cursive script',
  zh: '四幅作品 · 行草',
}

export const artworks: Artwork[] = [
  {
    id: 'artwork-1',
    src: artwork1Img,
    alt: {
      en: 'Cursive-script calligraphy — 花鳥一池書 · 風雲三尺劍',
      zh: '行草書法作品 — 花鳥一池書 · 風雲三尺劍',
    },
    orientation: 'vertical',
    width: 718,
    height: 1920,
    captionZh: '花鳥一池書 · 風雲三尺劍',
  },
  {
    id: 'artwork-2',
    src: artwork2Img,
    alt: {
      en: 'Cursive-script calligraphy — 大鵬一日同風起',
      zh: '行草書法作品 — 大鵬一日同風起',
    },
    orientation: 'vertical',
    width: 566,
    height: 1246,
    captionZh: '大鵬一日同風起',
  },
  {
    id: 'artwork-3',
    src: artwork3Img,
    alt: {
      en: 'Cursive-script calligraphy — 龍虎風雨，天下梟雄',
      zh: '行草書法作品 — 龍虎風雨，天下梟雄',
    },
    orientation: 'horizontal',
    width: 960,
    height: 1270,
    captionZh: '龍虎風雨，天下梟雄',
  },
  {
    id: 'artwork-4',
    src: artwork4Img,
    alt: {
      en: 'Cursive-script calligraphy — 明月清風酒 · 一邱高山流水',
      zh: '行草書法作品 — 明月清風酒 · 一邱高山流水',
    },
    orientation: 'vertical',
    width: 578,
    height: 1230,
    captionZh: '明月清風酒 · 一邱高山流水',
  },
]
