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
  // Phase 6 微调（2026-10-09，第 6 条）：第一张卡由 LinkedIn AI Assistant 换成 Tempo。
  //   原因：Steven 认为 LinkedIn 扩展不足以代表「关于我」；About 缺的是软件侧的旗舰产品，
  //   而 LinkedIn 卡在 Projects 页第 4 张仍在，About 删掉不丢信息。
  //   ⚠️ 用户数写 `100+`（与 Hero intro / proof 同口径）。Projects 页 Tempo 卡仍写 109，未同步。
  //   ⚠️ About 是 sm:grid-cols-3 固定三列，examples 恒为 3 条；加第 4 条会掉到第二行孤卡。
  examples: [
    {
      title: { en: 'Tempo — Berkeley Study Mate', zh: 'Tempo · 伯克利学习助手' },
      effect: {
        en: 'Turns syllabi and Canvas updates into one course plan; 100+ students in public beta.',
        zh: '把 syllabus 与 Canvas 的更新汇总成一份课程计划；100+ 名学生正在公开测试。',
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
  // Phase 5：按简历补入专业（Engineering Physics & Computer Science）
  identity: {
    en: 'From Shenzhen to UC Berkeley, studying Engineering Physics & Computer Science. I take products from design through development and deployment.',
    zh: '从深圳到加州大学伯克利分校，主修工程物理与计算机科学。我参与产品从设计、开发到部署的完整流程。',
  },
}
