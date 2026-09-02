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
    liveLabel?: string;        // live 链接的显示文案；缺省 "View"
  };
  order: number;                // 展示顺序，1-3
}

export const projectsTitle = "Projects" // section 标题

const chromeWebStoreUrl = "https://chromewebstore.google.com/detail/linkedin-ai-assistant/jeknmnkekajcbffbfijmnmckakpbkcoa"

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
      extensionId: "jeknmnkekajcbffbfijmnmckakpbkcoa",
    },
    order: 1,
  },
  {
    id: "ieee-paper",
    title: "CdSe Quantum Dots on Si Solar Cells",
    status: "published",
    tagline: "IEEE PVSC 2025 · 4th author of 5",
    description:
      "“The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning” — research conducted at UPenn ESAP 2024 under Dr. Gyuseok L. Kim; published in the 2025 IEEE 53rd Photovoltaic Specialists Conference (PVSC), Montreal, QC, Canada, 29 August 2025.",
    techStack: [
      "CdSe Quantum Dots",
      "Silicon Photovoltaics",
      "Bandgap Tuning",
      "UV-Vis Characterization",
    ],
    links: {
      github: null,
      live: "https://ieeexplore.ieee.org/document/11133208",
      liveLabel: "IEEE Xplore",
    },
    order: 2,
  },
]
