// Phase 4 Task 4-1 — 未知路径的 404 状态（spec §4 共享外壳）
// 文案来自 src/data/shell.ts；Task 4-2 会换成统一的 page frame。

import Section from './Section'
import { Link, useLocale } from '../lib/router'
import { notFound } from '../data/shell'

export default function NotFound() {
  const locale = useLocale()

  return (
    <Section id="not-found" tone="default">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {notFound.title[locale]}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#6E6E73]">
          {notFound.body[locale]}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white"
        >
          {notFound.homeLink[locale]}
        </Link>
      </div>
    </Section>
  )
}
