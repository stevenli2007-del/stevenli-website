import Section from './Section'
import { artworks, artworksTitle, type Artwork } from '../data/artworks'
import { useLocale } from '../lib/router'
import type { Locale } from '../data/locales'

// Task 1-7 — Art（PRD 4.5 / Design.md §6）
// Phase 4 Task 4-3：标题与 alt 改读双语数据；题跋保持原繁体（两种语言一致）。
// 版式（两列 masonry 原比例 + intro + 白卡片）留待 Task 4-8 按 spec §4 重做。

function ArtworkItem({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  return (
    <figure className="mb-4 break-inside-avoid">
      {artwork.src ? (
        <img
          src={artwork.src}
          alt={artwork.alt[locale]}
          loading="lazy"
          className="w-full rounded-xl"
        />
      ) : (
        <div
          role="img"
          aria-label={artwork.alt[locale]}
          className={`w-full rounded-xl border border-[#D2D2D7] bg-white ${
            artwork.orientation === 'horizontal' ? 'aspect-[4/3]' : 'aspect-[3/4]'
          }`}
        />
      )}
      {artwork.captionZh && (
        <figcaption
          className="mt-2 text-right text-sm text-[#6E6E73]"
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
    <Section id="art" tone="muted">
      <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
        {artworksTitle[locale]}
      </h2>

      <div className="mt-10 columns-1 gap-4 md:columns-2">
        {artworks.map((artwork) => (
          <ArtworkItem key={artwork.id} artwork={artwork} locale={locale} />
        ))}
      </div>
    </Section>
  )
}
