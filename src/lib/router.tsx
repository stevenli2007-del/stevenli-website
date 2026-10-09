// Phase 4 Task 4-1 — 零依赖路由（Roadmap Phase 4 决策：不引入 react-router）
// 只有 5 条静态路由（About 已并入 Home）、无嵌套无 loader，路由库是纯负担（~12KB gzip）。
// 职责：读当前 pathname / search、程序化导航、Link 拦截（普通 <a>，href 真实可分享）。

import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from 'react'
import type { Locale } from '../data/locales'

export interface RouteLocation {
  pathname: string
  search: string
}

const listeners = new Set<() => void>()

function read(): RouteLocation {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  }
}

function emit(): void {
  listeners.forEach((listener) => listener())
}

export function navigate(to: string, options?: { replace?: boolean }): void {
  const url = new URL(to, window.location.origin)

  // 外链交给浏览器，不走 pushState
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href)
    return
  }

  const next = `${url.pathname}${url.search}`
  if (next === `${window.location.pathname}${window.location.search}`) return

  if (options?.replace) window.history.replaceState(null, '', next)
  else window.history.pushState(null, '', next)

  // spec §2：不加 scroll-behavior: smooth，切换即到顶
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  emit()
}

export function useLocation(): RouteLocation {
  const [location, setLocation] = useState<RouteLocation>(read)

  useEffect(() => {
    const sync = () => setLocation(read())
    listeners.add(sync)
    window.addEventListener('popstate', sync)
    return () => {
      listeners.delete(sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  return location
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(useLocation().search)
}

// spec §5：语言只存在 URL 的 ?lang= 里，URL 是唯一事实源，无本地持久化
export function useLocale(): Locale {
  return useSearchParams().get('lang') === 'zh' ? 'zh' : 'en'
}

// 尾斜杠归一：'/about/' 与 '/about' 同路由，根路径保留 '/'
export function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

// 保留当前 pathname 与既有 query，只改 lang（spec §5）
export function localeHref(pathname: string, search: string, locale: Locale): string {
  const params = new URLSearchParams(search)
  params.set('lang', locale)
  return `${pathname}?${params.toString()}`
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  replace?: boolean
}

export function Link({ to, replace, onClick, children, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    // 修饰键 / 中键 / 新窗口：交回浏览器默认行为
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (event.button !== 0) return
    if (rest.target && rest.target !== '_self') return

    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
