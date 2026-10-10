# Phase 5 — 简历候选补充清单

**日期：** 2026-10-09 ｜ **事实基准：** Steven 提供的 NVIDIA 申请版简历（2026-10-09）
**用途：** 列出「网站、仓库和项目文档里**有证据**、但简历或网站尚未呈现」的项目细节，
以及「简历与现有资料**互相打架**」需要 Steven 拍板的项。

> **2026-10-09 二轮更新（Steven 裁定）：** 冲突项 **A**（Tempo 学习计划）与 **B**（专业写法）**已解决**，
> 见第二节划掉的两行。仍待你回答的是 **C / D / E / F / G**：时间段、ESAP 年份、
> 以及简历要不要补 2022 冬令营 / 2023 星空少年 / 2025 YYGS。

证据来源缩写：`[repo]` 仓库代码/文档 ｜ `[gh]` GitHub 仓库 README ｜ `[docs]` 项目治理文档 ｜ `[site]` 现有网站

---

## 一、可直接补进简历的已核实细节

### 1. Cal Hacks 门户：评审后台被写成了「规模化评分」问题

**事实** `[gh]`（github.com/stevenli2007-del/hackportal README 原文）
- 四个 track（hacker / judge / mentor / volunteer），track 表单是**配置 + `jsonb`**，不是四套写死的表单
- 提交后的申请**自动分配给评审**，覆盖率面板专门暴露「评分卡在哪」
- 所有权限规则收在 Postgres RLS 的**一个 `is_organizer()` 函数**后面
- 架构：`Browser → Next.js（Server Components 读 / Server Actions 写 / proxy.ts 刷新会话）↕ Supabase`
- 已公开部署：https://hackportal-tempo-70da.vercel.app

**建议位置：** Cal Hacks FA26 Application Portal 的第 2 条 bullet 末尾，或新增第 4 条。
**示例写法：** "Modeled tracks as configuration plus `jsonb` instead of four hardcoded forms, and centralized every access rule in Postgres row-level security behind a single `is_organizer()` helper."
**需你确认：** 否 —— README 原文。唯一要你决定的是**要不要在简历里放公开 URL**（放了 reviewer 会真的点进去，好处是能自证，风险是他们只花 30 秒扫一眼界面）。

---

### 2. Tempo：自测卷刻意「不出新题」（ADR-027）

**事实** `[docs]`（Tempo `docs/Decisions.md` ADR-027，2026-09-18，Steven 亲自否掉类型 B）
- 类型 A（忠实自测）：把用户选的往年卷切成题、答案默认收起
- 类型 B（LLM 照风格出新题）：**被否掉**，理由是「把产品可信度押在模型身上」——练习卷的价值全在答案对不对，编的题用户没法验证
- 配套约束：答案读不出来时**整张卷子整体失败**，不降级

**建议位置：** Tempo 的第 1 条或新增一条 bullet。
**示例写法：** "Designed practice exams to slice questions from instructor-provided past exams and answer keys rather than generating new ones, so every answer stays verifiable."
**需你确认：** 是 —— 这是「我刻意没做什么」的设计取舍，简历里写这类内容很能区分人，但会占篇幅。NVIDIA 的 engineering 岗吃这套，我建议写。

---

### 3. Tempo：考试复习模式与「按考试聚合」

**事实** `[docs]`（Tempo `docs/Phase-0-MVP.md` P0-3-31，2026-09-20 验收通过；P0-5-2 课程详情页）
- 以考试为入口，聚合该课程已索引的文件（可勾选）+ 允许上传额外文件 → 生成**这场考试**的总结
- 无往年卷时「出卷」按钮**禁用且有说明**，绝不降级成模型编题

**建议位置：** Tempo 第 1 条 bullet（在 "generates interactive study notes and practice exams" 后面补半句）。
**需你确认：** 否。

---

### 4. Tempo：数据接入方式本身是个可写的取舍

**事实** `[docs]`（ADR-013 / ADR-014）
- 有官方 API 的平台（bCourses / Canvas）走**用户自己提供的 PAT**
- 没有官方接口的平台走**邮件入站 + 用户提供**，**明确不逆向**
- 实时检测变化 → 动态更新 → 重新规划，是产品内核（总蓝图「为什么是蓝海」）

**建议位置：** Tempo 第 1 条 bullet，把 "aggregates assignments and deadlines across campus platforms" 落具体。
**需你确认：** 是 —— 目前实际接的是 **Canvas + 邮件**，"across campus platforms"（复数）略有夸大。建议改成 "across Canvas and forwarded email"，等真接了 Gradescope/Piazza 再改回复数。

---

### 5. X-Institute 助教：SEM 参观与 AI 辅助开发教学

**事实** `[site]`（现有网站 2026 暑期节点）
- 带学生参观 SEM 实验室（深大）
- 教学生用 WorkBuddy 做 AI 辅助开发

**建议位置：** X-Institute Teaching Assistant 的第 1 条或第 3 条 bullet。
**示例写法：** "Guided students through an SEM lab visit and introduced them to AI-assisted development."
**需你确认：** 是 —— 简历第 3 条已经写了 "introduced students to AI-assisted development with WorkBuddy"，SEM 那条**目前只在网站上有**。要不要同步进简历？（我建议加：硬件岗看重仪器经验。）

---

### 6. LinkedIn 扩展：可写的功能细节（简历目前只写了「生成消息」）

**事实** `[repo]`（`CHANGELOG.md` / `docs/Roadmap.md`）
- 可配置消息长度上限（默认 300 字符，50–1000），并用 `enforceMaxLength()` 在 LLM 输出后强制截断（句子边界 → 词边界 → 硬截）
- "Find Common Points"：AI 找出 5 个共同点，**用户选一个**再生成
- History + CSV 导出（默认关闭，opt-in）
- Preference Memory（10-3-8-P2，2026-07-30）：保存用户的润色指令并注入后续生成
- CORS 由 `*` 收紧到 `chrome-extension://`（工程审计 I6）

**建议位置：** LinkedIn AI Assistant 第 2 条 bullet。
**需你确认：** 是 —— 挑 1 条最有分量的即可（我推荐 `enforceMaxLength()` 那条：能体现「LLM 输出不可信，得有兜底」的工程判断）。

---

### 7. Technical Skills 可补的后端/数据项

**事实** `[repo]` `[docs]`
- Supabase 已列；**Postgres + 行级安全（RLS）**、**REST API 设计**、**Canvas REST API**、**Zod**（输入校验）、**wrangler** 未列

**建议位置：** Technical Skills → Tools & Platforms，或新增 "Data & Backend"。
**需你确认：** 是 —— 简历 Skills 区长度有上限，挑 2–3 个即可。

---

## 二、必须先确认、不能直接写的冲突项 🔴

| # | 冲突 | 我的判断 | 需要你回答 |
|---|---|---|---|
| ~~A~~ | ~~简历写 Tempo "generates semester-long and daily study plans"，但 Tempo 文档里标为 Phase 2~~ | ✅ **已解决（Steven 2026-10-09）**：Tempo 是**持续项目**，网站要把功能写全 —— 学习计划（整学期 + 每日）、学习笔记与简历提到的能力**全部写入** description，并在 outcome 标注「仍在持续开发」。简历原文**不用改** | ~~无~~ |
| ~~B~~ | ~~简历专业 = Engineering Physics & Computer Science；旧记录是 L&S → 主修 EECS~~ | ✅ **已解决（Steven 2026-10-09）：「专业就按简历上的来」** —— 网站已按 `Engineering Physics & Computer Science` 上站，旧记录「L&S → EECS」作废 | ~~无~~ |
| C | X-Institute 助教时间：网站写 **2026 暑期**，简历无日期 | 保留 2026 暑期 | 具体**月份**？NVIDIA 会看时间线 |
| D | ESAP：网站写 **2024 暑期**，简历只写机构名无年份；论文 2025 发表 | 一致（2024 做研究，2025 发表） | 简历**要不要补 2024**？建议补 |
| E | 简历 Experience 只有 2 条（X-Institute TA、ESAP）；网站有 5 个节点（含 2022 冬令营、2023 暑期科研营、2025 YYGS） | 网站保留全部（你要求保留既有内容） | 简历**要不要补**这三条？NVIDIA Ignite 面向大一/大二，早期经历能证明持续性，建议至少补 2023「星空少年 · 3,000 选 20」 |
| F | IEEE 日期：简历写 **Jun. 2025**（会议），网站记录 **2025-08-29**（IEEE Xplore "Date Added to Xplore"） | 简历用会议月没问题，网站目前**不写具体日期**，只写 venue 年份 | 确认要不要在简历 Publication 区区分「会议日期 / 上线日期」 |
| G | 网站 About 区块有 **Convenience Store Mini Program**（给妈妈便利店做的小程序），简历与 NVIDIA 目标无关 | 本轮未动 | **要不要从 NVIDIA 版简历/网站移除或降级**？ |
| H | Moyu | 网站 2026-09-01 已全站移除，简历也无 | 无需动作 |

---

## 三、为 NVIDIA 两个 track 做的排序建议（待你定）

- **Hardware Engineering**：ESAP 洁净间工艺（光刻 / 热氧化 / 量子点表征）+ IEEE 论文 + EWOD 校准 + SEM —— 这堆是 Steven 最硬的硬件证据，建议在简历里把 **ESAP 提到 Experience 第一条**（目前 X-Institute TA 在前），并把 Publication 区块紧跟 Experience。
- **Software Engineering**：Tempo（Next.js + Supabase + RLS）与 Cal Hacks（RLS + 评审后台）是两条最完整的全栈证据；LinkedIn 扩展证明「能独立发布」。
- ⚠️ 两份 NVIDIA Ignite 岗位都写明了 **12 周、Santa Clara 线下**，申请前请确认档期可行（Phase 5 遗留待办，原记录在已清理的 Phase 5 计划文档里，现并入本清单以免丢失）。
