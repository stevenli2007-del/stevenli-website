// Database.md §5 — SiteInfo（站点级文案；Hero）
// Phase 4 Task 4-3：全部用户可见文案拆 en/zh（spec §4 Home / §5 双语规则）。
// spec §5：《legal name 中英一致，不臆造中文姓名拼写》；URL / 产品名 / 机构名等不作翻译。

import type { LocalizedText } from './locales'
import portfolioImg from '../assets/portfolio.jpg'

export interface SiteInfo {
  name: string;                    // Legal name（两种语言一致，故不拆 LocalizedText）
  tagline: LocalizedText;          // Hero H1 定位句
  intro: LocalizedText;            // Hero 介绍句（spec §4）
  proof: LocalizedText;            // Hero 实证行（spec §4，Task 4-4 渲染）
  cta: {                           // Hero 双 CTA 文案（spec §4，Task 4-4 渲染）
    projects: LocalizedText;
    contact: LocalizedText;
  };
  photo: string;                   // Hero 头像（Vite import，构建时哈希）
}

export const siteInfo: SiteInfo = {
  name: 'Youcheng (Steven) Li',
  tagline: {
    en: 'Builder · Calligrapher · UC Berkeley 2030',
    zh: '创造者 · 书法家 · 加州大学伯克利分校 2030 届',
  },
  intro: {
    en: 'I turn manual workflows into useful tools, from AI-assisted networking to automated lab measurement.',
    zh: '我把手动流程变成实用工具，从 AI 辅助拓展人脉到实验室自动测量。',
  },
  // Phase 5：按简历事实基准重排（硬件研究打头），并补入 Tempo 公开测试
  proof: {
    en: 'IEEE PVSC 2025 co-author · Chrome Web Store launch · Tempo in public beta · Invited teaching assistant',
    zh: 'IEEE PVSC 2025 论文合著者 · Chrome 应用商店上线 · Tempo 公开测试中 · 受邀助教',
  },
  cta: {
    projects: { en: 'Explore projects', zh: '查看项目' },
    contact: { en: 'Contact me', zh: '联系我' },
  },
  photo: portfolioImg,
}
