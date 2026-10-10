import { useEffect, type ReactNode } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import Experience from './components/Experience'
import DevLog from './components/DevLog'
import DevLogPostPage from './components/DevLogPostPage'
import Art from './components/Art'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import { navItems, siteTitle } from './data/shell'
import { findDevLogPost } from './data/devLog'
import { normalizePath, useLocale, useLocation } from './lib/router'

// Phase 4 Task 4-1 — 路由骨架（spec §1）：路由对应各叙事部分，顺序同 PRD §4。
//   （About 已于 2026-10-08 并入 Home，路由由六变五；旧 /about 在下方 remap 到 /，prod 再经 _redirects 301）
// Phase 4 Task 4-2 — 站点外壳：sticky header + footer，并同步 <html lang> / document.title / meta description。
// Phase 5（2026-10-09）：新增 /dev-log，路由由五变六。
// Phase 6（2026-10-09）：新增单篇深链 /dev-log/<slug>（Roadmap 6-4）。静态表之外加一段前缀匹配，
//   不引入路由库；线上 Worker 侧 not_found_handling = single-page-app，深路径无需任何服务端配置。

// Phase 5（2026-10-09）：① Home 追加 Education/Awards/Skills 区块；
//   ② 新增 /dev-log 路由（路由由 5 变 6，顺序见 data/shell.ts）。
const routes: { path: string; element: ReactNode }[] = [
  { path: '/', element: <><Hero /><About /><Education /></> },
  { path: '/projects', element: <Projects /> },
  { path: '/experience', element: <Experience /> },
  { path: '/dev-log', element: <DevLog /> },
  { path: '/art', element: <Art /> },
  { path: '/contact', element: <Contact /> },
]

function App() {
  const { pathname } = useLocation()
  const locale = useLocale()
  // About 已并入 Home（2026-10-08）：旧 /about 链接兜底到 /，prod 由 _redirects 301
  const path = normalizePath(pathname) === '/about' ? '/' : normalizePath(pathname)
  const route = routes.find((item) => item.path === path)

  // Phase 6：/dev-log/<slug> —— 命中数据层才渲染单篇，否则 NotFound
  const devLogSlug = path.startsWith('/dev-log/') ? path.slice('/dev-log/'.length) : null
  const devLogPost = devLogSlug ? findDevLogPost(devLogSlug) : undefined

  // spec §5：html lang / 文档标题 / meta description 随语言与路由同步
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'

    // 单篇页用文章标题（子组件的 effect 先跑，会被这里覆盖，所以此处一并处理）
    const pageLabel = devLogPost
      ? devLogPost.title[locale]
      : navItems.find((item) => item.path === path)?.label[locale]
    document.title =
      pageLabel && path !== '/'
        ? `${pageLabel} — ${siteTitle.base[locale]}`
        : siteTitle.base[locale]

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', siteTitle.description[locale])
  }, [locale, path, devLogPost])

  return (
    <>
      <Header />
      <main>
        {route
          ? route.element
          : devLogSlug
            ? devLogPost
              ? <DevLogPostPage slug={devLogSlug} />
              : <NotFound />
            : <NotFound />}
      </main>
      <Footer />
    </>
  )
}

export default App
