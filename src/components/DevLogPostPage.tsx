import {
  devLogBackToIndex,
  devLogTitle,
  findDevLogPost,
  type DevLogBlock,
} from '../data/devLog'
import { Link, useLocale, useLocation } from '../lib/router'
import { siteTitle } from '../data/shell'
import { useEffect } from 'react'
import NotFound from './NotFound'
import type { Locale } from '../data/locales'

// Phase 6（2026-10-09）新增 — /dev-log/<slug> 单篇页（Roadmap 6-4：单篇独立路由）。
// 排版沿用站内既有令牌：白底、max-w-3xl 正文、h1 3xl/4xl、正文 text-[17px] leading-relaxed 灰 #6E6E73。
// 图片：不裁切，width/height 取自文件实际像素（零 CLS），首图 eager，其余 lazy。
// 文案零硬编码：返回链接、图注标签均来自 data 层。

function Block({ block, locale, index }: { block: DevLogBlock; locale: Locale; index: number }) {
  if (block.type === 'h') {
    return (
      <h2 className="mt-10 text-xl font-semibold tracking-tight text-[#1D1D1F]">
        {block.text[locale]}
      </h2>
    )
  }

  if (block.type === 'img') {
    return (
      <figure className="mt-6">
        <img
          src={block.src}
          alt={block.alt[locale]}
          width={block.width}
          height={block.height}
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : undefined}
          decoding="async"
          className="w-full rounded-xl border border-[#D2D2D7]"
        />
        {block.caption && (
          <figcaption className="mt-2 text-xs leading-relaxed text-[#6E6E73]">
            {block.caption[locale]}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <p className="mt-4 text-[17px] leading-relaxed text-[#6E6E73]">{block.text[locale]}</p>
  )
}

export default function DevLogPostPage({ slug }: { slug: string }) {
  const locale = useLocale()
  const { search } = useLocation()
  const post = findDevLogPost(slug)

  useEffect(() => {
    if (!post) return
    document.title = `${post.title[locale]} — ${siteTitle.base[locale]}`
  }, [locale, post])

  if (!post) return <NotFound />

  return (
    <article className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
        <Link
          to={`/dev-log${search}`}
          className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]"
        >
          ← {devLogBackToIndex[locale]}
        </Link>

        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-[#6E6E73]">
          {post.date} · {post.category[locale]}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {post.title[locale]}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#1D1D1F]">{post.summary[locale]}</p>

        {/* Phase 6：封面图（可选）—— 不裁切，竖/方幅限宽居中，width/height 防 CLS */}
        {post.cover && (
          <figure className="mt-8">
            <img
              src={post.cover.src}
              alt={post.cover.alt[locale]}
              width={post.cover.width}
              height={post.cover.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="mx-auto w-full max-w-[560px] rounded-xl border border-[#D2D2D7]"
            />
          </figure>
        )}

        <div className="mt-8">
          {post.body.map((block, index) => (
            <Block key={index} block={block} locale={locale} index={index} />
          ))}
        </div>

        <p className="mt-16 border-t border-[#D2D2D7] pt-6 text-sm text-[#6E6E73]">
          <Link
            to={`/dev-log${search}`}
            className="hover:text-[#1D1D1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]"
          >
            ← {devLogTitle[locale]}
          </Link>
        </p>
      </div>
    </article>
  )
}
