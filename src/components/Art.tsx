import Section from './Section'
import { artworks, artworksTitle, type Artwork } from '../data/artworks'

// Task 1-7 — Art（PRD 4.5 / Design.md §6）
// 两列 masonry（columns-2 gap-4，纯 CSS 无库），移动单列。
// Phase 3 补图前 src 为 null → 渲染占位块；有图后换 <img loading="lazy">。
// 题跋中文保留原文，右对齐（书法落款习惯）。

function ArtworkItem({ artwork }: { artwork: Artwork }) {
  return (
    <figure className="mb-4 break-inside-avoid">
      {artwork.src ? (
        <img
          src={artwork.src}
          alt={artwork.alt}
          loading="lazy"
          className="w-full rounded-xl"
        />
      ) : (
        <div
          role="img"
          aria-label={artwork.alt}
          className={`w-full rounded-xl border border-[#D2D2D7] bg-white ${
            artwork.orientation === "horizontal" ? "aspect-[4/3]" : "aspect-[3/4]"
          }`}
        />
      )}
      {artwork.captionZh && (
        <figcaption className="mt-2 text-right text-sm text-[#6E6E73]">
          {artwork.captionZh}
        </figcaption>
      )}
    </figure>
  )
}

export default function Art() {
  return (
    <Section id="art" tone="muted">
      <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
        {artworksTitle}
      </h2>

      <div className="mt-10 columns-1 gap-4 md:columns-2">
        {artworks.map((artwork) => (
          <ArtworkItem key={artwork.id} artwork={artwork} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#6E6E73]">
        More calligraphy works at{' '}
        <a
          href="https://github.com/stevenli2007-del/moyu"
          target="_blank"
          rel="noreferrer"
          className="text-[#0071E3] hover:underline"
        >
          Moyu 墨屿
        </a>
        {' '}— AI-powered framing engine &amp; traditional art community
      </p>
    </Section>
  )
}
