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

  const particles = []
  const PARTICLE_COUNT = 220
  const GOLDEN_ANGLE = 137.508

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = {
      i,
      angle: i * (GOLDEN_ANGLE * Math.PI / 180),
      speed: 0.08 + Math.random() * 0.12,
      bias: 0.4 + Math.random() * 0.6,
      r: 0,
      maxR: 0,
      alpha: 0,
      pulse: Math.random() * Math.PI * 2,
    }
    const c = 12
    p.maxR = c * Math.sqrt(i + 1)
    p.r = p.maxR * (0.3 + Math.random() * 0.7)
    p.alpha = 0.15 + Math.random() * 0.55
    particles.push(p)
  }

  let time = 0
  const draw = () => {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)
    const cx = w * 0.5
    const cy = h * 0.55
    const scale = Math.min(w, h) / 900

    for (const p of particles) {
      p.pulse += 0.015
      const breathing = Math.sin(p.pulse) * 0.05
      const orbit = p.angle + time * p.speed * 0.02
      const r = p.r * (1 + breathing) * scale
      const x = cx + r * Math.cos(orbit)
      const y = cy + r * Math.sin(orbit)
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      const edgeFade = Math.max(0, 1 - dist / (Math.min(w, h) * 0.45))
      const a = p.alpha * p.bias * edgeFade
      if (a > 0.01) {
        ctx.beginPath()
        ctx.arc(x, y, 1.5 + (p.bias * 1.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45, 212, 191, ${a})`
        ctx.fill()
      }
    }

    // Faint spiral line
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.08)'
    ctx.lineWidth = 1
    const spiralPoints = 300
    for (let t = 0; t < spiralPoints; t++) {
      const a = t * (GOLDEN_ANGLE * Math.PI / 180)
      const c = 12
      const r = c * Math.sqrt(t + 1) * scale
      const x = cx + r * Math.cos(a - time * 0.01)
      const y = cy + r * Math.sin(a - time * 0.01)
      if (t === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    time += 1
    animId = requestAnimationFrame(draw)
  }
  draw()

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  }
})

const installCommand = 'curl -fsSL https://nautilus.dev/install.sh | bash && nautilus setup'
const copied = ref(false)
const copyCommand = () => {
  navigator.clipboard?.writeText(installCommand)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const features = [
  {
    icon: '🧬',
    title: 'Protocol Automation',
    desc: 'Design, validate, and execute reproducible experimental protocols with AI-assisted parameter tuning.',
  },
  {
    icon: '📚',
    title: 'Literature Synthesis',
    desc: 'Digest thousands of papers, extract findings, and surface the signal from the noise in minutes.',
  },
  {
    icon: '📊',
    title: 'Data Pipeline Builder',
    desc: 'Click-to-connect pipelines: cleaning, analysis, visualisation, and export — all version-controlled.',
  },
  {
    icon: '🤖',
    title: 'Autonomous Research',
    desc: 'Nautilus runs iterative hypothesis testing, parameter sweeps, and dead-end detection while you sleep.',
  },
  {
    icon: '🔬',
    title: 'Instrument Integration',
    desc: 'Native drivers for common lab hardware. Bridge physical experiments to digital twins.',
  },
  {
    icon: '🛡️',
    title: 'Reproducibility by Design',
    desc: 'Every run is an experiment record. Containers, lockfiles, and provenance built in from day zero.',
  },
]

const navLinks = [
  { label: 'Docs', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Changelog', href: '#' },
]
</script>
<template>
  <div class="landing">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-inner">
        <a href="#" class="brand">
          <img :src="logoPNG" alt="" class="brand-logo" />
          <span class="brand-text">Nautilus</span>
        </a>
        <div class="nav-links">
          <a v-for="link in navLinks" :key="link.label" :href="link.href" class="nav-link">{{ link.label }}</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer" class="nav-discord">Discord</a>
          <a href="#install" class="nav-cta">Get Started</a>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <canvas ref="canvasRef" class="hero-canvas"></canvas>
      <div class="hero-content">
        <div class="hero-badge">Hermes Agent Fork</div>
        <h1 class="hero-title">
          Your AI Co-Pilot for Science<br>
          <span class="accent">Batteries Included</span>
        </h1>
        <p class="hero-subtitle">
          One-click setup for literature reviews, idea generation,
  coding, and experiments.
        </p>
        <div class="hero-cta-row">
          <a href="#install" class="btn btn-primary">One-Click Install</a>
          <a href="#features" class="btn btn-ghost">Explore Features</a>
        </div>
      </div>
    </section>

    <!-- Trust strip -->
    <section class="trust-strip">
      <p class="trust-label">Built for the same stack that powers</p>
      <div class="trust-logos">
        <span class="trust-logo">Python</span>
        <span class="trust-sep">·</span>
        <span class="trust-logo">Jupyter</span>
        <span class="trust-sep">·</span>
        <span class="trust-logo">Docker</span>
        <span class="trust-sep">·</span>
        <span class="trust-logo">Git</span>
        <span class="trust-sep">·</span>
        <span class="trust-logo">ROS</span>
        <span class="trust-sep">·</span>
        <span class="trust-logo">CUDA</span>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="features">
      <div class="section-header">
        <h2 class="section-title">Accelerate the whole research lifecycle</h2>
        <p class="section-subtitle">
          From the first literature search to the final figure, Nautilus automates the drudgery so you can think.
        </p>
      </div>
      <div class="features-grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Terminal / Install Section -->
    <section id="install" class="install">
      <div class="install-inner">
        <h2 class="install-title">One line to the deep</h2>
        <p class="install-subtitle">Installs the engine, plugins, and default science toolkit in under 60 seconds.</p>
        <div class="terminal">
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-label">nautilus-setup</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">
              <span class="prompt">$</span>
              <span class="cmd">{{ installCommand }}</span>
            </div>
            <button class="copy-btn" @click="copyCommand" :class="{ copied }">
              <span v-if="copied">Copied!</span>
              <span v-else>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="how-it-works">
      <div class="section-header narrow">
        <h2 class="section-title">How it works</h2>
        <p class="section-subtitle">
          Nautilus wraps the proven Hermes Agent core with a domain layer for scientific computing.
        </p>
      </div>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <h3 class="step-title">Describe your goal</h3>
          <p class="step-text">Natural language prompts. Reference papers, datasets, or prior experiments. Nautilus parses intent into an execution plan.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h3 class="step-title">Plan &amp; validate</h3>
          <p class="step-text">The agent generates a stepwise protocol, checks ethical and safety thresholds, and estimates compute / time budgets before execution.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h3 class="step-title">Run autonomously</h3>
          <p class="step-text">Code, data pipelines, and instrument commands execute in isolated, reproducible environments. You observe or intervene at any point.</p>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <h3 class="step-title">Ship the results</h3>
          <p class="step-text">Auto-generated notebooks, figures (matplotlib, Plotly), structured reports, and publication-ready LaTeX export — all traced and versioned.</p>
        </div>
      </div>
    </section>

    <!-- Discord community -->
    <section class="discord-section">
      <div class="discord-inner">
        <img :src="logoPNG" alt="" class="discord-logo" />
        <h2 class="discord-title">Join the community</h2>
        <p class="discord-subtitle">
          Talk to other scientists and developers building with Nautilus.
          Get help, share protocols, and shape the roadmap.
        </p>
        <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer" class="btn btn-primary discord-btn">
          Join Discord
        </a>
      </div>
    </section>

    <!-- CTA block -->
    <section class="cta-section">
      <h2 class="cta-title">Dive in — the ocean of data awaits</h2>
      <p class="cta-subtitle">Free, open-source, and extensible. Build the science stack you wish you had.</p>
      <div class="hero-cta-row">
        <a href="#install" class="btn btn-primary">Install Nautilus</a>
        <a href="#" class="btn btn-ghost">Read the Docs</a>
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
          <a href="#">Documentation</a>
          <a href="#">GitHub</a>
          <a href="https://discord.gg/xcmypJtY" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="#">Roadmap</a>
        </div>
        <p class="footer-copy">Nautilus is a community fork of Hermes Agent. Built for science, by scientists.</p>
      </div>
    </footer>
  </div>
</template>
<style scoped>
.landing {
  color: #e2e8f0;
  background: #0b1426;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
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
.brand-text { letter-spacing: -0.02em; }
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
.nav-link:hover { color: #2dd4bf; }
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
.nav-cta:hover { opacity: 0.85; color: #0b1426; }
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  max-width: 800px;
  padding: 0 1.5rem;
  padding-top: 64px;
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
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 800;
  color: #f0fdfa;
  margin-bottom: 0.6rem;
  line-height: 1.05;
  font-family: 'Jost', sans-serif;
}
.hero-title .accent {
  color: #2dd4bf;
}
.hero-subtitle {
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  color: #94a3b8;
  max-width: 640px;
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
.btn:hover { transform: translateY(-1px); }
.btn-primary {
  background: #2dd4bf;
  color: #0b1426;
}
.btn-ghost {
  background: rgba(255,255,255,0.05);
  color: #e2e8f0;
  border: 1px solid rgba(45, 212, 191, 0.25);
}
.btn-ghost:hover { border-color: rgba(45, 212, 191, 0.55); color: #f0fdfa; }

/* Trust strip */
.trust-strip {
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-top: 1px solid rgba(45, 212, 191, 0.08);
  border-bottom: 1px solid rgba(45, 212, 191, 0.08);
  background: rgba(45, 212, 191, 0.02);
}
.trust-label {
  font-size: 0.8rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}
.trust-logos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: #475569;
  font-weight: 600;
  font-size: 0.9rem;
}
.trust-sep { color: #334155; }

/* Features */
.features {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-header.narrow { max-width: 700px; margin-left: auto; margin-right: auto; }
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: #f0fdfa;
  margin-bottom: 0.75rem;
  font-family: 'Jost', sans-serif;
}
.section-subtitle {
  color: #94a3b8;
  font-size: 1.05rem;
  max-width: 600px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(45, 212, 191, 0.1);
  border-radius: 14px;
  padding: 1.75rem;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(45, 212, 191, 0.35);
  box-shadow: 0 8px 32px rgba(45, 212, 191, 0.08);
}
.feature-icon { font-size: 2rem; margin-bottom: 0.75rem; }
.feature-title {
  font-size: 1.15rem;
  color: #f0fdfa;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.feature-desc {
  font-size: 0.92rem;
  color: #94a3b8;
  line-height: 1.55;
}

/* Terminal / Install */
.install {
  padding: 5rem 1.5rem;
  background: rgba(45, 212, 191, 0.02);
}
.install-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.install-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: #f0fdfa;
  margin-bottom: 0.5rem;
  font-family: 'Jost', sans-serif;
}
.install-subtitle {
  color: #94a3b8;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}
.terminal {
  background: #070d1a;
  border: 1px solid rgba(45, 212, 191, 0.15);
  border-radius: 14px;
  overflow: hidden;
  text-align: left;
}
.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(45, 212, 191, 0.08);
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }
.terminal-label {
  margin-left: 0.5rem;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}
.terminal-body {
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.terminal-line {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  font-size: 0.85rem;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  overflow: auto;
}
.prompt { color: #2dd4bf; font-weight: 700; }
.cmd { color: #5eead4; white-space: nowrap; }
.copy-btn {
  background: rgba(45, 212, 191, 0.1);
  border: 1px solid rgba(45, 212, 191, 0.2);
  color: #2dd4bf;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
}
.copy-btn:hover { background: rgba(45, 212, 191, 0.2); }
.copy-btn.copied { background: #2dd4bf; color: #0b1426; border-color: #2dd4bf; }

/* How it works */
.how-it-works {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.step {
  padding: 1.5rem;
  border-left: 2px solid rgba(45, 212, 191, 0.2);
  background: rgba(45, 212, 191, 0.02);
  border-radius: 0 14px 14px 0;
}
.step-num {
  font-family: 'Jost', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #2dd4bf;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.step-title {
  font-size: 1.1rem;
  color: #f0fdfa;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.step-text {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.55;
}

/* CTA Section */
.cta-section {
  padding: 5rem 1.5rem;
  text-align: center;
  background: rgba(45, 212, 191, 0.03);
  border-top: 1px solid rgba(45, 212, 191, 0.08);
}
.cta-title {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: #f0fdfa;
  margin-bottom: 0.5rem;
  font-family: 'Jost', sans-serif;
}
.cta-subtitle {
  color: #94a3b8;
  margin-bottom: 1.75rem;
  font-size: 1.05rem;
}

/* Discord */
.discord-section {
  padding: 5rem 1.5rem;
  text-align: center;
  background: rgba(45, 212, 191, 0.03);
  border-top: 1px solid rgba(45, 212, 191, 0.08);
  border-bottom: 1px solid rgba(45, 212, 191, 0.08);
}
.discord-inner {
  max-width: 600px;
  margin: 0 auto;
}
.discord-logo {
  height: 48px;
  width: auto;
  border-radius: 12px;
  background: #ffffff;
  padding: 4px;
  border: 1px solid rgba(45, 212, 191, 0.3);
  margin-bottom: 1rem;
}
.discord-title {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: #f0fdfa;
  margin-bottom: 0.5rem;
  font-family: 'Jost', sans-serif;
}
.discord-subtitle {
  color: #94a3b8;
  margin-bottom: 1.75rem;
  font-size: 1.05rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.discord-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Footer */

.footer {
  padding: 3rem 1.5rem;
  border-top: 1px solid rgba(45, 212, 191, 0.08);
  text-align: center;
}
.footer-inner {
  max-width: 800px;
  margin: 0 auto;
}
.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #f0fdfa;
  margin-bottom: 1rem;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.footer-links a {
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
}
.footer-links a:hover { color: #2dd4bf; }
.footer-copy {
  color: #475569;
  font-size: 0.8rem;
}

/* Logo images */
.brand-logo {
  height: 1.55rem;
  width: auto;
  border-radius: 7px;
  display: block;
  background: #0f172a;
  padding: 1px;
  border: 1px solid rgba(45, 212, 191, 0.25);
}
.footer-logo {
  height: 1.35rem;
  width: auto;
  border-radius: 5px;
  display: block;
  background: #0f172a;
  padding: 1px;
  border: 1px solid rgba(45, 212, 191, 0.2);
}

@media (max-width: 640px) {
  .nav-links .nav-link { display: none; }
  .features-grid { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
}
</style>
