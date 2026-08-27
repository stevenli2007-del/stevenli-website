// Database.md §3 — Artwork interface（数据填充在 Phase 1 / Task 1-1）
// Phase 3 补图前 src 为 null，前端渲染占位图；横幅 + 条幅搭配。

export interface Artwork {
  id: string;
  src: string | null;           // /assets/art/xxx.jpg；Phase 3 补图前为 null，前端渲染占位图
  alt: string;
  orientation: "horizontal" | "vertical"; // 横幅 / 条幅
  captionZh?: string;            // 可选中文题跋
}

export const artworks: Artwork[] = [
  {
    id: "artwork-1",
    src: null,
    alt: "Calligraphy artwork placeholder 1",
    orientation: "horizontal",
    captionZh: "行草 · 橫幅",
  },
  {
    id: "artwork-2",
    src: null,
    alt: "Calligraphy artwork placeholder 2",
    orientation: "vertical",
    captionZh: "行草 · 條幅",
  },
  {
    id: "artwork-3",
    src: null,
    alt: "Calligraphy artwork placeholder 3",
    orientation: "vertical",
    captionZh: "行草 · 條幅",
  },
  {
    id: "artwork-4",
    src: null,
    alt: "Calligraphy artwork placeholder 4",
    orientation: "horizontal",
    captionZh: "行草 · 橫幅",
  },
]
