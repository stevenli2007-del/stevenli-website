import { experience, experienceTitle, experienceIntro, type ExperienceEntry } from '../data/experience'
import { useLocale } from '../lib/router'
import type { Locale } from '../data/locales'

// Phase 4 Task 4-7 — Experience 页（spec §4 Experience）
// 白底；intro max-w-3xl；时间线 `relative mt-8 space-y-8 before:…`（左侧 1px 竖线）。
// 每条 `relative pl-8`：period（xs/uppercase/tracking-wide）→ institution（lg/semibold）
//   → 单段精简 description（max-w-3xl）→ keywords（xs）。
// 2026 受邀助教：实心节点 `bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10` + 深色「受邀」徽章；
//   学员节点保持空心（border-2 + bg-white）。2023 的「星空少年」徽章保留、降为灰底。
// 时间序 2022 → 2026 不变（数据顺序即展示顺序）。

function TimelineNode({ entry, locale }: { entry: ExperienceEntry; locale: Locale }) {
  const isTA = entry.role === 'invited-ta'

  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${
          isTA ? 'bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10' : 'border-2 border-[#D2D2D7] bg-white'
        }`}
      />

      <p className="text-xs font-medium uppercase tracking-wide text-[#6E6E73]">
        {entry.period[locale]}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className={`text-lg text-[#1D1D1F] ${isTA ? 'font-semibold' : 'font-medium'}`}>
          {entry.institution[locale]}
        </h2>
        {entry.badge && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-white ${
              isTA ? 'bg-[#1D1D1F]' : 'bg-[#6E6E73]'
            }`}
          >
            {entry.badge[locale]}
          </span>
        )}
      </div>

      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6E6E73]">
        {entry.description[locale]}
      </p>

      {entry.keywords.length > 0 && (
        <p className="mt-2 text-xs text-[#59595E]">
          {entry.keywords.map((keyword) => keyword[locale]).join(' · ')}
        </p>
      )}
    </li>
  )
}

export default function Experience() {
  const locale = useLocale()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {experienceTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {experienceIntro[locale]}
        </p>

        <ol className="relative mt-8 space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[#D2D2D7]">
          {experience.map((entry) => (
            <TimelineNode key={entry.id} entry={entry} locale={locale} />
          ))}
        </ol>
      </div>
    </section>
  )
}
