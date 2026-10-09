// Database.md §6 — AboutInfo（About 文案；PRD 4.2）
// Phase 4 Task 4-3：全部文案拆 en/zh（spec §4 About / §5）。
// 注意：About 已于 2026-10-08 并入 Home（Roadmap Phase 4 决策），本文件仍作为数据源，由 Home 页渲染。

import type { LocalizedText } from './locales'

export interface AboutExample {
  title: LocalizedText;         // 例子的名称
  effect: LocalizedText;        // 一句话说明自动化了什么、谁受益
}

export interface AboutInfo {
  title: LocalizedText;         // section 标题
  narrative: LocalizedText;     // 核心叙事
  examples: AboutExample[];     // 自动化例子，并列展示
  identity: LocalizedText;      // 身份线
}

export const aboutInfo: AboutInfo = {
  title: { en: 'About', zh: '关于我' },
  narrative: {
    en: 'Across software and lab work, I look for repetitive steps and build tools that make them easier to complete.',
    zh: '无论是软件还是实验室工作，我都会寻找重复步骤，并动手做工具，让这些流程更简单。',
  },
  examples: [
    {
      title: { en: 'LinkedIn AI Assistant', zh: 'LinkedIn AI Assistant' },
      effect: {
        en: 'Drafts personalized networking messages to reduce repetitive outreach.',
        zh: '生成个性化的人脉拓展消息，减少重复沟通。',
      },
    },
    {
      title: { en: 'Contact-Angle Measurement Platform', zh: '接触角自动测量平台' },
      effect: {
        en: 'Automates image-based contact-angle measurement for lab experiments.',
        zh: '通过图像自动测量接触角，简化实验流程。',
      },
    },
    {
      title: { en: 'Convenience Store Mini Program', zh: '便利店小程序' },
      effect: {
        en: "Brings a family convenience store's services into a digital mini program.",
        zh: '将家中便利店的服务搬到数字化小程序中。',
      },
    },
  ],
  identity: {
    en: 'From Shenzhen to UC Berkeley. I take products from design through development and deployment.',
    zh: '从深圳到加州大学伯克利分校。我参与产品从设计、开发到部署的完整流程。',
  },
}
