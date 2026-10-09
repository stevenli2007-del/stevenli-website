import { Link, useLocale, useLocation } from '../lib/router'
import { siteInfo } from '../data/site'

// Phase 4 Task 4-4 — Home / Hero（spec §4 Home）
// 纯白背景；文案列在 DOM 前、桌面端头像靠右；头像缩小（h-32 / md:h-40）并移除阴影；
// 新增 proof line 与双 CTA。无动效、无阴影、无新图片。
// 容器高度扣掉 sticky header（约 4.5rem），避免首屏被挤压（spec 诊断 §3 Home）。
// CTA 链接保留当前 ?lang=（延续「语言跟着走」）。

export default function Hero() {
  const locale = useLocale()
  const { search } = useLocation()

  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col items-center justify-center gap-8 px-6 py-12 md:flex-row md:justify-between md:gap-12 md:py-16">
        <div className="max-w-2xl text-center md:text-left">
          <p className="text-sm font-medium text-[#6E6E73]">{siteInfo.name}</p>

          {/* tagline 两行渲染：school 一行（专名 nowrap，不拆行）、focus 一行（可自由换行）。
              两行之间不放任何分隔符字符 —— 见 site.ts 的 tagline 注释。 */}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight leading-tight text-[#1D1D1F] md:text-5xl">
            <span className="block whitespace-nowrap">{siteInfo.tagline.school[locale]}</span>
            <span className="block">{siteInfo.tagline.focus[locale]}</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#6E6E73] md:text-lg">
            {siteInfo.intro[locale]}
          </p>

          <p className="mt-4 text-sm font-medium text-[#59595E]">{siteInfo.proof[locale]}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              to={`/projects${search}`}
              className="rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white"
            >
              {siteInfo.cta.projects[locale]}
            </Link>
            <Link
              to={`/contact${search}`}
              className="rounded-full border border-[#D2D2D7] px-5 py-2.5 text-sm font-medium text-[#1D1D1F]"
            >
              {siteInfo.cta.contact[locale]}
            </Link>
          </div>
        </div>

        <img
          src={siteInfo.photo}
          alt={siteInfo.name}
          className="h-32 w-32 shrink-0 rounded-full object-cover object-[50%_18%] md:order-2 md:h-40 md:w-40"
        />
      </div>
    </section>
  )
}
