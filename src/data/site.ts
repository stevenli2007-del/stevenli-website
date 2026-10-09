// Database.md §5 — SiteInfo（站点级文案；Hero）
// Phase 4 Task 4-3：全部用户可见文案拆 en/zh（spec §4 Home / §5 双语规则）。
// spec §5：《legal name 中英一致，不臆造中文姓名拼写》；URL / 产品名 / 机构名等不作翻译。

import type { LocalizedText } from './locales'
import portfolioImg from '../assets/portfolio.jpg'

// Phase 6 微调（2026-10-09，第 4 条）：tagline 由「一整句 → 分段数组」再改为「school / focus 两行」。
// 演进原因：
//   1. 一整句时 "UC Berkeley 2030" 被浏览器在空格处拆成两行（UC / Berkeley）；
//   2. 改成用 `·` 分隔的分段数组后，窄屏换行时行尾会孤悬一个 `·`，观感差；
//   3. 现方案：school / focus **各占一行**，段间不再需要任何分隔符字符（点已彻底移除），
//      school 是专名仍 nowrap；focus 是描述性短语，允许自由换行（否则窄屏会溢出）。
// ⚠️ focus 段**不要**加 whitespace-nowrap —— "Software & Semiconductor Research" 在 375px
//    屏宽下约 610px，nowrap 会把页面撑出横向滚动条（违 WCAG 1.4.10）。

export interface SiteInfo {
  name: string;                    // Legal name（两种语言一致，故不拆 LocalizedText）
  tagline: {
    school: LocalizedText;         // 第一行：学校 + 届别（专名，段内不换行）
    focus: LocalizedText;          // 第二行：方向（描述性短语，可自由换行）
  };
  intro: LocalizedText;            // Hero 介绍句（spec §4）
  proof: LocalizedText;            // Hero 实证行（spec §4，Task 4-4 渲染）
  cta: {                           // Hero 双 CTA 文案（spec §4，Task 4-4 渲染）
    projects: LocalizedText;
    contact: LocalizedText;
  };
  photo: string;                   // Hero 头像（Vite import，构建时哈希）
}

export const siteInfo: SiteInfo = {
  name: 'Youcheng (Steven) Li',
  // 第一行 school：机构名不翻译（spec §5）；中文用 UC Berkeley 而非全称，
  //   全称 8 字 @36px 宽 452px，窄屏放不下（实测 375px 溢出 38px）。
  // 第二行 focus：用 Semiconductor 而非 Materials —— 更贴 NVIDIA，也是 IEEE PVSC 论文的实际领域。
  //   书法已从 H1 移除（Steven 认为 "Calligrapher" 像职业标签），由 /art 页面呈现。
  // ⚠️ focus 长度有硬约束：实测 "Software & Semiconductor Research"（34 字符）在 768px 下会把
  //   H1 撑到 4 行 / 240px 高。现用 25 字符版本，桌面端 school+focus 共 2 行。再改长务必重测行数。
  tagline: {
    school: { en: 'UC Berkeley 2030', zh: 'UC Berkeley 2030届' },
    focus: { en: 'Software & Semiconductors', zh: '软件与半导体' },
  },
  // Phase 6 微调（2026-10-09）：Steven 指定文案（GPT 版 intro + 自写 proof）。
  // 2026-10-09 再改：用户数一律写 `100+`（Steven 拍板）—— 精确数字会随增长过期，
  //   且整站口径统一（intro / proof 已一致；⚠️ projects.ts 的 Tempo 卡片仍写 109，未同步）。
  intro: {
    en: 'I build software and lab tools that make complex work easier to do—from a course-planning platform used by 100+ students in beta to automated measurements for materials research.',
    zh: '我做软件，也做实验工具，让复杂的工作更容易完成——从 100+ 名学生正在公开测试的课程规划平台，到面向材料研究的自动化测量。',
  },
  // Phase 6 微调（2026-10-09）：三项重排 —— 硬件论文打头、Tempo 提至第二位。
  // 第三项由 `Chrome Web Store developer` 换成 X-Institute 助教（Steven 2026-10-09 指定）。
  // ⚠️ 机构名写法：零一学院**不是清华的下属院系**，是深圳市举办、依托清华大学深圳国际研究生院
  //   （Tsinghua SIGS）的机构 —— 故用 `(Tsinghua SIGS)` 括注，不写成 "Tsinghua University Shenzhen"。
  proof: {
    en: 'IEEE PVSC 2025 co-author · Tempo founder, 100+ beta users · X-Institute (Tsinghua SIGS) invited TA',
    zh: 'IEEE PVSC 2025 论文合著者 · Tempo 创始人，100+ 测试用户 · X-Institute（清华 SIGS）受邀助教',
  },
  cta: {
    projects: { en: 'Explore projects', zh: '查看项目' },
    contact: { en: 'Contact me', zh: '联系我' },
  },
  photo: portfolioImg,
}
