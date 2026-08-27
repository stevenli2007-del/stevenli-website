# Database.md — Data Dictionary

> 本站没有真实数据库，但"内容即数据"——所有文案、链接、图片路径都以下面这套结构存放在 `/src/data/*.ts` 里。命名统一用 **camelCase 英文变量名**，绝不允许出现 `snake_case` 或中英混用变量名（如 `user_id`、`xiangmuName` 一律禁止）。中文内容作为**字符串值**没问题，只是变量名必须是英文 camelCase。

## 1. `projects.ts`

```ts
export interface Project {
  id: string;                 // 唯一标识，如 "linkedin-ai"
  title: string;
  status: "live" | "in-development" | "published";
  tagline: string | null;      // 一句话描述；待补时为 null
  description: string | null;  // 卡片详细描述（PRD 4.3 的英文长句）；待补时为 null
  techStack: string[];
  links: {
    github: string | null;
    live: string | null;       // 如 Chrome Web Store 链接；待补时为 null
    extensionId?: string;      // 仅 Chrome extension 用
  };
  order: number;                // 展示顺序，1-3
}
```

示例条目（IEEE 论文，占位符字段用 `null`，前端渲染时判断显示"待补"）：
```ts
{
  id: "ieee-paper",
  title: "IEEE Paper — CdSe Quantum Dots / Si Solar Cells",
  status: "published",
  tagline: null, // 待补：论文准确题目
  description: null, // 待补：一段式研究描述
  techStack: [],
  links: { github: null, live: null }, // 待补：venue 链接
  order: 3,
}
```

## 2. `experience.ts`

```ts
export interface ExperienceEntry {
  id: string;
  period: string;              // 如 "2022 Winter"
  institution: string;
  description: string;
  keywords: string[];
  badge?: string;               // 如 "星空少年"，可选
  role: "student" | "invited-ta"; // 用于视觉区分学员 vs 受邀助教
}
```

数组按时间正序排列（2022 → 2026），前端不做排序逻辑，数据顺序即展示顺序。

## 3. `artworks.ts`

```ts
export interface Artwork {
  id: string;
  src: string | null;           // /assets/art/xxx.jpg；Phase 3 补图前为 null，前端渲染占位图
  alt: string;
  orientation: "horizontal" | "vertical"; // 横幅 / 条幅
  captionZh?: string;            // 可选中文题跋
}
```

## 4. `contact.ts`

```ts
export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string | null;      // 待补
  chromeWebStore: string;
}
```

## 5. `site.ts`

站点级文案（Hero 定位句等不属于任何单一 section 的内容）。

```ts
export interface SiteInfo {
  name: string;                 // 站点标题 / 姓名
  tagline: string;              // Hero 定位句，如 "Builder · Calligrapher · UC Berkeley 2030"
}
```

## 6. `about.ts`

About 板块内容（PRD 4.2：核心叙事 + 四个自动化例子 + 身份线）。

```ts
export interface AboutExample {
  title: string;                // 如 "LinkedIn AI Assistant"
  effect: string;               // 一句话说明自动化了什么，如 "Automates networking"
}

export interface AboutInfo {
  title: string;                // section 标题，如 "About"
  narrative: string;            // 2-3 行核心叙事
  examples: AboutExample[];     // 四个自动化例子，并列展示
  identity: string;             // 身份线，如 "Shenzhen → UC Berkeley 2030, ..."
}
```

## 7. 通用规则
- 所有 `id` 字段用 kebab-case（如 `"linkedin-ai"`），不是 camelCase——因为它可能被用作 HTML anchor / URL slug。
- 所有其他变量名用 camelCase。
- 缺失数据用 `null`，不用空字符串 `""`，方便前端统一判断"是否需要显示占位符"。
- 图片路径统一放在 `/src/assets/`，通过相对路径引用，不用外链图床。

## 8. 变更记录
- 2026-08-25（Bud）：`Project.tagline`、`Project.links.*` 改为可空类型（与示例及第 5 节规则对齐）；新增 `Project.description` 字段（PRD 4.3 卡片需要一段详细描述，原接口装不下）。
- 2026-08-26（Bud）：`Artwork.src` 改为可空类型（Phase 3 补图前用 null 占位，与第 5 节"缺失数据用 null"规则对齐）。
- 2026-08-27（Bud）：新增 `site.ts`（SiteInfo：name / tagline），承接 Hero 定位句——Phase 1 验收要求组件 JSX 无硬编码文案，Hero 文案需有数据归属。原第 5/6 节顺延为 6/7。
- 2026-08-27（Bud）：新增 `about.ts`（AboutInfo / AboutExample），承接 About 板块文案。原第 6/7 节顺延为 7/8。
