// Phase 5（2026-10-09）新增 — Dev Log 数据层（Database.md §10）
// ⚠️ Phase 5 只建页面结构，**不写文章**：Steven 明确要求不编造日志、反思或日期。
//    `devLogPosts` 保持空数组，页面渲染空态；内容的深度打磨归 Phase 6。
// 一篇文章必须回答：想做什么 / 试了或决定了什么 / 什么变了或失败了 / 下次怎么做。
// 来源只能是已确认的项目事实（Tempo、接触角工具、LinkedIn 扩展发布等），不得臆造。

import type { LocalizedText } from './locales'

export interface DevLogPost {
  id: string;                   // 唯一标识，如 "tempo-canvas-sync"
  date: string;                 // 显示用日期，如 "2026-10"（不确定就不写，见 Phase 6）
  title: LocalizedText;
  topic: LocalizedText;         // 归属项目 / 主题
  summary: LocalizedText;       // 一句话 takeaway
  body?: LocalizedText[];       // 正文段落（单页索引阶段可留空）
}

export const devLogTitle: LocalizedText = { en: 'Dev Log', zh: '开发日志' }

export const devLogIntro: LocalizedText = {
  en: 'Build notes and post-mortems from projects I have actually shipped.',
  zh: '我实际做过的项目的构建笔记与复盘。',
}

export const devLogEmpty: LocalizedText = {
  en: 'No entries yet. This page will hold build notes and post-mortems from projects I have shipped.',
  zh: '暂无文章。这个页面之后会放我做过的项目的构建笔记与复盘。',
}

// Phase 5：故意为空 —— 「没有可核实的事实就不写」优先于「有页面就得有内容」。
export const devLogPosts: DevLogPost[] = []
