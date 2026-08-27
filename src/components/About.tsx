import Section from './Section'
import { aboutInfo } from '../data/about'

// Task 1-4 — About（PRD 4.2）
// 2-3 行核心叙事 + 四个自动化例子并列 + 身份线；灰底（muted）。
// 字阶按 Design.md §3：h2 标题 / body-lg 叙事 / body 例子标题 / caption effect 与身份线

export default function About() {
  return (
    <Section id="about" tone="muted">
      <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
        {aboutInfo.title}
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#1D1D1F]">
        {aboutInfo.narrative}
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {aboutInfo.examples.map((example) => (
          <li key={example.title}>
            <p className="text-base font-medium text-[#1D1D1F]">{example.title}</p>
            <p className="mt-1 text-sm text-[#6E6E73]">{example.effect}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[#6E6E73]">{aboutInfo.identity}</p>
    </Section>
  )
}
