// Database.md §3 — Artwork interface（数据填充在 Phase 1 / Task 1-1）

export interface Artwork {
  id: string;
  src: string;                  // /assets/art/xxx.jpg
  alt: string;
  orientation: "horizontal" | "vertical"; // 横幅 / 条幅
  captionZh?: string;            // 可选中文题跋
}
