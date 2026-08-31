import Section from './Section'
import { siteInfo } from '../data/site'

// Task 1-3 — Hero（PRD 4.1）
// Phase 3 增强：头像 + legal name + 定位句 + 全幅背景图。
// 背景为深圳夜景（春笋），暗调 → 文字反白，底部渐变遮罩保证可读性。
// h1 层级按 Design.md §3：text-5xl md:text-6xl font-semibold tracking-tight leading-tight

export default function Hero() {
  return (
    <Section id="hero" tone="default" className="relative overflow-hidden !px-0 bg-transparent">
      {/* 全幅背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${siteInfo.heroBg})` }}
      />
      {/* 底部渐变遮罩：深色渐变保证白色文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* 内容层 */}
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6">
        <img
          src={siteInfo.photo}
          alt={siteInfo.name}
          className="h-40 w-40 rounded-full object-cover object-[50%_18%] shadow-xl ring-2 ring-white/20 md:h-48 md:w-48"
        />
        <div className="text-center">
          <p className="text-lg text-white/80">{siteInfo.name}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight leading-tight text-white md:text-5xl">
            {siteInfo.tagline}
          </h1>
        </div>
      </div>
    </Section>
  )
}
