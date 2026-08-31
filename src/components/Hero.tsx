import Section from './Section'
import { siteInfo } from '../data/site'

// Task 1-3 — Hero（PRD 4.1）
// Phase 3：头像 + legal name + tagline + 一行 intro。
// 纯白背景，Apple 极简风。用排版密度而非图片填充空间。
// h1 层级按 Design.md §3：text-5xl md:text-6xl font-semibold tracking-tight leading-tight

export default function Hero() {
  return (
    <Section id="hero" tone="default">
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-5">
        <img
          src={siteInfo.photo}
          alt={siteInfo.name}
          className="h-44 w-44 rounded-full object-cover object-[50%_18%] shadow-lg md:h-56 md:w-56"
        />
        <div className="max-w-xl text-center space-y-3">
          <p className="text-lg text-[#6E6E73]">{siteInfo.name}</p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight text-[#1D1D1F] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="text-base leading-relaxed text-[#86868B] md:text-lg">
            Turning manual workflows into automated systems.
            Building at the intersection of hardware, software, and design.
          </p>
        </div>
      </div>
    </Section>
  )
}
