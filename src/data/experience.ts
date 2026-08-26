// Database.md §2 — ExperienceEntry interface（数据填充在 Phase 1 / Task 1-1）
// 数组按时间正序排列（2022 → 2026），数据顺序即展示顺序，前端不做排序逻辑。

export interface ExperienceEntry {
  id: string;
  period: string;              // 如 "2022 Winter"
  institution: string;
  description: string;
  keywords: string[];
  badge?: string;               // 如 "星空少年"，可选
  role: "student" | "invited-ta"; // 用于视觉区分学员 vs 受邀助教
}
