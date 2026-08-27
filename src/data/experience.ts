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

export const experience: ExperienceEntry[] = [
  {
    id: "zero-one-winter-2022",
    period: "2022 Winter",
    institution: "Zero-One Academy · Winter Camp",
    description:
      "Catch-and-release and superhydrophobicity: structural color in butterfly wings and lotus leaf microstructures. First hands-on experience with an SEM.",
    keywords: ["SEM", "Superhydrophobicity", "Structural Color"],
    role: "student",
  },
  {
    id: "zero-one-summer-2023",
    period: "2023 Summer",
    institution: "Zero-One Academy · Summer Research Camp",
    description:
      "Deep dive into materials science. Launched a research project under Prof. Zhang Wenzeng, which ran through 2025. Named a Star Youth Awardee.",
    keywords: ["Materials Science", "Research Project"],
    badge: "Star Youth Award",
    role: "student",
  },
  {
    id: "upenn-esap-2024",
    period: "2024 Summer",
    institution: "UPenn ESAP",
    description:
      "Worked with Dr. Kim Gyuseok on CdSe quantum dots / Si solar cells — research that became an IEEE paper, published 2025-09-03.",
    keywords: ["CdSe Quantum Dots", "Si Solar Cells", "IEEE Paper"],
    role: "student",
  },
  {
    id: "yale-yygs-2025",
    period: "2025 Summer",
    institution: "Yale YYGS",
    description:
      "IST track (Innovation, Science & Technology). The Zero-One research project with Prof. Zhang Wenzeng continued through the end of 2025.",
    keywords: ["IST Track", "Innovation"],
    role: "student",
  },
  {
    id: "zero-one-ta-2026",
    period: "2026 Summer",
    institution: "Zero-One Academy · Invited Teaching Assistant",
    description:
      "Invited TA for Prof. Zhao Meng's programmable materials group: programmed and operated EWOD devices, built an automated contact-angle measurement platform, and guided students through the SEM lab visit at Shenzhen University's materials school.",
    keywords: ["EWOD", "Contact-Angle Platform", "SEM"],
    role: "invited-ta",
  },
]
