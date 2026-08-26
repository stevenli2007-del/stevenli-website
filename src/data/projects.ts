// Database.md §1 — Project interface（数据填充在 Phase 1 / Task 1-1）

export interface Project {
  id: string;                 // 唯一标识，如 "linkedin-ai"
  title: string;
  status: "live" | "in-development" | "published";
  tagline: string | null;      // 一句话描述；待补时为 null
  description: string | null;  // 卡片详细描述（PRD 4.3 的英文长句）；待补时为 null
  techStack: string[];
  links: {
    github: string | null;
    live: string | null;       // 如 Chrome Web Store 链接；待补时为 null
    extensionId?: string;      // 仅 Chrome extension 用
  };
  order: number;                // 展示顺序，1-3
}
