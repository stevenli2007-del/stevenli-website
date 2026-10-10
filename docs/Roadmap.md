# Roadmap.md — Phase 规划与任务清单

> 本文件是项目执行的唯一进度基准。工作方式沿用 Linkedin-AI-Assistant 惯例：
> - Phase 编号制（`阶段-任务`，如 `1-3`），一次只做一个任务
> - 每个 Phase 结束产出 **Done Report**（what / progress / next），由 Steven 验收签收
> - 每个 Phase 结束提交一次 git commit（沙箱无法 push 时，Bud 本地 commit，Steven 在终端手动 push）
> - 标注 🚩 的任务**阻塞在素材上**，素材由 Steven 收集；占位符机制保证素材缺失不阻塞开发

---

## Phase 0 — 项目初始化

**目标：** 脚手架就绪，部署管道打通（先上线一个空壳，验证 CI/CD 全链路）。

| # | 任务 | 说明 |
|---|---|---|
| 0-1 | Vite 脚手架 | `npm create vite` (React + TS)，验证 dev / build / preview 三条命令可用 |
| 0-2 | Tailwind 接入 | 安装并配置 Tailwind，`index.css` 作为唯一样式入口 |
| 0-3 | 目录结构落地 | 按 TechStack.md 第 4 节创建 `/src/components` `/src/data` `/src/assets`，六个组件与四个数据文件先放空壳 |
| 0-4 | Git 初始化 | `git init` + 首次 commit（含 .gitignore） |
| 0-5 | ~~Cloudflare Pages~~ 部署 | 关联仓库，构建命令 `npm run build`，输出目录 `dist`，部署空壳并确认线上可访问（平台名当时记为 Pages；**2026-10-08 更正为 Cloudflare Workers + Static Assets，构建由 Workers Builds 跑**） |
| 0-6 | 域名决策 🚩 | ~~Steven 决定~~ ✅ 已决策（2026-08-26）：暂用 workers.dev 默认域名，Phase 3 完成后切换自定义域名（届时再选域名 + 配 DNS） |

**验收标准：**
- `npm run dev` 本地可跑，`npm run build` 零报错
- 空壳站点在 Cloudflare 线上 URL 可访问（平台 = Workers + Static Assets，见 TechStack §3）
- 目录结构与 TechStack.md 第 4 节完全一致

**Done Report 要求：** 列出已建文件清单、线上 URL、git commit hash。

---

## Phase 1 — 内容骨架

**目标：** 四个数据文件 + 六个 section 组件全部完成，桌面端完整可滚动。占位符可用，缺文字不可用。

| # | 任务 | 说明 |
|---|---|---|
| 1-1 | 数据层 | 按修订版 Database.md 实现 `projects.ts` `experience.ts` `artworks.ts` `contact.ts`，缺失字段用 `null` |
| 1-2 | App 布局 | `App.tsx` 按固定顺序组装六个 section，统一容器宽度与 section 间距（按 Design.md） |
| 1-3 | Hero | 定位句 + 极简背景，笔迹水印留到 Phase 3 |
| 1-4 | About | 2-3 行核心叙事 + 四个自动化例子并列 + 身份线 |
| 1-5 | Projects | 3 张卡片横向排列，状态徽章（live / in-development / published），数据全来自 `projects.ts` |
| 1-6 | Experience | 单条时间线 5 节点，学员 vs 受邀助教按 Design.md 时间线规范做视觉区分，星空少年 badge |
| 1-7 | Art | 占位图画廊（横幅+条幅搭配），中文题跋字段渲染 |
| 1-8 | Contact | 四个联系方式，LinkedIn 为 `null` 时显示占位样式 |

**验收标准：**
- 六个 section 全部渲染，内容来自 `/src/data/*.ts`（组件 JSX 中无硬编码文案）
- 桌面端（≥1024px）无布局错乱
- 每个任务一个 commit，可逐个验收

**Done Report 要求：** 任务清单状态表（状态/位置/说明）+ Steven 桌面端走查签收。

---

## Phase 2 — 响应式与验收（完成即 MVP）

**目标：** 移动端适配 + 性能达标，达到 PRD 第 7 节 MVP 验收标准。

| # | 任务 | 说明 |
|---|---|---|
| 2-1 | 移动端适配 | 六个 section 在 375px 宽度下走查：Projects 卡片纵向堆叠、时间线不溢出、Art 图廊单列 |
| 2-2 | 性能优化 | Lighthouse Performance ≥ 90；图片懒加载、字体按需引入 |
| 2-3 | 质量清扫 | 无 console error；基础 a11y（语义化标签、alt 文本、对比度） |

**验收标准（= PRD 第 7 节）：**
- 六个 section 内容完整（占位符可接受，缺失文字不可接受）
- 移动端和桌面端都无布局错乱
- 无 console error
- Lighthouse Performance ≥ 90

**Done Report 要求：** Lighthouse 截图（Performance / Accessibility 分数）+ 移动端 + 桌面端各截图一组。此报告签收即 **MVP 上线**。

---

## Phase 3 — 素材与视觉签名

**目标：** 真实素材替换占位符，加入个人视觉签名，从"能用"变成"是 Steven 的"。

| # | 任务 | 说明 |
|---|---|---|
| 3-1 | ✅ IEEE 论文信息 | ~~Steven 提供：论文题目 / venue / 作者位次~~ ✅ 已补（2026-08-30）：DOI 10.1109/PVSC59419.2025.11133208，Steven 为第 4 作者（共 5 人） |
| 3-2 | 🚩 书法作品照 | Steven 提供 3-5 张高清照（横幅+条幅）→ 入 `/src/assets/art/`，更新 `artworks.ts` |
| 3-3 | ⛔ 墨屿截图 | 已取消（2026-09-01）：墨屿项目终止，Projects 卡片与 Art 板块中的墨屿入口均已移除 |
| 3-4 | ✅ CWS + LinkedIn 链接 | ~~Steven 提供~~ ✅ 已完成（2026-08-30）：LinkedIn 链接已上线，CWS 链接本就有；卡片截图非必需 |
| 3-5 | 笔迹视觉签名 | 行草笔迹做章节分隔线 / Hero 水印（素材同样来自 3-2 拍摄，需专门拍摄单字/线条素材） |
| 3-6 | 中文衬线字体 | 引入 Noto Serif SC（仅 Art 板块标题），注意字体文件按需子集化，不得拖垮 Phase 2 拿到的 Lighthouse 分数 |
| 3-7 | 终版走查 | 全设备走查 + Lighthouse 复测 |
| 3-8 | 🚩 自定义域名 | 购买域名 + DNS 配置 + 绑定 Cloudflare，替换 workers.dev 子域名（Phase 3 收尾后执行；旧 URL 由 Cloudflare 自动 301，不丢流量） |

**验收标准：**
- 无占位符残留（素材全部就位）
- 笔迹视觉元素至少出现在一处（分隔线或水印）
- Lighthouse Performance 仍 ≥ 90

**Done Report 要求：** 前后对比说明 + 最终 URL 交付。

---

## Phase 4 — v3 双语多页重构

**Spec：** `docs/design-spec-v3.md`（Codex 主导设计与文案，Bud 负责实现。Codex 只写 `docs/`，不碰 `src/`）

**目标：** 单页 → 五条独立路由（About 已并入 Home）+ 顶部导航 + 中英切换 + 全站文案双语化。

### 已拍板决策（Steven 2026-10-08）

| 项 | 决定 |
|---|---|
| 中文姓名 | **李佑成**（spec §5 原写「李宥成」为笔误，已更正）。Legal name 仍为 `Youcheng (Steven) Li` |
| 中文繁简 | 不纠结；Art 作品题跋保留原繁体，其余按 spec 文案原样落地 |
| BrushDivider | **移除**（改为独立页面后章节分隔线不再需要；组件文件一并删除） |
| 路由方案 | **零依赖自研**（约 50 行），不引入 react-router —— 5 个静态路由无需路由库，省 ~12KB gzip，保 Lighthouse ≥ 90 |
| 静态托管 | 加 `public/_redirects` 做 `/about → /` 的 301。~~同时写 `/* /index.html 200` 提供 fallback~~ —— **2026-10-08 更正：该行导致 Workers Builds 构建失败，已删除**；SPA fallback 由平台（Worker 侧 `not_found_handling`）提供。详见「部署事故记录」 |
| IEEE 发表日期 | **2025-08-29**（Steven 2026-08-30 拍板）。spec 文案按原样不写具体日期；`src/data/experience.ts` 中的 `2025-09-03` 为错值，一并修正 |
| SEO 退化 | 已知且接受（多路由 + JS 动态 title，无 SSR）。受众是点链接进来的真人，不做 prerender |
| About 合并进 Home | **2026-10-08 即时决定**：「关于」不再独立成页，并入「首页」—— 导航由 6 项变 5 项，路由由 6 变 5。属对 spec §1 的偏离，需同步回 Codex（spec 仍按 6 路由规划） |
| Art 作品图策略 | **2026-10-08 即时决定**：作品版面先用**等比占位框**（开关在 `src/data/artworks.ts` 的 `renderArtworkImages`，当前为 `false`）。四张图**仍留在仓库与数据层，不压缩、不裁切、不改尺寸**。理由：下一轮还要做「各独立页面内容与文案调整」，此刻为图片体积做优化属无效功；占位框顺带解除 LCP 瓶颈（Art 移动端 87 → 100）。**下一轮定稿后把开关置回 `true` 即恢复真图，版式不跳**（占位框宽高比直接取原图像素比） |

### 任务清单

| # | 任务 | 说明 |
|---|---|---|
| 4-1 | ✅ 路由骨架 | 自研 router（`src/lib/router.tsx`，含 `?lang=` 解析）、五条路由挂现有 section 组件、`public/_redirects`（**最终只含 `/about / 301`**，proxying 行已因构建失败移除）、404 页、移除 BrushDivider |
| 4-2 | ✅ 站点外壳 | `Header.tsx`（sticky 导航 + EN/中文 切换，移动端两行横向滚动）+ `Footer.tsx`；`shell.ts` 扩为导航/语言/metadata/页脚文案；`App.tsx` 同步 `<html lang>` / `document.title` / meta description |
| 4-3 | ✅ 数据层双语化 | 6 个 data 文件文案全拆 `en`/`zh`（spec §4 文案落地）；`Project.tagline`→`outcome`、链接改具名数组 `{label,href}`；组件移除全部硬编码文案（Hero intro / Contact label / Projects 状态与链接）改读 locale。⚠️ spec §4 未给出的字段（experience 的 period/institution/keywords、projects 的 zh outcome、about 的 zh 例子标题）由 Bud 暂译，待 Codex 校订 |
| 4-4 | ✅ Home `/`（含 About） | Hero 重做（纯白、文案列 DOM 前、头像 `h-32/md:h-40` 去阴影、proof line + 双 CTA、容器 `min-h-[calc(100svh-4.5rem)]`）+ About 区块（灰底 `#F5F5F7`、三白卡例子、identity strip）。⚠️ 设计适配待 Codex 报备：About 标题降为 **h2**（单 h1 语义）、Hero H1 取 `text-4xl/md:text-5xl` |
| 4-5 | ~About `/about`~ | **已并入 4-4**（2026-10-08）：About 不再独立成页；旧 `/about` 链接经 `_redirects` 301 到 `/` |
| 4-6 | ✅ Projects `/projects` | 白底、intro `max-w-3xl`、卡片网格 `lg:grid-cols-2`（替原三列留空位）；卡内顺序 status 圆点行 → title → outcome → description → Stack（上边框分隔）→ 链接 `mt-auto` 贴底；去掉原 `hover:shadow-md`。⚠️ 设计适配待 Codex 报备：卡片标题用 **h2**（页面 h1 已给 `Selected Projects`）；四个页面的 intro 统一取 About 的 `text-lg` 处理（spec 仅写 `max-w-3xl`，未定字号） |
| 4-7 | ✅ Experience `/experience` | 白底、intro `max-w-3xl`、时间线 `space-y-8` + `before:` 竖线（`left-[5px]`）；每条 `pl-8`：period（`text-xs uppercase tracking-wide`）→ institution（`text-lg`，受邀者 `font-semibold`）→ 单段 description → keywords（`text-xs`）。2026 受邀助教：实心节点 `bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10` + 深色「受邀」徽章；学员节点保持空心；2023「星空少年」徽章保留并统一为 `px-2.5 py-1`。⚠️ 卡片/条目标题层级：institution 由 h3 升 **h2**（页面 h1 已给页标题，避免跳级） |
| 4-8 | ✅ Art `/art` | 保留 `bg-[#F5F5F7]` 灰底、**两列 masonry（`columns-1 gap-4 md:columns-2`）与原图比例**（不裁切、不轮播）；新增 intro（`max-w-3xl`）+ 小注（`四幅作品 · 行草`）；每张改为白底圆角卡 `rounded-2xl border p-3`，图 `w-full rounded-xl`，题跋 `mt-3 text-right`（原繁体、两语言一致、仍用 Noto Serif SC 子集）；`loading="lazy"` 保留。⚠️ 设计适配：题跋字号未动，页 h1 由 h2 升 **h1** |
| 4-9 | ✅ Contact `/contact` | 白底；intro `max-w-3xl`；**邮箱是唯一主按钮**（`mt-6 inline-flex rounded-full bg-[#0071E3] px-6 py-3 text-sm`），地址另起一行可见；GitHub / LinkedIn **降级为内联文字链接**（`flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#0071E3]`，去掉原「四个同级药丸按钮」）；CWS 归入 muted **「项目 / Project」**标签行（spec §4 P1）。⚠️ 数据层新增：`ContactLink.group`（`'profile' \| 'project'`）+ `projectLabel` 文案（组件不得硬编码「项目」字样） |
| 4-10 | 走查与收尾 | ① ✅ **全设备走查**：移动 / 平板 / 桌面 × 五路由 + 404 共 14 组，零横向溢出、零 console 报错、每页恰好 1 个 h1；② ✅ **Lighthouse 复测**：首页移动 98 / 桌面 100，Art 移动 **100**（原 87）、桌面 100，Accessibility 全 100；③ ✅ **docs 同步**（六份文档全部对齐 v3 现状，与实现同在 commit `511208a`）：PRD 改写为五路由双语形态（含 CWS 旧 ID、`LinkedIn: 待补`、素材清单三处 stale 订正）；**Database.md §1~§6 接口全部重写**（`Project.outcome` 取代 `tagline`、`links` 改具名数组、新增 `ContactLink.group`、`Artwork.alt` 改双语 + `width`/`height`、`Experience.keywords` 改双语数组），并新增 §7 `locales.ts` / §8 `shell.ts`；TechStack.md 记录零依赖自研路由（并列入禁止事项）、Tailwind v4、子集字体、真实目录结构、`public/_redirects` 契约与部署验收流程（**平台名 2026-10-08 更正为 Workers + Static Assets**）；Design.md 新增 **§9 现行 v3 视觉规范**并把 §3~§7 失效章节打上作废标记；`design-spec-v3.md` 顶部加「实施状态批注」（8 条偏离，保持 Codex 正文不动，待其合并） |

**4-10 过程记录（2026-10-08）**

> Lighthouse 报告（JSON + HTML）与全页截图归档于 `.workbuddy/reports/phase-4/`

| # | 问题（均有审计归因，非猜测） | 处置 | 证据 |
|---|---|---|---|
| 修① | `shell.ts` 语言切换链接的 `aria-label` 不含可见文字（WCAG 2.5.3 Label in Name）。中文态下存在**镜像问题**（`EN` 链接同样不含可见文字），英文态未触发 | 无障碍名改为「可见文字 + 动作」 | `label-content-name-mismatch` 由失败转 0 失败 |
| 修② | 4 张作品 `<img>` 缺 `width`/`height` → 空间不预留 → CLS 0.102（`unsized-images` 唯一归因） | `Artwork` 增 `width`/`height`；首图改 `eager` + `fetchPriority="high"` | CLS 0.102 → **0** |
| 修③ | 图片体积导致 LCP 3.9s（占 Performance 权重 25，得分仅 0.52） | **不压缩图片**，改用等比占位框（见决策表） | LCP 3.9s → **1.3s**，Art 移动端 87 → **100** |

> 未采纳的审计建议：Lighthouse 按 DPR1 建议把 718–960px 作品图缩到 592px —— 会在 Retina 屏发虚，属审计建议与真实观感冲突，**明确不采**。

**部署事故记录（2026-10-08，Phase 4 首次上线）**

| 阶段 | 事实 |
|---|---|
| 现象 | 5 个 commit（`515d310`→`c4bf878`）push 后线上**仍未更新**，停在 `3fc3476`（9-01 版）：title 是旧的 `Youcheng (Steven) Li`，JS 仍 `index-B5178jYw.js` |
| 定位 | 仓库**无 webhook、无 Actions**；`gh api …/commits/<sha>/check-runs` 显示 `Workers Builds: stevenli-website` → **failure**。顺带查明部署机制是 **Cloudflare Workers Builds**，不是 Pages |
| 排查（逐项排除） | ① import 大小写（49 条全精确匹配，Linux 也安全）② 源文件缺失（`git ls-files` 完整，无被 ignore 的源文件）③ 本地 `npm run build` 通过 |
| 根因 | `public/_redirects` 第 2 行 `/* /index.html 200`。SPA fallback 已由 Worker 侧 `not_found_handling` 提供（旧版无 `_redirects` 时 `/art`、`/nope` 均 200），重复的 proxying 规则直接让构建失败 |
| 修复 | commit `c1466d7` 删除该行（只留 `/about / 301`）→ 构建 **success**，耗时约 50s |
| 验证 | 线上资源指纹 `index-Cl7ms7eC.js` / `index-pYSA4rCj.css` 与本地 `dist` 一致；JS bundle 命中 `Builder & Calligrapher` / `李佑成` / `Selected Projects`；`/about` → **301** `/`；五路由 + `/nope` 全 200 |

> 教训：**「push 后看线上」不够，必须查 commit 上的 check run** —— 构建失败时线上会静默停在旧版本，CDN 照样返回 200，不报错。

**验收标准：**
- 五条路由可直接访问、可刷新、可分享，浏览器前进/后退正常
- 语言切换保留当前路径，URL 为唯一事实源（`?lang=`）
- `npm run build` 零报错；Lighthouse Performance ≥ 90
- 所有可见文案来自 `src/data/*.ts`

**工作方式：** 一张卡做完 → Steven 验收 → 批准 → 才动下一张。

---

## Phase 5 — Resume-led content + Dev Log

**计划：** `docs/phase-5-plan.md`（2026-10-08）｜**补充清单：** `docs/phase-5-resume-addendum.md`（2026-10-09）

**目标：** 保留所有既有活动，优先面向两份 NVIDIA Ignite（Software Engineering / Hardware Engineering）申请，基于简历和可核实事实逐项目打磨现有双语页面文案；新增 `/dev-log` 及顶部导航入口。Tesla 为次要选项，只有岗位描述与 12 周线下安排确认可行后再纳入针对性修改。

### 已拍板决策（Steven 2026-10-09）

| 项 | 决定 |
|---|---|
| 专业写法 | **Engineering Physics & Computer Science**（照简历原文）。旧记录的「L&S → 主修 EECS」作废 |
| Education / Awards / Skills | **上站**，作为 Home 页 About 之后的新区块（不新增路由，导航仍是 6 项） |
| IEEE 论文位置 | **继续留在 Projects**，`status = published`，保留 IEEE Xplore 外链与「五作第四」 |
| Projects 卡片顺序 | **IEEE 论文 → Tempo → Cal Hacks 门户 → LinkedIn AI Assistant**（Steven 指定） |
| Moyu | 已于 2026-09-01 全站移除，本轮无需动作；**不得写成活跃产品或 "Present"** |
| Cal Hacks 定位 | **Projects / Individual Project**，是为申请 Cal Hacks FA26 技术团队所做的**个人项目**。不称 Tech Lead、不称正式团队成员；Steven 2026-10-09 追加：**可见文案里不要出现 "take-home" 字样** |
| Tempo 定位 | **持续项目**（Steven 2026-10-09 确认）。网站 description 按简历把功能**写全**：学习计划（整学期 + 每日，日程变动可改）、交互式学习笔记、考试复习总结、真题自测卷；`outcome` 标注「仍在持续开发」 |
| Dev Log 内容 | Phase 5 **只建页面结构，文章数组刻意为空**；不编造日志、反思或日期。深度打磨归 Phase 6 |

### 任务清单

| # | 任务 | 说明 |
|---|---|---|
| 5-1 | ✅ 目标岗位矩阵 | 沿用 `docs/phase-5-plan.md`（2026-10-08 已核）。两份 NVIDIA Ignite 为主目标；Tesla 待澄清职位描述与 12 周可行性 |
| 5-2 | ✅ 简历事实清单 | Steven 2026-10-09 直接提供简历全文（Education / Experience / Projects / Publication / Skills / Awards），无需截图转录 |
| 5-3 | ✅ 逐项改写简历 | 输出 `docs/phase-5-resume-addendum.md`：7 项可补细节 + 8 项冲突待确认（🔴 含 Tempo「学习计划」未实现、专业写法、时间段缺失） |
| 5-4 | ✅ 网站内容落地 | ① Projects 四张卡（新增 Tempo / Cal Hacks，新增 `beta` / `submission` 两个 status）；② Experience 按简历充实 2024 ESAP（洁净间工艺）与 2026 受邀助教（浏览器端接触角工具 / EWOD 校准 / 教学）；③ 新增 Home 的 Education & Awards & Skills 区块；④ Hero proof line 与 About identity 按简历更新 |
| 5-5 | ✅ Dev Log 结构 | `src/data/devLog.ts`（`devLogPosts` 空数组）+ `src/components/DevLog.tsx`（空态卡片）+ `/dev-log` 路由 + 导航项（Home → Projects → Experience → **Dev Log** → Art → Contact） |
| 5-6 | ✅ 实现与验收 | `tsc` + `vite build` 零报错；六条路由 + 404 全部 200；关键文案进 bundle；`docs/Database.md` 已补 §9/§10 接口 |

**一度搁置、现已解决的疑点：** Tempo 的 "generates semester-long and daily study plans" 曾在
Tempo `docs/Database.md` 里被标为 **Phase 2**，Bud 起初以「无实现证据」为由未写入网站。
**Steven 2026-10-09 裁定：Tempo 是持续项目，网站要把功能写全** —— 学习计划、学习笔记与简历提到的
其它能力**全部写入** `description`，`outcome` 同时标注「仍在持续开发」。

**验收标准：** 所有新增内容均有简历或仓库证据；Dev Log 无编造文章；中英双语文案齐全；`npm run build` 零报错；六条路由可访问。

---

## Phase 5.5 — 上线前内容微调（Steven 逐条指定，插在 Phase 6 之前）

**性质：** 非计划内阶段。Steven 逐条口述要改的点，Bud 实现 → 直接 push 上线 → 他在线上看效果，不再走「先审 diff 再推」。

**范围与结果（2026-10-09，共 8 条，全部已上线）：**

| # | Commit | 改动 |
|---|---|---|
| 1 | `c77d9e3` | Hero H1 换行修复：tagline 由整句字符串改为**分段数组**（`tagline: Record<Locale, string[]>` + `taglineSeparator`），每段 `whitespace-nowrap`，`UC Berkeley 2030` 不再被拆行 |
| 2 | `efbb4cf` | Hero intro 重写 + proof 行由 4 项减为 3 项（下线 `Invited teaching assistant`） |
| 3 | `e35fba4` | proof 第三项 `Chrome Web Store developer` → `X-Institute (Tsinghua SIGS) invited TA` |
| 4 | `b7290aa` | H1 改**两行**（学校 / 方向），去掉分隔符 `·`，拿掉 `Builder` / `Calligrapher`；方向词定为 `Software & Semiconductors` |
| 5 | `0fcb812` | `document.title` + meta description 同步新定位；intro 用户数 `109` → `100+`（**`index.html` 的静态兜底必须同改**） |
| 6 | `ce96877` | About 首卡 LinkedIn AI Assistant → Tempo（examples 恒 3 条，`sm:grid-cols-3`） |
| 7 | `d7bbf52` | Education 加 Berkeley 校标（`src/assets/berkeley-seal.png`，256×256 64 色量化 16.9KB）；`40 units transferred from A-Level` → `currently a freshman` |
| 8 | `e3bfad7` | **Experience 时间线扩到 8 条 + 每条配图**（ESAP 拆 Lab Work / Research Paper；新增 2023-06 Whittle 与 2026-06 SCIE 两个毕业节点） |

**遗留：** Projects 页 Tempo 卡 `109 users in public beta` 与 `77 users in private beta` 尚未统一为 `100+`（Steven 仅指定改 intro 那句）。

**验收方式（本轮固定套路）：** `tsc --noEmit` + `npm run build` → CDP 无头 Chrome 在 320/375/430/768/1024/1440 × 中英下量 `scrollWidth - clientWidth` 与各容器矩形 → `Page.captureScreenshot` 截图目视 → push 后查 check run `success` → 比对线上 `/assets/index-*.js` 指纹与本地 `dist/`。

---

## Phase 6 — Art 与 Dev Log 深度打磨

**安排在 Phase 5 之后。** 本阶段只做这两个 section，不扩大到其它页面。

**目标：** 把 Phase 5 建起来的空壳变成真正有内容的两个 section —— Art 从「等比占位框」回到真图并完成内容定稿，Dev Log 从「空态」到有首批真实文章。

### 任务清单（草案，待 Steven 开工时确认）

| # | 任务 | 说明 |
|---|---|---|
| 6-1 | Art 真图切回 | `src/data/artworks.ts` 的 `renderArtworkImages` 置回 `true`（占位框宽高比取自原图像素比，**切回不跳版**）。需先确认是否需要压缩以保住 Lighthouse Performance ≥ 90（Phase 4 时 Art 移动端曾因图片体积掉到 87） |
| 6-2 | Art 内容定稿 | 四幅作品的题跋、尺寸、创作背景文案中英双语定稿；确认「龍虎風雨，天下梟雄」标题用法 |
| 6-3 | Dev Log 首批文章 | 按 `docs/phase-5-plan.md` 的候选主题**先做事实采访**再写：Tempo / 接触角测量工具 / LinkedIn 扩展发布 / 便利店小程序 / 从第一次用 SEM 到带学生看 SEM。每篇必须回答：想做什么 · 试了或决定了什么 · 什么变了或失败了 · 下次怎么做 |
| 6-4 | Dev Log 形态决策 | 单页索引 vs 每篇独立路由（Phase 5 已预留 `DevLogPost.body` 字段与详情页渲染分支） |
| 6-5 | 走查与收尾 | 全设备走查 + Lighthouse 复测（Performance ≥ 90、Accessibility 100）+ docs 同步 |

**硬约束：**
- Dev Log 每篇文章都必须来自 Steven 确认过的真实经历，**不得从项目名称臆造复盘、日期或反思**
- 不引入 CMS、后端或动画；内容仍住 `src/data/` 静态数据层
- 保持六条路由、双语 `?lang=` 与「组件零硬编码文案」三条既有约定

---

## 进度追踪

| Phase | 状态 | 完成时间 |
|---|---|---|
| Phase 0 | ✅ 已完成 | 2026-08-26 |
| Phase 1 | ✅ 已完成 | 2026-08-28 |
| Phase 2 | ✅ 已完成 | 2026-08-28 |
| Phase 3 | ✅ 已完结（7/8） | 3-1 ✅ 3-2 ✅ 3-4 ✅ 3-5 ✅ 3-6 ✅ 3-7 ✅（**已随 4-10 完成**：全设备走查 + Lighthouse 复测）；3-3 ⛔ 取消（墨屿终止）；**3-8 🚩 自定义域名** —— 唯一遗留项，Phase 4 收尾后执行。注：Art 现以等比占位框呈现属 Phase 4 决策（`renderArtworkImages`），非素材缺失 |
| Phase 4 | ✅ **已完成并上线**（9/9） | 2026-10-08 | v3 双语多页重构（About 已并入 Home，路由 6→5）。Spec：`docs/design-spec-v3.md`（Codex 主导设计，Bud 实现）。9 张卡片全部验收；Lighthouse 移动 98~100 / 桌面 100、Accessibility 全 100；六份治理文档已对齐实现。Commits：`515d310`（4-1,4-2）/ `d90b076`（4-3,4-4,4-6）/ `511208a`（4-7~4-10 + docs）/ `c4bf878`（Roadmap 收尾）/ `e9b7e1e`（删孤儿 `hero-bg.jpg`）/ `c1466d7`（**修复部署失败**，见上方部署事故记录）。**线上已更新为 v3**：资源指纹与本地 `dist` 一致、`/about` 301、五路由均 200。下一轮已转入 Phase 5：简历事实审阅、各页面文案打磨、新增 Dev Log；Art 真图在内容定稿后由 `renderArtworkImages` 开关切回 |
| Phase 5 | ✅ **已完成（6/6）** | 2026-10-09 | 简历事实基准落地：Projects 四张卡（新增 Tempo / Cal Hacks，新增 `beta` / `submission` 状态）、Experience 按简历充实 ESAP 与受邀助教、Home 新增 Education & Awards & Skills 区块、新增 `/dev-log`（**文章数组刻意为空，不编造**）。补充清单 `docs/phase-5-resume-addendum.md` 含 7 项可补细节 + 8 项冲突待确认（🔴 Tempo「学习计划」未实现 / 专业写法 / 时间段缺失）。`tsc` + `build` 零报错，六条路由 + 404 全 200。**未 push** —— 待 Steven 审阅后手动推。 |
| Phase 5.5 | ✅ **已完成并上线（8/8）** | 2026-10-09 | 上线前内容微调（Steven 逐条口述，Bud 实现并直接 push）。含 Hero 换行修复与两行标题、proof 重排、title/meta 同步、About 首卡换 Tempo、Education 加校标、**Experience 扩至 8 条并全部配图**。详见上方 Phase 5.5 章节。 |

> 每 Phase 签收后由 Bud 更新此表。
