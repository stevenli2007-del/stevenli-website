import Section from './Section'
import { experience, experienceTitle, type ExperienceEntry } from '../data/experience'

// Task 1-6 — Experience（PRD 4.4 / Design.md §5）
// 单条竖向时间线，5 节点，2022 → 2026 正序（数据顺序即展示顺序，不排序）。
// 学员 vs 受邀助教靠视觉区分，不加文字说明：
//   student    → 空心圆点（border 描边）+ font-medium 机构名
//   invited-ta → 实心圆点 + ring + font-semibold 机构名
// 星空少年 badge 复用状态徽章样式（灰底）。

function TimelineNode({ entry }: { entry: ExperienceEntry }) {
  const isTA = entry.role === "invited-ta"

  return (
    <li className="relative pl-10">
      {/* 节点圆点 */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2 h-2.5 w-2.5 rounded-full md:top-1.5 md:h-3 md:w-3 ${
          isTA
            ? "bg-[#1D1D1F] ring-2 ring-[#1D1D1F]/10"
            : "border-2 border-[#D2D2D7] bg-white"
        }`}
      />

      <p className="text-sm text-[#59595E]">{entry.period}</p>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3
          className={`${
            isTA ? "font-semibold" : "font-medium"
          } text-[#1D1D1F]`}
        >
          {entry.institution}
        </h3>
        {entry.badge && (
          <span className="rounded-full bg-[#6E6E73] px-3 py-0.5 text-xs font-medium text-white">
            {entry.badge}
          </span>
        )}
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6E6E73]">
        {entry.description}
      </p>

      {entry.keywords.length > 0 && (
        <p className="mt-2 text-sm text-[#59595E]">
          {entry.keywords.join(" · ")}
        </p>
      )}
    </li>
  )
}

export default function Experience() {
  return (
    <Section id="experience" tone="default">
      <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
        {experienceTitle}
      </h2>

      <ol className="relative mt-10 space-y-10 before:absolute before:left-[4.5px] before:top-2 before:bottom-2 before:w-px before:bg-[#D2D2D7] md:before:left-[5.5px]">
        {experience.map((entry) => (
          <TimelineNode key={entry.id} entry={entry} />
        ))}
      </ol>
    </Section>
  )
}
