# Design.md — UI 设计规范（Design Tokens）

> 本文件是视觉实现的契约。所有组件样式必须引用本文件 token，优先用 Tailwind 默认 scale 表达；需要精确色值时允许 arbitrary value（如 `text-[#1D1D1F]`）。不得引入本文件之外的第三方 UI 库。

风格基准：Apple 官网式极简——大留白、系统字体、灰阶层级、克制的单一强调色。

> ⚠️ **Phase 4（2026-10-08）起：`§3` `§4` `§5` `§6` `§7` 中与 §9 冲突的条目一律作废，以 §9 为准。**
> 本文件 §1 颜色系统与 §2 圆角/间距基本仍然有效（个别行已在原位更新）。新增实现前请先读 §9。

---

## 1. 颜色系统（浅色主题，MVP 唯一主题）

| Token | 色值 | Tailwind 写法 | 用途 |
|---|---|---|---|
| `bg-primary` | `#FFFFFF` | `bg-white` | 页面主背景 |
| `bg-secondary` | `#F5F5F7` | `bg-[#F5F5F7]` | 交替 section 背景（制造节奏，如 About / Art 用灰底） |
| `text-primary` | `#1D1D1F` | `text-[#1D1D1F]` | 标题与正文主色 |
| `text-secondary` | `#6E6E73` | `text-[#6E6E73]` | 次要说明文字 |
| `text-tertiary` | `#59595E` | `text-[#59595E]` | caption / meta / 时间线年份 |
| `divider` | `#D2D2D7` | `border-[#D2D2D7]` | 分隔线、卡片描边 |
| `accent` | `#0071E3` | `text-[#0071E3]` | 链接、交互强调（Apple 蓝，全站唯一强调色） |

### 状态标识（Projects 卡片）— Phase 4 起（替代原彩色徽章）

状态**不再做成彩色药丸徽章**（spec §3 诊断：徽章比证据本身更抢眼），改为一行「圆点 + 小字」：

| 状态 | 圆点色 | Tailwind 写法 |
|---|---|---|
| `live` | `#34C759` | `bg-[#34C759]` |
| `in-development` | `#FF9F0A` | `bg-[#FF9F0A]` |
| `published` | `#5E5CE6` | `bg-[#5E5CE6]` |

- 行：`inline-flex items-center gap-2 self-start text-sm font-medium text-[#6E6E73]`
- 圆点：`h-2 w-2 rounded-full` + `aria-hidden="true"`
- 文案取自 `statusLabels`（LocalizedText），组件不硬编码
- 色值本身沿用原表（三个状态色仍是全站唯一的多色例外）
- **时间线 badge**（星空少年 / 受邀）仍为徽章形态，见 §9

> 原「彩色药丸徽章」定义（`rounded-full px-3 py-0.5 text-xs font-medium` + 底色/文字对照表）**已作废**。

---

## 2. 圆角与间距

| Token | 值 | Tailwind 写法 | 用途 |
|---|---|---|---|
| `radius-card` | 16px | `rounded-2xl` | 项目卡片、图片容器 |
| `radius-badge` | 全圆 | `rounded-full` | 徽章、按钮 |
| `section-padding-y` | 桌面 80px / 移动 64px | `py-16 md:py-20`（**Phase 4 更新**；原 `py-16 md:py-24`） | section 上下留白 |
| `container` | 最大 1152px | `max-w-6xl mx-auto px-6` | 全站统一容器 |
| `card-padding` | 24px | `p-6` | 卡片内边距 |
| `card-gap` | 24px | `gap-6` | 卡片间距 |
| `grid-gap` | 16px | `gap-4` | Art 图廊图片间距 |

---

## 3. 字体与字号层级 —— ⚠️ 已作废，见 §9

字体栈（全站默认，TechStack.md 已锁定）：
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```
Art 板块中文标题（Phase 3 引入 Noto Serif SC）：
```css
font-family: "Noto Serif SC", serif;
```

| 层级 | Size / Weight / Line-height | Tailwind 写法 | 用途 |
|---|---|---|---|
| `h1` | 48/600/1.1（桌面 60px） | `text-5xl md:text-6xl font-semibold tracking-tight leading-tight` | Hero 定位句 |
| `h2` | 30/600/1.2（桌面 36px） | `text-3xl md:text-4xl font-semibold tracking-tight` | section 标题 |
| `h3` | 20/600 | `text-xl font-semibold` | 卡片标题 |
| `body` | 16/400/1.6 | `text-base leading-relaxed` | 正文 |
| `body-lg` | 18/400/1.6 | `text-lg leading-relaxed` | About 叙事段 |
| `caption` | 14/400 | `text-sm text-[#6E6E73]` | 卡片 meta、时间线年份、题跋说明 |

---

## 4. 卡片规范（Projects）—— ⚠️ 已作废，见 §9

- 容器：`bg-white border border-[#D2D2D7] rounded-2xl p-6`
- hover 态：`hover:shadow-md transition-shadow duration-300`（仅阴影变化，无位移缩放）
- 内部结构（自上而下）：状态徽章 → 标题（h3）→ tagline（body）→ description（caption 或 body）→ techStack 小字列表 → 链接区（accent 色文字链）
- 链接样式：`text-[#0071E3] hover:underline`，新窗口打开加 `target="_blank" rel="noreferrer"`
- 布局：桌面 `grid grid-cols-3 gap-6`，移动 `grid-cols-1`

---

## 5. 时间线规范（Experience）—— ⚠️ 已作废，见 §9

**核心要求：学员 vs 受邀助教两种身份必须靠视觉区分，不用文字强调。**

| 元素 | 学员（student） | 受邀助教（invited-ta） |
|---|---|---|
| 节点圆点 | 空心：`h-3 w-3 rounded-full border-2 border-[#D2D2D7] bg-white` | 实心：`h-3 w-3 rounded-full bg-[#1D1D1F]` + 外圈 `ring-2 ring-[#1D1D1F]/10` |
| 节点机构名 | `font-medium text-[#1D1D1F]` | `font-semibold text-[#1D1D1F]`（更重） |

- 竖线：`w-px bg-[#D2D2D7]` 贯穿节点左侧
- 年份：`text-sm text-[#59595E]`（caption 层级）
- badge（星空少年）：复用状态徽章样式，`bg-[#6E6E73] text-white rounded-full text-xs`
- 排列：数据正序 2022→2026（Database.md 已锁定，前端不排序）
- 移动端：节点圆点缩至 `h-2.5 w-2.5`（桌面 `h-3 w-3`），竖线对应内移；机构名与描述同列堆叠

---

## 6. Art 图廊规范 —— ⚠️ 已作废，见 §9

- 布局：桌面两列 masonry 风格可用 `columns-2 gap-4`（纯 CSS，不引入 masonry 库）；移动单列 `columns-1`
- 图片：`rounded-xl`，`loading="lazy"`，宽度撑满列宽
- 题跋（captionZh）：图片下方 `text-sm text-[#6E6E73]`，右对齐（书法落款习惯）
- 中文内容保留原文，不翻译

---

## 7. 交互与动效约束 —— ⚠️ 已作废，见 §9

- 唯一允许的动效：hover 阴影过渡（`transition-shadow duration-300`）
- 禁止：滚动触发动画、淡入序列、parallax、hero video（PRD + TechStack 双重锁定）
- 全站无图片轮播（carousel）

---

## 8. 深色模式

非 MVP（PRD 第 5 节）。Phase 3 之后如需追加，先修订本文件补一套 dark token，再动代码。

---

## 9. Phase 4（v3）现行视觉规范

> 2026-10-08 定稿。**本节替代 §3~§7 中与它冲突的条目。** 依据 `design-spec-v3.md`（Codex 设计）
> + Steven 的即时决策（`Roadmap.md` Phase 4 决策表）。所有类名以 `src/components/` 实现为准。

### 9.1 版面骨架

- **五条独立路由**，每页一个 `<section>` 自带背景：首页 / Projects / Experience / Contact 白底；About 区块与 Art 页 `#F5F5F7`
- 容器：`mx-auto w-full max-w-6xl px-6 py-16 md:py-20`
- `Header`：`sticky top-0 z-50 border-b border-[#D2D2D7] bg-white/95 backdrop-blur-sm`；内层 `mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-3`
  - 移动端（<768px）导航折成第二行横向滚动：`flex w-full gap-5 overflow-x-auto whitespace-nowrap pb-1 md:hidden`（**无汉堡菜单**）
- `Footer`：`border-t` + 一行版权（两种语言都用 legal name）
- 语言切换：`inline-flex rounded-full border border-[#D2D2D7] p-1 text-xs`，当前语言 `font-medium text-[#1D1D1F]`，另一项 `text-[#6E6E73] hover:text-[#1D1D1F]`

### 9.2 字号层级（替代 §3）

| 用途 | 类名 |
|---|---|
| Hero H1（定位句） | `text-4xl font-semibold tracking-tight leading-tight md:text-5xl` |
| 页面 H1（五个页面标题） | `text-3xl font-semibold tracking-tight md:text-4xl` |
| 区块 H2（About 标题 / 卡片标题） | `text-xl font-semibold text-[#1D1D1F]` |
| 时间线机构名（H2） | `text-lg`，受邀助教 `font-semibold`、学员 `font-medium` |
| 页面 intro 段 | `mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]` |
| 卡片 outcome | `text-base font-medium text-[#1D1D1F]` |
| 正文 / 描述 | `text-sm leading-relaxed text-[#6E6E73]` |
| meta（关键词 / 状态行） | `text-xs`；period 另加 `font-medium uppercase tracking-wide` |
| 题跋 | `text-sm text-[#6E6E73]` + `font-family: "Noto Serif SC", serif` |

**硬规则：每页恰好一个 `<h1>`**（首页的 h1 给 Hero 定位句，About 标题因此降为 h2）；标题层级不得跳级。

### 9.3 Projects 卡片（替代 §4）

- 网格：`mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2` —— **两列**（原三列会让两张卡留出空位）
- 卡片：`flex h-full flex-col rounded-2xl border border-[#D2D2D7] bg-white p-6 md:p-7`
- 内部顺序（自上而下）：**状态圆点行 → 标题(H2) → outcome → description → Stack（`mt-5 border-t border-[#D2D2D7] pt-4`）→ 链接（`mt-auto` 贴底）**
- Stack 行：`text-xs leading-relaxed text-[#6E6E73]`，标签 `font-medium text-[#59595E]`，条目以 ` · ` 连接
- 链接：`text-sm font-medium text-[#0071E3]` + `hover:underline`，`target="_blank" rel="noreferrer"`，**文案具名**（"Chrome Web Store listing" 而非 "View"）
- **无 hover 阴影、无位移动效**（原 `hover:shadow-md transition-shadow duration-300` 已删除）

### 9.4 Experience 时间线（替代 §5）

- 列表：`relative mt-8 space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[#D2D2D7]`
- 条目：`relative pl-8`
- 节点（`aria-hidden="true"`，`absolute left-0 top-1.5 h-3 w-3 rounded-full`）：
  - 学员：空心 `border-2 border-[#D2D2D7] bg-white`
  - 受邀助教：实心 `bg-[#1D1D1F]` + `ring-4 ring-[#1D1D1F]/10`（比原 `ring-2` 更明显）
- period：`text-xs font-medium uppercase tracking-wide text-[#6E6E73]`
- badge：`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-white` —— 受邀 `bg-[#1D1D1F]`、星空少年 `bg-[#6E6E73]`
- 排列：数据正序 2022→2026，前端不排序
- 移动端与桌面端同规格（原「移动端缩至 h-2.5」的设想未实现，也不需要）

### 9.5 Art 页（替代 §6）

- 页面 `bg-[#F5F5F7]`；intro + 小注（`mt-3 text-sm text-[#6E6E73]`）
- 画廊：`mt-8 columns-1 gap-4 md:columns-2` —— **保留两列 masonry 与图片原始比例**
  （曾改成三列 + `max-h-[420px] object-cover`，被判定更差并回滚；要再动必须先出方案）
- 作品卡：`mb-4 break-inside-avoid rounded-2xl border border-[#D2D2D7] bg-white p-3`；题跋 `mt-3 text-right`
- 图片：`w-full rounded-xl`，**必须同时写 `width` / `height`**（预留空间，防 CLS）
- **占位模式**（`renderArtworkImages = false`，当前状态）：渲染等比占位框 `w-full rounded-xl border border-[#D2D2D7] bg-[#F5F5F7]` + `role="img"` + `aria-label`；
  宽高比取自 `width`/`height`（**不是 `aspect-[3/4]`**），故切回真图不跳版
- 真图模式：首图 `loading="eager"` + `fetchPriority="high"`，其余 `loading="lazy"` + `decoding="async"`
- 禁止：给作品叠加序号/水印、轮播；题跋两语言下均显示原繁体

### 9.6 无障碍硬约束（Phase 4 新增）

- 语言切换链接的 `aria-label` **必须包含可见文字**（`EN` / `中文`）—— WCAG 2.5.3 Label in Name。英文态与中文态各有一次触发机会，两处都要成立
- 装饰性元素（状态圆点、时间线节点）加 `aria-hidden="true"`
- 图片必须有 `alt`；占位框用 `role="img"` + `aria-label`
- 导航与链接带 `focus-visible` 焦点样式（`focusRing`，见 `Header.tsx`）
- **Lighthouse / axe 权重为 0 的项也必须修** —— 分数满分不代表没有真实缺陷

### 9.7 动效（替代 §7）

- 全站唯一的交互反馈是 `hover:underline`（链接）
- 禁止：阴影过渡、位移/缩放、滚动触发动画、淡入序列、parallax、hero video、轮播
