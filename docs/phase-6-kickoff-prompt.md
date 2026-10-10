我们开始 Phase 6 —— 「Art 与 Dev Log 深度打磨」。这是新会话的开工 prompt，以下内容自成一体，直接粘贴即可。

工作目录：`/Users/youchengli/Projects/Personal Website`
仓库：`github.com/stevenli2007-del/stevenli-website`
托管：Cloudflare Workers + Static Assets，构建由 **Workers Builds** 跑（**不是 Cloudflare Pages**）
线上：`https://stevenli-website.stevenli2007.workers.dev`（仍是临时域名，自定义域名未配）

---

## 一、开工前先读，读完复述进度再动手（Steven 的硬性开场）

1. `.workbuddy/memory/MEMORY.md` —— 长期项目笔记，**含所有现行设计决策，别靠通用知识猜**
2. `.workbuddy/memory/2026-10-09.md` —— 今天做完的 8 条内容微调 + Phase 6 Dev Log 方案讨论全过程
3. `docs/Roadmap.md` 的 **Phase 6 章节**（任务清单 6-1 ~ 6-5）
4. `docs/Design.md` §9 —— **现行 v3 视觉规范**（§3~§7 已标作废，别按旧的来）
5. `docs/Database.md` §2 与 §10 —— 数据字典（ExperienceEntry、DevLogPost）

读完后先复述「现状是什么 + 今天计划做什么」，再开工。

---

## 二、Phase 6 任务清单（来自 Roadmap，按此执行）

| # | 任务 | 关键备注 |
|---|---|---|
| 6-1 | **Art 真图切回** | `src/data/artworks.ts` 的 `renderArtworkImages`（当前 `false`）置回 `true`。占位框宽高比取自原图像素比，**切回不跳版**。⚠️ Phase 4 时图片体积曾让 Art 移动端 Lighthouse 掉到 **87**，切之前先算总体积并考虑压缩 |
| 6-2 | **Art 内容定稿** | 四幅作品的题跋、尺寸、创作背景，中英双语定稿；确认「龍虎風雨，天下梟雄」的标题用法（图上另有两行题字，Steven 指定用前者） |
| 6-3 | **Dev Log 首批文章** | 见下方第四节「写作契约」，那是硬约束 |
| 6-4 | **Dev Log 形态决策** | ✅ **已定**：单篇独立路由 `/dev-log/<slug>`，不要再来一轮方案讨论 |
| 6-5 | **走查与收尾** | 全设备走查 + Lighthouse 复测（**Performance ≥ 90、Accessibility 100**）+ docs 同步（Design / Database / Roadmap 三份都要跟） |

计划写 4 篇，Steven 已指定主题：
**X-Institute 助教**（首发）→ **Tempo** → **LinkedIn AI Assistant** → **可能加 ESAP / IEEE 论文**

---

## 三、已拍板的四项（2026-10-09 Steven 确认，别推翻也别再问）

1. **页面定位放宽**：给每篇加 `category` 标签（Dev / Lab / Research 之类），`/dev-log` 的 intro 从「shipped 项目的 build notes」放宽成「我做过的事的构建笔记与复盘」。理由：四篇里只有 Tempo 和 LinkedIn 是真·产品上线，助教和 ESAP 不是。
2. **路由形态**：单篇独立路由 `/dev-log/<slug>` + 干净的索引页。
3. **语气：贴近 https://blog.dylanlu.com/going-to-nvidia/ 的互联网腔**（第一人称、短句、自嘲、承认搞砸）。⚠️ 我提示过风险（受众是教授 / NVIDIA recruiter + 中文直译无对应词），Steven 确认要这档。
4. **照片：学生正脸可用**（Steven 说已取得授权）。我的自我约束：**文章里不点名学生**。

---

## 四、Dev Log 写作契约（硬约束）

**结构：叙事做皮、四问当骨。** Roadmap 6-3 要求每篇回答「想做什么 / 试了什么 / 什么变了或失败了 / 下次怎么做」—— 但**不要做成四个小标题**（那样像周报）。让四个答案自然长在故事里：读起来是叙事，检查时四项都在。

**双语：不直译，改功能对等。** 英文用英文自己的口语层（`lowk` / `honestly` / `nope`），中文用中文自己的口语层（「讲真」「挺别扭的」「搞砸了」）。保证**语气一致 + 信息一致**即可，spec §5 不要求字面相等。

**一条护栏：技术论断处一律平实。** 招聘官扫「我做了什么」的句子时，不该撞上俚语。口语负责节奏和诚实，平实负责可信度。

**素材：** 每张图必须有双语 `alt`；图片按既有管线处理（`ImageOps.exif_transpose` → 最长边 **880px** → JPEG **quality 80 / progressive / optimize**）。

**最重要的一条：** 每篇必须来自 Steven 确认过的真实经历，**不得从项目名称臆造事实、日期、数字或反思**。这轮开工卡点就在这儿 —— 见第六节。

**节奏：先写一篇（X-Institute 助教）当样稿，Steven 认可语气后再铺其余三篇。** 别一次性写四篇。

---

## 五、已经查证过的硬事实（不用重复探，直接用）

- ✅ **`/dev-log/<任意路径>` 线上已返回 SPA index（HTTP 200）** —— 实测探过。Worker 侧 `not_found_handling` 是 single-page-app，所以**拆单篇路由零配置可用**。
- ⚠️ **仓库内没有任何 wrangler 配置文件**（无 `wrangler.jsonc` / `wrangler.toml`），Workers Builds 配置全在 Cloudflare 面板侧。别去找了。
- `App.tsx` 里是 `routes.find(item => item.path === path)` 的**静态路由**，加深链接需在路由表里加一个前缀匹配分支（约 15 行）。
- `DevLogPost.body` 当前是 `LocalizedText[]`（纯段落数组），**装不下图片和小标题** —— 写带图文章前必须先升级成 block 结构。
- `src/data/artworks.ts` 第 15 行 `export const renderArtworkImages = false`。
- 受众与基调：**2026-10-09 起主目标是 NVIDIA Ignite 大一 / 大二 Software & Hardware Engineering internships**，简历是唯一事实基准。

---

## 六、开工卡点：写 6-3 之前必须先问 Steven 这 10 个事实

前 3 条不答就动不了笔：

1. **那十天具体在做什么？** 带几个学生、什么学段、每天在干嘛？
2. **中间出过什么岔子？** —— 这是整篇的骨头。「我很充实」没人看完；「第三天数据全废了，因为……」才有人看。
3. **接触角测量平台是你自己写的代码吗？** 你动手做了哪部分、哪部分是别人的？

其余 7 条：确切日期 / 哪个组跟哪位老师（我记的是赵蒙组，需确认）/ 深大看 SEM 是哪天看了什么 / 采访视频谁拍的聊了什么 / 有没有一个**具体瞬间**支撑「未来开发会越来越容易」这句 / 那个平台现在在谁手里还在跑吗 / 愿意公开到什么尺度（老师姓名、项目细节）。

---

## 七、踩过的坑（照着绕，别重蹈）

- 🔴 **`docs/../public/_redirects` 只能留一行 `/about / 301`**。加 `/* /index.html 200` 会让 Workers Builds **构建失败**（2026-10-08 实锤）。SPA fallback 由 Worker 侧提供，不要写进这个文件。
- 🔴 **push 到 main 会触发自动构建，但必须查 check run 确认 success** —— 构建失败时线上**静默停在旧版本**，CDN 照样返回 200，不报错。验收固定两步：
  ① `gh api repos/stevenli2007-del/stevenli-website/commits/<sha>/check-runs --jq '.check_runs[] | "\(.status) | \(.conclusion)"'` → `completed success`
  ② 线上 `<title>` 附近引用的 `index-*.js` 指纹 == 本地 `dist/assets/` 同名文件
- 沙箱代理会拦本地请求：`curl http://localhost:5173/` 返回 502 看着像服务挂了 —— **本地地址一律加 `--noproxy '*'`**。
- Vite 只监听 IPv6：用 **`http://localhost:5173`**，别用 `127.0.0.1`。
- Chrome 无头 + `--user-data-dir=/tmp/...` 有概率触发删除 `~/Library/Application Support/Google/RLZ/RlzStore.plist` 的授权弹窗，**被拒则整个 Chrome 起不来**；拒绝后别重试同一条命令。收工记得清进程，`kill -9` 有时也杀不掉剩余的 helper，最后用 Activity Monitor 兜一遍。
- CDP 脚本三处易错：`import WebSocket from 'ws'` 时 `onMsg(raw)` 收到的是裸 Buffer（`raw.toString()`，`addEventListener` 会变 `[object Object]`）；收尾用 `ws.off` 不是 `removeEventListener`；**懒加载图在整页截图里不会被触发**，截图前要逐屏滚到底再滚回顶部。

---

## 八、遗留项（这轮顺手处理掉）

- `projects.ts` 里 Tempo 卡仍写 **`109 users in public beta`**、description 里 **`77 users in private beta`** —— Hero intro 与 proof 行已统一为 `100+`，**就差这一处**，Steven 之前只指定改 intro。问一句要不要统一。
- 仓库根目录有 3 个 2026-08-28 的旧报告文件（`chromewebdata_*.report.html`、`lighthouse-report.html`、`localhost_*.report.html`），共约 1.6MB，是清理候选 —— **删之前先问**。
- 自定义域名仍未配置。

---

## 九、协作习惯（Steven 偏好）

- **改完直接 commit + push 上线**，他会自己去网站上看效果，不用等他 review diff 再推。
- 每一条改动都要给出**可验证的结果**（构建、check run、溢出测量数值、线上指纹），不要只说「应该没问题」。
- 中文回答，结论先行，表格化，✅ / ⚪ 状态符号，别写长篇铺陈。
- 收工定义：`git status` 干净 + 临时脚本已删 + 记一笔 `.workbuddy/memory/YYYY-MM-DD.md`。
