import Section from './Section'
import { siteInfo } from '../data/site'

// Task 1-3 — Hero（PRD 4.1）
// Phase 3 增强：头像 + legal name + 定位句，居中纵向排列。
// h1 层级按 Design.md §3：text-5xl md:text-6xl font-semibold tracking-tight leading-tight

export default function Hero() {
  return (
    <Section id="hero" tone="default">
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
        <img
          src={siteInfo.photo}
          alt={siteInfo.name}
          className="h-40 w-40 rounded-full object-cover shadow-lg md:h-48 md:w-48"
        />
        <div className="text-center">
          <p className="text-lg text-[#6E6E73]">{siteInfo.name}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight leading-tight text-[#1D1D1F] md:text-5xl">
            {siteInfo.tagline}
          </h1>
        </div>
      </div>
    </Section>
  )
}
