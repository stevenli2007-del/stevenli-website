// Database.md §5 — SiteInfo（站点级文案；Hero 定位句）
// Phase 3 扩展：legal name + 头像。

import portfolioImg from '../assets/portfolio.jpg'
import heroBgImg from '../assets/hero-bg.jpg'

export interface SiteInfo {
  name: string;                 // Legal name（全名）
  tagline: string;              // Hero 定位句
  photo: string;                // Hero 头像（Vite import，构建时哈希）
  heroBg: string;               // Hero 背景图（深圳夜景，Vite import）
}

export const siteInfo: SiteInfo = {
  name: "Youcheng (Steven) Li",
  tagline: "Builder · Calligrapher · UC Berkeley 2030",
  photo: portfolioImg,
  heroBg: heroBgImg,
}
