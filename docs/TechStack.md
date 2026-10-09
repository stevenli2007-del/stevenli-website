# TechStack.md — Technical Contract

> 本文件是"契约"。Coder AI（workbuddy）不得擅自更换本文件中锁定的技术选型。如需变更，必须先修改本文件，再改代码。

## 1. 架构总览
纯前端静态站点（无后端、无数据库、无用户登录）。所有内容以本地数据文件（TS/JSON）形式硬编码在项目中，通过 CI/CD 自动部署。

```
Frontend (React SPA) → Cloudflare Pages (静态托管)
```

## 2. Frontend
- **框架：** React 18 + TypeScript（TS 5.8）
- **构建工具：** Vite
- **路由：** **零依赖自研**（`src/lib/router.tsx`，约 50 行）—— **不引入 react-router / wouter 等任何路由库**。理由：5 条静态路由、无嵌套、无 loader，路由库是纯负担（react-router 约 +12KB gzip），与 PRD「Lighthouse ≥ 90」直接冲突。语言状态走 query（`?lang=`），URL 是唯一事实源。
- **样式：** Tailwind CSS v4（经 `@tailwindcss/vite` 插件；不用 CSS-in-JS，不用 styled-components）
- **动效：** 仅用 CSS transition / Tailwind 自带的过渡类。**禁止**引入 Framer Motion、GSAP、parallax 库或任何重型动效库——PRD 明确要求"无花哨动效"。
- **图标：** 全站零图标库（状态点用 `<span>` + 圆角背景色实现）
- **字体：**
  - 正文：系统字体栈（`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`）
  - Art 题跋：Noto Serif SC **子集化**（112 字符，住 `src/assets/fonts/`，`@font-face` + `font-display: swap`）

## 3. 部署
- **平台：** Cloudflare Pages
- **构建命令：** `npm run build`
- **输出目录：** `dist`
- **域名：** 当前是 Cloudflare 临时子域名 `https://stevenli-website.stevenli2007.workers.dev`；自定义域名（原 3-8）在 Phase 4 收尾后执行，届时旧 URL 自动 301、不丢流量

**Phase 4 起（多路由）必须保留 `public/_redirects`：**

```
/about / 301
/* /index.html 200
```

- 第 1 行：旧的 `/about` 永久重定向到首页（About 已并入 Home，避免已分享链接 404）
- 第 2 行：SPA fallback —— **没有它，直接访问 `/projects` 会 404**
- 该文件在 `public/` 下，随构建原样复制进 `dist/`；改动它属于**部署配置**，不违反「只改指定文件」纪律

## 4. 项目结构（Coder AI 必须遵守，不得自创目录结构）
```
/docs              # 开发宪法与公约（文档层，不参与构建）
  PRD.md           # 产品需求
  Roadmap.md       # Phase 规划与任务清单（唯一进度基准）
  TechStack.md     # 技术契约（本文件）
  Database.md      # 数据字典（数据层契约）
  Design.md        # UI 设计规范（Design Tokens）
  design-spec-v3.md   # Phase 4 双语多页重构 spec（Codex 产出，只读参考）
  website-outline.md  # 最初的内容大纲
/src
  /components       # 每条路由一个页面组件 + 外壳/工具组件
    Hero.tsx        #   `/`（上）
    About.tsx       #   `/`（下，原独立页，2026-10-08 并入首页）
    Projects.tsx    #   `/projects`
    Experience.tsx  #   `/experience`
    Art.tsx         #   `/art`
    Contact.tsx     #   `/contact`
    Header.tsx      #   站点外壳（Phase 4）
    Footer.tsx      #   站点外壳（Phase 4）
    NotFound.tsx    #   404（Phase 4）
    Section.tsx     #   通用 section 容器（当前仅 NotFound 引用）
  /lib
    router.tsx      # 零依赖自研路由（useLocation / useSearchParams / useLocale / Link / navigate）
  /data             # 内容数据，与展示逻辑分离（见 Database.md）
    locales.ts      #   Locale / LocalizedText 基础类型（Phase 4）
    site.ts
    about.ts
    projects.ts
    experience.ts
    artworks.ts
    contact.ts
    shell.ts        #   外壳文案：导航 / 语言切换 / 页脚 / metadata / 404（Phase 4）
  /assets           # 静态资源（图片 + 字体）
    art/             # 书法作品图片（4 张）
    fonts/           # 子集化字体（Noto Serif SC，112 字符）
  App.tsx           # 路由表 + Header/Footer 外壳 + <html lang> / title / meta 同步
  main.tsx
  index.css         # Tailwind entry + @font-face
/public
  _redirects        # Cloudflare Pages 重定向与 SPA fallback（Phase 4）
```

**关键规则：内容和展示逻辑必须分离。** 任何文字/图片路径/链接都不允许硬编码在组件 JSX 里，必须来自 `/src/data/*.ts`。这样以后改文案不用碰组件代码。

## 5. 响应式断点
沿用 Tailwind 默认断点（sm/md/lg/xl），移动优先（mobile-first）写法。

## 6. 明确禁止事项
- 不引入 CMS（Sanity, Contentful 等）
- 不引入数据库或后端 API
- 不引入用户认证
- **不引入路由库**（路由自研，见 §2；同样不引入状态管理库 —— 语言状态在 URL 里）
- 不引入 hero video / parallax / GSAP
- 不使用 emoji 作为 UI 元素
- 不自由更换本文件锁定的技术栈（如想用 Next.js 替代 Vite，必须先讨论并更新本文件）

## 7. 本地开发
```bash
npm install
npm run dev       # localhost:5173 默认
npm run build      # 生产构建
npm run preview    # 预览生产构建
```
