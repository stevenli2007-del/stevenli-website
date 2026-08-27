import Section from './Section'
import { projects, projectsTitle, type Project } from '../data/projects'

// Task 1-5 — Projects（PRD 4.3 / Design.md §4）
// 3 张卡片横向排列（桌面 grid-cols-3，移动 grid-cols-1）。
// 卡片结构（自上而下）：状态徽章 → 标题 h3 → tagline → description → techStack → 链接区。
// 数据顺序即展示顺序（order 1-3），前端不排序。

const statusStyles: Record<Project["status"], string> = {
  live: "bg-[#34C759] text-white",
  "in-development": "bg-[#FF9F0A] text-white",
  published: "bg-[#5E5CE6] text-white",
}

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In Development",
  published: "Published",
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[#D2D2D7] bg-white p-6 transition-shadow duration-300 hover:shadow-md">
      <span
        className={`self-start rounded-full px-3 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
      >
        {statusLabels[project.status]}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-[#1D1D1F]">
        {project.title}
      </h3>

      {project.tagline && (
        <p className="mt-2 text-base leading-relaxed text-[#1D1D1F]">
          {project.tagline}
        </p>
      )}

      {project.description && (
        <p className="mt-2 text-sm leading-relaxed text-[#6E6E73]">
          {project.description}
        </p>
      )}

      {project.techStack.length > 0 && (
        <p className="mt-3 text-sm text-[#86868B]">
          {project.techStack.join(" · ")}
        </p>
      )}

      <div className="mt-auto pt-6">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#0071E3] hover:underline"
          >
            GitHub
          </a>
        )}
        {project.links.github && project.links.live && (
          <span className="mx-2 text-sm text-[#D2D2D7]">·</span>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#0071E3] hover:underline"
          >
            {project.links.extensionId ? "Chrome Web Store" : "View"}
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" tone="default">
      <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] md:text-4xl">
        {projectsTitle}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
