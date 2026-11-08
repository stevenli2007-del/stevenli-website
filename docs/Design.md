# Design.md — UI 设计规范（Design Tokens）

> 本文件是视觉实现的契约。所有组件样式必须引用本文件 token，优先用 Tailwind 默认 scale 表达；需要精确色值时允许 arbitrary value（如 `text-[#1D1D1F]`）。不得引入本文件之外的第三方 UI 库。

风格基准：Apple 官网式极简——大留白、系统字体、灰阶层级、克制的单一强调色。

> ⚠️ **Phase 4（2026-10-08）起：`§3` `§4` `§5` `§6` `§7` 中与 §9 冲突的条目一律作废，以 §9 为准。**
> 本文件 §1 颜色系统与 §2 圆角/间距基本仍然有效（个别行已在原位更新）。新增实现前请先读 §9。
>
> 🟢 **2026-11-06 全面刷新（Phase 7 / 7b）**：§9 已按线上现状重写 —— ① 全站底色改宣纸米色 `#faf9f5`；
> ② Hero 加书法底图（覆盖此前「Hero 纯白无背景图」）；③ Art 页改横向滑动编辑式图集；
> ④ Experience 时间线改倒序（最近在上）。§1 表格同步更新；`§3~§7` 为历史记录，一律以 §9 为准。

---

## 1. 颜色系统（浅色主题，MVP 唯一主题）

| Token | 色值 | Tailwind 写法 | 用途 |
|---|---|---|---|
| `bg-page`（原 `bg-primary`） | `#faf9f5` | `bg-[#faf9f5]` | **页面 / section / header / body 主背景**（2026-11-06 起；原 `#FFFFFF` 不再是页面底） |
| `bg-block`（原 `bg-secondary`） | `#efede6` | `bg-[#efede6]` | About 区块暖灰底（原 `#F5F5F7` 已下线） |
| `surface` | `#FFFFFF` | `bg-white` | 卡片、图片容器、时间线空心节点、Art 白纸作品画框 |
| `frame-dark` | `#0B0B0C` | `bg-[#0B0B0C]` | Art 黑纸白墨作品的画框 |
| `hero-veil` | `#f8f6ee` @ 90% | `bg-[#f8f6ee]/90` | Hero 书法底图的遮罩层 |
| `divider-warm` | `#d8d3c8` | `border-[#d8d3c8]` | Header 下边线、About 卡片描边 |
| `text-primary` | `#1D1D1F` | `text-[#1D1D1F]` | 标题与正文主色 |
| `text-secondary` | `#6E6E73` | `text-[#6E6E73]` | 次要说明文字 |
| `text-tertiary` | `#59595E` | `text-[#59595E]` | caption / meta / 时间线年份 |
| `divider` | `#D2D2D7` | `border-[#D2D2D7]` | 分隔线、卡片描边、时间线竖线 |
| `accent` | `#0071E3` | `text-[#0071E3]` | 链接、交互强调（Apple 蓝，全站唯一强调色） |

> 文字色、divider、accent 自 Phase 4 起未变；2026-11-06 只换了**背景层与暖色描边**。
> **2026-11-06 全站配色已统一**：`src/components/Section.tsx`（仅 404 页使用）default → `#faf9f5`、muted → `#efede6`；Dev Log 单篇 `<article>` → `#faf9f5`、Dev Log 索引页空态卡 → `#efede6`。
> **刻意保留的 `bg-white` 属 `surface` token，不是遗漏**：Projects 卡片、时间线空心节点、Art 白纸作品画框。

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
| `grid-gap` | 16px | `gap-4` | 卡片网格间距（Art 已改横向图集，不再用 grid，见 §9.5） |

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
- ~~排列：数据正序 2022→2026（Database.md 已锁定，前端不排序）~~ → **⚠️ 已被 §9.4 覆盖：2026-11-06 起前端倒序渲染，最近在上**
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

- **六条独立路由**（`/`、`/projects`、`/experience`、`/dev-log`、`/art`、`/contact`）+ `/dev-log/<slug>` 深链；每页一个 `<section>` 自带背景：
  - 页面 / section / `body`：`bg-[#faf9f5]`（Hero 外的所有页面、Header、Education 区块、Art 页）
  - About 区块：`bg-[#efede6]`；About 内卡片 `bg-[#faf9f5]` + `border-[#d8d3c8]`
  - Dev Log 单篇 `<article>`、404 页 `Section` 均已统一为 `#faf9f5`；`Section` 的 muted 变体与 Dev Log 索引页空态卡为 `#efede6`
  - **刻意保留的白色 surface**：Projects 卡片 `bg-white`（米底上做卡片层次）、时间线空心节点、Art 白纸作品画框（跟作品纸底走）
  - `body` 兜底写在 `src/index.css`：`background:#faf9f5; color:#1d1d1f`
- 容器：`mx-auto w-full max-w-6xl px-6 py-16 md:py-20`（Art 页拆成 `pt-16 md:pt-20`，底部留白交给图集控制区）
- `Header`：`sticky top-0 z-50 border-b border-[#d8d3c8] bg-[#faf9f5]/95 backdrop-blur-sm`；内层 `mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-3`
  - 移动端（<768px）导航折成第二行横向滚动：`flex w-full gap-5 overflow-x-auto whitespace-nowrap pb-1 md:hidden`（**无汉堡菜单**）
- `Hero`（2026-11-06 起）：`relative isolate bg-cover bg-center` + 内联 `background-image: url(src/assets/home-calligraphy.jpg)`，上覆 `absolute inset-0 -z-10 bg-[#f8f6ee]/90` 遮罩保证文字对比度；静态图，无视频、无视差、无动效。
  **⚠️ 此条明确覆盖此前「Hero 纯白、无背景图」的约定**（该约定源于更早一次全幅背景被否决；本版用 90% 遮罩把底图压到近乎纸纹）。
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
- 排列（**2026-11-06 起，Steven 指定**）：**倒序，最近在上**（2026 暑期 → 2022 冬季）。数据层 `experience[]` 仍按时间正序维护，组件用 `[...experience].reverse()` 生成展示序列；数据顺序 ≠ 展示顺序
- 移动端与桌面端同规格（原「移动端缩至 h-2.5」的设想未实现，也不需要）

**配图（Phase 5.5 新增，2026-10-09）：**

- 条目结构：`mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8` —— 文字左、图右；`lg` 以下单列，图**落在文字下方**
- 图：`w-full max-w-[22rem] self-start rounded-xl border border-[#D2D2D7] lg:max-w-none`（窄屏限宽 22rem，防竖幅图占满整屏）
- **不裁切**：保留原始比例，`width` / `height` 写**文件实际像素**（防 CLS）；故各行图高不同（193~469px），属预期
- 加载：**仅首条** `loading="eager"` + `fetchPriority="high"`，其余 `loading="lazy"` + `decoding="async"` —— 倒序后首条 = 2026 受邀助教条目，它同时是首屏图、实心节点与「受邀」徽章所在
- 素材：`src/assets/experience/*.jpg`，最长边 880px / quality 80 / progressive（8 张共 628KB）
- `alt` 必填且双语（`imageAlt: LocalizedText`），见 §9.6

### 9.5 Art 页 —— 横向滑动编辑式图集（2026-11-06 Phase 7 重写）

> 本节为**现行规范**。早期的「两列 masonry + 原图比例 + 占位框」已被 Steven 明确推翻，历史见文末。

- 页面 `bg-[#faf9f5]`；标题 / intro / 小注在 `max-w-6xl px-6 pt-16 md:pt-20` 容器内，小注 `mt-3 text-sm text-[#6E6E73]`（`artworksNote`：`四幅作品 · 行草` / `Four works · Cursive script`）
- 素材：`src/assets/art/gallery-1~4.jpg`，四张成品图**字节级原样展示** —— 装裱、朱红引号、竖排小注 / 题注、青杏配画全在图内；网页**不拆元素、不裁切主图、不加配文、不加题跋**。第四张（2026-11-07 追加）为黑底白纸横幅 + 狼毫小蘭竹题注，`tone: 'dark'`
- 数据层：`Artwork = { id, src, alt: LocalizedText, width, height, tone: 'light' | 'dark' }`；
  `tone` 决定该 slide 的画框底色（白纸 → `bg-white`，黑纸白墨 → `bg-[#0B0B0C]`）。横滑时整块画布随作品推进，**无 JS 改色、无淡入**
- 主舞台：track `flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]`；
  slide `relative flex w-full flex-none snap-start items-center justify-center overflow-hidden px-0 py-8 sm:px-8 md:px-16 md:py-14`
- 主图：`relative h-auto max-h-[62vh] w-auto max-w-full object-contain md:max-h-[68vh]`；`width`/`height` 写文件实际像素防 CLS；首图 `loading="eager"` + `fetchPriority="high"`，其余 `lazy` + `decoding="async"`
- 角落超大编号 `01/02/…`：`md:block text-[88px] lg:text-[140px]`，浅画布 `text-[#1D1D1F]/[0.06]`、深画布 `text-white/10`，`aria-hidden`（**画框装饰，不叠在作品图上**）
- 控制区：细线进度段（`h-px flex-1`，走过的 `bg-[#1D1D1F]`）→ `01 / 04` 计数 → 同步缩略图条（`aspect-[4/3] object-cover`，仅缩略图裁切；当前 `border-[#1D1D1F] opacity-100`，其余 `opacity-50`）→ 极简圆形箭头
  - 桌面箭头浮在画面两侧，颜色随当前 `tone` 切换；移动端收回控制区，主要靠手指横滑
- 交互：原生 `overflow-x` + CSS scroll-snap，支持触摸横滑 / 触控板 / 缩略图跳转 / 方向键；**零依赖、无自动播放、无视差、无过渡动效**
- 无障碍：`role="region"` + `tabIndex=0` + 方向键导航；每图双语 `alt`；缩略图 `aria-current` 与双语 `aria-label`；箭头 `aria-label` 含可见字符 `←` / `→`（WCAG 2.5.3）；全部控件文案住 `artworks.ts`
- 滚动条隐藏**写在组件上的 Tailwind 任意属性类**，不写进 `src/index.css`（该文件已有全站配色规则，避免耦合）
- **禁止**：自动播放、视差、淡入缩放、阴影、位移/缩放动效；仅 hover 的 color / opacity 微变化

> 历史沿革：Phase 4~5.5 的规范是 `columns-1 gap-4 md:columns-2` 两列 masonry、题跋 `mt-3 text-right` 原繁体、以及 `renderArtworkImages = false` 的等比占位框（曾因真图拖慢移动端 Lighthouse 到 87 而启用）。2026-11-06 Steven 明确覆盖：改为三幅成品图的横向图集（**2026-11-07 追加第四幅，现为四幅**），`renderArtworkImages` 开关删除，`orientation` / `captionZh` / `artwork-1~4` 均下线（旧图留仓库归档）。参考形态：Swiper「Photo Gallery – Minimal」、Bridget Baker 摄影集、contact sheet 缩略图条。实现细节见 `src/components/Art.tsx` 顶部注释。

### 9.6 无障碍硬约束（Phase 4 新增）

- 语言切换链接的 `aria-label` **必须包含可见文字**（`EN` / `中文`）—— WCAG 2.5.3 Label in Name。英文态与中文态各有一次触发机会，两处都要成立
- 装饰性元素（状态圆点、时间线节点）加 `aria-hidden="true"`
- 图片必须有 `alt`；Art 图集另需 `role="region"` 可聚焦 + 方向键导航 + 缩略图 `aria-current`（见 §9.5）
- 导航与链接带 `focus-visible` 焦点样式（`focusRing`，见 `Header.tsx`）
- **Lighthouse / axe 权重为 0 的项也必须修** —— 分数满分不代表没有真实缺陷

### 9.7 动效（替代 §7，2026-11-06 修订）

- 允许的交互反馈：`hover:underline`（链接）、Art 图集控件的 color / opacity 微变化（`transition-colors` / `transition-opacity`）
- 禁止：阴影过渡、位移/缩放、滚动触发动画、淡入序列、parallax、hero video、**自动播放的轮播**
- **允许**由用户主动驱动的横向 scroll-snap 图集（Art 页）——§7 的「全站无图片轮播」与早期「禁止轮播」指的是自动播放 / 自动切换，不禁止用户手动横滑；Art 页的 `aria-roledescription="carousel"` 只是读屏语义
- Hero 书法底图是静态背景，不参与任何动效
