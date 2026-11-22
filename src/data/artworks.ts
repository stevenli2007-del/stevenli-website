// Database.md §3 — Artwork interface
// Phase 7（2026-11-06，Steven 口述）—— Art 页最终形态 = 编辑式图集（editorial photo gallery）。
//   成品图由 Steven 直接给出（装裱、引号、竖排小注、配画 / 题注全部已在图内），
//   **照片本身不做任何改动**：不裁切、不拆元素、不加配文，字节级原样入库。
//   初版三张（2026-11-06）；2026-11-07 追加第四张 gallery-4.jpg（黑底横幅，狼毫小蘭竹题注）；
//   2026-11-21 追加三张木桌实拍 gallery-5~7.jpg（白纸行草 + 墨碟），同样字节级原样、不裁切、不加配文。
//   组件全部由 artworks.length 驱动，新增作品只需在数组末尾追加，无需改主舞台逻辑
//   （⚠️ 2026-11-21 起缩略图条加了 min-w-0 overflow-x-auto：幅数变多后窄屏需要可横滚，见 Art.tsx）。
//   ⚠️ 这是 Steven 对既有两个约定的明确覆盖：
//      ① Design.md §9.5「两列 masonry、不轮播」；② §9.7「禁止轮播」。
// 第二版视觉（参考 Swiper Minimal Photo Gallery / Bridget Baker / 摄影集 contact sheet）：
//   每张 slide 自带画框底色（tone：light → 纯白画布，dark → 近黑画布），
//   图居中、留大白、超大低对比编号；下方为细线进度 + 同步缩略图条 + 极简计数与箭头。
//   不做自动播放 / 视差 / 淡入 —— 高级感靠画布、留白和层级，不靠动效。
// 旧四幅 artwork-1~4 留在 src/assets/art 归档、不进数组；上一轮从 pptx 解出的四张中间图已于 2026-11-06 清入废纸篓。
// 组件零硬编码文案：图集区域名、缩略图 aria-label、箭头 aria-label、滑动提示全部住在本文件。

import type { LocalizedText } from './locales'
import gallery1Img from '../assets/art/gallery-1.jpg'
import gallery2Img from '../assets/art/gallery-2.jpg'
import gallery3Img from '../assets/art/gallery-3.jpg'
import gallery4Img from '../assets/art/gallery-4.jpg'
import gallery5Img from '../assets/art/gallery-5.jpg'
import gallery6Img from '../assets/art/gallery-6.jpg'
import gallery7Img from '../assets/art/gallery-7.jpg'

export interface Artwork {
  id: string;
  src: string;
  alt: LocalizedText;           // 双语 alt（无障碍硬约束）
  width: number;                // 文件实际像素 —— 写进 <img width/height> 防 CLS
  height: number;
  tone: 'light' | 'dark';       // 该幅作品的画框底色（跟作品纸底走）
}

export const artworksTitle: LocalizedText = { en: 'Calligraphy', zh: '書法' }

export const artworksIntro: LocalizedText = {
  en: 'Calligraphy is a practice I return to for focus, patience, and a connection to Chinese literary tradition.',
  zh: '書法讓我練習專注與耐心，也讓我與中國文學傳統保持連結。',
}

export const artworksNote: LocalizedText = {
  en: 'Seven works · Cursive script',
  zh: '七幅作品 · 行草',
}

// 图集控件文案（WCAG 2.5.3：箭头 aria-label 必须含按钮上的可见字符 ← / →）
export const artworksGalleryLabel: LocalizedText = {
  en: 'Calligraphy gallery',
  zh: '書法作品圖集',
}

export const artworksPrevLabel: LocalizedText = {
  en: '← Previous work',
  zh: '← 上一幅',
}

export const artworksNextLabel: LocalizedText = {
  en: 'Next work →',
  zh: '下一幅 →',
}

export const artworksSwipeHint: LocalizedText = {
  en: 'Swipe sideways, or use the arrows',
  zh: '左右滑動，或使用箭頭切換',
}

// 缩略图按钮的无障碍名（编号由组件传入，文案仍住数据层）
export function artworksGoToLabel(index: number): LocalizedText {
  return { en: `View work ${index + 1}`, zh: `查看第 ${index + 1} 幅` }
}

export const artworks: Artwork[] = [
  {
    id: 'gallery-1',
    src: gallery1Img,
    alt: {
      en: 'Calligraphy of lines from Su Shi’s “Butterfly Lovers: Spring Scene” (花去殘紅青杏小，燕子歸時，流水人家繞), with red quotation marks and a small green-apricot painting on the right.',
      zh: '行草書法 — 蘇軾《蝶戀花·春景》句：花去殘紅青杏小，燕子歸時，流水人家繞；白底朱紅引號，右側配青杏小畫。',
    },
    width: 1508,
    height: 1060,
    tone: 'light',
  },
  {
    id: 'gallery-2',
    src: gallery2Img,
    alt: {
      en: 'Calligraphy of Wen Tingyun’s “Early Autumn Mountain Dwelling” (山近覺寒早……), mounted on a white card over a black ground with a vertical note 「沒有章法就疊格子」.',
      zh: '行草書法 — 溫庭筠《早秋山居》：山近覺寒早……；白色裝裱卡壓在黑底上，豎排小注「沒有章法就疊格子」。',
    },
    width: 1344,
    height: 1086,
    tone: 'dark',
  },
  {
    id: 'gallery-3',
    src: gallery3Img,
    alt: {
      en: 'White ink on black paper — lines from Xunzi (不誘於譽，不恐於誹，率道而行，端然正己), with red quotation marks and a vertical note 「專注自身」.',
      zh: '黑紙白墨 — 《荀子·非十二子》句：不誘於譽，不恐於誹，率道而行，端然正己；朱紅引號與豎排小注「專注自身」。',
    },
    width: 1630,
    height: 1114,
    tone: 'dark',
  },
  {
    id: 'gallery-4',
    src: gallery4Img,
    alt: {
      en: 'A white horizontal scroll mounted on a near-black ground, flanked by red quotation marks: two lines of running-cursive script on clouds, still mountain streams and quiet leisure, with a small red seal. The caption below notes that the only wolf-hair Xiaolanzhu brush that travelled abroad with him has reached the end of its life.',
      zh: '黑底白紙橫幅行草 — 兩行寫雲山閒靜之趣，鈐一方朱印；兩側朱紅引號，下方題注「至此，隨我一同來到異國他鄉的這唯一狼毫小蘭竹坐化了」。',
    },
    width: 1920,
    height: 1131,
    tone: 'dark',
  },
  {
    // 2026-11-21 追加：微信实拍，字节级原样入库；木桌深棕背景 → dark 画框
    id: 'gallery-5',
    src: gallery5Img,
    alt: {
      en: 'Two sheets of running-cursive calligraphy photographed on a wooden table: a short horizontal scroll reading 明德惟馨 above, two lines of larger characters below, with an inkstone and a paperweight.',
      zh: '木桌上實拍兩幅行草：上方短橫幅書「明德惟馨」，下方兩行大字；旁置墨碟與紙鎮。',
    },
    width: 1440,
    height: 1080,
    tone: 'dark',
  },
  {
    id: 'gallery-6',
    src: gallery6Img,
    alt: {
      en: 'A narrow vertical strip of white paper on a wooden table carrying three large running-cursive characters, 逍遙遊 (“Free and Easy Wandering”), with an inkstone at the upper left.',
      zh: '木桌上窄長宣紙豎寫三個大字「逍遙遊」，左上角一只墨碟。',
    },
    width: 1440,
    height: 1920,
    tone: 'dark',
  },
  {
    id: 'gallery-7',
    src: gallery7Img,
    alt: {
      en: 'Two vertical strips of running-cursive calligraphy side by side on a wooden table — 山高萬仞 on the right, 只登一步 on the left — with an inkstone and a round paperweight.',
      zh: '木桌上並列兩條豎幅行草：右「山高萬仞」、左「只登一步」，旁有墨碟與圓形紙鎮。',
    },
    width: 1440,
    height: 1920,
    tone: 'dark',
  },
]
