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
  status: "live" | "beta" | "submission" | "in-development" | "published";
  outcome: LocalizedText;       // 一句话成果（**替代原 tagline**）
  description: LocalizedText;   // 卡片详细描述（PRD 4.3 的英文长句）
  techStack: string[];          // 技术栈（专有名词，不翻译）
  links: ProjectLink[];         // **具名链接数组**（替代原 links 对象）
  order: number;                // 展示顺序，1-4（Phase 5 起四张卡）
}
```

同文件另导出：`projectsTitle` / `projectsIntro` / `stackLabel` / `statusLabels`（`Record<Project["status"], LocalizedText>`）。

**Phase 4 Task 4-3 变更：**
- `tagline: string | null` → **`outcome: LocalizedText`** —— 语义从「一句话描述」升级为「一句话成果」，卡片里置于标题之下、描述之上
- `links: { github, live, extensionId?, liveLabel? }` → **`links: ProjectLink[]`** —— 链接按目的命名；`extensionId` / `liveLabel` 两个派生字段**已删除**（链接文案不再靠 ID 推断）
- 全部 `string` → `LocalizedText`；`null` 已无残留（两条目字段全满）

**Phase 5 变更（2026-10-09，事实基准 = Steven 的 NVIDIA 申请版简历）：**
- `status` 新增 **`beta`**（Tempo，公开测试 + **持续开发**）与 **`submission`**（Cal Hacks 门户，个人项目已提交）
- Steven 2026-10-09 追加指示：Cal Hacks 的可见文案里**不要出现 "take-home" 字样**；Tempo 是持续项目，
  description 需把简历提到的功能**写全**（学习计划 / 学习笔记 / 考试复习总结 / 真题自测卷）
- 条目由 2 条 → **4 条**，展示顺序由 Steven 拍板：**IEEE 论文 → Tempo → Cal Hacks 门户 → LinkedIn AI Assistant**
- Moyu 已于 2026-09-01 全站移除，**本文件不再有 Moyu 条目**；不得写成活跃产品或 "Present"
- ⚠️ 简历里 Tempo 的 "generates semester-long and daily study plans" **未写入 `description`** ——
  Tempo `docs/Database.md` 中 `study_plans` / `plan_items` 标注为 Phase 2，仓库内无实现证据。
  待 Steven 确认后决定是否补回（见 `docs/phase-5-resume-addendum.md` 二-A）

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
export interface ExperienceImage {
  src: string;
  width: number;   // 处理后文件的实际像素宽（写进 <img width>，防 CLS）
  height: number;
}

export interface ExperienceEntry {
  id: string;
  period: LocalizedText;        // 如 "2022 Winter" / "2022 冬季"；月度节点用 "2023 June" / "2023 年 6 月"
  institution: LocalizedText;   // 机构名（专有名词部分保持原文）
  description: LocalizedText;
  keywords: LocalizedText[];    // 关键词（**双语数组**）
  badge?: LocalizedText;        // 「星空少年」/「受邀」，可选
  role: "student" | "invited-ta"; // 用于视觉区分学员 vs 受邀助教
  image: ExperienceImage;       // 配图（Phase 5.5 新增）
  imageAlt: LocalizedText;      // 配图 alt，双语（spec §9.6）
}
```

同文件另导出：`experienceTitle` / `experienceIntro`。

**Phase 4 Task 4-3 变更：** 五个 `string` 字段全部改 `LocalizedText`；2026 节点新增
`badge: { en: "Invited", zh: "受邀" }`（3-1 起的时间线视觉区分现在有了文字徽章支撑）。

**Phase 5.5 变更（2026-10-09）：** 数组由 5 条扩至 **8 条**，并为每条新增 `image` + `imageAlt`。
- ESAP 拆两条：`upenn-esap-lab-2024`（2024-07~08 洁净间制备）与 `upenn-esap-paper`（2024-08~2025-09 成文发表）
- 新增两个毕业节点：`whittle-2023`（2023-06 荟同学校）、`scie-2026`（2026-06 深圳国际交流学院）
- 图片住 `src/assets/experience/`，`docs/Design.md` §9.4 规定渲染方式（不裁切、写实际宽高、首图 eager）
- ⚠️ 毕业节点 `keywords: []` —— 组件对空数组不渲染关键词行

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

- 导航 = **6 项**（`/` `/projects` `/experience` `/dev-log` `/art` `/contact`）；`/about` 已并入首页，仅保留 301 兜底
  - **Phase 5（2026-10-09）：** 新增 `/dev-log`（开发日志），位于 Experience 与 Art 之间；路由由 5 变 6
- **无障碍约束（Task 4-10 修正）：** `toEnglish` / `toChinese` 用作 `aria-label`，**必须包含该链接的可见文字**
  （`EN` / `中文`），否则违反 WCAG 2.5.3 Label in Name，Lighthouse/axe 报 `label-content-name-mismatch`。
  英文态与中文态各有一次触发机会，两处都要成立

## 9. `education.ts`（Phase 5 新增）

```ts
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
  school: string;               // 校名（两种语言一致，故不拆 LocalizedText）
  program: LocalizedText;       // 专业
  detail: LocalizedText;        // 届别 + 转学分
  coursesLabel: LocalizedText;
  courses: string[];            // 课程名（专有名词，不翻译）
}
```

同文件另导出：`educationTitle` / `awardsTitle` / `skillsTitle` / `education` / `awards` / `skillGroups`。

**事实基准（Steven 2026-10-09 拍板）：**
- 专业写作 **`Engineering Physics & Computer Science`** —— 旧记录的「L&S → 主修 EECS」作废
- 奖项 4 条、技能 3 组，一律照简历原文；课程名 / 竞赛名 / 工具名不翻译
- 渲染位置：Home 页 About 区块之后（`src/components/Education.tsx`）
  - 标题层级：Home 的 h1 在 Hero、About 已是 h2，故本区块 h2 = Education，
    **Awards 与 Technical Skills 降为 h3**（避免三个同级大标题，也不跳级）

## 10. `devLog.ts`（Phase 5 新增，Phase 6 升级）

```ts
// Phase 6：正文块 —— 段落 / 小标题 / 图片。装得下图与小标题才有法写带图文章
export type DevLogBlock =
  | { type: 'p'; text: LocalizedText }
  | { type: 'h'; text: LocalizedText }
  | {
      type: 'img'
      src: string
      width: number          // 处理后文件的实际像素（写进 <img width> 防 CLS）
      height: number
      alt: LocalizedText     // 双语 alt 必填
      caption?: LocalizedText
    }

export interface DevLogPost {
  id: string;                 // 唯一标识，**同时是单篇路由 slug**（/dev-log/<id>）
  date: string;               // 显示用日期，如 "2026-10"；不确定就只写年份
  category: LocalizedText;    // Dev / Lab / Research …（Phase 6 放宽到非 shipped 项目）
  title: LocalizedText;
  summary: LocalizedText;     // 一句话 takeaway，索引页展示
  body: DevLogBlock[];        // 正文
}
```

同文件另导出：`devLogTitle` / `devLogIntro` / `devLogEmpty` / `devLogPosts` / `devLogBackToIndex` /
`devLogReadMore` / `devLogFigureLabel` / `findDevLogPost(id)`。

**形态（Phase 6 定案，见 Roadmap 6-4）：** `/dev-log` 为索引页（卡片 → `Read`），
单篇走独立路由 **`/dev-log/<slug>`**（`App.tsx` 前缀匹配，约 15 行，不引路由库；
线上 Worker 侧 `not_found_handling = single-page-app`，深路径零配置可用）。

**硬约束：**
- 每篇必须来自 Steven 确认过的真实经历；**未确认的细节一律不写**（Phase 6 改稿时同上）
- 一篇文章必须回答：想做什么 · 试了或决定了什么 · 什么变了或失败了 · 下次怎么做
- 来源只能是已确认的项目事实；**不得从项目名称臆造复盘**
- 文章内**不点名学生**；学生正脸可用（Steven 有授权）
- 双语**功能对等**，不直译；技术论断处一律平实
- 写作契约全文见 `docs/Roadmap.md`「Dev Log 写作契约」

**首篇（Phase 6，2026-10-09）：** `x-institute-ta-2026` —— 2026 夏 X-Institute 受邀助教十天，
category `Lab`，全文由 Steven 口述采访整理（Bud 提问 → Steven 回答 → 整理成稿）。
仍缺（后续可补）：岔子/翻车、腾讯参访细节、十天具体日期。

## 11. 通用规则
- 所有 `id` 字段用 kebab-case（如 `"linkedin-ai"`），不是 camelCase——因为它可能被用作 HTML anchor / URL slug。
- 所有其他变量名用 camelCase。
- 缺失数据用 `null`，不用空字符串 `""`，方便前端统一判断"是否需要显示占位符"。
- 图片路径统一放在 `/src/assets/`，通过相对路径引用，不用外链图床。

## 12. 变更记录
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
- **2026-10-09（Bud，Phase 5 简历事实基准落地）：**
  - 新增 **§9 `education.ts`**（`EducationInfo` / `Award` / `SkillGroup`）、**§10 `devLog.ts`**（`DevLogPost`）；原 §9/§10 顺延为 §11/§12
  - `Project.status` 新增 **`beta`** 与 **`submission`**；`order` 范围 1-2 → **1-4**
  - `shell.ts` 导航由 **5 项 → 6 项**（新增 `/dev-log`，位于 Experience 与 Art 之间）；`siteTitle.description` 补入 Tempo
  - `site.ts` 的 `proof`、`about.ts` 的 `identity` 按简历更新（专业 = Engineering Physics & Computer Science）
  - ⚠️ 简历中 Tempo 的「semester-long and daily study plans」**未入站**（无实现证据），见 `docs/phase-5-resume-addendum.md`
- **2026-10-09（Bud，Phase 6 Dev Log 首批内容）：**
  - §10 `DevLogPost.body` 由 `LocalizedText[]` 升级为 **`DevLogBlock[]`**（`p` / `h` / `img`，图片带双语 alt 与 width/height）；`topic` → **`category`**
  - `devLog.ts` 新增 `findDevLogPost(id)`、`devLogBackToIndex`、`devLogReadMore`、`devLogFigureLabel`；`devLogIntro` 按契约放宽为「上线与否都算」
  - 新增单篇路由 **`/dev-log/<slug>`**（`App.tsx` 前缀匹配 + `components/DevLogPostPage.tsx`）；`/dev-log` 改索引页；Header 子路径高亮
  - 首篇文章落库：`x-institute-ta-2026`（category `Lab`，中英全文来自 Steven 口述采访）
