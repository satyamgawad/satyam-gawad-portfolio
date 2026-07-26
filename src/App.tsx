import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  CodeXml,
  Download,
  ExternalLink,
  GitFork as Github,
  GraduationCap,
  Camera as Instagram,
  Layers3,
  Link as Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Quote,
  Send,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  UserRound,
  X,
} from 'lucide-react'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'

type IconType = typeof Code2

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact']

const skillGroups: { title: string; icon: IconType; skills: [string, number, string][] }[] = [
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      ['Java', 88, '☕'],
      ['Python', 82, '⌘'],
      ['C++', 76, 'C+'],
      ['JavaScript', 84, 'JS'],
    ],
  },
  {
    title: 'Web & Backend',
    icon: Layers3,
    skills: [
      ['HTML', 92, '5'],
      ['CSS', 88, '3'],
      ['Node.js', 78, 'N'],
      ['DBMS', 80, '▦'],
    ],
  },
  {
    title: 'Core & AI',
    icon: BrainCircuit,
    skills: [
      ['Data Structures', 85, '↗'],
      ['Operating Systems', 74, 'OS'],
      ['Machine Learning', 75, 'ML'],
      ['Neural Networks', 68, 'NN'],
    ],
  },
]

const projects = [
  {
    title: 'Neural Vision Lab',
    category: 'AI / ML',
    type: 'Computer Vision',
    description: 'A visual playground for exploring image classification with a clean, explainable interface.',
    tags: ['Python', 'TensorFlow', 'OpenCV'],
    gradient: 'from-violet-500/40 via-fuchsia-500/20 to-transparent',
    icon: BrainCircuit,
  },
  {
    title: 'CodeTrack',
    category: 'Web App',
    type: 'Developer Tools',
    description: 'A focused developer dashboard to structure goals, track practice and build better coding habits.',
    tags: ['JavaScript', 'Node.js', 'DBMS'],
    gradient: 'from-cyan-400/35 via-blue-500/20 to-transparent',
    icon: Terminal,
  },
  {
    title: 'Campus Connect',
    category: 'Java',
    type: 'Management System',
    description: 'A robust campus management concept with role-based workflows and thoughtfully structured data.',
    tags: ['Java', 'SQL', 'OOP'],
    gradient: 'from-amber-400/35 via-orange-500/20 to-transparent',
    icon: GraduationCap,
  },
  {
    title: 'Algo Atlas',
    category: 'Web App',
    type: 'Learning Platform',
    description: 'An interactive reference for visualising classic data structures and algorithms in motion.',
    tags: ['JavaScript', 'DSA', 'CSS'],
    gradient: 'from-emerald-400/35 via-teal-500/20 to-transparent',
    icon: CodeXml,
  },
]

const services = [
  ['Web Development', 'Responsive, thoughtful interfaces that look sharp and make the experience feel effortless.', Code2],
  ['Java Development', 'Clean object-oriented applications designed with scalable structure and reliable logic.', Terminal],
  ['AI/ML Solutions', 'Practical machine learning explorations that turn data and ideas into useful prototypes.', BrainCircuit],
  ['Technical Consulting', 'Clear technical direction for projects — from shaping the scope to choosing the right tools.', Sparkles],
  ['Problem Solving', 'A systematic, curious approach to untangling complex requirements and building smart solutions.', Trophy],
] as [string, string, IconType][]

const testimonials = [
  {
    quote: 'Satyam brings a rare mix of curiosity and discipline. He approaches every technical challenge with real ownership.',
    name: 'Academic Mentor',
    role: 'Computer Science',
    initials: 'AM',
  },
  {
    quote: 'His work has a calm clarity to it — from the way he structures a problem to the experience he designs around it.',
    name: 'Project Collaborator',
    role: 'Software Development',
    initials: 'PC',
  },
  {
    quote: 'A developer who keeps learning in public and turns concepts into working, thoughtful projects.',
    name: 'Peer Review',
    role: 'MCA Cohort',
    initials: 'PR',
  },
]

function SectionHeading({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: ReactNode; copy?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-[2.8rem]">{title}</h2>
      {copy && <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">{copy}</p>}
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MagneticButton({ children, href, className = '', onClick, type = 'button', download = false }: { children: ReactNode; href?: string; className?: string; onClick?: () => void; type?: 'button' | 'submit'; download?: boolean }) {
  const content = <>{children}<ArrowUpRight size={16} strokeWidth={2.2} /></>
  const shared = `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${className}`
  if (href) return <a className={shared} href={href} onClick={onClick} download={download}>{content}</a>
  return <button type={type} className={shared} onClick={onClick}>{content}</button>
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const pointer = { x: 0, y: 0 }
    let animation = 0
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(72, Math.max(36, Math.floor(window.innerWidth / 22)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        size: Math.random() * 1.8 + 0.4,
      }))
    }
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY }
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150 && distance > 0) {
          particle.vx += (dx / distance) * 0.008
          particle.vy += (dy / distance) * 0.008
        }
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.992
        particle.vy *= 0.992
        if (particle.x < -10 || particle.x > window.innerWidth + 10) particle.vx *= -1
        if (particle.y < -10 || particle.y > window.innerHeight + 10) particle.vy *= -1
        context.beginPath()
        context.fillStyle = 'rgba(196, 181, 253, .46)'
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const x = particle.x - other.x
          const y = particle.y - other.y
          const gap = Math.sqrt(x * x + y * y)
          if (gap < 105) {
            context.beginPath()
            context.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - gap / 105)})`
            context.lineWidth = 0.7
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      }
      animation = window.requestAnimationFrame(draw)
    }
    setSize()
    draw()
    window.addEventListener('resize', setSize)
    window.addEventListener('pointermove', move)
    return () => { window.cancelAnimationFrame(animation); window.removeEventListener('resize', setSize); window.removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true" />
}

function TypingRole() {
  const roles = ['MCA Student', 'Software Developer', 'AI/ML Enthusiast', 'Future Researcher']
  const [role, setRole] = useState(0)
  const [text, setText] = useState('')
  const [removing, setRemoving] = useState(false)
  useEffect(() => {
    const current = roles[role]
    const complete = text === current
    const empty = text === ''
    const timeout = window.setTimeout(() => {
      if (!removing && !complete) setText(current.slice(0, text.length + 1))
      else if (!removing && complete) setRemoving(true)
      else if (removing && !empty) setText(current.slice(0, text.length - 1))
      else { setRemoving(false); setRole((value) => (value + 1) % roles.length) }
    }, complete && !removing ? 1650 : removing ? 38 : 74)
    return () => window.clearTimeout(timeout)
  }, [text, removing, role])
  return <span>{text}<span className="typing-caret" aria-hidden="true" /></span>
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.8 })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const duration = 1250
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, visible])
  return <span ref={ref}>{display}{suffix}</span>
}

function SkillCard({ name, level, mark, index }: { name: string; level: number; mark: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.45 })
  return (
    <motion.div ref={ref} className="skill-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.45 }} whileHover={{ y: -5 }}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><span className="skill-mark">{mark}</span><span className="font-medium text-slate-100">{name}</span></div>
        <span className="text-xs font-medium text-violet-300">{level}%</span>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/7"><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" initial={{ width: 0 }} animate={visible ? { width: `${level}%` } : {}} transition={{ duration: 1.1, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }} /></div>
    </motion.div>
  )
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const [show, setShow] = useState(false)
  useMotionValueEvent(progress, 'change', (latest) => setShow(latest > 0.08))
  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300" style={{ scaleX: progress }} />
      <AnimatePresence>{show && <motion.button initial={{ opacity: 0, scale: 0.7, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.7, y: 12 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#151724]/90 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400/70"><ArrowDownRight size={18} className="rotate-180" /></motion.button>}</AnimatePresence>
    </>
  )
}

function App() {
  const [isLight, setIsLight] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1050)
    const pointerMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', pointerMove)
    return () => { window.clearTimeout(timer); window.removeEventListener('pointermove', pointerMove) }
  }, [])

  return (
    <div className={isLight ? 'theme-light' : ''}>
      <AnimatePresence>{isLoading && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}><div className="loader-orb"><span>SG</span></div><p>Crafting a better web experience</p></motion.div>}</AnimatePresence>
      <div className="site-shell min-h-screen overflow-x-hidden bg-[#080a12] text-slate-200 selection:bg-violet-500/45 selection:text-white">
        <ParticleField />
        <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" />
        <div className="custom-cursor" style={{ transform: `translate3d(${cursor.x - 10}px, ${cursor.y - 10}px, 0)` }} aria-hidden="true" />
        <ProgressBar progress={smoothProgress} />
        <Header isLight={isLight} setIsLight={setIsLight} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function Header({ isLight, setIsLight, menuOpen, setMenuOpen }: { isLight: boolean; setIsLight: (value: boolean) => void; menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const handleNav = () => setMenuOpen(false)
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="nav-shell mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
        <a href="#home" onClick={handleNav} className="logo-mark" aria-label="Satyam Gawad home"><span>S</span><i>G</i></a>
        <div className="hidden items-center gap-1 lg:flex">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsLight(!isLight)} className="theme-toggle" aria-label={isLight ? 'Use dark mode' : 'Use light mode'}>{isLight ? <Moon size={16} /> : <Sun size={16} />}</button>
          <a href="#contact" className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-violet-200 sm:inline-flex">Let&apos;s talk <ArrowUpRight size={14} className="ml-1" /></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="theme-toggle lg:hidden" aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X size={17} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <AnimatePresence>{menuOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#11131f]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={handleNav} className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/7 hover:text-white">{item}</a>)}</motion.div>}</AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pb-12 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
        <div className="pt-8 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.65 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/8 px-3.5 py-2 text-xs font-medium text-violet-200"><span className="pulse-dot" /> Available for meaningful opportunities</motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.76, duration: 0.6 }} className="mb-3 text-sm font-medium tracking-[.2em] text-cyan-300/80 uppercase">Hello, I&apos;m</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.84, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl font-semibold leading-[.97] tracking-[-.07em] text-white sm:text-6xl md:text-7xl xl:text-[5.5rem]">Satyam<br /><span className="text-gradient">Gawad.</span></motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.16, duration: 0.6 }} className="mt-6 flex items-center gap-3 text-lg font-medium text-slate-300 sm:text-xl"><span className="h-px w-8 bg-violet-400" /><TypingRole /></motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.28, duration: 0.6 }} className="mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">I craft dependable software and explore intelligent systems — bringing disciplined engineering, curiosity, and a human eye for detail to every build.</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="#projects" className="bg-violet-500 text-white shadow-[0_12px_32px_rgba(124,58,237,.28)] hover:-translate-y-1 hover:bg-violet-400">View projects</MagneticButton>
            <MagneticButton href="#contact" className="border border-white/15 bg-white/5 text-white hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">Contact me</MagneticButton>
            <a href="/Satyam-Gawad-Resume.txt" download className="inline-flex items-center gap-2 self-center px-2 py-3 text-sm font-medium text-slate-300 transition hover:text-white"><Download size={16} /> Resume</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55, duration: 0.55 }} className="mt-10 flex items-center gap-2"><p className="mr-2 text-xs uppercase tracking-[.16em] text-slate-500">Find me</p><SocialIcon icon={Github} label="GitHub" /><SocialIcon icon={Linkedin} label="LinkedIn" /><SocialIcon icon={Instagram} label="Instagram" /><SocialIcon icon={Mail} label="Email" /></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
          <div className="relative aspect-square overflow-hidden rounded-[2.2rem] border border-white/15 bg-gradient-to-br from-white/12 to-white/[.02] p-3 shadow-[0_28px_100px_rgba(0,0,0,.38)] backdrop-blur-xl sm:rounded-[2.7rem]">
            <div className="relative h-full overflow-hidden rounded-[1.7rem] bg-[#121524] sm:rounded-[2.1rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(34,211,238,.28),transparent_24%),radial-gradient(circle_at_30%_76%,rgba(139,92,246,.42),transparent_30%)]" />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0d1020] via-[#101629]/45 to-transparent" />
              <div className="absolute left-1/2 top-[15%] h-[57%] w-[47%] -translate-x-1/2 rounded-[46%_46%_36%_36%] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 shadow-[0_0_80px_rgba(139,92,246,.27)]" />
              <div className="absolute left-1/2 top-[29%] h-[20%] w-[37%] -translate-x-1/2 rounded-[45%_45%_48%_48%] bg-gradient-to-b from-[#1f2937] to-slate-600" />
              <div className="absolute left-1/2 top-[13%] h-[20%] w-[45%] -translate-x-1/2 rounded-[50%_50%_36%_38%] bg-slate-950/95" />
              <div className="absolute left-1/2 top-[31%] h-2 w-11 -translate-x-1/2 rounded-full bg-slate-800/45 blur-[3px]" />
              <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-violet-200/75">Portfolio / 2026</p><p className="mt-1 font-display text-2xl font-semibold text-white">Satyam Gawad</p></div><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/10 text-cyan-200"><Code2 size={20} /></span></div>
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }} className="floating-card -left-4 top-[16%] sm:-left-8"><span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/15 text-cyan-200"><BrainCircuit size={16} /></span><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Exploring</p><p className="text-xs font-medium text-slate-100">AI & Research</p></div></motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5.3, ease: 'easeInOut' }} className="floating-card -bottom-3 right-2 sm:-right-7"><span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-400/15 text-violet-200"><Terminal size={16} /></span><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Building with</p><p className="text-xs font-medium text-slate-100">Java / Python</p></div></motion.div>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.18em] text-slate-500 sm:flex"><span>Scroll to explore</span><span className="scroll-mouse"><i /></span></a>
    </section>
  )
}

function SocialIcon({ icon: Icon, label }: { icon: IconType; label: string }) { return <a href="#contact" aria-label={label} className="social-icon"><Icon size={16} /></a> }

function About() {
  const stats: [number, string, string][] = [[2, '+', 'Years learning'], [12, '+', 'Core skills'], [4, '', 'Areas of focus'], [100, '%', 'Growth mindset']]
  return (
    <section id="about" className="section-wrap">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal><div className="relative mx-auto max-w-md lg:mx-0"><div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/15 blur-xl" /><div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[.045] p-6 backdrop-blur-sm"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/15 text-violet-200"><GraduationCap size={23} /></span><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">In progress</span></div><p className="mt-12 text-xs font-medium uppercase tracking-[.2em] text-slate-500">Current chapter</p><p className="mt-2 font-display text-2xl font-semibold text-white">Master of Computer Applications</p><p className="mt-4 text-sm leading-6 text-slate-400">Deepening my foundation in software engineering while building toward intelligent, research-led products.</p><div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-5"><div className="flex -space-x-2"><span className="avatar-dot bg-violet-400" /><span className="avatar-dot bg-cyan-300" /><span className="avatar-dot bg-fuchsia-300" /></div><span className="text-xs text-slate-400">Always learning. Always building.</span></div></div></div></Reveal>
          <div><Reveal><SectionHeading eyebrow="01 / About me" title={<>Engineering with <span className="text-gradient">intention.</span></>} copy="I am Satyam — an MCA student and developer who enjoys making complex ideas feel simple, useful, and considered. From core Java to emerging AI, I build with a focus on fundamentals and a genuine appetite for what comes next." /></Reveal>
            <div className="mt-9 grid gap-3 sm:grid-cols-2"><Reveal delay={0.08}><Highlight icon={GraduationCap} title="B.Sc. Computer Science" copy="A strong grounding in computing principles." /></Reveal><Reveal delay={0.14}><Highlight icon={BriefcaseBusiness} title="MCA Student" copy="Expanding practical software expertise." /></Reveal><Reveal delay={0.2}><Highlight icon={Terminal} title="Java Developer" copy="Building with object-oriented discipline." /></Reveal><Reveal delay={0.26}><Highlight icon={BrainCircuit} title="AI/ML Learner" copy="Exploring data-driven intelligent systems." /></Reveal></div>
          </div>
        </div>
        <Reveal className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-4" delay={0.16}>{stats.map(([value, suffix, label]) => <div key={label as string} className="bg-[#0d101c]/85 px-4 py-6 text-center backdrop-blur-sm sm:px-6"><p className="font-display text-3xl font-semibold tracking-[-.05em] text-white"><Counter value={value as number} suffix={suffix as string} /></p><p className="mt-2 text-xs text-slate-500">{label as string}</p></div>)}</Reveal>
      </div>
    </section>
  )
}

function Highlight({ icon: Icon, title, copy }: { icon: IconType; title: string; copy: string }) { return <div className="soft-card flex gap-4 p-4"><span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Icon size={17} /></span><div><p className="text-sm font-medium text-slate-100">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{copy}</p></div></div> }

function Skills() {
  return <section id="skills" className="section-wrap relative"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><Reveal><SectionHeading eyebrow="02 / Technical toolkit" title={<>The tools behind the <span className="text-gradient">thinking.</span></>} copy="A growing, practical stack spanning robust programming fundamentals, web development, and intelligent systems." /></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-3">{skillGroups.map((group, groupIndex) => { const Icon = group.icon; return <Reveal key={group.title} delay={groupIndex * .1} className="glass-panel p-5 sm:p-6"><div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400/20 to-cyan-300/10 text-violet-200"><Icon size={20} /></span><div><p className="font-display text-lg font-semibold text-white">{group.title}</p><p className="text-xs text-slate-500">{group.skills.length} competencies</p></div></div><div className="space-y-3">{group.skills.map(([name, level, mark], index) => <SkillCard key={name} name={name} level={level} mark={mark} index={index} />)}</div></Reveal>})}</div><Reveal className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-cyan-300/10 bg-cyan-300/[.035] px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="relative grid h-9 w-9 place-items-center rounded-full bg-cyan-300/10 text-cyan-200"><span className="absolute h-full w-full animate-ping rounded-full bg-cyan-300/10" /><Sparkles size={16} /></span><p className="text-sm text-slate-300">Currently strengthening <strong className="font-medium text-cyan-200">system design</strong> and <strong className="font-medium text-cyan-200">deep learning</strong>.</p></div><span className="text-xs font-medium text-slate-500">Learning never stops ↗</span></Reveal></div></section>
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'AI / ML', 'Web App', 'Java']
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  return <section id="projects" className="section-wrap"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><Reveal><SectionHeading eyebrow="03 / Selected work" title={<>Ideas made <span className="text-gradient">tangible.</span></>} copy="A selection of projects where software craftsmanship meets a willingness to explore." /></Reveal><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`filter-chip ${filter === item ? 'filter-active' : ''}`}>{item}</button>)}</div></div><motion.div layout className="mt-12 grid gap-5 md:grid-cols-2">{visibleProjects.map((project, index) => { const Icon = project.icon; return <motion.article layout key={project.title} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }} className="project-card group"><div className={`relative h-52 overflow-hidden border-b border-white/8 bg-gradient-to-br ${project.gradient} p-6 sm:h-60`}><div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:28px_28px]" /><div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/12 blur-2xl transition duration-700 group-hover:scale-125" /><div className="relative flex items-start justify-between"><span className="rounded-full border border-white/15 bg-[#0b0e1b]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-slate-200 backdrop-blur">{project.type}</span><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/10 text-white backdrop-blur transition duration-300 group-hover:-rotate-6 group-hover:scale-110"><Icon size={21} /></span></div><div className="absolute bottom-5 left-6"><p className="font-display text-2xl font-semibold tracking-[-.04em] text-white">{project.title}</p></div></div><div className="p-6"><p className="text-sm leading-6 text-slate-400">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div><div className="mt-6 flex items-center justify-between"><a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-violet-200"><Github size={16} /> Code</a><a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-200">Live preview <ExternalLink size={15} /></a></div></div></motion.article> })}</motion.div><Reveal className="mt-9 text-center"><MagneticButton href="#contact" className="border border-white/15 bg-white/5 text-white hover:border-violet-400/60 hover:bg-violet-500/10">Let&apos;s build the next one</MagneticButton></Reveal></div></section>
}

function Journey() {
  const journey = [
    ['2026 — Now', 'MCA · Master of Computer Applications', 'Advancing my software engineering foundation while exploring machine learning and research-oriented ideas.', 'Current'],
    ['2025', 'Building beyond the curriculum', 'Hands-on work across web development, core Java, data structures and emerging AI/ML workflows.', 'Practice'],
    ['2022 — 2025', 'B.Sc. Computer Science', 'Built the fundamentals: algorithms, databases, programming principles and analytical problem solving.', 'Foundation'],
  ]
  const achievements = [['Java Foundations', 'Structured programming & OOP'], ['Problem Solver', 'DSA & algorithmic thinking'], ['AI Explorer', 'ML & neural network studies']]
  return <section id="journey" className="section-wrap"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><div className="grid gap-14 lg:grid-cols-[1.12fr_.88fr] lg:gap-20"><div><Reveal><SectionHeading eyebrow="04 / Learning journey" title={<>Growth is the <span className="text-gradient">main project.</span></>} copy="A focused path from computer science fundamentals to deeper software craftsmanship and intelligent systems." /></Reveal><div className="relative mt-10 space-y-7 border-l border-white/10 pl-7 before:absolute before:-left-px before:top-0 before:h-28 before:w-px before:bg-gradient-to-b before:from-violet-400 before:to-transparent">{journey.map(([date, title, copy, label], index) => <Reveal key={title} delay={index * .1} className="relative"><span className="absolute -left-[34px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#080a12] bg-violet-400 shadow-[0_0_0_4px_rgba(139,92,246,.14)]" /><div className="flex flex-wrap items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[.15em] text-violet-300">{date}</p><span className="rounded-full bg-white/6 px-2 py-0.5 text-[10px] font-medium text-slate-500">{label}</span></div><p className="mt-2 font-display text-lg font-semibold text-white">{title}</p><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{copy}</p></Reveal>)}</div></div><Reveal delay={.15} className="glass-panel self-end p-6"><div className="flex items-center justify-between"><div><p className="eyebrow">Certifications & focus</p><h3 className="mt-3 font-display text-xl font-semibold text-white">Learning with purpose.</h3></div><Award className="text-amber-300" size={27} /></div><div className="mt-7 space-y-3">{achievements.map(([title, copy], index) => <div key={title} className="flex items-center gap-4 rounded-xl border border-white/7 bg-white/[.035] p-3.5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300/20 to-violet-400/10 text-amber-200">{index === 0 ? <Award size={17} /> : index === 1 ? <Trophy size={17} /> : <BrainCircuit size={17} />}</span><div><p className="text-sm font-medium text-slate-100">{title}</p><p className="mt-0.5 text-xs text-slate-500">{copy}</p></div><Check size={15} className="ml-auto text-emerald-300/80" /></div>)}</div><p className="mt-6 border-t border-white/8 pt-5 text-xs leading-5 text-slate-500">This is a living record — formal credentials and project outcomes will continue to grow here.</p></Reveal></div></div></section>
}

function Services() {
  return <section className="section-wrap relative"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><Reveal><SectionHeading align="center" eyebrow="05 / What I can help with" title={<>Built for clarity.<br /><span className="text-gradient">Made to move forward.</span></>} copy="From first idea to refined implementation, I bring a grounded, learning-forward approach to digital work." /></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{services.map(([title, copy, Icon], index) => <Reveal key={title} delay={index * .07}><motion.div whileHover={{ y: -7 }} className="service-card group h-full"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400/20 to-cyan-300/10 text-violet-200"><Icon size={20} /></span><p className="mt-6 font-display text-base font-semibold text-white">{title}</p><p className="mt-3 text-xs leading-5 text-slate-500">{copy}</p><ArrowDownRight size={17} className="mt-6 text-slate-500 transition duration-300 group-hover:text-violet-300" /></motion.div></Reveal>)}</div></div></section>
}

function Testimonials() {
  const [current, setCurrent] = useState(0)
  useEffect(() => { const interval = window.setInterval(() => setCurrent((item) => (item + 1) % testimonials.length), 5200); return () => clearInterval(interval) }, [])
  const testimonial = testimonials[current]
  return <section className="section-wrap"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><Reveal className="testimonial-shell overflow-hidden"><div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-violet-400/15 blur-3xl" /><div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-[.65fr_1.35fr] md:gap-14 lg:p-14"><div><p className="eyebrow">06 / Testimonials</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.05em] text-white">How I show up<br /><span className="text-gradient">in the work.</span></h2><div className="mt-8 flex gap-2"><button onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)} className="carousel-button" aria-label="Previous testimonial"><ChevronLeft size={18} /></button><button onClick={() => setCurrent((current + 1) % testimonials.length)} className="carousel-button" aria-label="Next testimonial"><ChevronRight size={18} /></button></div></div><div className="flex flex-col justify-between"><Quote className="text-violet-300/65" size={34} fill="currentColor" /><AnimatePresence mode="wait"><motion.div key={testimonial.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .35 }}><blockquote className="mt-5 font-display text-xl font-medium leading-8 tracking-[-.025em] text-slate-100 sm:text-2xl sm:leading-9">“{testimonial.quote}”</blockquote><div className="mt-8 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 text-xs font-bold text-slate-950">{testimonial.initials}</span><div><p className="text-sm font-semibold text-white">{testimonial.name}</p><p className="text-xs text-slate-500">{testimonial.role}</p></div></div></motion.div></AnimatePresence><div className="mt-7 flex gap-1.5">{testimonials.map((item, index) => <button key={item.name} onClick={() => setCurrent(index)} className={`h-1.5 rounded-full transition-all ${index === current ? 'w-7 bg-violet-300' : 'w-1.5 bg-white/20'}`} aria-label={`Show testimonial ${index + 1}`} />)}</div></div></div></Reveal></div></section>
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'Please share your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.subject.trim()) nextErrors.subject = 'A short subject helps.'
    if (form.message.trim().length < 12) nextErrors.message = 'Please add a little more detail.'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) { setSent(true); setForm({ name: '', email: '', subject: '', message: '' }); window.setTimeout(() => setSent(false), 4500) }
  }
  const update = (key: keyof typeof form, value: string) => { setForm({ ...form, [key]: value }); if (errors[key]) setErrors({ ...errors, [key]: '' }) }
  return <section id="contact" className="section-wrap pb-20"><div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"><div className="contact-shell overflow-hidden"><div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:p-12"><div><Reveal><p className="eyebrow">07 / Contact</p><h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.06em] text-white sm:text-5xl">Let&apos;s make something <span className="text-gradient">meaningful.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">Have a project, an opportunity, or an interesting problem? I&apos;d love to hear the shape of it.</p></Reveal><div className="mt-10 space-y-4"><ContactDetail icon={Mail} title="Email" value="hello@satyamgawad.dev" /><ContactDetail icon={Phone} title="Available for" value="Internships & collaborations" /><ContactDetail icon={UserRound} title="Based in" value="India · Working remotely" /></div><div className="mt-10 flex items-center gap-2"><SocialIcon icon={Github} label="GitHub" /><SocialIcon icon={Linkedin} label="LinkedIn" /><SocialIcon icon={Instagram} label="Instagram" /></div></div><Reveal delay={.12}><form noValidate onSubmit={submit} className="relative rounded-[1.5rem] border border-white/10 bg-[#080a12]/45 p-5 backdrop-blur sm:p-7"><div className="grid gap-5 sm:grid-cols-2"><FormField label="Your name" value={form.name} onChange={(value) => update('name', value)} error={errors.name} placeholder="Jane Smith" /><FormField label="Email address" value={form.email} onChange={(value) => update('email', value)} error={errors.email} placeholder="jane@company.com" type="email" /></div><div className="mt-5"><FormField label="Subject" value={form.subject} onChange={(value) => update('subject', value)} error={errors.subject} placeholder="Let’s work together" /></div><div className="mt-5"><label className="field-label" htmlFor="message">Your message</label><textarea id="message" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell me a little about what you’re working on..." className={`field-input min-h-32 resize-none ${errors.message ? 'border-rose-400/70' : ''}`} /><p className="field-error">{errors.message}</p></div><button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,58,237,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(124,58,237,.36)]">Send message <Send size={16} /></button><AnimatePresence>{sent && <motion.div initial={{ opacity: 0, y: 10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} role="status" className="absolute -bottom-16 left-0 right-0 flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-[#12251f] p-3 text-sm text-emerald-100 shadow-xl"><span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><Check size={15} /></span>Thanks — your message is ready to send!</motion.div>}</AnimatePresence></form></Reveal></div></div></div></section>
}

function FormField({ label, value, onChange, error, placeholder, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; error?: string; placeholder: string; type?: string }) { const id = label.toLowerCase().replace(/\s+/g, '-'); return <div><label className="field-label" htmlFor={id}>{label}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`field-input ${error ? 'border-rose-400/70' : ''}`} /><p className="field-error">{error}</p></div> }
function ContactDetail({ icon: Icon, title, value }: { icon: IconType; title: string; value: string }) { return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/5 text-violet-200"><Icon size={16} /></span><div><p className="text-[10px] uppercase tracking-[.16em] text-slate-500">{title}</p><p className="mt-0.5 text-sm text-slate-300">{value}</p></div></div> }

function Footer() {
  return <footer className="relative z-10 border-t border-white/8 bg-[#060810]/70"><div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 lg:px-10"><div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><a href="#home" className="font-display text-xl font-semibold tracking-[-.06em] text-white">Satyam<span className="text-violet-300">.</span></a><p className="mt-2 text-xs text-slate-500">Software developer & AI/ML enthusiast.</p></div><div className="flex flex-wrap gap-x-5 gap-y-2">{navItems.slice(1).map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-slate-500 transition hover:text-slate-200">{item}</a>)}</div><div className="flex gap-2"><SocialIcon icon={Github} label="GitHub" /><SocialIcon icon={Linkedin} label="LinkedIn" /><SocialIcon icon={Mail} label="Email" /></div></div><div className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-5 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Satyam Gawad. Crafted with intention.</p><p>Java · AI/ML · Web</p></div></div></footer>
}

export default App
