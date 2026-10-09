// Database.md §5 扩展 — 站点外壳文案（header / footer / 404 / 站点标题）
// Task 4-1 落地 404；Task 4-2 追加导航、页脚、语言切换与 metadata。
// 组件内不得硬编码用户可见文案（PRD §4 / spec §1）。
// 中文名：李佑成（Steven 2026-10-08 拍板；spec §5 的「李宥成」为笔误）

import type { LocalizedText } from './locales'

// spec §2：品牌链接两种语言都显示 Steven Li（legal name 见 Home / About 正文）
export const brand = 'Steven Li'

export interface NavItem {
  path: string
  label: LocalizedText
}

// spec §4：Home/首页 · Projects/项目 · Experience/经历 · Art/书法 · Contact/联系
// （About/关于 已于 2026-10-08 并入 Home，见 Roadmap Phase 4 决策；路由由 6 变 5）
export const navItems: NavItem[] = [
  { path: '/', label: { en: 'Home', zh: '首页' } },
  { path: '/projects', label: { en: 'Projects', zh: '项目' } },
  { path: '/experience', label: { en: 'Experience', zh: '经历' } },
  { path: '/art', label: { en: 'Art', zh: '书法' } },
  { path: '/contact', label: { en: 'Contact', zh: '联系' } },
]

export const navigation: { label: LocalizedText } = {
  label: { en: 'Site navigation', zh: '站点导航' },
}

// spec §4：可见选项 EN / 中文；无障碍名按当前语言给出。
// ⚠️ 无障碍名必须**包含可见文字本身**（WCAG 2.5.3 Label in Name；否则 Lighthouse/axe 报
//   label-content-name-mismatch）。spec 原文只给「Switch to Chinese」/「切换为英文」，
//   不含可见的 `中文` / `EN` —— 英文态下报错，中文态下 `EN` 链接同样会命中（潜伏）。
//   故在保留 spec 原句的前提下追加可见短标签，两语言两选项一律成立。
export const languageSwitch = {
  groupLabel: { en: 'Language', zh: '语言' } as LocalizedText,
  toEnglish: { en: 'Switch to English — EN', zh: '切换为英文 — EN' } as LocalizedText,
  toChinese: { en: 'Switch to Chinese — 中文', zh: '切换为中文 — 中文' } as LocalizedText,
  shortEnglish: 'EN',
  shortChinese: '中文',
}

export const footer = {
  // spec §4：两种语言下均使用 legal name
  copyright: {
    en: '© 2026 Youcheng (Steven) Li',
    zh: '© 2026 Youcheng (Steven) Li',
  } as LocalizedText,
}

// spec §5：document.title 与 meta description 随语言切换
export const siteTitle = {
  base: {
    en: 'Youcheng (Steven) Li — Builder & Calligrapher',
    zh: '李佑成（Steven Li）— 创造者与书法爱好者',
  } as LocalizedText,
  description: {
    en: 'Personal site of Youcheng (Steven) Li — builder and calligrapher. LinkedIn AI Assistant, IEEE PVSC 2025 paper, and calligraphy works.',
    zh: '李佑成（Steven Li）的个人网站 —— 创造者与书法爱好者。LinkedIn AI Assistant、IEEE PVSC 2025 论文与书法作品。',
  } as LocalizedText,
}

export const notFound: {
  title: LocalizedText
  body: LocalizedText
  homeLink: LocalizedText
} = {
  title: {
    en: 'Page not found',
    zh: '找不到此页面',
  },
  body: {
    en: 'The page you are looking for does not exist.',
    zh: '你要访问的页面不存在。',
  },
  homeLink: {
    en: 'Return home',
    zh: '返回首页',
  },
}
