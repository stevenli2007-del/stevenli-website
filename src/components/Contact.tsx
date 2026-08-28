import Section from './Section'
import { contactInfo, contactTitle } from '../data/contact'

// Task 1-8: Contact — link list per PRD 4.6 / Design.md §7
// LinkedIn 为 null 时降级为灰色禁用样式，Phase 3 Task 3-4 替换为真实链接。

const EMAIL_LABEL = 'Email'
const GITHUB_LABEL = 'GitHub'
const LINKEDIN_LABEL = 'LinkedIn'
const CWS_LABEL = 'Chrome Web Store'

export default function Contact() {
  return (
    <Section id="contact" tone="default">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
        {contactTitle}
      </h2>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <a
          href={`mailto:${contactInfo.email}`}
          className="inline-flex items-center rounded-full bg-[#0071E3] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ED]"
        >
          {EMAIL_LABEL} · {contactInfo.email}
        </a>

        <a
          href={contactInfo.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-[#D2D2D7] px-6 py-3 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:border-[#86868B]"
        >
          {GITHUB_LABEL}
        </a>

        {contactInfo.linkedin ? (
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-[#D2D2D7] px-6 py-3 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:border-[#86868B]"
          >
            {LINKEDIN_LABEL}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center rounded-full border border-[#D2D2D7]/60 px-6 py-3 text-[15px] font-medium text-[#86868B]"
          >
            {LINKEDIN_LABEL} · Coming Soon
          </span>
        )}

        <a
          href={contactInfo.chromeWebStore}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-[#D2D2D7] px-6 py-3 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:border-[#86868B]"
        >
          {CWS_LABEL}
        </a>
      </div>
    </Section>
  )
}
