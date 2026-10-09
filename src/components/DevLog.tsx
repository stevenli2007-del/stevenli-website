import { devLogEmpty, devLogIntro, devLogPosts, devLogTitle } from '../data/devLog'
import { useLocale } from '../lib/router'

// Phase 5（2026-10-09）新增 — /dev-log 页
// 白底；容器与间距同其它页面（max-w-6xl / py-16 md:py-20 / intro max-w-3xl）。
// Phase 5 只建结构：devLogPosts 为空 → 渲染空态卡片，不编造文章。
// Phase 6 再决定是继续单页索引还是拆出单篇路由。

export default function DevLog() {
  const locale = useLocale()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {devLogTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {devLogIntro[locale]}
        </p>

        {devLogPosts.length === 0 ? (
          <p className="mt-8 max-w-3xl rounded-2xl border border-dashed border-[#D2D2D7] bg-[#F5F5F7] px-6 py-8 text-sm leading-relaxed text-[#6E6E73]">
            {devLogEmpty[locale]}
          </p>
        ) : (
          <ol className="mt-8 max-w-3xl space-y-8">
            {devLogPosts.map((post) => (
              <li key={post.id} className="border-t border-[#D2D2D7] pt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6E6E73]">
                  {post.date}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#1D1D1F]">
                  {post.title[locale]}
                </h2>
                <p className="mt-1 text-sm text-[#59595E]">{post.topic[locale]}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6E6E73]">
                  {post.summary[locale]}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
