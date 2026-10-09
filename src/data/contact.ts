// Database.md §4 — ContactInfo interface
// Phase 4 Task 4-3：标题 / intro / 主按钮文案 / 具名链接文案拆 en/zh（spec §4 Contact / §5）。
// 链接本身为数据（URL 不翻译），文案与链接解耦。

import type { LocalizedText } from './locales'

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  chromeWebStore: string;
}

export interface ContactLink {
  label: LocalizedText;         // 具名文案，如 "GitHub profile" / "GitHub 主页"
  href: string;
}

export const contactTitle: LocalizedText = { en: 'Contact', zh: '联系' }

export const contactIntro: LocalizedText = {
  en: 'For research, product, or startup conversations, email is the best way to reach me.',
  zh: '欢迎就研究、产品或创业合作联系我；邮件是联系我的最佳方式。',
}

export const emailAction: LocalizedText = { en: 'Email Youcheng', zh: '发送邮件' }

export const contactInfo: ContactInfo = {
  email: 'stevenli2007@berkeley.edu',
  github: 'https://github.com/stevenli2007-del',
  linkedin: 'https://www.linkedin.com/in/youcheng-li-6b3447335/',
  chromeWebStore:
    'https://chromewebstore.google.com/detail/linkedin-ai-assistant/jeknmnkekajcbffbfijmnmckakpbkcoa',
}

export const contactLinks: ContactLink[] = [
  { label: { en: 'GitHub profile', zh: 'GitHub 主页' }, href: contactInfo.github },
  { label: { en: 'LinkedIn profile', zh: 'LinkedIn 主页' }, href: contactInfo.linkedin },
  {
    label: {
      en: 'LinkedIn AI Assistant on the Chrome Web Store',
      zh: 'Chrome 应用商店中的 LinkedIn AI Assistant',
    },
    href: contactInfo.chromeWebStore,
  },
]
