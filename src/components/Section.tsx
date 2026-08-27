// Task 1-2 — 统一布局壳。容器宽度 / section 间距 / 交替背景全部收敛在这里，
// 六个 section 组件只负责内容（Design.md §1 §2）。
// 组件 JSX 中不允许硬编码文案 —— 本组件只出布局，不出文字。

interface SectionProps {
  id: string;
  tone?: "default" | "muted"; // muted = 灰底，制造节奏（About / Art 用）
  children: React.ReactNode;
}

// container: max-w-6xl mx-auto px-6（Design.md §2）
// section-padding-y: py-16 md:py-24（Design.md §2，移动优先）
export default function Section({ id, tone = "default", children }: SectionProps) {
  return (
    <section
      id={id}
      className={tone === "muted" ? "bg-[#F5F5F7]" : "bg-white"}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">{children}</div>
    </section>
  )
}
