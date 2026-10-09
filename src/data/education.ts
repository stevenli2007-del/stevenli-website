// Phase 5（2026-10-09）新增 — Education / Awards / Technical Skills
// 事实基准 = Steven 本轮提供的简历（2026-10-09）。
// ⚠️ 专业写法已按简历拍板为 "Engineering Physics & Computer Science"，
//    旧记录中的「L&S → 主修 EECS」作废（Steven 2026-10-09 确认）。
// 课程名、竞赛名、工具名属专有名词，不翻译；奖项名称按简历原文。

import type { LocalizedText } from './locales'

export interface Award {
  title: LocalizedText;         // 奖项名称
  detail: LocalizedText;        // 名次 / 范围说明
  year: string;                 // 年份（专有数据，不翻译）
}

export interface SkillGroup {
  label: LocalizedText;         // 分组名，如 Languages / 编程语言
  items: string[];              // 技术名（专有名词，不翻译）
}

export interface EducationInfo {
  school: string;               // 校名（两种语言一致）
  program: LocalizedText;       // 专业
  detail: LocalizedText;        // 届别 + 转学分
  coursesLabel: LocalizedText;
  courses: string[];            // 课程名（专有名词，不翻译）
}

export const educationTitle: LocalizedText = { en: 'Education', zh: '教育背景' }

export const awardsTitle: LocalizedText = { en: 'Awards', zh: '奖项' }

export const skillsTitle: LocalizedText = { en: 'Technical Skills', zh: '技术技能' }

export const education: EducationInfo = {
  school: 'University of California, Berkeley',
  program: {
    en: 'Engineering Physics & Computer Science',
    zh: '工程物理与计算机科学',
  },
  detail: {
    en: 'Class of 2030 · 40 units transferred from A-Level',
    zh: '2030 届 · A-Level 转入 40 学分',
  },
  coursesLabel: { en: 'Coursework', zh: '已修课程' },
  courses: ['Physics 7A', 'Chem 1A & 1AL', 'COLWR R4A', 'Math 53'],
}

export const awards: Award[] = [
  {
    title: { en: 'Canadian Chemistry Contest', zh: '加拿大化学竞赛' },
    detail: { en: 'Global Silver', zh: '全球银奖' },
    year: '2025',
  },
  {
    title: { en: 'British Physics Olympiad', zh: '英国物理奥林匹克' },
    detail: { en: 'Global Silver Medal', zh: '全球银牌' },
    year: '2025, 2023',
  },
  {
    title: { en: 'American Mathematics Competition 12', zh: '美国数学竞赛 AMC 12' },
    detail: { en: 'Top 5% & Distinction', zh: '全球前 5% 与优秀奖' },
    year: '2023',
  },
  {
    title: { en: 'X-Institute Summer College Academy', zh: 'X-Institute 暑期大学堂' },
    detail: {
      en: 'Starry Night Youth — selected among the top 20 of 3,000 applicants',
      zh: '星空少年 — 从 3,000 名申请者中入选前 20',
    },
    year: '2023',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: { en: 'Languages', zh: '编程语言' },
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: { en: 'Frameworks', zh: '框架' },
    items: ['React', 'Next.js', 'Node.js', 'Hono', 'Tailwind CSS'],
  },
  {
    label: { en: 'Tools & Platforms', zh: '工具与平台' },
    items: [
      'Git & GitHub',
      'Cloudflare Workers & KV',
      'Vercel',
      'Supabase',
      'Chrome Extensions (Manifest V3)',
      'Vite',
    ],
  },
]
