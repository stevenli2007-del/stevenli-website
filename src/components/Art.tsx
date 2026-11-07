import { useRef, useState } from 'react'
import {
  artworks,
  artworksTitle,
  artworksIntro,
  artworksNote,
  artworksGalleryLabel,
  artworksPrevLabel,
  artworksNextLabel,
  artworksSwipeHint,
  artworksGoToLabel,
} from '../data/artworks'
import { useLocale } from '../lib/router'

// Phase 7（2026-11-06）—— 编辑式图集（editorial photo gallery），第二版视觉。
// 参考形态：Swiper「Photo Gallery – Minimal」的近黑画框 + 弱化控件 / Bridget Baker 的数字计数器 /
//   摄影集常见的 contact-sheet 缩略图同步条。共通点：图占满画面、chrome 退到边缘、以编号导航。
// 本页的具体做法：
//   ① 每张 slide 自带画框底色（tone）：白纸作品 → 纯白，黑纸白墨 → #0B0B0C，
//      画布随横滑自然推进（无 JS 改色、无淡入），图边界与画布融合，像挂在展墙上；
//   ② 超大低对比编号 01/02/03 压在角落，纯装饰（aria-hidden）；
//   ③ 图集下方：细线进度段 → 数字计数 / 缩略图条 / 极简箭头；桌面端箭头浮在画面两侧。
//   ④ 原生 overflow-x + CSS scroll-snap（触摸横滑 / 触控板 / 惯性滚动），零依赖、无自动播放、
//      无视差、无过渡动效。高级感靠画布、留白与层级，不靠动画。
// 图片：不裁切，width/height 写文件实际像素（防 CLS）；首图 eager + high，其余 lazy。
// 无障碍：可聚焦 region（方向键切换）、每张图双语 alt、缩略图按钮有 aria-label 与 aria-current、
//   箭头 aria-label 含可见字符 ← / →（WCAG 2.5.3）；滚动条隐藏用组件上的 Tailwind 任意属性类，
//   不写进 index.css —— 该文件当前另有其它工作流的未提交改动，本轮不碰。

function pad(index: number): string {
  return String(index + 1).padStart(2, '0')
}

function clampIndex(index: number): number {
  return Math.max(0, Math.min(artworks.length - 1, index))
}

export default function Art() {
  const locale = useLocale()
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeTone = artworks[active].tone

  // 每张 slide 宽度 = track.clientWidth（间距做在 slide 内部，不加 flex gap），故步进恒为 clientWidth
  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const next = clampIndex(index)
    track.scrollTo({ left: next * track.clientWidth, behavior: 'auto' })
    setActive(next)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const next = clampIndex(Math.round(track.scrollLeft / track.clientWidth))
    setActive((current) => (current === next ? current : next))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(active - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(active + 1)
    }
  }

  const ghostButton = (tone: 'light' | 'dark') =>
    tone === 'dark'
      ? 'border-white/25 text-white hover:bg-white/10'
      : 'border-[#1D1D1F]/20 text-[#1D1D1F] hover:bg-[#1D1D1F]/5'

  const arrowBase =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border text-base transition-colors disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]'

  return (
    <section className="bg-[#faf9f5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {artworksTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {artworksIntro[locale]}
        </p>

        <p className="mt-3 text-sm text-[#6E6E73]">{artworksNote[locale]}</p>
      </div>

      {/* 主舞台：每张 slide 自带画框底色，横滑时白 → 黑自然推进 */}
      <div className="relative mt-10 md:mt-14">
        <div
          ref={trackRef}
          role="region"
          aria-label={artworksGalleryLabel[locale]}
          aria-roledescription="carousel"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]"
        >
          {artworks.map((artwork, index) => {
            const dark = artwork.tone === 'dark'
            return (
              <div
                key={artwork.id}
                className={`relative flex w-full flex-none snap-start items-center justify-center overflow-hidden px-0 py-8 sm:px-8 md:px-16 md:py-14 ${dark ? 'bg-[#0B0B0C]' : 'bg-white'}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-4 top-2 hidden select-none text-[88px] font-semibold leading-none tracking-tighter md:block lg:left-10 lg:top-6 lg:text-[140px] ${dark ? 'text-white/10' : 'text-[#1D1D1F]/[0.06]'}`}
                >
                  {pad(index)}
                </span>
                <img
                  src={artwork.src}
                  alt={artwork.alt[locale]}
                  width={artwork.width}
                  height={artwork.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  decoding="async"
                  className="relative h-auto max-h-[62vh] w-auto max-w-full object-contain md:max-h-[68vh]"
                />
              </div>
            )
          })}
        </div>

        {/* 桌面端：箭头浮在画面两侧，颜色随当前画框明暗切换 */}
        <button
          type="button"
          aria-label={artworksPrevLabel[locale]}
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
          className={`${arrowBase} ${ghostButton(activeTone)} absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:inline-flex lg:left-8`}
        >
          ←
        </button>
        <button
          type="button"
          aria-label={artworksNextLabel[locale]}
          disabled={active === artworks.length - 1}
          onClick={() => goTo(active + 1)}
          className={`${arrowBase} ${ghostButton(activeTone)} absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:inline-flex lg:right-8`}
        >
          →
        </button>
      </div>

      {/* 控制区：细线进度 → 计数 / 缩略图条 / 箭头（移动端） */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-20">
        <div aria-hidden="true" className="mt-8 flex gap-1">
          {artworks.map((artwork, index) => (
            <span
              key={artwork.id}
              className={`h-px flex-1 ${index <= active ? 'bg-[#1D1D1F]' : 'bg-[#D2D2D7]'}`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="shrink-0 text-xs tracking-[0.2em] tabular-nums text-[#1D1D1F]">
            {pad(active)} <span className="text-[#A1A1A6]">/</span> {String(artworks.length).padStart(2, '0')}
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                type="button"
                aria-label={artworksGoToLabel(index)[locale]}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => goTo(index)}
                className={`block w-12 border p-0.5 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3] sm:w-16 ${
                  index === active
                    ? 'border-[#1D1D1F] opacity-100'
                    : 'border-[#D2D2D7] opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={artwork.src}
                  alt=""
                  width={artwork.width}
                  height={artwork.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
                <span className="mt-1 block text-center text-[10px] tabular-nums tracking-widest text-[#6E6E73]">
                  {pad(index)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 gap-2 md:hidden">
            <button
              type="button"
              aria-label={artworksPrevLabel[locale]}
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
              className={`${arrowBase} h-9 w-9 border-[#D2D2D7] text-[#1D1D1F]`}
            >
              ←
            </button>
            <button
              type="button"
              aria-label={artworksNextLabel[locale]}
              disabled={active === artworks.length - 1}
              onClick={() => goTo(active + 1)}
              className={`${arrowBase} h-9 w-9 border-[#D2D2D7] text-[#1D1D1F]`}
            >
              →
            </button>
          </div>

          {/* 桌面端占位：让缩略图条保持视觉居中 */}
          <span aria-hidden="true" className="hidden w-[88px] shrink-0 md:block" />
        </div>

        <p className="mt-5 text-center text-xs tracking-wide text-[#6E6E73]">
          {artworksSwipeHint[locale]}
        </p>
      </div>
    </section>
  )
}
