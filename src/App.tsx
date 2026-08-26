import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Art from './components/Art'
import Contact from './components/Contact'

// 六个 section 顺序固定（PRD §4），容器宽度与 section 间距在 Task 1-2 统一处理

function App() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Art />
      <Contact />
    </main>
  )
}

export default App
