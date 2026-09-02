# PRD.md — Personal Website Product Requirements

## 1. 产品定位
一个面向美国大学教授 / 投资人 / startup 圈受众的个人单页网站（personal site），核心目的：用最少的滚动、最清晰的叙事，证明「Steven 是一个持续把手动流程自动化的 builder」。

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

## 4. 页面结构（单页，六个 section，顺序固定）

### 4.1 Hero
- 定位句 `Builder · Calligrapher · UC Berkeley 2030`
- 背景：极简，可选用本人行草笔迹做隐约水印/分隔线（非必须，Phase 3 再做）

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
   - Links: CWS (Extension ID `jeknmkmekajcbffbfijmmmcakpbbcoa`), GitHub `stevenli2007-del/Linkedin-AI-Assistant`
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
- 风格：行草，繁体字；题材倾向长征主题联语
- 3-5 张高清作品照（横幅+条幅搭配），Phase 3 补图前用占位图
- 视觉签名：章节标题/分隔线用本人笔迹（Phase 3，非 MVP 必需）
- 此板块允许保留中文原文

### 4.6 Contact
- Email: stevenli2007@berkeley.edu
- GitHub: stevenli2007-del
- LinkedIn: 待补
- Chrome Web Store 链接

## 5. 非功能性需求
- 纯静态单页 SPA，无 CMS，无博客系统，无后端数据库
- 视觉风格：Apple 极简，clean white, rounded corners，浅色为主（深色模式可选，非 MVP）
- 响应式：移动端必须适配（教授/投资人大概率用手机点开邮件里的链接）
- 无花哨动效、无 parallax、无 hero video
- 加载速度优先于视觉效果

## 6. 待补素材清单（Phase 3 之前必须收集，缺失时用占位符不阻塞开发）
1. IEEE 论文题目 / 发表 venue / 作者位次
2. 书法作品高清照 3-5 张
3. LinkedIn AI Assistant 商店截图
4. LinkedIn 主页链接

## 7. 验收标准（MVP = Phase 1+2 完成时）
- 六个 section 内容完整（占位符可接受，缺失文字不可接受）
- 移动端和桌面端都无布局错乱
- 无 console error
- Lighthouse Performance ≥ 90
