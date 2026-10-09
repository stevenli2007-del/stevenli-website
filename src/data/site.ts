// Database.md §5 — SiteInfo（站点级文案；Hero）
// Phase 4 Task 4-3：全部用户可见文案拆 en/zh（spec §4 Home / §5 双语规则）。
// spec §5：《legal name 中英一致，不臆造中文姓名拼写》；URL / 产品名 / 机构名等不作翻译。

import type { Locale, LocalizedText } from './locales'
import portfolioImg from '../assets/portfolio.jpg'

// Phase 6 微调（2026-10-09）：tagline 由「一整句 LocalizedText」改为「分段数组」。
// 原因：H1 里 "UC Berkeley 2030" 是专名，被浏览器在空格处拆成两行（UC / Berkeley）。
//   分段后由 Hero 对**每段**加 whitespace-nowrap，换行只可能发生在段与段之间；
//   中文同理（CJK 允许在任意字间断行，"加州大学伯克利分校" 会被拆开）。
// 段与段之间的可见分隔符是排版层，落在下方 taglineSeparator，组件不硬编码文案。
export const taglineSeparator = ' · '

export interface SiteInfo {
  name: string;                    // Legal name（两种语言一致，故不拆 LocalizedText）
  tagline: Record<Locale, string[]>; // Hero H1 定位句（分段：每段内部不换行）
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
  tagline: {
    en: ['Builder', 'Calligrapher', 'UC Berkeley 2030'],
    // 中文第三段用 UC Berkeley 而非全称：全称 8 字在移动端（≤768px）会超出内容宽度，
    // 因该段 nowrap 而把页面撑出横向滚动条（实测溢出 31~66px）。机构名不翻译符合 spec §5。
    // ⚠️ 若改回「加州大学伯克利分校」，必须同时解决窄屏溢出（降字号或允许 CJK 断行）。
    zh: ['创造者', '书法家', 'UC Berkeley 2030届'],
  },
  // Phase 6 微调（2026-10-09）：Steven 指定文案（GPT 版 intro + 自写 proof）。
  intro: {
    en: 'I build software and lab tools that make complex work easier to do—from a course-planning platform used by 109 students in beta to automated measurements for materials research.',
    zh: '我做软件，也做实验工具，让复杂的工作更容易完成——从 109 名学生正在公开测试的课程规划平台，到面向材料研究的自动化测量。',
  },
  // Phase 6 微调（2026-10-09）：三项重排 —— 硬件论文打头、Tempo 提至第二位。
  // 第三项由 `Chrome Web Store developer` 换成 X-Institute 助教（Steven 2026-10-09 指定）。
  // ⚠️ 机构名写法：零一学院**不是清华的下属院系**，是深圳市举办、依托清华大学深圳国际研究生院
  //   （Tsinghua SIGS）的机构 —— 故用 `(Tsinghua SIGS)` 括注，不写成 "Tsinghua University Shenzhen"。
  // ⚠️ 数字口径与 Tempo 卡片 / intro 不一致：intro 写 109、此处写 100+，Steven 已看过并保留，勿擅自统一。
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
