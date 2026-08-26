# Design.md — UI 设计规范（Design Tokens）

> 本文件是视觉实现的契约。所有组件样式必须引用本文件 token，优先用 Tailwind 默认 scale 表达；需要精确色值时允许 arbitrary value（如 `text-[#1D1D1F]`）。不得引入本文件之外的第三方 UI 库。

风格基准：Apple 官网式极简——大留白、系统字体、灰阶层级、克制的单一强调色。

---

## 1. 颜色系统（浅色主题，MVP 唯一主题）

| Token | 色值 | Tailwind 写法 | 用途 |
|---|---|---|---|
| `bg-primary` | `#FFFFFF` | `bg-white` | 页面主背景 |
| `bg-secondary` | `#F5F5F7` | `bg-[#F5F5F7]` | 交替 section 背景（制造节奏，如 About / Art 用灰底） |
| `text-primary` | `#1D1D1F` | `text-[#1D1D1F]` | 标题与正文主色 |
| `text-secondary` | `#6E6E73` | `text-[#6E6E73]` | 次要说明文字 |
| `text-tertiary` | `#86868B` | `text-[#86868B]` | caption / meta / 时间线年份 |
| `divider` | `#D2D2D7` | `border-[#D2D2D7]` | 分隔线、卡片描边 |
| `accent` | `#0071E3` | `text-[#0071E3]` | 链接、交互强调（Apple 蓝，全站唯一强调色） |

### 状态徽章配色（Projects 卡片）

| 状态 | 底色 | 文字 | Tailwind 写法 |
|---|---|---|---|
| `live` | `#34C759` | `#FFFFFF` | `bg-[#34C759] text-white` |
| `in-development` | `#FF9F0A` | `#FFFFFF` | `bg-[#FF9F0A] text-white` |
| `published` | `#5E5CE6` | `#FFFFFF` | `bg-[#5E5CE6] text-white` |

徽章统一 `rounded-full px-3 py-0.5 text-xs font-medium`。

---

## 2. 圆角与间距

| Token | 值 | Tailwind 写法 | 用途 |
|---|---|---|---|
| `radius-card` | 16px | `rounded-2xl` | 项目卡片、图片容器 |
| `radius-badge` | 全圆 | `rounded-full` | 徽章、按钮 |
| `section-padding-y` | 桌面 96px / 移动 64px | `py-24 md:py-16` 反之——移动优先写 `py-16 md:py-24` | section 上下留白 |
| `container` | 最大 1152px | `max-w-6xl mx-auto px-6` | 全站统一容器 |
| `card-padding` | 24px | `p-6` | 卡片内边距 |
| `card-gap` | 24px | `gap-6` | 卡片间距 |
| `grid-gap` | 16px | `gap-4` | Art 图廊图片间距 |

---

## 3. 字体与字号层级

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

## 4. 卡片规范（Projects）

- 容器：`bg-white border border-[#D2D2D7] rounded-2xl p-6`
- hover 态：`hover:shadow-md transition-shadow duration-300`（仅阴影变化，无位移缩放）
- 内部结构（自上而下）：状态徽章 → 标题（h3）→ tagline（body）→ description（caption 或 body）→ techStack 小字列表 → 链接区（accent 色文字链）
- 链接样式：`text-[#0071E3] hover:underline`，新窗口打开加 `target="_blank" rel="noreferrer"`
- 布局：桌面 `grid grid-cols-3 gap-6`，移动 `grid-cols-1`

---

## 5. 时间线规范（Experience）

**核心要求：学员 vs 受邀助教两种身份必须靠视觉区分，不用文字强调。**

| 元素 | 学员（student） | 受邀助教（invited-ta） |
|---|---|---|
| 节点圆点 | 空心：`h-3 w-3 rounded-full border-2 border-[#D2D2D7] bg-white` | 实心：`h-3 w-3 rounded-full bg-[#1D1D1F]` + 外圈 `ring-2 ring-[#1D1D1F]/10` |
| 节点机构名 | `font-medium text-[#1D1D1F]` | `font-semibold text-[#1D1D1F]`（更重） |

- 竖线：`w-px bg-[#D2D2D7]` 贯穿节点左侧
- 年份：`text-sm text-[#86868B]`（caption 层级）
- badge（星空少年）：复用状态徽章样式，`bg-[#86868B] text-white rounded-full text-xs`
- 排列：数据正序 2022→2026（Database.md 已锁定，前端不排序）
- 移动端：节点圆点缩至 `h-2.5 w-2.5`，机构名与描述同列堆叠

---

## 6. Art 图廊规范

- 布局：桌面两列 masonry 风格可用 `columns-2 gap-4`（纯 CSS，不引入 masonry 库）；移动单列 `columns-1`
- 图片：`rounded-xl`，`loading="lazy"`，宽度撑满列宽
- 题跋（captionZh）：图片下方 `text-sm text-[#6E6E73]`，右对齐（书法落款习惯）
- 中文内容保留原文，不翻译

---

## 7. 交互与动效约束

- 唯一允许的动效：hover 阴影过渡（`transition-shadow duration-300`）
- 禁止：滚动触发动画、淡入序列、parallax、hero video（PRD + TechStack 双重锁定）
- 全站无图片轮播（carousel）

---

## 8. 深色模式

非 MVP（PRD 第 5 节）。Phase 3 之后如需追加，先修订本文件补一套 dark token，再动代码。
