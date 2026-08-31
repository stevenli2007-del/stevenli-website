# Roadmap.md — Phase 规划与任务清单

> 本文件是项目执行的唯一进度基准。工作方式沿用 Linkedin-AI-Assistant 与 Moyu 惯例：
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
| 3-3 | 🚩 墨屿截图 | Steven 提供 → 替换 Projects 卡片视觉（如需要） |
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

## 进度追踪

| Phase | 状态 | 完成时间 |
|---|---|---|
| Phase 0 | ✅ 已完成 | 2026-08-26 |
| Phase 1 | ✅ 已完成 | 2026-08-28 |
| Phase 2 | ✅ 已完成 | 2026-08-28 |
| Phase 3 | 🔄 进行中（6/8） | 3-1 ✅ 3-2 ✅ 3-4 ✅ 3-5 ✅ 3-6 ✅；3-3 🚩 素材 / 3-7 ⏳ 待走查 / 3-8 🚩 决策 |

> 每 Phase 签收后由 Bud 更新此表。
