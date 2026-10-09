import {
  contactInfo,
  contactLinks,
  contactTitle,
  contactIntro,
  emailAction,
  projectLabel,
} from '../data/contact'
import { useLocale } from '../lib/router'
import type { Locale } from '../data/locales'
import type { ContactLink } from '../data/contact'

// Phase 4 Task 4-9 — Contact 页（spec §4 Contact）
// 白底；intro max-w-3xl；**邮箱是唯一主按钮**（`rounded-full bg-[#0071E3] px-6 py-3`），
// 可见地址单独一行；其余链接**降级为内联文字链接**（不再全是药丸按钮 —— spec §3 诊断：
// 四个同级按钮让「首选联系方式」无从判断）。
// 外部链接一律 `target="_blank" rel="noreferrer"`。
// 分组：GitHub / LinkedIn 是联系方式；Chrome Web Store 是项目入口，按 spec §4（P1）
// 挂在 muted 的「项目」标签下，与联系方式区分。

function OutboundLink({ link, locale }: { link: ContactLink; locale: Locale }) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className="hover:underline">
      {link.label[locale]}
    </a>
  )
}

export default function Contact() {
  const locale = useLocale()
  const profiles = contactLinks.filter((link) => link.group === 'profile')
  const projects = contactLinks.filter((link) => link.group === 'project')

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {contactTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {contactIntro[locale]}
        </p>

        <a
          href={`mailto:${contactInfo.email}`}
          className="mt-6 inline-flex rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white"
        >
          {emailAction[locale]}
        </a>

        <p className="mt-3 text-sm text-[#6E6E73]">{contactInfo.email}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#0071E3]">
          {profiles.map((link) => (
            <OutboundLink key={link.href} link={link} locale={locale} />
          ))}
        </div>

        {projects.length > 0 && (
          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm font-medium text-[#0071E3]">
            <span className="text-[#6E6E73]">{projectLabel[locale]}</span>
            {projects.map((link) => (
              <OutboundLink key={link.href} link={link} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
