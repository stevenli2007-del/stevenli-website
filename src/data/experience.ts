// Database.md §2 — ExperienceEntry interface
// Phase 4 Task 4-3：文案拆 en/zh（spec §4 Experience / §5）。
// 数组按时间正序（2022 → 2026），数据顺序即展示顺序。
// spec §4：2023 保留 Starry Youth 徽章；2026 新增「受邀」徽章。
//
// Phase 6 微调（2026-10-09，Steven 指定）：时间线由 5 条扩到 8 条并配图。
//   ① ESAP 拆两条 —— Lab Work（2024-07~08，洁净间制备）与 Research Paper（2024-08~2025-09，成文发表）；
//   ② 新增两个毕业节点 —— 2023-06 Whittle（荟同）/ 2026-06 SCIE（深国交）；
//   ③ 每条新增 `image`（src + 原始宽高）与 `imageAlt`（双语 alt，spec §9.6 图片必须有 alt）。
//   ⚠️ 毕业节点 `keywords: []` —— 一行为节点只是时间锚，不硬凑标签；组件对空数组不渲染该行。
//   ⚠️ 图片一律**不裁切**，按各自原始比例渲染（`width`/`height` 与文件实际像素一致 → 零 CLS）。

import type { LocalizedText } from './locales'

import imgXInstituteWinter2022 from '../assets/experience/x-institute-winter-2022.jpg'
import imgWhittle2023 from '../assets/experience/whittle-2023.jpg'
import imgXInstituteSummer2023 from '../assets/experience/x-institute-summer-2023.jpg'
import imgUpennEsapLab2024 from '../assets/experience/upenn-esap-lab-2024.jpg'
import imgUpennEsapPaper from '../assets/experience/upenn-esap-paper.jpg'
import imgYaleYygs2025 from '../assets/experience/yale-yygs-2025.jpg'
import imgScie2026 from '../assets/experience/scie-2026.jpg'
import imgXInstituteTa2026 from '../assets/experience/x-institute-ta-2026.jpg'

export interface ExperienceImage {
  src: string;
  width: number;   // 处理后文件的实际像素宽（写进 <img width> 防 CLS）
  height: number;
}

export interface ExperienceEntry {
  id: string;
  period: LocalizedText;        // 如 "2022 Winter" / "2022 冬季"
  institution: LocalizedText;   // 机构名（专有名词部分保持原文）
  description: LocalizedText;
  keywords: LocalizedText[];    // 关键词
  badge?: LocalizedText;        // 「星空少年」/「受邀」等，可选
  role: 'student' | 'invited-ta';
  image: ExperienceImage;       // 配图（Phase 6 新增）
  imageAlt: LocalizedText;      // 配图 alt，双语（spec §9.6）
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
    image: { src: imgXInstituteWinter2022, width: 880, height: 587 },
    imageAlt: {
      en: 'Presenting a winter-camp project on stage at X-Institute.',
      zh: '在 X-Institute 冬令营上台做项目汇报。',
    },
  },
  {
    id: 'whittle-2023',
    period: { en: '2023 June', zh: '2023 年 6 月' },
    institution: { en: 'Whittle School & Studios', zh: '荟同学校' },
    description: {
      en: 'Graduated from Whittle School & Studios in Shenzhen and moved to Shenzhen College of International Education for A-Levels.',
      zh: '从荟同学校（深圳）毕业，转入深圳国际交流学院攻读 A-Level。',
    },
    keywords: [],
    role: 'student',
    image: { src: imgWhittle2023, width: 880, height: 587 },
    imageAlt: {
      en: 'Graduation group photo in gowns at Whittle School & Studios.',
      zh: '荟同学校毕业合影。',
    },
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
    image: { src: imgXInstituteSummer2023, width: 880, height: 627 },
    imageAlt: {
      en: 'At the 2023 X-Institute International Summer School in Shenzhen.',
      zh: '在 2023 年零一少年国际暑期学校现场。',
    },
  },
  {
    id: 'upenn-esap-lab-2024',
    period: { en: '2024 Jul – Aug', zh: '2024 年 7–8 月' },
    institution: { en: 'UPenn ESAP · Lab Work', zh: 'UPenn ESAP · 实验室工作' },
    description: {
      en: 'Fabricated semiconductor devices in the Singh Center cleanroom at Penn: patterned substrates by photolithography, grew uniform SiO₂ layers on silicon wafers by thermal oxidation, and characterized CdSe quantum-dot films.',
      zh: '在宾大 Singh Center 洁净间完成半导体器件制备：以光刻图形化衬底、用热氧化在硅片上生长均匀的二氧化硅层，并对硒化镉量子点薄膜做表征。',
    },
    keywords: [
      { en: 'Cleanroom Fabrication', zh: '洁净间制备' },
      { en: 'Photolithography', zh: '光刻' },
      { en: 'Thermal Oxidation', zh: '热氧化' },
      { en: 'CdSe Quantum Dots', zh: '硒化镉量子点' },
    ],
    role: 'student',
    image: { src: imgUpennEsapLab2024, width: 880, height: 778 },
    imageAlt: {
      en: 'Suited up in the Singh Center cleanroom during ESAP lab work.',
      zh: '在 Singh Center 洁净间内做实验。',
    },
  },
  {
    id: 'upenn-esap-paper',
    period: { en: '2024 Aug – 2025 Sep', zh: '2024 年 8 月 – 2025 年 9 月' },
    institution: { en: 'UPenn ESAP · Research Paper', zh: 'UPenn ESAP · 研究论文' },
    description: {
      en: 'Turned the cleanroom work into a peer-reviewed paper with Dr. Gyuseok L. Kim on how CdSe quantum dots affect silicon solar cell efficiency — published at IEEE PVSC 2025 and indexed on IEEE Xplore.',
      zh: '与 Gyuseok L. Kim 博士合作，把洁净间的实验工作写成同行评审论文，研究硒化镉量子点对硅太阳能电池效率的影响，发表于 IEEE PVSC 2025 并收录于 IEEE Xplore。',
    },
    keywords: [
      { en: 'IEEE PVSC 2025', zh: 'IEEE PVSC 2025' },
      { en: 'Solar Cells', zh: '太阳能电池' },
      { en: 'Peer-reviewed Publication', zh: '同行评审论文' },
    ],
    role: 'student',
    image: { src: imgUpennEsapPaper, width: 660, height: 880 },
    imageAlt: {
      en: 'Holding the Engineering Summer Academy at Penn certificate after the program.',
      zh: '手持宾大 ESAP 项目结业证书。',
    },
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
    image: { src: imgYaleYygs2025, width: 880, height: 660 },
    imageAlt: {
      en: 'YYGS cohort in Yale T-shirts on stage at Yale.',
      zh: 'YYGS 项目同学在耶鲁舞台上的合影。',
    },
  },
  {
    id: 'scie-2026',
    period: { en: '2026 June', zh: '2026 年 6 月' },
    institution: { en: 'Shenzhen College of International Education', zh: '深圳国际交流学院' },
    description: {
      en: 'Graduated from Shenzhen College of International Education after completing A-Levels.',
      zh: '完成 A-Level 课程，从深圳国际交流学院毕业。',
    },
    keywords: [],
    role: 'student',
    image: { src: imgScie2026, width: 880, height: 616 },
    imageAlt: {
      en: 'At the Shenzhen College of International Education graduation ceremony.',
      zh: '深圳国际交流学院毕业典礼现场。',
    },
  },
  {
    id: 'zero-one-ta-2026',
    period: { en: '2026 Summer', zh: '2026 暑期' },
    institution: { en: 'X-Institute · Invited Teaching Assistant', zh: 'X-Institute · 受邀助教' },
    description: {
      en: "Invited to assist Prof. Zhao Meng's programmable materials group. Built a browser-based contact-angle tool that measures angles from USB-camera images automatically and lets students measure by hand with a baseline and tangent to compare; calibrated an EWOD droplet-actuation system and taught students to run its software and voltage controls. Taught interfacial physics and chemistry, introduced students to AI-assisted development with WorkBuddy, and guided them through an SEM lab visit.",
      zh: '受邀加入赵蒙老师的可编程材料课题组。做了一个浏览器端的接触角工具：既从 USB 相机画面自动测角，也保留手动的基线—切线测量供对照；校准 EWOD 液滴驱动系统，并教学生操作它的软件与电压控制。讲授界面物理与化学，带学生用 WorkBuddy 做 AI 辅助开发，并带他们参观 SEM 实验室。',
    },
    keywords: [
      { en: 'EWOD', zh: 'EWOD' },
      { en: 'Contact-Angle Measurement', zh: '接触角测量' },
      { en: 'Image Processing', zh: '图像处理' },
      { en: 'SEM', zh: 'SEM' },
    ],
    badge: { en: 'Invited', zh: '受邀' },
    role: 'invited-ta',
    image: { src: imgXInstituteTa2026, width: 880, height: 587 },
    imageAlt: {
      en: 'Walking a student through the measurement software during the 2026 X-Institute program.',
      zh: '在 2026 年 X-Institute 项目里带学生操作测量软件。',
    },
  },
]
