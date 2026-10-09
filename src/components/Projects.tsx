import { projects, projectsTitle, projectsIntro, stackLabel, statusLabels, type Project } from '../data/projects'
import { useLocale } from '../lib/router'

// Phase 4 Task 4-6 — Projects 页（spec §4 Projects）
// 白底；intro max-w-3xl；两列卡片网格（lg 起两列，替代原来三列留空位）。
// 卡片：状态降级为「圆点 + 小字」一行（原 status chip 比证据更抢眼，见 spec §3 诊断），
//       title → outcome（蓝黑正文）→ description → Stack 置底 → 链接（mt-auto 贴底）。
// 无 hover 阴影、无动效（spec：no hover animation or shadow）。
// 标题层级：页面 h1 = Selected Projects，卡片标题降为 h2（保证单 h1 + 不跳级）。

// Phase 5：新增 beta / submission 两个状态（Tempo 公开测试、Cal Hacks take-home 已提交）
const statusDot: Record<Project['status'], string> = {
  live: 'bg-[#34C759]',
  beta: 'bg-[#FF9F0A]',
  submission: 'bg-[#8E8E93]',
  'in-development': 'bg-[#FF9F0A]',
  published: 'bg-[#5E5CE6]',
}

function ProjectCard({ project, locale }: { project: Project; locale: 'en' | 'zh' }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#D2D2D7] bg-white p-6 md:p-7">
      <p className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#6E6E73]">
        <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} aria-hidden="true" />
        {statusLabels[project.status][locale]}
      </p>

      <h2 className="mt-3 text-xl font-semibold text-[#1D1D1F]">{project.title[locale]}</h2>

      <p className="mt-1 text-base font-medium text-[#1D1D1F]">{project.outcome[locale]}</p>

      <p className="mt-3 text-sm leading-relaxed text-[#6E6E73]">{project.description[locale]}</p>

      {project.techStack.length > 0 && (
        <div className="mt-5 border-t border-[#D2D2D7] pt-4">
          <p className="text-xs leading-relaxed text-[#6E6E73]">
            <span className="font-medium text-[#59595E]">{stackLabel[locale]}</span>
            {' · '}
            {project.techStack.join(' · ')}
          </p>
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-medium text-[#0071E3]">
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:underline">
            {link.label[locale]}
          </a>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const locale = useLocale()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
          {projectsTitle[locale]}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1D1D1F]">
          {projectsIntro[locale]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
