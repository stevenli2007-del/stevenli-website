import { artworks, artworksTitle, artworksIntro, artworksNote, renderArtworkImages, type Artwork } from '../data/artworks'
import { useLocale } from '../lib/router'
import type { Locale } from '../data/locales'

// Phase 4 Task 4-8 — Art 页（spec §4 Art）
// 灰底 #F5F5F7；新增 intro（max-w-3xl）+ 「四幅作品 · 行草」小注；画廊前置于图片区。
// 画廊：`columns-1 gap-4 md:columns-2`（保留两列 masonry 与**原图比例**，不裁切、不轮播）。
// 每张作品：白底圆角卡 `rounded-2xl border p-3`；题跋右上角对齐、
//   沿用 Noto Serif SC 子集字体；图片懒加载（`loading="lazy"`）。
// 题跋保持原繁体、两种语言一致（spec §5）；作品顺序 = 数据顺序（不加序号覆盖艺术作品）。
// Task 4-10（Lighthouse 归因驱动）：① 补 `width`/`height` —— 缺尺寸会让空间不预留，是 CLS 0.102 的
//   唯一成因；② **首图**改 `loading="eager"` + `fetchPriority="high"` —— 它是 LCP 元素，用 lazy
//   会让浏览器降级加载（spec §7 要求本页 Lighthouse ≥ 90）。
// Task 4-10 续（Steven 2026-10-08 决定）：作品图改用 `renderArtworkImages` 开关控制 ——
//   当前为 false，四张作品渲染为**与原图等比**的占位框（见 artworks.ts）。因为下一轮还要做
//   「各独立页面内容与文案调整」，现在为图片体积做压缩/瘦身属无效功；占位框顺带消除 LCP 瓶颈。
//   占位框的宽高比直接取 `width`/`height`，所以**版式与真实图片完全一致**，切回 true 不会跳版。

function ArtworkItem({
  artwork,
  locale,
  priority,
}: {
  artwork: Artwork
  locale: Locale
  priority: boolean
}) {
  const src = renderArtworkImages ? artwork.src : null

  return (
    <figure className="mb-4 break-inside-avoid rounded-2xl border border-[#D2D2D7] bg-white p-3">
      {src ? (
        <img
          src={src}
          alt={artwork.alt[locale]}
          width={artwork.width}
          height={artwork.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="w-full rounded-xl"
        />
      ) : (
        <div
          role="img"
          aria-label={artwork.alt[locale]}
          style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}
          className="w-full rounded-xl border border-[#D2D2D7] bg-[#F5F5F7]"
        />
      )}
      {artwork.captionZh && (
        <figcaption
          className="mt-3 text-right text-sm text-[#6E6E73]"
          style={{ fontFamily: '"Noto Serif SC", serif' }}
        >
          {artwork.captionZh}
        </figcaption>
      )}
    </figure>
  )
}

export default function Art() {
  const locale = useLocale()

  return (
    <section className="bg-[#F5F5F7]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {artworksTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {artworksIntro[locale]}
        </p>

        <p className="mt-3 text-sm text-[#6E6E73]">{artworksNote[locale]}</p>

        <div className="mt-8 columns-1 gap-4 md:columns-2">
          {artworks.map((artwork, index) => (
            <ArtworkItem
              key={artwork.id}
              artwork={artwork}
              locale={locale}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
