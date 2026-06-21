<script setup>
import { onMounted, ref } from 'vue'
import logoPNG from '@/assets/logo.png'

const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let animId

  const resize = () => {
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const PARTICLE_COUNT = 90
  const GOLDEN_ANGLE = 137.508
  const particles = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = i * (GOLDEN_ANGLE * Math.PI / 180)
    const maxR = 18 * Math.sqrt(i + 1)
    particles.push({
      angle,
      r: maxR * (0.4 + Math.random() * 0.6),
      maxR,
      speed: 0.03 + Math.random() * 0.05,
      alpha: 0.08 + Math.random() * 0.18,
      pulse: Math.random() * Math.PI * 2,
    })
  }

  let time = 0
  const draw = () => {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)
    const cx = w * 0.5
    const cy = h * 0.6
    const scale = Math.min(w, h) / 900

    for (const p of particles) {
      p.pulse += 0.01
      const breathing = Math.sin(p.pulse) * 0.04
      const orbit = p.angle + time * p.speed * 0.01
      const r = p.r * (1 + breathing) * scale
      const x = cx + r * Math.cos(orbit)
      const y = cy + r * Math.sin(orbit)
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      const edgeFade = Math.max(0, 1 - dist / (Math.min(w, h) * 0.42))
      const a = p.alpha * edgeFade
      if (a > 0.01) {
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45, 212, 191, ${a})`
        ctx.fill()
      }
    }

    time += 1
    animId = requestAnimationFrame(draw)
  }
  draw()

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
})


const rants = [
  {
    icon: '🧠',
    title: 'I just explained my project. Again.',
    body: 'Agents start every session with zero context. Nautilus keeps a persistent project workspace that both you and the agent can read and update.',
  },
  {
    icon: '🖥️',
    title: 'Which node has a free A100?',
    body: 'Agents plan jobs without knowing Slurm queues, GPU VRAM, or SSH endpoints. Nautilus tracks live hardware so plans match reality.',
  },
  {
    icon: '🎯',
    title: 'Wait, what was I even asking?',
    body: 'Agents drift into busywork and forget the original research question. Nautilus ties every task and claim to explicit questions and success criteria.',
  },
  {
    icon: '📄',
    title: 'Cool conclusion. Show me the data.',
    body: 'Agents make claims with no verifiable source. Nautilus builds a question → claim → evidence graph backed by papers, notebooks, and artifacts.',
  },
  {
    icon: '⏳',
    title: 'My job ran overnight and the agent forgot.',
    body: 'Long-running experiments vanish between chat messages. /execute detaches, monitors, and resumes jobs until they finish or are blocked.',
  },
  {
    icon: '❓',
    title: 'How did you even get that assumption?',
    body: 'Agents silently substitute their own knowledge instead of asking. /grillme interviews you until goals, constraints, and missing context are clear.',
  },
  {
    icon: '📝',
    title: 'Didn\'t we solve this last week?',
    body: 'Without a lab book, agents redo work and forget decisions. Nautilus records every action in a searchable, versioned log.',
  },
]

const expandedCard = ref(null)

const phases = [
  {
    status: 'now',
    label: 'Now',
    title: 'Foundation',
    items: [
      'Landing page and community hub',
      'Public GitHub repo with open issues',
      'Discord community server',
      'Core install script and Docker setup',
    ],
  },
  {
    status: 'next',
    label: 'Next',
    title: 'Research Project Management',
    items: [
      'Structured workspace with shared project state',
      'Kanban task board integrated with project goals',
      'Resource tracking: hardware, datasets, papers, repos',
      'Evidence linking to hypotheses and research questions',
    ],
  },
  {
    status: 'later',
    label: 'Later',
    title: 'Persistent Agent Commands',
    items: [
      '/grillme — iteratively clarify goals and constraints',
      '/plan — generate hypotheses, experiments, milestones',
      '/execute — run tasks, collect results, record evidence',
      '/cycle — autonomous research loop until blocked',
    ],
  },
  {
    status: 'future',
    label: 'Future',
    title: 'Open Science Network',
    items: [
      'Peer-reviewed protocol registry',
      'Community model fine-tuning on open science corpus',
      'Decentralized experiment marketplaces',
      'Nautilus as a standard for reproducible research',
    ],
  },
]

const visionCards = [
  {
    tag: 'Workspace',
    title: 'Research Project Management',
    hook: 'A single source of truth that keeps both researchers and AI agents aligned.',
    points: [
      'Shared project state: goals, questions, hypotheses, methods',
      'Kanban task board tied to research milestones',
      'Resource inventory: hardware, datasets, papers, repositories',
      'Evidence trails linking experiments back to claims',
    ],
  },
  {
    tag: 'Agent Modes',
    title: 'Persistent Agent Commands',
    hook: 'Agents that don’t stop after one prompt. They run until the job is done.',
    points: [
      '/grillme — interviews you until project goals are crystal clear',
      '/plan — turns understanding into actionable research plans',
      '/execute — runs tasks, collects results, keeps evidence',
      '/cycle — autonomous loop: find gap → act → update → repeat',
    ],
  },
]
</script>

<template>
  <div class="roadmap">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-inner">
        <a href="/nautilus-community/" class="brand">
          <img :src="logoPNG" alt="" class="brand-logo" />
          <span class="brand-text">Nautilus-Agent</span>
        </a>
        <div class="nav-links">
          <router-link :to="{ name: 'roadmap' }" class="nav-link">Roadmap</router-link>
          <a href="https://tj-coding.github.io/nautilus-agent/" class="nav-link" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="https://github.com/TJ-coding/nautilus-agent#" class="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" class="nav-link">Changelog</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer" class="nav-discord">Discord</a>
          <router-link :to="{ name: 'home' }" class="nav-cta">Get Started</router-link>
        </div>
      </div>
    </nav>
    <br />
    <!-- Hero -->
    <section class="hero">
      <canvas ref="canvasRef" class="hero-canvas"></canvas>
      <div class="hero-content">
        <div class="hero-badge">Project Roadmap</div>
        <h1 class="hero-title">Join Us! <br/>
                  <span class="accent">You're the Boss</span>
        </h1>
        <p class="hero-subtitle">
          Nautilus is a community project driven by your needs. If you want to see features added or help build them, please speak up!        </p>
        <div class="hero-cta-row">
          <a href="https://github.com/TJ-coding/nautilus-agent/issues/new?template=feature_request.yml" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Suggest a Feature</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Discuss on Discord</a>
        </div>
      </div>
    </section>

    <!-- Rants -->
    <section class="rants">
      <div class="section-inner">
        <h2 class="section-title">Research agents, right now</h2>
        <p class="section-subtitle">You have probably said at least one of these out loud.</p>
        <div class="rants-grid">
          <button
            v-for="(item, index) in rants"
            :key="item.title"
            class="rant-card"
            :class="{ expanded: expandedCard === index }"
            :aria-expanded="expandedCard === index"
            aria-controls="rant-body-{{ index }}"
            @click="expandedCard = expandedCard === index ? null : index"
          >
            <div class="rant-icon" aria-hidden="true">{{ item.icon }}</div>
            <div class="rant-header">
              <h3 class="rant-title">{{ item.title }}</h3>
              <span class="rant-toggle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </span>
            </div>
            <div
              :id="'rant-body-' + index"
              class="rant-body"
              :hidden="expandedCard !== index"
            >
              <div>
                <p class="rant-blurb">{{ item.body }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Vision Cards -->
    <section class="vision">
      <div class="section-inner">
        <h2 class="section-title">What we are building</h2>
        <p class="section-subtitle">Two core ideas that change how researchers and agents work together.</p>
        <div class="vision-grid">
          <div v-for="card in visionCards" :key="card.title" class="vision-card">
            <div class="vision-tag">{{ card.tag }}</div>
            <h3 class="vision-title">{{ card.title }}</h3>
            <p class="vision-hook">{{ card.hook }}</p>
            <ul class="vision-list">
              <li v-for="point in card.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline">
      <div class="section-inner">
        <div class="timeline-track">
          <div class="timeline-connector"></div>
          <div v-for="phase in phases" :key="phase.status" class="phase" :class="phase.status">
            <div class="phase-left">
              <div class="phase-marker">
                <span class="phase-dot"></span>
              </div>
              
            </div>
            <div class="phase-card">
              <div class="phase-tag">{{ phase.label }}</div>
              <h2 class="phase-title">{{ phase.title }}</h2>
              <ul class="phase-list">
                <li v-for="item in phase.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contribute -->
    <section class="contribute">
      <div class="section-inner narrow">
        <h2 class="section-title">Help shape the order</h2>
        <p class="section-subtitle">
          The roadmap is not carved in stone. If something below the fold matters most to your lab, open an issue or start a thread. Priorities follow the community.
        </p>
        <div class="hero-cta-row">
          <a href="https://github.com/TJ-coding/nautilus-agent/issues" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Issues</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">Join Discord</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img :src="logoPNG" alt="" class="footer-logo" />
          <span class="brand-text">Nautilus Agent</span>
        </div>
        <div class="footer-links">
          <router-link :to="{ name: 'home' }">Home</router-link>
          <a href="https://github.com/TJ-coding/nautilus-agent#" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="#">Roadmap</a>
        </div>
        <p class="footer-copy">Nautilus is a community fork of Hermes Agent. Built for science, by scientists.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.roadmap {
  color: #e2e8f0;
  background: #0b1426;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(11, 20, 38, 0.75);
  backdrop-filter: blur(12px) saturate(1.2);
  border-bottom: 1px solid rgba(45, 212, 191, 0.1);
}
.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 64px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: #f0fdfa;
  text-decoration: none;
}
.brand-text {
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav-link {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #2dd4bf;
}
.nav-cta {
  background: #2dd4bf;
  color: #0b1426;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.nav-cta:hover {
  opacity: 0.85;
  color: #0b1426;
}
.nav-discord {
  background: transparent;
  color: #2dd4bf;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid rgba(45, 212, 191, 0.35);
}
.nav-discord:hover {
  background: rgba(45, 212, 191, 0.1);
  border-color: rgba(45, 212, 191, 0.6);
  color: #5eead4;
}

/* Hero */
.hero {
  position: relative;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 64px;
  padding-bottom: 3rem;
}
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 820px;
  padding: 0 1.5rem;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(45, 212, 191, 0.1);
  border: 1px solid rgba(45, 212, 191, 0.25);
  color: #2dd4bf;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: 1.5rem;
}
.hero-title {
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  font-weight: 800;
  color: #f0fdfa;
  margin-bottom: 0.6rem;
  line-height: 1.08;
  font-family: 'Jost', sans-serif;
}
.hero-subtitle {
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  color: #94a3b8;
  max-width: 680px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}
.hero-cta-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.15s, opacity 0.15s;
  font-family: 'Inter', sans-serif;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn-primary {
  background: #2dd4bf;
  color: #0b1426;
}
.btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(45, 212, 191, 0.25);
}
.btn-ghost:hover {
  border-color: rgba(45, 212, 191, 0.55);
  color: #f0fdfa;
}

/* Rants */
.rants {
  padding: 5rem 0 2rem;
}
.rants-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2.5rem;
}
@media (min-width: 720px) {
  .rants-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.rant-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(45, 212, 191, 0.08);
  border-radius: 14px;
  padding: 1.1rem 1.25rem 1.25rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
  width: 100%;
  text-align: left;
  color: inherit;
  font-family: inherit;
}
.rant-card::-moz-focus-inner {
  border: 0;
}
.rant-card:hover {
  border-color: rgba(45, 212, 191, 0.25);
  background: rgba(15, 23, 42, 0.65);
  transform: translateY(-2px);
}
.rant-icon {
  font-size: 1.75rem;
  line-height: 1;
  margin-bottom: 0.75rem;
}
.rant-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}
.rant-title {
  font-family: 'Jost', sans-serif;
  font-size: 1.15rem;
  color: #f0fdfa;
  margin: 0;
  line-height: 1.3;
}
.rant-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: rgba(45, 212, 191, 0.08);
  color: #2dd4bf;
  flex-shrink: 0;
  transition: transform 0.25s, background 0.2s;
  margin-top: 0.15rem;
}
.rant-toggle svg {
  width: 14px;
  height: 14px;
}
.rant-card.expanded .rant-toggle {
  transform: rotate(45deg);
  background: rgba(45, 212, 191, 0.2);
}
.rant-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease, margin-top 0.3s ease;
  margin-top: 0;
  visibility: hidden;
}
.rant-body:not([hidden]) {
  visibility: visible;
}
.rant-card.expanded .rant-body {
  grid-template-rows: 1fr;
  margin-top: 0.75rem;
}
.rant-body > div {
  overflow: hidden;
  min-height: 0;
}
.rant-blurb {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.55;
  margin: 0;
}

/* Vision Cards */
.vision {
  padding: 5rem 0 3rem;
}
.vision-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2.5rem;
}
@media (min-width: 720px) {
  .vision-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
.vision-card {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(45, 212, 191, 0.1);
  border-radius: 14px;
  padding: 1.75rem;
  transition: transform 0.2s, border-color 0.2s;
}
@media (min-width: 720px) {
  .vision-card {
    padding: 2rem;
  }
}
.vision-card:hover {
  transform: translateY(-2px);
  border-color: rgba(45, 212, 191, 0.25);
}
.vision-tag {
  display: inline-block;
  color: #2dd4bf;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 999px;
}
.vision-title {
  font-size: 1.35rem;
  color: #f0fdfa;
  margin: 0 0 0.5rem;
  font-family: 'Jost', sans-serif;
}
.vision-hook {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.55;
  margin-bottom: 1.25rem;
}
.vision-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.vision-list li {
  color: #cbd5e1;
  padding-left: 1.25rem;
  position: relative;
  font-size: 0.9rem;
  line-height: 1.5;
}
.vision-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2dd4bf;
}

/* Timeline */
.timeline {
  padding: 2rem 0 7rem;
}
.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}
@media (min-width: 720px) {
  .section-inner {
    padding: 0 2rem;
  }
}
.timeline-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.timeline-connector {
  position: absolute;
  left: 15px;           /* centre of 32px .phase-left */
  top: 9px;
  bottom: 9px;
  width: 2px;
  background: rgba(45, 212, 191, 0.25);
  border-radius: 1px;
  z-index: 0;
}
.phase {
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;
}
@media (min-width: 720px) {
  .phase {
    gap: 1.5rem;
    padding-bottom: 2.5rem;
  }
}
.phase-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
  flex-shrink: 0;
}
.phase-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.phase-dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #2dd4bf;
  box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.15);
  flex-shrink: 0;
}
.phase-line {
  flex: 1;
  min-height: 2rem;
  width: 2px;
  background: rgba(45, 212, 191, 0.25);
  border-radius: 1px;
  margin-top: 8px;
}
.phase:last-child .phase-line {
  display: none;
}
.phase-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}
.phase-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
  flex-shrink: 0;
  align-self: stretch;
}
.phase-dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #2dd4bf;
  box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.15);
  flex-shrink: 0;
}
.phase-card {
  flex: 1;
  min-width: 0;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(45, 212, 191, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s, border-color 0.2s;
}
@media (min-width: 720px) {
  .phase-card {
    padding: 1.5rem 2rem;
  }
}
.phase-card:hover {
  transform: translateY(-2px);
  border-color: rgba(45, 212, 191, 0.25);
}
.phase-tag {
  display: inline-block;
  color: #2dd4bf;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 999px;
}
@media (min-width: 720px) {
  .phase-tag {
    font-size: 0.8rem;
  }
}
.phase-title {
  font-size: 1.35rem;
  color: #f0fdfa;
  margin-bottom: 1rem;
  margin-top: 0;
}
.phase-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.phase-list li {
  color: #94a3b8;
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.5;
}
.phase-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2dd4bf;
}

/* Contribute */
.contribute {
  padding: 6rem 1.5rem;
  text-align: center;
  background: rgba(45, 212, 191, 0.03);
  border-top: 1px solid rgba(45, 212, 191, 0.08);
  border-bottom: 1px solid rgba(45, 212, 191, 0.08);
}
.section-inner.narrow {
  max-width: 720px;
}
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: #f0fdfa;
  margin-bottom: 0.75rem;
}
.section-subtitle {
  color: #94a3b8;
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 1.75rem;
}

/* Footer */
.footer {
  padding: 3rem 1.5rem;
  border-top: 1px solid rgba(45, 212, 191, 0.08);
}
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #f0fdfa;
}
.footer-links {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}
.footer-links a {
  color: #94a3b8;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #2dd4bf;
}
.footer-copy {
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.brand-logo,
.footer-logo {
  width: 1.8em;
  height: 1.8em;
  object-fit: contain;
}

/* Logo images */
.brand-logo {
  height: 1.8rem;
  width: auto;
  border-radius: 8px;
  display: block;
  background: #0f172a;
  padding: 1px;
  border: 1px solid rgba(45, 212, 191, 0.25);
}
.footer-logo {
  height: 1.55rem;
  width: auto;
  border-radius: 7px;
  display: block;
  background: #0f172a;
  padding: 1px;
  border: 1px solid rgba(45, 212, 191, 0.25);
}

.hero-title .accent {
  color: #2dd4bf;
}
</style>
