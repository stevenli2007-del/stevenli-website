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
| 0-5 | Cloudflare Pages 部署 | 关联仓库，构建命令 `npm run build`，输出目录 `dist`，部署空壳并确认线上可访问 |
| 0-6 | 域名决策 🚩 | ~~Steven 决定~~ ✅ 已决策（2026-08-26）：暂用 workers.dev 默认域名，Phase 3 完成后切换自定义域名（届时再选域名 + 配 DNS） |

**验收标准：**
- `npm run dev` 本地可跑，`npm run build` 零报错
- 空壳站点在 Cloudflare Pages 线上 URL 可访问
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
| 静态托管 | 加 `public/_redirects`（`/* /index.html 200`），否则 Cloudflare Pages 直接访问 `/about` 会 404 |
| IEEE 发表日期 | **2025-08-29**（Steven 2026-08-30 拍板）。spec 文案按原样不写具体日期；`src/data/experience.ts` 中的 `2025-09-03` 为错值，一并修正 |
| SEO 退化 | 已知且接受（多路由 + JS 动态 title，无 SSR）。受众是点链接进来的真人，不做 prerender |
| About 合并进 Home | **2026-10-08 即时决定**：「关于」不再独立成页，并入「首页」—— 导航由 6 项变 5 项，路由由 6 变 5。属对 spec §1 的偏离，需同步回 Codex（spec 仍按 6 路由规划） |
| Art 作品图策略 | **2026-10-08 即时决定**：作品版面先用**等比占位框**（开关在 `src/data/artworks.ts` 的 `renderArtworkImages`，当前为 `false`）。四张图**仍留在仓库与数据层，不压缩、不裁切、不改尺寸**。理由：下一轮还要做「各独立页面内容与文案调整」，此刻为图片体积做优化属无效功；占位框顺带解除 LCP 瓶颈（Art 移动端 87 → 100）。**下一轮定稿后把开关置回 `true` 即恢复真图，版式不跳**（占位框宽高比直接取原图像素比） |

### 任务清单

| # | 任务 | 说明 |
|---|---|---|
| 4-1 | ✅ 路由骨架 | 自研 router（`src/lib/router.tsx`，含 `?lang=` 解析）、五条路由挂现有 section 组件、`public/_redirects`（含 `/about / 301`）、404 页、移除 BrushDivider |
| 4-2 | ✅ 站点外壳 | `Header.tsx`（sticky 导航 + EN/中文 切换，移动端两行横向滚动）+ `Footer.tsx`；`shell.ts` 扩为导航/语言/metadata/页脚文案；`App.tsx` 同步 `<html lang>` / `document.title` / meta description |
| 4-3 | ✅ 数据层双语化 | 6 个 data 文件文案全拆 `en`/`zh`（spec §4 文案落地）；`Project.tagline`→`outcome`、链接改具名数组 `{label,href}`；组件移除全部硬编码文案（Hero intro / Contact label / Projects 状态与链接）改读 locale。⚠️ spec §4 未给出的字段（experience 的 period/institution/keywords、projects 的 zh outcome、about 的 zh 例子标题）由 Bud 暂译，待 Codex 校订 |
| 4-4 | ✅ Home `/`（含 About） | Hero 重做（纯白、文案列 DOM 前、头像 `h-32/md:h-40` 去阴影、proof line + 双 CTA、容器 `min-h-[calc(100svh-4.5rem)]`）+ About 区块（灰底 `#F5F5F7`、三白卡例子、identity strip）。⚠️ 设计适配待 Codex 报备：About 标题降为 **h2**（单 h1 语义）、Hero H1 取 `text-4xl/md:text-5xl` |
| 4-5 | ~About `/about`~ | **已并入 4-4**（2026-10-08）：About 不再独立成页；旧 `/about` 链接经 `_redirects` 301 到 `/` |
| 4-6 | ✅ Projects `/projects` | 白底、intro `max-w-3xl`、卡片网格 `lg:grid-cols-2`（替原三列留空位）；卡内顺序 status 圆点行 → title → outcome → description → Stack（上边框分隔）→ 链接 `mt-auto` 贴底；去掉原 `hover:shadow-md`。⚠️ 设计适配待 Codex 报备：卡片标题用 **h2**（页面 h1 已给 `Selected Projects`）；四个页面的 intro 统一取 About 的 `text-lg` 处理（spec 仅写 `max-w-3xl`，未定字号） |
| 4-7 | ✅ Experience `/experience` | 白底、intro `max-w-3xl`、时间线 `space-y-8` + `before:` 竖线（`left-[5px]`）；每条 `pl-8`：period（`text-xs uppercase tracking-wide`）→ institution（`text-lg`，受邀者 `font-semibold`）→ 单段 description → keywords（`text-xs`）。2026 受邀助教：实心节点 `bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10` + 深色「受邀」徽章；学员节点保持空心；2023「星空少年」徽章保留并统一为 `px-2.5 py-1`。⚠️ 卡片/条目标题层级：institution 由 h3 升 **h2**（页面 h1 已给页标题，避免跳级） |
| 4-8 | ✅ Art `/art` | 保留 `bg-[#F5F5F7]` 灰底、**两列 masonry（`columns-1 gap-4 md:columns-2`）与原图比例**（不裁切、不轮播）；新增 intro（`max-w-3xl`）+ 小注（`四幅作品 · 行草`）；每张改为白底圆角卡 `rounded-2xl border p-3`，图 `w-full rounded-xl`，题跋 `mt-3 text-right`（原繁体、两语言一致、仍用 Noto Serif SC 子集）；`loading="lazy"` 保留。⚠️ 设计适配：题跋字号未动，页 h1 由 h2 升 **h1** |
| 4-9 | ✅ Contact `/contact` | 白底；intro `max-w-3xl`；**邮箱是唯一主按钮**（`mt-6 inline-flex rounded-full bg-[#0071E3] px-6 py-3 text-sm`），地址另起一行可见；GitHub / LinkedIn **降级为内联文字链接**（`flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#0071E3]`，去掉原「四个同级药丸按钮」）；CWS 归入 muted **「项目 / Project」**标签行（spec §4 P1）。⚠️ 数据层新增：`ContactLink.group`（`'profile' \| 'project'`）+ `projectLabel` 文案（组件不得硬编码「项目」字样） |
| 4-10 | 走查与收尾 | ① ✅ **全设备走查**：移动 / 平板 / 桌面 × 五路由 + 404 共 14 组，零横向溢出、零 console 报错、每页恰好 1 个 h1；② ✅ **Lighthouse 复测**：首页移动 98 / 桌面 100，Art 移动 **100**（原 87）、桌面 100，Accessibility 全 100；③ ⏳ **docs 同步** —— 待处理：PRD「单页」描述改写；spec §1 六路由标注已并为五条 + §5 中文名「李宥成」笔误；**Database.md §1/§2/§3/§4 接口已全面漂移**（`Project.outcome` 取代 `tagline`、`links` 改具名数组、新增 `ContactLink.group`、`Artwork.alt` 改双语 + 新增 `width`/`height`、`Experience.keywords` 改双语数组）；TechStack.md 需记录「零依赖自研路由」；Design.md 需补 v3 视觉规范 |

**4-10 过程记录（2026-10-08）**

> Lighthouse 报告（JSON + HTML）与全页截图归档于 `.workbuddy/reports/phase-4/`

| # | 问题（均有审计归因，非猜测） | 处置 | 证据 |
|---|---|---|---|
| 修① | `shell.ts` 语言切换链接的 `aria-label` 不含可见文字（WCAG 2.5.3 Label in Name）。中文态下存在**镜像问题**（`EN` 链接同样不含可见文字），英文态未触发 | 无障碍名改为「可见文字 + 动作」 | `label-content-name-mismatch` 由失败转 0 失败 |
| 修② | 4 张作品 `<img>` 缺 `width`/`height` → 空间不预留 → CLS 0.102（`unsized-images` 唯一归因） | `Artwork` 增 `width`/`height`；首图改 `eager` + `fetchPriority="high"` | CLS 0.102 → **0** |
| 修③ | 图片体积导致 LCP 3.9s（占 Performance 权重 25，得分仅 0.52） | **不压缩图片**，改用等比占位框（见决策表） | LCP 3.9s → **1.3s**，Art 移动端 87 → **100** |

> 未采纳的审计建议：Lighthouse 按 DPR1 建议把 718–960px 作品图缩到 592px —— 会在 Retina 屏发虚，属审计建议与真实观感冲突，**明确不采**。

**验收标准：**
- 五条路由可直接访问、可刷新、可分享，浏览器前进/后退正常
- 语言切换保留当前路径，URL 为唯一事实源（`?lang=`）
- `npm run build` 零报错；Lighthouse Performance ≥ 90
- 所有可见文案来自 `src/data/*.ts`

**工作方式：** 一张卡做完 → Steven 验收 → 批准 → 才动下一张。

---

## 进度追踪

| Phase | 状态 | 完成时间 |
|---|---|---|
| Phase 0 | ✅ 已完成 | 2026-08-26 |
| Phase 1 | ✅ 已完成 | 2026-08-28 |
| Phase 2 | ✅ 已完成 | 2026-08-28 |
| Phase 3 | ✅ 已完结（6/8） | 3-1 ✅ 3-2 ✅ 3-4 ✅ 3-5 ✅ 3-6 ✅；3-3 ⛔ 取消（墨屿终止）；3-7 → 并入 4-10；3-8 🚩 自定义域名，Phase 4 收尾后执行 |
| Phase 4 | 🔄 进行中（8/9 + 收尾） | v3 双语多页重构（About 已并入 Home，路由 6→5）。Spec：`docs/design-spec-v3.md`（Codex 主导设计，Bud 实现）。4-1~4-4 ✅（`515d310`）/ 4-6 ✅（`d90b076`）/ 4-7 ✅ / 4-8 ✅ / 4-9 ✅ 均已验收 —— **5 个页面全部重做完毕**；4-10 走查 ✅ + Lighthouse ✅（移动 98~100 / 桌面 100），**仅剩 docs 同步**。⚠️ 下一轮：Steven 将做「各独立页面内容与文案调整」，Art 真图届时由 `renderArtworkImages` 开关切回 |

> 每 Phase 签收后由 Bud 更新此表。
