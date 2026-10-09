# Database.md — Data Dictionary

> 本站没有真实数据库，但"内容即数据"——所有文案、链接、图片路径都以下面这套结构存放在 `/src/data/*.ts` 里。命名统一用 **camelCase 英文变量名**，绝不允许出现 `snake_case` 或中英混用变量名（如 `user_id`、`xiangmuName` 一律禁止）。中文内容作为**字符串值**没问题，只是变量名必须是英文 camelCase。

## 1. `projects.ts`

```ts
export interface ProjectLink {
  label: LocalizedText;         // 具名文案，如 "Chrome Web Store listing" / "Chrome 应用商店页面"
  href: string;
}

export interface Project {
  id: string;                   // 唯一标识，如 "linkedin-ai"
  title: LocalizedText;
  status: "live" | "in-development" | "published";
  outcome: LocalizedText;       // 一句话成果（**替代原 tagline**）
  description: LocalizedText;   // 卡片详细描述（PRD 4.3 的英文长句）
  techStack: string[];          // 技术栈（专有名词，不翻译）
  links: ProjectLink[];         // **具名链接数组**（替代原 links 对象）
  order: number;                // 展示顺序，1-2
}
```

同文件另导出：`projectsTitle` / `projectsIntro` / `stackLabel` / `statusLabels`（`Record<Project["status"], LocalizedText>`）。

**Phase 4 Task 4-3 变更：**
- `tagline: string | null` → **`outcome: LocalizedText`** —— 语义从「一句话描述」升级为「一句话成果」，卡片里置于标题之下、描述之上
- `links: { github, live, extensionId?, liveLabel? }` → **`links: ProjectLink[]`** —— 链接按目的命名；`extensionId` / `liveLabel` 两个派生字段**已删除**（链接文案不再靠 ID 推断）
- 全部 `string` → `LocalizedText`；`null` 已无残留（两条目字段全满）

实际条目（IEEE 论文，Task 3-1 已补全；Phase 4 起 `description` 只写 venue 年份、不含具体日期）：
```ts
{
  id: "ieee-paper",
  title: { en: "CdSe Quantum Dots on Si Solar Cells", zh: "硒化镉量子点与硅太阳能电池" },
  status: "published",
  outcome: { en: "IEEE PVSC 2025 · Fourth author of five", zh: "IEEE PVSC 2025 · 五名作者中排名第四" },
  description: {
    en: "“The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning.” Research conducted at UPenn ESAP 2024 under Dr. Gyuseok L. Kim; published in IEEE PVSC 2025.",
    zh: "《硒化镉量子点对硅太阳能电池效率的影响：实践式项目学习》。研究于 2024 年在宾大 ESAP 开展，由 Gyuseok L. Kim 博士指导，发表于 IEEE PVSC 2025。",
  },
  techStack: ["CdSe Quantum Dots", "Silicon Photovoltaics", "Bandgap Tuning", "UV-Vis Characterization"],
  links: [
    { label: { en: "Read on IEEE Xplore", zh: "在 IEEE Xplore 阅读" },
      href: "https://ieeexplore.ieee.org/document/11133208" },
  ],
  order: 2,
}
```

> CWS 链接含 Extension ID `jeknmnkekajcbffbfijmnmckakpbkcoa`（2026-08-30 更正，旧值 `jeknmkme…` 已废弃）。

论文元数据（来源 IEEE Xplore，DOI 10.1109/PVSC59419.2025.11133208）：
- 作者序：Bowen Hou, Jinwook Chang, Talin Patel, **Youcheng Li（第 4）**, Gyuseok L. Kim
- Venue：2025 IEEE 53rd Photovoltaic Specialists Conference (PVSC)，Montreal, QC, Canada
- 会议日期：2025-06-08 ~ 06-13（Montreal）；**发表日期以 IEEE Xplore 官方「Date Added to Xplore」为准：2025-08-29**
  - 注：PRD 原记 2025-09-03，2026-08-30 经 Steven 确认以官方日期为准，已统一为 2025-08-29

## 2. `experience.ts`

```ts
export interface ExperienceEntry {
  id: string;
  period: LocalizedText;        // 如 "2022 Winter" / "2022 冬季"
  institution: LocalizedText;   // 机构名（专有名词部分保持原文）
  description: LocalizedText;
  keywords: LocalizedText[];    // 关键词（**双语数组**）
  badge?: LocalizedText;        // 「星空少年」/「受邀」，可选
  role: "student" | "invited-ta"; // 用于视觉区分学员 vs 受邀助教
}
```

同文件另导出：`experienceTitle` / `experienceIntro`。

**Phase 4 Task 4-3 变更：** 五个 `string` 字段全部改 `LocalizedText`；2026 节点新增
`badge: { en: "Invited", zh: "受邀" }`（3-1 起的时间线视觉区分现在有了文字徽章支撑）。

数组按时间正序排列（2022 → 2026），前端不做排序逻辑，数据顺序即展示顺序。

## 3. `artworks.ts`

```ts
export interface Artwork {
  id: string;
  src: string | null;           // 图片路径（Vite import，构建时生成哈希 URL）
  alt: LocalizedText;
  width: number;                // 原始像素宽 —— 渲染为 <img width/height> 以**预留空间**（治 CLS）
  height: number;               // 与 CSS `w-full` + preflight `height:auto` 共同得出宽高比
  orientation: "horizontal" | "vertical"; // 横幅 / 条幅
  captionZh?: string;            // 题跋：两种语言下均显示原繁体（spec §5）
}
```

同文件另导出：`artworksTitle` / `artworksIntro` / `artworksNote` / **`renderArtworkImages`**。

- 四张作品已全部就位（`artwork-1-huaniao` 718×1920｜`artwork-2-dapeng` 566×1246｜`artwork-3-aojin` 960×1270｜`artwork-4-mingyue` 578×1230）
- `alt` 于 Task 4-3 改双语；`width`/`height` 于 Task 4-10 新增（原缺失是 CLS 0.102 的唯一成因）
- **`renderArtworkImages = false`**（Task 4-10，Steven 拍板）：Art 页渲染**与原图等比**的占位框，不发起任何图片请求。
  `src` 字段仍持有真实路径，置回 `true` 即恢复真图；占位框宽高比直接取 `width`/`height`，故版式不跳、无需改组件

## 4. `contact.ts`

```ts
export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;             // 已补（Task 3-4，2026-08-30）
  chromeWebStore: string;
}

export interface ContactLink {
  label: LocalizedText;         // 具名文案，如 "GitHub profile" / "GitHub 主页"
  href: string;
  group: "profile" | "project"; // profile = 联系方式；project = 项目入口（**Task 4-9 新增**）
}
```

同文件另导出：`contactTitle` / `contactIntro` / `emailAction` / `projectLabel` / `contactLinks`。

- **Task 4-9 变更：** `group` 是 spec §4（P1）「Chrome Web Store 挂在 Project 标签下」的落地方式 ——
  分组语义必须住数据层，因为**组件不得硬编码「项目」二字**（`projectLabel` 同理）
- 组件据此 `filter` 成两组：`profile` → 内联文字链接；`project` → muted 标签行

## 5. `site.ts`

站点级文案（Hero 定位句等不属于任何单一 section 的内容）。

```ts
export interface SiteInfo {
  name: string;                 // Legal name（两种语言一致，故不拆 LocalizedText）
  tagline: LocalizedText;       // Hero H1 定位句，如 "Builder · Calligrapher · UC Berkeley 2030"
  intro: LocalizedText;         // Hero 介绍句（Task 4-3 新增，原为组件内硬编码）
  proof: LocalizedText;         // Hero 实证行（Task 4-4 渲染）
  cta: {                        // Hero 双 CTA 文案（Task 4-4 渲染）
    projects: LocalizedText;
    contact: LocalizedText;
  };
  photo: string;                // Hero 头像（Vite import from /assets/）
}
```

> 变更记录：Phase 3（2026-08-30）新增 `photo`、`name` 改 legal name；
> Phase 4 Task 4-3 把 Hero 里那行硬编码 intro 收进数据层，并新增 `proof` / `cta`。

## 6. `about.ts`

About 内容（PRD 4.2：核心叙事 + 自动化例子 + 身份线）。
**注意：About 已于 2026-10-08 并入 Home（见 Roadmap Phase 4 决策表），本文件仍是唯一数据源，由首页渲染。**

```ts
export interface AboutExample {
  title: LocalizedText;         // 例子的名称，如 "LinkedIn AI Assistant"
  effect: LocalizedText;        // 一句话说明自动化了什么、谁受益
}

export interface AboutInfo {
  title: LocalizedText;         // section 标题
  narrative: LocalizedText;     // 核心叙事
  examples: AboutExample[];     // 自动化例子，并列展示（当前 **3 个**，见下）
  identity: LocalizedText;      // 身份线
}
```

- **例子数量订正：** PRD 4.2 与本节早期注释写「四个例子」，实际落库为 **3 个**（LinkedIn AI Assistant /
  接触角自动测量平台 / 便利店小程序）。原第 4 个是墨屿（MoYu），随项目终止移除
- Task 4-3：全部字段改 `LocalizedText`；组件内已无硬编码文案

## 7. `locales.ts`（Phase 4 新增）

全站双语化的基础类型 —— 所有面向用户的文案字段都用它。

```ts
export type Locale = "en" | "zh";

export interface LocalizedText {
  en: string;
  zh: string;
}
```

- **语言唯一事实源是 URL 的 `?lang=`**（缺省 `en`）；组件通过 `useLocale()` 读，不用 localStorage、不用 Context
- 不翻译的内容（URL、产品名、机构名、技术栈、题跋）保持 `string`，不套 `LocalizedText`
- ⚠️ `Locale` 类型只在 `data/locales.ts` 定义，`lib/router.tsx` **不 re-export** —— 组件需要类型时从 `data/locales` 引入

## 8. `shell.ts`（Phase 4 新增）

站点外壳文案：Header / Footer / 404 / 站点 metadata。

```ts
export const brand: string;                     // 品牌链接文字（两种语言均显示 "Steven Li"）
export const navItems: { path: string; label: LocalizedText }[];  // 五条路由导航
export const navigation: { label: LocalizedText };                 // <nav> 的 aria-label
export const languageSwitch: {                  // 语言切换
  groupLabel: LocalizedText;
  toEnglish: LocalizedText;                     // 无障碍名（含可见文字，见下）
  toChinese: LocalizedText;
  shortEnglish: string;                         // "EN"
  shortChinese: string;                         // "中文"
};
export const footer: { copyright: LocalizedText };
export const siteTitle: { base: LocalizedText; description: LocalizedText }; // document.title / meta
export const notFound: { title: LocalizedText; body: LocalizedText; homeLink: LocalizedText };
```

- 导航 = **5 项**（`/` `/projects` `/experience` `/art` `/contact`）；`/about` 已并入首页，仅保留 301 兜底
- **无障碍约束（Task 4-10 修正）：** `toEnglish` / `toChinese` 用作 `aria-label`，**必须包含该链接的可见文字**
  （`EN` / `中文`），否则违反 WCAG 2.5.3 Label in Name，Lighthouse/axe 报 `label-content-name-mismatch`。
  英文态与中文态各有一次触发机会，两处都要成立

## 9. 通用规则
- 所有 `id` 字段用 kebab-case（如 `"linkedin-ai"`），不是 camelCase——因为它可能被用作 HTML anchor / URL slug。
- 所有其他变量名用 camelCase。
- 缺失数据用 `null`，不用空字符串 `""`，方便前端统一判断"是否需要显示占位符"。
- 图片路径统一放在 `/src/assets/`，通过相对路径引用，不用外链图床。

## 10. 变更记录
- 2026-08-25（Bud）：`Project.tagline`、`Project.links.*` 改为可空类型（与示例及第 5 节规则对齐）；新增 `Project.description` 字段（PRD 4.3 卡片需要一段详细描述，原接口装不下）。
- 2026-08-26（Bud）：`Artwork.src` 改为可空类型（Phase 3 补图前用 null 占位，与第 5 节"缺失数据用 null"规则对齐）。
- 2026-08-27（Bud）：新增 `site.ts`（SiteInfo：name / tagline），承接 Hero 定位句——Phase 1 验收要求组件 JSX 无硬编码文案，Hero 文案需有数据归属。原第 5/6 节顺延为 6/7。
- 2026-08-27（Bud）：新增 `about.ts`（AboutInfo / AboutExample），承接 About 板块文案。原第 6/7 节顺延为 7/8。
- **2026-10-08（Bud，Phase 4 全站双语化）：** 本节 §1~§6 与实现已全面漂移，一次性对齐：
  - 新增 §7 `locales.ts`（`Locale` / `LocalizedText`）、§8 `shell.ts`（外壳文案），原 §7/§8 顺延为 §9/§10
  - `Project.tagline` → **`outcome`**；`links` 对象 → **具名数组 `ProjectLink[]`**（删除 `extensionId` / `liveLabel`）
  - 新增 `ContactLink.group`（`profile` / `project`）+ `projectLabel` 文案 → 承接 spec §4「CWS 归入 Project 标签」
  - `Artwork`：`alt` 改双语，新增 **`width` / `height`**（治 CLS），新增模块级开关 **`renderArtworkImages`**
  - `SiteInfo`：新增 `intro` / `proof` / `cta`（Hero 的硬编码文案收进数据层）
  - 除 `locale` / `shell` / `siteTitle` 外，所有用户可见文案一律 `LocalizedText`；**组件内零硬编码文案**（除注释）
  - `about.ts` 例子数量由「四个」订正为 **3 个**（第 4 个墨屿已随项目终止移除）
