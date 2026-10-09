// Database.md §2 — ExperienceEntry interface
// Phase 4 Task 4-3：文案拆 en/zh（spec §4 Experience / §5）。
// 数组按时间正序（2022 → 2026），数据顺序即展示顺序。
// spec §4：2023 保留 Starry Youth 徽章；2026 新增「受邀」徽章。

import type { LocalizedText } from './locales'

export interface ExperienceEntry {
  id: string;
  period: LocalizedText;        // 如 "2022 Winter" / "2022 冬季"
  institution: LocalizedText;   // 机构名（专有名词部分保持原文）
  description: LocalizedText;
  keywords: LocalizedText[];    // 关键词
  badge?: LocalizedText;        // 「星空少年」/「受邀」等，可选
  role: 'student' | 'invited-ta';
}

export const experienceTitle: LocalizedText = { en: 'Experience', zh: '经历' }

export const experienceIntro: LocalizedText = {
  en: 'From a first SEM lab visit to guiding students through one as an invited teaching assistant.',
  zh: '从第一次走进 SEM 实验室，到受邀担任助教并带学生参观。',
}

export const experience: ExperienceEntry[] = [
  {
    id: 'zero-one-winter-2022',
    period: { en: '2022 Winter', zh: '2022 冬季' },
    institution: { en: 'X-Institute · Winter Camp', zh: 'X-Institute · 冬令营' },
    description: {
      en: 'First hands-on SEM experience while studying superhydrophobicity, butterfly-wing structural color, and lotus-leaf microstructures.',
      zh: '初次上手 SEM，学习超疏水性、蝴蝶翅膀结构色与荷叶微结构。',
    },
    keywords: [
      { en: 'SEM', zh: 'SEM' },
      { en: 'Superhydrophobicity', zh: '超疏水性' },
      { en: 'Structural Color', zh: '结构色' },
    ],
    role: 'student',
  },
  {
    id: 'zero-one-summer-2023',
    period: { en: '2023 Summer', zh: '2023 暑期' },
    institution: { en: 'X-Institute · Summer Research Camp', zh: 'X-Institute · 暑期科研营' },
    description: {
      en: 'Studied materials science and launched a research project with Prof. Zhang Wenzeng.',
      zh: '深入学习材料科学，并启动张文增教授指导的研究项目。',
    },
    keywords: [
      { en: 'Materials Science', zh: '材料科学' },
      { en: 'Research Project', zh: '研究项目' },
    ],
    badge: { en: 'Starry Youth', zh: '星空少年' },
    role: 'student',
  },
  {
    id: 'upenn-esap-2024',
    period: { en: '2024 Summer', zh: '2024 暑期' },
    institution: { en: 'UPenn ESAP', zh: 'UPenn ESAP' },
    description: {
      en: 'At UPenn ESAP, researched CdSe quantum dots and silicon solar cells with Dr. Gyuseok L. Kim; the work became an IEEE paper.',
      zh: '在宾大 ESAP 与 Gyuseok L. Kim 博士研究硒化镉量子点与硅太阳能电池，成果发表于 IEEE 论文。',
    },
    keywords: [
      { en: 'CdSe Quantum Dots', zh: '硒化镉量子点' },
      { en: 'Si Solar Cells', zh: '硅太阳能电池' },
      { en: 'IEEE Paper', zh: 'IEEE 论文' },
    ],
    role: 'student',
  },
  {
    id: 'yale-yygs-2025',
    period: { en: '2025 Summer', zh: '2025 暑期' },
    institution: { en: 'Yale YYGS', zh: 'Yale YYGS' },
    description: {
      en: 'Joined Yale Young Global Scholars in the Innovation, Science & Technology track; continued the X-Institute research project through year-end.',
      zh: '参加耶鲁全球青年学者项目的创新、科学与技术方向；张文增项目持续至年底。',
    },
    keywords: [
      { en: 'IST Track', zh: 'IST 方向' },
      { en: 'Innovation', zh: '创新' },
    ],
    role: 'student',
  },
  {
    id: 'zero-one-ta-2026',
    period: { en: '2026 Summer', zh: '2026 暑期' },
    institution: { en: 'X-Institute · Invited Teaching Assistant', zh: 'X-Institute · 受邀助教' },
    description: {
      en: "Invited to assist Prof. Zhao Meng's programmable materials group. Built an automated contact-angle platform, worked with EWOD devices, and guided students through an SEM lab visit.",
      zh: '受邀加入赵蒙老师的可编程材料课题组，搭建接触角自动测量平台、操作 EWOD 器件，并带学生参观 SEM 实验室。',
    },
    keywords: [
      { en: 'EWOD', zh: 'EWOD' },
      { en: 'Contact-Angle Platform', zh: '接触角平台' },
      { en: 'SEM', zh: 'SEM' },
    ],
    badge: { en: 'Invited', zh: '受邀' },
    role: 'invited-ta',
  },
]
