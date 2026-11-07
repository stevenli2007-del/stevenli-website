import { experience, experienceTitle, experienceIntro, type ExperienceEntry } from '../data/experience'
import { useLocale } from '../lib/router'
import type { Locale } from '../data/locales'

// Phase 4 Task 4-7 — Experience 页（spec §4 Experience）
// 米色底（`bg-[#faf9f5]`，Phase 7b）；intro max-w-3xl；时间线 `relative mt-8 space-y-8 before:…`（左侧 1px 竖线）。
// 每条 `relative pl-8`：period（xs/uppercase/tracking-wide）→ institution（lg/semibold）
//   → 单段精简 description（max-w-3xl）→ keywords（xs）。
// 2026 受邀助教：实心节点 `bg-[#1D1D1F] ring-4 ring-[#1D1D1F]/10` + 深色「受邀」徽章；
//   学员节点保持空心（border-2 + bg-white）。2023 的「星空少年」徽章保留、降为灰底。
// 数据层按时间正序维护（2022 → 2026），**页面倒序展示**（最近在上），见下方 timeline 常量。
//
// Phase 6 微调（2026-10-09，Steven 指定）：每条加配图 —— 见 Design.md §9.4。
//   文字与图：宽屏两栏（文字 1fr / 图 22rem），窄屏图落在文字下方、限宽 22rem 防竖幅图过高。
//   图片**不裁切**（保留原始比例），`width`/`height` 取自文件实际像素 → 零 CLS。
//   仅首条 `loading="eager"` + `fetchPriority="high"`（其余 lazy）——倒序后首条 = 2026 受邀助教。
//
// Phase 7b（2026-11-06，Steven 指定）：时间轴改为倒序，2026 → 2022；数据层物理顺序不动。

function TimelineNode({
  entry,
  locale,
  priority,
}: {
  entry: ExperienceEntry
  locale: Locale
  priority: boolean
}) {
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

      <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
        <div className="min-w-0">
          <p className="max-w-3xl text-sm leading-relaxed text-[#6E6E73]">
            {entry.description[locale]}
          </p>

          {entry.keywords.length > 0 && (
            <p className="mt-2 text-xs text-[#59595E]">
              {entry.keywords.map((keyword) => keyword[locale]).join(' · ')}
            </p>
          )}
        </div>

        <img
          src={entry.image.src}
          alt={entry.imageAlt[locale]}
          width={entry.image.width}
          height={entry.image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="w-full max-w-[22rem] self-start rounded-xl border border-[#D2D2D7] lg:max-w-none"
        />
      </div>
    </li>
  )
}

// 展示序列：数据层按时间正序维护，页面倒序渲染（最近在上，2026 → 2022）。
// 于是「首条」= 2026 受邀助教：实心节点、受邀徽章与 eager 首图都落在它身上。
const timeline = [...experience].reverse()

export default function Experience() {
  const locale = useLocale()

  return (
    <section className="bg-[#faf9f5]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {experienceTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {experienceIntro[locale]}
        </p>

        <ol className="relative mt-8 space-y-8 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[#D2D2D7]">
          {timeline.map((entry, index) => (
            <TimelineNode key={entry.id} entry={entry} locale={locale} priority={index === 0} />
          ))}
        </ol>
      </div>
    </section>
  )
}
