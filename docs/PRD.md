# PRD.md — Personal Website Product Requirements

## 1. 产品定位
一个面向美国大学教授 / 投资人 / startup 圈受众的个人网站（personal site），核心目的：用最少的滚动、最清晰的叙事，证明「Steven 是一个持续把手动流程自动化的 builder」。

> **Phase 4（2026-10-08）起形态变更：** 单页长滚动 → **五条独立路由**（`/` `/projects` `/experience` `/art` `/contact`）+ 顶部导航 + 全站中英双语（`?lang=` 为唯一事实源）。原独立页「About」并入首页。决策依据见 `Roadmap.md` Phase 4 决策表，设计 spec 见 `design-spec-v3.md`。

- 定位句（Hero）：`Builder · Calligrapher · UC Berkeley 2030`
- 语气：正式英文为主，专业但不学究。
- 禁忌：正文不出现 "vibe coding" 等自嘲式表达；不用 emoji；不用花哨动效 / parallax / hero video。

## 2. 目标受众
美国大学教授、投资人、startup 圈。他们大概率只会花 30-60 秒扫一遍页面，所以信息密度和视觉层级比"讲故事的完整性"更重要。

## 3. 叙事架构（必须体现在信息架构里）
三条线互相咬合，缺一不可：

| 板块 | 回答的问题 |
|---|---|
| Art（书法） | 你是谁 |
| Experience（时间线） | 你怎么长大的 |
| Projects | 你能做什么 |

叙事钩子（内容层面必须保留，不能在开发中被简化掉）：
- Experience 2022→2026：从"第一次摸 SEM 的学员"到"以助教身份带学生看 SEM"。
- Projects 两个节点：LinkedIn AI（已上线）→ IEEE 论文（已发表）——工程交付与科研产出双线。

## 4. 页面结构（Phase 4 起：五条路由；内容顺序固定）

> **v3 映射：** `/` = Hero（4.1）+ About（4.2）｜`/projects` = 4.3｜`/experience` = 4.4｜`/art` = 4.5｜`/contact` = 4.6。
> 各小节的**内容要求**全部有效，以下按原编号保留；具体版式类名以 `Design.md §9` 与组件实现为准。

### 4.1 Hero
- 定位句 `Builder · Calligrapher · UC Berkeley 2030`
- 背景：**纯白 + 排版填充**（已定案）。曾试过城市夜景全幅背景，被判定不可用后回滚；笔迹分隔线（原 3-5 BrushDivider）已随独立页面改造移除 —— 拆成独立页后不再需要章节分隔线

### 4.2 About
- 2-3 行，非自传体
- 核心叙事：一直在做同一件事——把手动流程变成自动化
- 三个例子（并列列出，不用长句）：
  1. LinkedIn AI Assistant → 自动化社交
  2. 接触角自动测量平台 → 自动化实验
  3. 便利店小程序 → 数字化妈妈的生意
- 身份线：深圳 → UC Berkeley 2030，产品全链路交付（设计→开发→部署）

### 4.3 Projects（2 张卡片，横向排列，移动端纵向堆叠）
1. **LinkedIn AI Networking Assistant** — Live on Chrome Web Store
   - Chrome extension that automates LinkedIn networking with AI-generated personalized messages.
   - Stack: React + TypeScript + Vite + Chrome MV3 + Cloudflare Workers (Hono + KV) + DeepSeek
   - Links: CWS (Extension ID `jeknmnkekajcbffbfijmnmckakpbkcoa`), GitHub `stevenli2007-del/Linkedin-AI-Assistant`
     - ⚠️ 2026-08-30 更正：旧记 ID `jeknmkmekajcbffbfijmmmcakpbbcoa` 为废弃值，勿再使用
2. **IEEE Paper** — Published
   - “The Effect of CdSe Quantum Dots on the Efficiency of Si Solar Cell: A Hands-on, Project-based Learning”
   - 发表日期：**2025-08-29**（IEEE Xplore 官方「Date Added to Xplore」；会议 2025-06-08~13，Montreal）
   - 作者序：Bowen Hou, Jinwook Chang, Talin Patel, **Youcheng Li（第 4 作者，共 5 人）**, Gyuseok L. Kim
   - 出处：UPenn ESAP 2024，指导 Dr. Gyuseok L. Kim；DOI 10.1109/PVSC59419.2025.11133208
   - Link: IEEE Xplore `https://ieeexplore.ieee.org/document/11133208`

### 4.4 Experience（单条时间线，5 个节点）
| 时间 | 机构 | 内容 | 关键词/badge |
|---|---|---|---|
| 2022 寒 | 零一学院·寒假营 | 放生与超疏水，蝴蝶翅膀结构色、荷叶微结构 | 初见 SEM |
| 2023 暑 | 零一学院·暑期科研营 | 材料科学深入，张文增项目启动 | 星空少年（badge）|
| 2024 暑 | 宾大 ESAP | Dr. Kim 指导，IEEE 论文 | 量子点/Si 太阳能电池 |
| 2025 暑 | Yale YYGS | IST track | 张文增项目持续至年底 |
| 2026 暑 | 零一学院·受邀助教 | 赵蒙老师·可编程材料课题组，EWOD、接触角自动测量平台、深大材料学院参观SEM | 受邀 |

时间线视觉需区分「学员」vs「受邀助教」两种身份（不用文字强调，靠视觉层级区分即可）。

### 4.5 Art（书法 Gallery）
- 风格：行草；**题跋保留繁体原文**（两种语言下均显示原文，不翻译）
- **4 张本人作品照已就位**（`src/assets/art/artwork-1…4.jpg`：竖幅 3 + 近方形 1），`artworks.ts` 已记录真实像素尺寸
- **Phase 4 起以等比占位框呈现**（`artworks.ts` 的 `renderArtworkImages = false`，见 `Roadmap.md` 决策表）：四张图仍留在仓库与数据层，下一轮内容/文案定稿后改一行即可切回，版式不跳
- 视觉签名：笔迹分隔线（原 3-5）已随独立页面改造移除；题跋字体仍用 Noto Serif SC 子集
- 此板块允许保留中文原文

### 4.6 Contact
- Email: `stevenli2007@berkeley.edu` —— 页面上是**唯一的主按钮**（`mailto:`），地址另起一行可见
- GitHub: `https://github.com/stevenli2007-del`（内联文字链接，不再是药丸按钮）
- LinkedIn: `https://www.linkedin.com/in/youcheng-li-6b3447335/`（**已上线**，原「待补」作废）
- Chrome Web Store: **归入 muted「项目 / Project」标签行**，与联系方式区分层级（数据层字段 `ContactLink.group`）
- 分组理由（spec §4 P1）：CWS 是项目入口，不是联系方式；四个同级按钮会让「首选联系方式」无从判断

## 5. 非功能性需求
- 纯静态 SPA（五条客户端路由；**SPA fallback 由 Cloudflare Workers 平台配置提供**，不写在 `_redirects` —— 见 TechStack §3），无 CMS，无博客系统，无后端数据库
- **双语：** 所有面向用户的文案拆 `en` / `zh`；语言状态存于 URL（`?lang=`），不用 localStorage，保证可分享、可回退
- **路由：** 零依赖自研（约 50 行），不引入 react-router（5 条静态路由无需路由库，省 ~12KB gzip）
- **已知取舍：** 多路由 + JS 动态写入 `document.title`，无 SSR → 爬虫与分享卡片预览会退化；受众是点链接进来的真人，故此取舍被接受（不做 prerender）
- 视觉风格：Apple 极简，clean white, rounded corners，浅色为主（深色模式可选，非 MVP）
- 响应式：移动端必须适配（教授/投资人大概率用手机点开邮件里的链接）
- 无花哨动效、无 parallax、无 hero video
- 加载速度优先于视觉效果

## 6. 素材清单（**全部结清**，2026-10-08 核对）
1. ✅ IEEE 论文题目 / 发表 venue / 作者位次 —— 2026-08-30 补齐
2. ✅ 书法作品高清照 4 张 —— 2026-08-30 到位（Phase 4 起以等比占位框呈现，图仍在仓库）
3. ⛔ LinkedIn AI Assistant 商店截图 —— **不再收集**（CWS 链接已上线，截图非必需）
4. ✅ LinkedIn 主页链接 —— 2026-08-30 上线
5. ⛔ 墨屿（MoYu）界面截图 —— 2026-09-01 随项目终止取消，站内引用已清零

## 7. 验收标准（MVP = Phase 1+2 完成时）
- 五条路由内容完整（占位符可接受，缺失文字不可接受）
- 移动端和桌面端都无布局错乱
- 无 console error
- Lighthouse Performance ≥ 90（**移动 + 桌面**）；Accessibility 无未通过项（分数满分不代表没有缺陷 —— 权重为 0 的项也须修）
