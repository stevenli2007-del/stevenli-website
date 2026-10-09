import { useEffect, type ReactNode } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Art from './components/Art'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import { navItems, siteTitle } from './data/shell'
import { normalizePath, useLocale, useLocation } from './lib/router'

// Phase 4 Task 4-1 — 路由骨架（spec §1）：五条路由对应五个叙事部分，顺序同 PRD §4。
//   （About 已于 2026-10-08 并入 Home，路由由六变五；旧 /about 在下方 remap 到 /，prod 再经 _redirects 301）
// Phase 4 Task 4-2 — 站点外壳：sticky header + footer，并同步 <html lang> / document.title / meta description。
// 现阶段每条路由挂 Phase 1 的旧 section 组件（站点随时可部署、不坏），
// Task 4-4 ~ 4-9 再逐页按 spec §4 重做（其中 4-4 Home 含原 About 内容）。

const routes: { path: string; element: ReactNode }[] = [
  { path: '/', element: <><Hero /><About /></> },
  { path: '/projects', element: <Projects /> },
  { path: '/experience', element: <Experience /> },
  { path: '/art', element: <Art /> },
  { path: '/contact', element: <Contact /> },
]

function App() {
  const { pathname } = useLocation()
  const locale = useLocale()
  // About 已并入 Home（2026-10-08）：旧 /about 链接兜底到 /，prod 由 _redirects 301
  const path = normalizePath(pathname) === '/about' ? '/' : normalizePath(pathname)
  const route = routes.find((item) => item.path === path)

  // spec §5：html lang / 文档标题 / meta description 随语言与路由同步
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'

    const pageLabel = navItems.find((item) => item.path === path)?.label[locale]
    document.title =
      pageLabel && path !== '/'
        ? `${pageLabel} — ${siteTitle.base[locale]}`
        : siteTitle.base[locale]

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', siteTitle.description[locale])
  }, [locale, path])

  return (
    <>
      <Header />
      <main>{route ? route.element : <NotFound />}</main>
      <Footer />
    </>
  )
}

export default App
