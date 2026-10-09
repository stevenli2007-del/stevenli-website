import { aboutInfo } from '../data/about'
import { useLocale } from '../lib/router'

// Phase 4 Task 4-4 — About 区块（spec §4 About），已并入 Home（Roadmap Phase 4 决策）
// 灰底 #F5F5F7；narrative 限宽 max-w-3xl；三张白卡例子（sm 起三列）；底部 identity strip。
// 设计适配：原独立页的 H1 降为 h2 —— Home 的 h1 已在 Hero（保证每页单 h1 语义）。

export default function About() {
  const locale = useLocale()

  return (
    <section className="bg-[#F5F5F7]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {aboutInfo.title[locale]}
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {aboutInfo.narrative[locale]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {aboutInfo.examples.map((example, index) => (
            <div key={index} className="rounded-2xl border border-[#D2D2D7] bg-white p-5">
              <p className="text-base font-semibold text-[#1D1D1F]">{example.title[locale]}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6E6E73]">{example.effect[locale]}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 border-t border-[#D2D2D7] pt-5 text-sm font-medium text-[#1D1D1F]">
          {aboutInfo.identity[locale]}
        </p>
      </div>
    </section>
  )
}
