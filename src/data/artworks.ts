// Database.md §3 — Artwork interface
// Phase 4 Task 4-3：标题 / intro / note / alt 拆 en/zh；作品题跋保持原繁体（spec §5）。
// 四张行草作品来自 Steven 本人；图片经 Vite import，构建时生成哈希 URL。

import type { LocalizedText } from './locales'
import artwork1Img from '../assets/art/artwork-1-huaniao.jpg'
import artwork2Img from '../assets/art/artwork-2-dapeng.jpg'
import artwork3Img from '../assets/art/artwork-3-aojin.jpg'
import artwork4Img from '../assets/art/artwork-4-mingyue.jpg'

export interface Artwork {
  id: string;
  src: string | null;
  alt: LocalizedText;
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
    captionZh: '明月清風酒 · 一邱高山流水',
  },
]
