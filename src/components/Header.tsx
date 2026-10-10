// Phase 4 Task 4-2 — 顶部导航外壳（spec §2）
// sticky 定位；品牌 / 路由 / 语言切换。移动端两行（第二行横向滚动），不用汉堡菜单、不加动效。
// 路由链接保留当前 query，切页不丢 ?lang=；语言切换保留当前路径。

import { Link, localeHref, normalizePath, useLocale, useLocation } from '../lib/router'
import { brand, languageSwitch, navigation, navItems } from '../data/shell'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]'

export default function Header() {
  const locale = useLocale()
  const { pathname, search } = useLocation()
  const current = normalizePath(pathname)

  const routeLinks = navItems.map((item) => {
    // Phase 6：子路径也算命中（/dev-log/<slug> 时高亮 Dev Log）
    const isCurrent =
      current === item.path || (item.path !== '/' && current.startsWith(`${item.path}/`))
    return (
      <li key={item.path}>
        <Link
          to={`${item.path}${search}`}
          aria-current={isCurrent ? 'page' : undefined}
          className={`text-sm ${focusRing} ${
            isCurrent
              ? 'font-medium text-[#1D1D1F]'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          {item.label[locale]}
        </Link>
      </li>
    )
  })

  const optionClass = (active: boolean) =>
    `rounded-full px-3 py-1.5 ${focusRing} ${
      active ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[#D2D2D7] bg-white/95 backdrop-blur-sm">
      <nav
        aria-label={navigation.label[locale]}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-3"
      >
        <Link
          to={`/${search}`}
          className={`text-sm font-semibold tracking-tight text-[#1D1D1F] ${focusRing}`}
        >
          {brand}
        </Link>

        {/* 桌面：单行路由列表 */}
        <ul className="hidden items-center gap-6 md:flex">{routeLinks}</ul>

        <div
          role="group"
          aria-label={languageSwitch.groupLabel[locale]}
          className="inline-flex rounded-full border border-[#D2D2D7] p-1 text-xs"
        >
          <Link
            to={localeHref(pathname, search, 'en')}
            aria-label={languageSwitch.toEnglish[locale]}
            aria-current={locale === 'en' ? 'true' : undefined}
            className={optionClass(locale === 'en')}
          >
            {languageSwitch.shortEnglish}
          </Link>
          <Link
            to={localeHref(pathname, search, 'zh')}
            aria-label={languageSwitch.toChinese[locale]}
            aria-current={locale === 'zh' ? 'true' : undefined}
            className={optionClass(locale === 'zh')}
          >
            {languageSwitch.shortChinese}
          </Link>
        </div>

        {/* 移动端：第二行，横向滚动（spec §2 允许滚动，不做菜单动画） */}
        <ul className="flex w-full gap-5 overflow-x-auto whitespace-nowrap pb-1 md:hidden">
          {routeLinks}
        </ul>
      </nav>
    </header>
  )
}
