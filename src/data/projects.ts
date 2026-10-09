// Database.md §1 — Project interface
// Phase 4 Task 4-3：文案拆 en/zh；链接改为「具名」结构（spec §4 Projects：链接按目的命名）。
// spec §4：outcome（一句话成果）置于标题下，description 随后，Stack 置底。
//
// Phase 5（2026-10-09）改写：事实基准 = Steven 的 NVIDIA 申请版简历。
//   展示顺序（Steven 2026-10-09 拍板）：IEEE 论文 → Tempo → Cal Hacks 门户 → LinkedIn AI Assistant。
//   新增两个 status：beta（Tempo，公开测试 + 持续开发）/ submission（Cal Hacks，个人项目已提交）。
//   ⚠️ Tempo 是**持续项目**（Steven 2026-10-09 确认），故 description 按简历把功能写全：
//      学习计划（整学期 + 每日）、交互式学习笔记、考试复习总结、真题自测卷 —— 
//      简历提到的能力一律写进去（早期文档里 `study_plans` 标为 Phase 2，已由 Steven 确认属持续开发范围）。
//   ⚠️ Cal Hacks 项目定位：**个人项目**，不是 Tech Lead、不是正式团队成员。
//      Steven 2026-10-09 指示：文案里**不要出现 "take-home" 字样**。
//   ⚠️ Moyu 已于 2026-09-01 从全站移除，本文件不再有条目。

import type { LocalizedText } from './locales'

export interface ProjectLink {
  label: LocalizedText;         // 具名文案，如 "Chrome Web Store listing" / "Chrome 应用商店页面"
  href: string;
}

export interface Project {
  id: string;                   // 唯一标识，如 "linkedin-ai"
  title: LocalizedText;
  status: 'live' | 'beta' | 'submission' | 'in-development' | 'published';
  outcome: LocalizedText;       // 一句话成果（原 tagline 升级）
  description: LocalizedText;   // 卡片详细描述
  techStack: string[];          // 技术栈（专有名词，不翻译）
  links: ProjectLink[];
  order: number;                // 展示顺序，1-4
}

export const projectsTitle: LocalizedText = { en: 'Selected Projects', zh: '代表项目' }

export const projectsIntro: LocalizedText = {
  en: 'Four builds across applied hardware research, full-stack product work, and a shipped browser extension.',
  zh: '四个成果，覆盖硬件应用研究、全栈产品与已发布的浏览器扩展。',
}

export const stackLabel: LocalizedText = { en: 'Stack', zh: '技术栈' }

export const statusLabels: Record<Project['status'], LocalizedText> = {
  live: { en: 'Live', zh: '已上线' },
  beta: { en: 'Public Beta', zh: '公开测试' },
  submission: { en: 'Submitted', zh: '已提交' },
  'in-development': { en: 'In Development', zh: '开发中' },
  published: { en: 'Published', zh: '已发表' },
}

const chromeWebStoreUrl =
  'https://chromewebstore.google.com/detail/linkedin-ai-assistant/jeknmnkekajcbffbfijmnmckakpbkcoa'

export const projects: Project[] = [
  {
    id: 'ieee-paper',
    title: { en: 'CdSe Quantum Dots on Si Solar Cells', zh: '硒化镉量子点与硅太阳能电池' },
    status: 'published',
    outcome: { en: 'IEEE PVSC 2025 · Fourth author of five', zh: 'IEEE PVSC 2025 · 五名作者中排名第四' },
    description: {
      en: 'Fabricated and characterized semiconductor devices in the Singh Center cleanroom at UPenn ESAP: patterned substrates by photolithography, grew uniform SiO₂ layers on silicon wafers by thermal oxidation, and characterized CdSe quantum-dot films. Supervised by Dr. Gyuseok L. Kim; the work became “The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning” in IEEE PVSC 2025.',
      zh: '在宾大 ESAP 的 Singh Center 洁净间完成半导体器件制备与表征：用光刻图形化衬底、以热氧化在硅片上生长均匀的二氧化硅层，并对硒化镉量子点薄膜做表征。由 Gyuseok L. Kim 博士指导，成果即 IEEE PVSC 2025 论文《硒化镉量子点对硅太阳能电池效率的影响：实践式项目学习》。',
    },
    techStack: [
      'CdSe Quantum Dots',
      'Silicon Photovoltaics',
      'Photolithography',
      'Thermal Oxidation',
      'UV-Vis Characterization',
    ],
    links: [
      {
        label: { en: 'Read on IEEE Xplore', zh: '在 IEEE Xplore 阅读' },
        href: 'https://ieeexplore.ieee.org/document/11133208',
      },
    ],
    order: 1,
  },
  {
    id: 'tempo',
    title: { en: 'Tempo — Berkeley Study Mate', zh: 'Tempo · 伯克利学习助手' },
    status: 'beta',
    outcome: {
      en: '109 users in public beta · still in active development',
      zh: '109 位用户（公开测试）· 仍在持续开发',
    },
    description: {
      en: 'A course OS for Berkeley students, and an ongoing project. It parses syllabus PDFs into structured course logistics, pulls assignments, files, modules, and announcements from Canvas and from forwarded email, and keeps every deadline and its progress in one dashboard. LLM APIs turn a syllabus into a semester-long plan and then a daily plan, and students can revise either one when the schedule shifts; the same models generate interactive study notes, per-exam review summaries built from material you already have, and practice sets cut from real past exams — answers come from the instructor’s key, never from the model. Supabase handles authentication and real-time sync; 77 users in private beta, 109 in public beta.',
      zh: '一个面向伯克利学生的课程操作系统，目前仍在持续开发。它把 syllabus 解析成结构化的课程规则，从 Canvas 与转发邮件里汇总作业、课件、章节与公告，把截止日期和完成进度收进同一张看板。LLM 把 syllabus 变成整学期的计划，再拆成每日计划，日程有变动时学生可以直接改；同样的模型也用来生成交互式学习笔记、基于你已有材料的考试复习总结，以及从真实往年卷切出来的自测题 —— 答案取教师答案键，不由模型编造。Supabase 负责认证与实时同步；内测 77 位用户，公开测试 109 位。',
    },
    techStack: [
      'TypeScript',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Supabase',
      'Vercel',
      'DeepSeek',
      'Qwen',
    ],
    links: [
      {
        label: { en: 'Source on GitHub', zh: 'GitHub 源代码' },
        href: 'https://github.com/stevenli2007-del/tempo',
      },
      {
        // Steven 2026-10-09 提供：正式域名，未登录会跳 /login（正常）
        label: { en: 'Live demo', zh: '在线演示' },
        href: 'https://app.tempocourse.com/dashboard',
      },
    ],
    order: 2,
  },
  {
    id: 'cal-hacks-portal',
    title: { en: 'Cal Hacks FA26 Application Portal', zh: 'Cal Hacks FA26 申请门户' },
    status: 'submission',
    outcome: {
      en: 'Individual project for the Cal Hacks FA26 Tech Team application',
      zh: '为申请 Cal Hacks FA26 技术团队所做的个人项目',
    },
    description: {
      en: 'A miniature hackathon application portal. Applicants sign in, choose a track — hacker, judge, mentor, or volunteer — and fill a track-specific form with drafts before submitting. Organizers grade with a weighted rubric, watch a coverage tracker that surfaces grading bottlenecks, and move applications across an accept / waitlist / reject board. Every access rule lives in Postgres row-level security behind a single is_organizer() helper.',
      zh: '一个精简的黑客松申请门户。申请者登录后选择方向 —— 选手、评委、导师或志愿者 —— 填写对应表单，可先存草稿再提交。组织者用加权评分表打分，用覆盖率面板盯住评分瓶颈，并在「录取 / 候补 / 拒绝」看板上推动决策。所有权限规则都写进 Postgres 的行级安全策略，收在同一个 is_organizer() 函数后面。',
    },
    techStack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
    links: [
      {
        label: { en: 'Source on GitHub', zh: 'GitHub 源代码' },
        href: 'https://github.com/stevenli2007-del/hackportal',
      },
      {
        label: { en: 'Live demo', zh: '在线演示' },
        href: 'https://hackportal-tempo-70da.vercel.app',
      },
    ],
    order: 3,
  },
  {
    id: 'linkedin-ai',
    title: { en: 'LinkedIn AI Networking Assistant', zh: 'LinkedIn AI Networking Assistant' },
    status: 'live',
    outcome: { en: '17 users, no paid promotion', zh: '17 位用户，无付费推广' },
    description: {
      en: 'A Chrome Manifest V3 extension that reads the profile you are viewing, combines it with your own, and drafts personalized outreach messages in four styles. Nothing is sent automatically — you review, edit, and copy. Built end to end across ten iterations: the React/TypeScript interface, a Cloudflare Workers backend that proxies the DeepSeek API so users never paste their own key, and the Chrome Web Store release. 9 of the 17 users found it through Chrome Web Store search.',
      zh: '一款 Chrome Manifest V3 扩展：读取你正在浏览的主页，结合你自己的档案，用四种风格起草个性化联络消息。扩展不会自动发送 —— 由你审阅、编辑、复制。前后端历经十轮迭代独立完成：React/TypeScript 界面、代理 DeepSeek API 的 Cloudflare Workers 后端（用户无需自行填入密钥），以及 Chrome 应用商店上架。17 位用户中有 9 位通过应用商店搜索找到它。',
    },
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Chrome MV3',
      'Cloudflare Workers (Hono + KV)',
      'DeepSeek',
    ],
    links: [
      {
        label: { en: 'Chrome Web Store listing', zh: 'Chrome 应用商店页面' },
        href: chromeWebStoreUrl,
      },
      {
        label: { en: 'Source on GitHub', zh: 'GitHub 源代码' },
        href: 'https://github.com/stevenli2007-del/Linkedin-AI-Assistant',
      },
    ],
    order: 4,
  },
]
