# TechStack.md — Technical Contract

> 本文件是"契约"。Coder AI（workbuddy）不得擅自更换本文件中锁定的技术选型。如需变更，必须先修改本文件，再改代码。

## 1. 架构总览
纯前端静态站点（无后端、无数据库、无用户登录）。所有内容以本地数据文件（TS/JSON）形式硬编码在项目中，通过 CI/CD 自动部署。

```
Frontend (React SPA) → Cloudflare Pages (静态托管)
```

## 2. Frontend
- **框架：** React 18 + TypeScript
- **构建工具：** Vite
- **样式：** Tailwind CSS（不用 CSS-in-JS，不用 styled-components）
- **动效：** 仅用 CSS transition / Tailwind 自带的过渡类。**禁止**引入 Framer Motion、GSAP、parallax 库或任何重型动效库——PRD 明确要求"无花哨动效"。
- **图标：** lucide-react（如需要）
- **字体：**
  - 正文：系统字体栈（`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`）
  - Art 板块中文标题：可选中文衬线字体（如思源宋体 Noto Serif SC），需 Phase 3 引入，MVP 阶段用系统字体占位

## 3. 部署
- **平台：** Cloudflare Pages
- **构建命令：** `npm run build`
- **输出目录：** `dist`
- **域名：** 待补（Steven 已有 Cloudflare 账号，沿用现有生态）

## 4. 项目结构（Coder AI 必须遵守，不得自创目录结构）
```
/src
  /components       # 每个 section 一个组件：Hero.tsx, About.tsx, Projects.tsx, Experience.tsx, Art.tsx, Contact.tsx
  /data             # 内容数据，与展示逻辑分离（见 Database.md）
    site.ts
    about.ts
    projects.ts
    experience.ts
    artworks.ts
    contact.ts
  /assets           # 静态图片
  App.tsx
  main.tsx
  index.css         # Tailwind entry
/public
```

**关键规则：内容和展示逻辑必须分离。** 任何文字/图片路径/链接都不允许硬编码在组件 JSX 里，必须来自 `/src/data/*.ts`。这样以后改文案不用碰组件代码。

## 5. 响应式断点
沿用 Tailwind 默认断点（sm/md/lg/xl），移动优先（mobile-first）写法。

## 6. 明确禁止事项
- 不引入 CMS（Sanity, Contentful 等）
- 不引入数据库或后端 API
- 不引入用户认证
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
