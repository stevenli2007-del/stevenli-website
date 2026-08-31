// Phase 3 Task 3-5 — 笔迹视觉签名（章节分隔线）
// 行草风格水平笔触，替代 MVP 的无分隔设计。
// 灵感来自 Steven 行草作品中「一」的笔势：
//   露锋切入 → 中段按压力变化 → 收笔出锋上挑
// 可复用组件，通过 className 控制间距和颜色。

interface BrushDividerProps {
  className?: string;
}

export default function BrushDivider({ className = '' }: BrushDividerProps) {
  return (
    <div aria-hidden="true" className={`flex justify-center ${className || 'py-6 md:py-8'}`}>
      <svg
        viewBox="0 0 200 14"
        width="200"
        height="14"
        fill="#C0C0C5"
        role="presentation"
      >
        <path d="M4 9.8 C16 6 34 4.6 56 4.3 C88 4 120 5.2 152 5 C172 4.8 188 4 198 2.8 C199.5 2.5 200 3.4 198.5 4.6 C192 8.8 170 10.6 142 11 C108 11.4 72 10.8 42 10.2 C22 9.8 10 9.8 4 9.8 Z" />
      </svg>
    </div>
  )
}
