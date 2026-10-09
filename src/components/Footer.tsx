// Phase 4 Task 4-2 — 页脚（spec §2：所有路由可见）
// 只放版权行，不重复导航；版权行两种语言均使用 legal name。

import { useLocale } from '../lib/router'
import { footer } from '../data/shell'

export default function Footer() {
  const locale = useLocale()

  return (
    <footer className="border-t border-[#D2D2D7]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-xs leading-relaxed text-[#6E6E73]">{footer.copyright[locale]}</p>
      </div>
    </footer>
  )
}
