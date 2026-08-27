// Database.md §1 — Project interface（数据填充在 Phase 1 / Task 1-1）
// 缺失字段用 null，前端渲染时判断显示占位样式。

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

const chromeWebStoreUrl = "https://chromewebstore.google.com/detail/jeknmkmekajcbffbfijmmmcakpbbcoa"

export const projects: Project[] = [
  {
    id: "linkedin-ai",
    title: "LinkedIn AI Networking Assistant",
    status: "live",
    tagline: "Live on Chrome Web Store",
    description:
      "Chrome extension that automates LinkedIn networking with AI-generated personalized messages.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Chrome MV3",
      "Cloudflare Workers (Hono + KV)",
      "DeepSeek",
    ],
    links: {
      github: "https://github.com/stevenli2007-del/Linkedin-AI-Assistant",
      live: chromeWebStoreUrl,
      extensionId: "jeknmkmekajcbffbfijmmmcakpbbcoa",
    },
    order: 1,
  },
  {
    id: "moyu",
    title: "Moyu",
    status: "in-development",
    tagline: "AI-powered framing engine for traditional Chinese calligraphy art",
    description:
      "An AI-powered framing engine and community for traditional Chinese calligraphy art.",
    techStack: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind",
      "Cloudflare Workers (Hono + D1/R2)",
    ],
    links: {
      github: "https://github.com/stevenli2007-del/moyu",
      live: null,
    },
    order: 2,
  },
  {
    id: "ieee-paper",
    title: "IEEE Paper — CdSe Quantum Dots / Si Solar Cells",
    status: "published",
    tagline: null, // 待补：论文准确题目
    description:
      "Research on CdSe quantum dots / Si solar cells, conducted at UPenn ESAP 2024 under Dr. Kim Gyuseok; published 2025-09-03.",
    techStack: [],
    links: {
      github: null,
      live: null, // 待补：venue 链接
    },
    order: 3,
  },
]
