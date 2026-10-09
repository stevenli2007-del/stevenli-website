import Section from './Section'
import { contactInfo, contactLinks, contactTitle, emailAction } from '../data/contact'
import { useLocale } from '../lib/router'

// Task 1-8 — Contact（PRD 4.6 / Design.md §7）
// Phase 4 Task 4-3：移除组件内硬编码 label，改读 contact 数据（具名链接 + 主按钮文案）。
// 版式（邮箱主按钮、其余降级为内联链接）留待 Task 4-9 按 spec §4 重做。

export default function Contact() {
  const locale = useLocale()

  return (
    <Section id="contact" tone="default">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
        {contactTitle[locale]}
      </h2>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <a
          href={`mailto:${contactInfo.email}`}
          className="inline-flex items-center justify-center rounded-full bg-[#0071E3] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ED]"
        >
          {emailAction[locale]} · {contactInfo.email}
        </a>

        {contactLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#D2D2D7] px-6 py-3 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:border-[#86868B]"
          >
            {link.label[locale]}
          </a>
        ))}
      </div>
    </Section>
  )
}
