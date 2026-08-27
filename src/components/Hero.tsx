import Section from './Section'
import { siteInfo } from '../data/site'

// Task 1-3 — Hero（PRD 4.1）
// 定位句 + 极简背景；笔迹水印留到 Phase 3。
// h1 层级按 Design.md §3：text-5xl md:text-6xl font-semibold tracking-tight leading-tight

export default function Hero() {
  return (
    <Section id="hero" tone="default">
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-center text-5xl font-semibold tracking-tight leading-tight text-[#1D1D1F] md:text-6xl">
          {siteInfo.tagline}
        </h1>
      </div>
    </Section>
  )
}
