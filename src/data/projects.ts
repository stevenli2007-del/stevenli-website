// Database.md §1 — Project interface
// Phase 4 Task 4-3：文案拆 en/zh；链接改为「具名」结构（spec §4 Projects：链接按目的命名）。
// spec §4：outcome（一句话成果）置于标题下，description 随后，Stack 置底。
// spec §8：IEEE 日期冲突未决，故 description 不写具体日期（只写 venue 年份）。

import type { LocalizedText } from './locales'

export interface ProjectLink {
  label: LocalizedText;         // 具名文案，如 "Chrome Web Store listing" / "Chrome 应用商店页面"
  href: string;
}

export interface Project {
  id: string;                   // 唯一标识，如 "linkedin-ai"
  title: LocalizedText;
  status: 'live' | 'in-development' | 'published';
  outcome: LocalizedText;       // 一句话成果（原 tagline 升级）
  description: LocalizedText;   // 卡片详细描述
  techStack: string[];          // 技术栈（专有名词，不翻译）
  links: ProjectLink[];
  order: number;                // 展示顺序，1-2
}

export const projectsTitle: LocalizedText = { en: 'Selected Projects', zh: '代表项目' }

export const projectsIntro: LocalizedText = {
  en: 'Two outcomes across product engineering and applied research.',
  zh: '两个成果，分别来自产品工程与应用研究。',
}

export const stackLabel: LocalizedText = { en: 'Stack', zh: '技术栈' }

export const statusLabels: Record<Project['status'], LocalizedText> = {
  live: { en: 'Live', zh: '已上线' },
  'in-development': { en: 'In Development', zh: '开发中' },
  published: { en: 'Published', zh: '已发表' },
}

const chromeWebStoreUrl =
  'https://chromewebstore.google.com/detail/linkedin-ai-assistant/jeknmnkekajcbffbfijmnmckakpbkcoa'

export const projects: Project[] = [
  {
    id: 'linkedin-ai',
    title: { en: 'LinkedIn AI Networking Assistant', zh: 'LinkedIn AI Networking Assistant' },
    status: 'live',
    outcome: { en: 'Live on the Chrome Web Store', zh: '已上线 Chrome 应用商店' },
    description: {
      en: 'A Chrome extension that drafts personalized messages to help make LinkedIn networking more efficient.',
      zh: '一款 Chrome 扩展，可生成个性化消息，让 LinkedIn 人脉拓展更高效。',
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
    order: 1,
  },
  {
    id: 'ieee-paper',
    title: { en: 'CdSe Quantum Dots on Si Solar Cells', zh: '硒化镉量子点与硅太阳能电池' },
    status: 'published',
    outcome: { en: 'IEEE PVSC 2025 · Fourth author of five', zh: 'IEEE PVSC 2025 · 五名作者中排名第四' },
    description: {
      en: '“The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning.” Research conducted at UPenn ESAP 2024 under Dr. Gyuseok L. Kim; published in IEEE PVSC 2025.',
      zh: '《硒化镉量子点对硅太阳能电池效率的影响：实践式项目学习》。研究于 2024 年在宾大 ESAP 开展，由 Gyuseok L. Kim 博士指导，发表于 IEEE PVSC 2025。',
    },
    techStack: [
      'CdSe Quantum Dots',
      'Silicon Photovoltaics',
      'Bandgap Tuning',
      'UV-Vis Characterization',
    ],
    links: [
      {
        label: { en: 'Read on IEEE Xplore', zh: '在 IEEE Xplore 阅读' },
        href: 'https://ieeexplore.ieee.org/document/11133208',
      },
    ],
    order: 2,
  },
]
