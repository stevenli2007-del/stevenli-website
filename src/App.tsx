import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Art from './components/Art'
import Contact from './components/Contact'
import BrushDivider from './components/BrushDivider'

// 六个 section 顺序固定（PRD §4），容器宽度与 section 间距在 Task 1-2 统一处理
// 笔触分隔线（Phase 3 Task 3-5）放在叙事转折点：
//   Hero → About（身份 → 叙事）
//   Experience → Art（成长线 → 人文线，三条线的核心交汇）

function App() {
  return (
    <main>
      <Hero />
      <BrushDivider />
      <About />
      <Projects />
      <Experience />
      <BrushDivider />
      <Art />
      <Contact />
    </main>
  )
}

export default App
