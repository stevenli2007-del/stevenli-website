import {
  awards,
  awardsTitle,
  education,
  educationTitle,
  skillGroups,
  skillsTitle,
} from '../data/education'
import { useLocale } from '../lib/router'

// Phase 5（2026-10-09）新增 — Home 页的 Education / Awards / Technical Skills 区块
// 白底（紧接灰底 #F5F5F7 的 About 区块之后）；容器与间距同其它页面（max-w-6xl / py-16 md:py-20）。
// 标题层级：Home 的 h1 在 Hero，About 已是 h2，故本区块 h2 = Education，
//   Awards 与 Technical Skills 降为 h3（避免与 About 同级却更零碎，也不跳级）。
// 竞赛名 / 课程名 / 工具名一律不翻译，原样渲染。

export default function Education() {
  const locale = useLocale()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {educationTitle[locale]}
        </h2>

        <div className="mt-6 max-w-3xl">
          <p className="text-lg font-medium text-[#1D1D1F]">{education.school}</p>
          <p className="mt-1 text-base text-[#1D1D1F]">{education.program[locale]}</p>
          <p className="mt-1 text-sm text-[#6E6E73]">{education.detail[locale]}</p>

          <p className="mt-4 text-sm leading-relaxed text-[#6E6E73]">
            <span className="font-medium text-[#59595E]">{education.coursesLabel[locale]}</span>
            {' · '}
            {education.courses.join(' · ')}
          </p>
        </div>

        <h3 className="mt-12 text-xl font-semibold text-[#1D1D1F]">{awardsTitle[locale]}</h3>

        <ul className="mt-4 max-w-3xl border-t border-[#D2D2D7]">
          {awards.map((award) => (
            <li
              key={`${award.title.en}-${award.year}`}
              className="flex items-baseline justify-between gap-6 border-b border-[#D2D2D7] py-3"
            >
              <div>
                <p className="text-base text-[#1D1D1F]">{award.title[locale]}</p>
                <p className="mt-1 text-sm text-[#6E6E73]">{award.detail[locale]}</p>
              </div>
              <p className="shrink-0 text-xs tabular-nums text-[#59595E]">{award.year}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xl font-semibold text-[#1D1D1F]">{skillsTitle[locale]}</h3>

        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label.en}>
              <p className="text-sm font-medium text-[#59595E]">{group.label[locale]}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6E6E73]">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
