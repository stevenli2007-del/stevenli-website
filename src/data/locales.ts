// Phase 4 Task 4-1 — 双语类型定义（Task 4-3 全站双语化复用同一套类型）
// spec §5：locale key 只有 en / zh；URL 的 ?lang= 是唯一事实源。

export type Locale = 'en' | 'zh'

export type LocalizedText = Record<Locale, string>
