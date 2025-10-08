import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./components/ui/button";
import logo from "./assets/images/Full Logo.png";

/**
 * Refibe Innovations — Ultra‑Apple Minimal SPA
 * Now includes INTERNAL PAGES with deep content, esp. on Safe Data Destruction & Comprehensive Data Security.
 * Lightweight hash router (no external deps) → pages under routes like #/services/ewaste, #/security, etc.
 */

// THEME PALETTE
const THEMES = [
  { name: 'Hero', gradient: 'from-[#0098F0] via-[#15D1A0] to-[#FFF300]', accent: '#111111' },
  { name: 'E‑Waste', gradient: 'from-[#0098F0] via-[#15D1A0] to-[#00E5FF]', accent: '#0098F0' },
  { name: 'EPR', gradient: 'from-[#15D1A0] via-[#79F2C0] to-[#FFF300]', accent: '#15D1A0' },
  { name: 'Wind', gradient: 'from-[#6EC8FF] via-[#0098F0] to-[#B0FF72]', accent: '#6EC8FF' },
  { name: 'Batteries', gradient: 'from-[#FFF300] via-[#00E5FF] to-[#15D1A0]', accent: '#00B2FF' },
  { name: 'Impact', gradient: 'from-[#111111] via-[#424242] to-[#BDBDBD]', accent: '#111111' },
]

function GText({ children, themeIndex = 0, className = '' }) {
  const g = THEMES[themeIndex].gradient
  return <span className={`bg-gradient-to-r ${g} bg-clip-text text-transparent ${className}`}>{children}</span>
}

// --- Simple Hash Router ---
function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/')
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const navigate = (to) => {
    if (!to.startsWith('#')) to = `#${to}`
    if (window.location.hash !== to) window.location.hash = to
  }
  return { route, navigate }
}

export default function RefibeWebsite() {
  const { route, navigate } = useHashRoute()

  // Global FAQs
  const faq = [
    { q: 'Are you CPCB/ISO certified?', a: 'Operations are CPCB‑authorized and aligned with ISO 9001/14001 and ISO 45001 management systems. Data destruction follows NIST SP 800‑88 Rev.1 guidance and DoD‑style multi‑pass options when required.' },
    { q: 'Do you provide pickup/logistics across India?', a: 'Yes. Pan‑India reverse logistics with GPS tracking, tamper‑evident seals, and full chain‑of‑custody documentation.' },
    { q: 'What recovery efficiencies do you achieve?', a: 'Typical metal recovery from e‑waste exceeds 98% (Cu/Ag/Au). Battery black‑mass processing targets >95% recovery across Li‑Ni‑Co‑Mn chemistries.' },
    { q: 'How do you help with EPR targets?', a: 'We compute obligations, design take‑back, onboard on CPCB portal, and generate quarterly/annual filings with evidence aggregation.' },
  ]

  // SEO JSON-LD (kept minimal for preview)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Refibe Innovations Private Limited',
    url: 'https://refibe.in', logo: 'https://refibe.in/assets/refibe-logo.png',
    department: [ 'E‑Waste Recycling', 'EPR & Consulting', 'Wind Blade Recycling', 'Lithium & EV Battery Recycling' ].map(n => ({ '@type': 'Organization', name: n })),
  }

  return (
    <div className="bg-white text-black font-sans overflow-x-hidden antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Nav navigate={navigate} />

      {/* Router outlet */}
      {route === '/' && <Home navigate={navigate} faq={faq} />}
      {route === '/services/ewaste' && <EWastePage navigate={navigate} />}
      {route === '/services/ewaste/data-destruction' && <DataDestructionPage navigate={navigate} />}
      {route === '/services/epr' && <EprPage navigate={navigate} />}
      {route === '/services/wind' && <WindPage navigate={navigate} />}
      {route === '/services/batteries' && <BatteryPage navigate={navigate} />}
      {route === '/security' && <SecurityPage navigate={navigate} />}

      {/* Smoke tests */}
      <SmokeTests route={route} />
    </div>
  )
}

function Nav({ navigate }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 py-3 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/') }>
        <img src={logo} alt="Refibe" className="h-14" />
       
      </div>
      <div className="hidden md:flex gap-6 text-sm text-gray-700">
        <a onClick={() => navigate('/services/ewaste')} className="hover:text-black cursor-pointer">E‑Waste</a>
        <a onClick={() => navigate('/services/epr')} className="hover:text-black cursor-pointer">EPR</a>
        <a onClick={() => navigate('/services/wind')} className="hover:text-black cursor-pointer">Wind</a>
        <a onClick={() => navigate('/services/batteries')} className="hover:text-black cursor-pointer">Batteries</a>
        <a onClick={() => navigate('/security')} className="hover:text-black cursor-pointer">Security</a>
      </div>
    </nav>
  )
}

// ---------------- HOME (landing) ----------------
function Home({ navigate, faq }) {
  return (
    <>
      <Hero />
      <SectionRow
        themeIndex={1}
        eyebrow="E‑Waste Recycling"
        title={<>Turning <GText themeIndex={1}>E‑Waste</GText> into <GText themeIndex={1}>E‑Value</GText></>}
        intro="Certified collection, secure data destruction, and high‑yield metal recovery."
        ctaLabel="Explore E‑Waste"
        onCta={() => navigate('/services/ewaste')}
      />
      <SectionRow
        themeIndex={2}
        eyebrow="EPR & Consulting"
        title={<><GText themeIndex={2}>Extended Producer Responsibility</GText> — Simplified</>}
        intro="Obligation assessment, portal onboarding, take‑back networks, and filings."
        ctaLabel="Explore EPR"
        onCta={() => navigate('/services/epr')}
      />
      <SectionRow
        themeIndex={3}
        eyebrow="Wind Turbine Blade Recycling"
        title={<><GText themeIndex={3}>Recycling</GText> the Future of <GText themeIndex={3}>Wind</GText></>}
        intro="Composite blade decommissioning to material re‑engineering for reuse."
        ctaLabel="Explore Wind"
        onCta={() => navigate('/services/wind')}
      />
      <SectionRow
        themeIndex={4}
        eyebrow="Lithium & EV Battery Recycling"
        title={<><GText themeIndex={4}>Recharging</GText> Sustainability</>}
        intro="Safe discharge, black‑mass, hydrometallurgical recovery to battery‑grade salts."
        ctaLabel="Explore Batteries"
        onCta={() => navigate('/services/batteries')}
      />
      <Impact />
      <FAQ items={faq} />
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6">
      <motion.div aria-hidden className="absolute inset-0 -z-10 blur-3xl opacity-50" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1.2 }} style={{
        background: 'radial-gradient(60rem 60rem at 15% 20%, rgba(0,152,240,.15), transparent 60%),\
             radial-gradient(60rem 60rem at 85% 30%, rgba(21,209,160,.18), transparent 60%),\
             radial-gradient(60rem 60rem at 50% 90%, rgba(255,243,0,.16), transparent 60%)',
      }} />
      
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"><GText themeIndex={0}>India’s First Integrated Recycling Company</GText></h1>
      <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mb-8"><GText themeIndex={0}>Circularity. Innovation. Sustainability.</GText></p>
      <div className="flex gap-4">
        <Button className="rounded-full px-7 py-4 text-base md:text-lg text-white bg-black hover:opacity-90" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>Explore Our Work</Button>
        <Button variant="ghost" className="rounded-full px-7 py-4 text-base md:text-lg border border-black/10 hover:bg-black/5" onClick={() => window.location.href = 'mailto:contact@refibe.in'}>Contact</Button>
      </div>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
        {[ ['99.9%+', 'Traceability'], ['0', 'Landfill'], ['95%+', 'Battery Metal Recovery'], ['CPCB/ISO', 'Certified'], ].map(([k, v], i) => (
          <motion.div key={i} whileHover={{ y: -3 }} className="rounded-2xl border border-black/10 p-5 bg-white/70 backdrop-blur">
            <div className="text-2xl font-semibold"><GText themeIndex={(i % 4) + 1}>{k}</GText></div>
            <div className="text-gray-600 text-sm mt-1">{v}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SectionRow({ themeIndex, eyebrow, title, intro, ctaLabel, onCta }) {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-widest text-xs text-gray-500">{eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mt-3">{title}</h2>
          <p className="text-gray-700 mt-6 max-w-xl">{intro}</p>
          <div className="mt-8"><Button className="bg-black text-white rounded-full px-7 py-4 hover:opacity-90" onClick={onCta}>{ctaLabel}</Button></div>
        </div>
        <motion.div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-8 md:p-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <div className="aspect-video rounded-2xl overflow-hidden relative">
            <motion.div className={`absolute inset-0 bg-gradient-to-br ${THEMES[themeIndex].gradient}`} animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 8, repeat: Infinity }} />
            <motion.div className="absolute inset-0 mix-blend-multiply" animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 12, repeat: Infinity }} style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,.05) 0, transparent 40%)', backgroundSize: '200% 200%' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------- INTERNAL PAGES ----------------

function PageFrame({ title, subtitle, themeIndex = 1, children, backLabel = 'Back to Home' }) {
  return (
    <main className="pt-20 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => (window.location.hash = '#/')} className="text-sm text-gray-500 hover:text-black">← {backLabel}</button>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-4"><GText themeIndex={themeIndex}>{title}</GText></h1>
        {subtitle && <p className="text-gray-600 mt-3 max-w-3xl">{subtitle}</p>}
        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </main>
  )
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3 text-gray-800"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-black/70" />{children}</li>
  )
}

// E‑WASTE — OVERVIEW PAGE
function EWastePage({ navigate }) {
  return (
    <PageFrame themeIndex={1} title="E‑Waste Recycling" subtitle="From secure intake to high‑purity metal recovery — CPCB‑aligned, zero‑landfill operations.">
      <section>
        <h2 className="text-2xl font-semibold">What we handle</h2>
        <ul className="mt-4 space-y-3">
          <Bullet>IT assets (laptops, desktops, servers, storage, networking)</Bullet>
          <Bullet>Consumer electronics (mobiles, tablets, TVs, small/large appliances)</Bullet>
          <Bullet>Industrial electronics (automation, control, telecom)</Bullet>
          <Bullet>Data‑bearing media (HDD, SSD, NVMe, tapes, optical, flash)</Bullet>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Process at a glance</h2>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-800">
          <li>Intake & Chain‑of‑Custody — GPS tracked pickup, tamper‑evident seals, custody forms.</li>
          <li>Segregation & Pre‑processing — disassembly, hazardous removal, fractioning.</li>
          <li>Material Recovery — mechanical + hydrometallurgical steps for Cu/Al/Fe/precious metals.</li>
          <li>Compliance Evidence — manifests, test reports, and destruction certificates.</li>
        </ol>
        <div className="mt-6">
          <Button className="bg-black text-white rounded-full px-6 py-3" onClick={() => navigate('/services/ewaste/data-destruction')}>Deep‑dive: Safe Data Destruction →</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Why Refibe</h2>
        <ul className="mt-4 space-y-3">
          <Bullet>End‑to‑end audit trail with time‑stamped photos/videos (available where requested).</Bullet>
          <Bullet>On‑prem or off‑site options for sensitive devices with witnessed destruction.</Bullet>
          <Bullet>Recover value through buy‑back/remarketing where policy allows.</Bullet>
        </ul>
      </section>
    </PageFrame>
  )
}

// E‑WASTE — DATA DESTRUCTION DEEP DIVE
function DataDestructionPage() {
  return (
    <PageFrame themeIndex={1} title="Safe Data Destruction" subtitle="Policy‑driven, verifiable sanitization and destruction — aligned with NIST SP 800‑88 Rev.1.">
      <section>
        <h3 className="text-xl font-semibold">Methods & Selection Matrix</h3>
        <p className="text-gray-700 mt-3">We choose methods based on media type, sensitivity, and customer policy. Typical options:</p>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Logical Sanitization</h4>
            <ul className="mt-3 space-y-2 text-gray-800">
              <Bullet>Crypto‑erase (AES‑based key destruction) for SEDs</Bullet>
              <Bullet>One‑pass overwrite (NIST Clear), multi‑pass when required</Bullet>
              <Bullet>Firmware‑assisted sanitize commands (ATA Secure Erase/NVMe Format NVM)</Bullet>
              <Bullet>Verification: hash sampling, full‑media verify where feasible</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Physical Destruction</h4>
            <ul className="mt-3 space-y-2 text-gray-800">
              <Bullet>Degaussing for magnetic media (per coercivity specs)</Bullet>
              <Bullet>Shredding to <span className="font-medium">≤10mm</span> (or customer‑specified 20/30mm)</Bullet>
              <Bullet>Punching/drilling + shear as interim controls before shredding</Bullet>
              <Bullet>Witnessed destruction with video/photo evidence on request</Bullet>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Comprehensive Data Security Controls</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Governance & Compliance</h4>
            <ul className="mt-3 space-y-2 text-gray-800">
              <Bullet>Policies aligned with <span className="font-medium">NIST SP 800‑88</span>, ISO 27001 principles, and India’s DPDP Act</Bullet>
              <Bullet>Signed NDAs and background‑verified personnel for secure zones</Bullet>
              <Bullet>Segregation of duties; dual‑control for media handling</Bullet>
              <Bullet>Audit‑ready logs, retention by agreement</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Facility & Operational Security</h4>
            <ul className="mt-3 space-y-2 text-gray-800">
              <Bullet>24×7 CCTV, access control, visitor escort, no‑phone secure bays</Bullet>
              <Bullet>Tamper‑evident seals; GPS‑tracked transport with chain‑of‑custody</Bullet>
              <Bullet>Secure staging → sanitize/destruct → verification → certificate</Bullet>
              <Bullet>Environmental controls: dust extraction, fire suppression</Bullet>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Certificates & Evidence</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Certificate of Data Destruction (per batch/serial lists)</Bullet>
          <Bullet>Video/photo evidence and hash reports (on request)</Bullet>
          <Bullet>Serial reconciliation reports; witness sign‑offs</Bullet>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold">On‑Prem Options</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Mobile shredders with HEPA filtration where permissible</Bullet>
          <Bullet>Portable degaussers and sanitize stations for data centers</Bullet>
          <Bullet>Refibe staff under customer supervision; no data leaves site</Bullet>
        </ul>
      </section>
    </PageFrame>
  )
}

// EPR PAGE
function EprPage() {
  return (
    <PageFrame themeIndex={2} title="EPR & Consulting" subtitle="End‑to‑end EPR lifecycle: assess, design, operate, report.">
      <section>
        <h3 className="text-xl font-semibold">Scope</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Obligation computation by category and geography</Bullet>
          <Bullet>Channel partner network and take‑back design</Bullet>
          <Bullet>Awareness/CSR campaigns and consumer collection drives</Bullet>
          <Bullet>Evidence, filings, and audit interface</Bullet>
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Dashboards</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Real‑time collections vs targets</Bullet>
          <Bullet>Inventory, transit, and processing status</Bullet>
          <Bullet>Certificates and reconciliation</Bullet>
        </ul>
      </section>
    </PageFrame>
  )
}

// WIND PAGE
function WindPage() {
  return (
    <PageFrame themeIndex={3} title="Wind Turbine Blade Recycling" subtitle="From decommissioning to composite re‑engineering.">
      <section>
        <h3 className="text-xl font-semibold">Process</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>On‑site sectioning and logistics</Bullet>
          <Bullet>Hybrid pyrolysis + resin extraction</Bullet>
          <Bullet>Recovered fiber/fillers → panels, sheets, components</Bullet>
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Compliance & EHS</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>PPE, dust control, and emissions monitoring</Bullet>
          <Bullet>Regulatory and environmental clearances</Bullet>
          <Bullet>Quality validation for re‑engineered outputs</Bullet>
        </ul>
      </section>
    </PageFrame>
  )
}

// BATTERY PAGE
function BatteryPage() {
  return (
    <PageFrame themeIndex={4} title="Lithium & EV Battery Recycling" subtitle="Safe discharge to hydrometallurgy — circular battery materials.">
      <section>
        <h3 className="text-xl font-semibold">Chemistries & Formats</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>LFP, NMC, LCO, LMO; pouch/prismatic/18650/21700/pack</Bullet>
          <Bullet>EV, ESS, consumer, and industrial batteries</Bullet>
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Process Stages</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Intake & testing → safe discharge → depowering</Bullet>
          <Bullet>Disassembly → cell opening under inert environment</Bullet>
          <Bullet>Black‑mass production → leach/solvent extraction → precipitation</Bullet>
          <Bullet>Crystallization to battery‑grade salts</Bullet>
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Safety</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>Fire suppression, gas monitoring, and spill kits</Bullet>
          <Bullet>Wastewater treatment and solvent recovery</Bullet>
        </ul>
      </section>
    </PageFrame>
  )
}

// SECURITY PAGE — Comprehensive Data Security (site‑wide)
function SecurityPage() {
  return (
    <PageFrame themeIndex={5} title="Comprehensive Data Security" subtitle="End‑to‑end controls across people, process, and technology to protect data during recycling.">
      <section>
        <h3 className="text-xl font-semibold">Security Domains</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Access & Identity</h4>
            <ul className="mt-2 space-y-2 text-gray-800">
              <Bullet>Role‑based access; MFA for systems; visitor escort policies</Bullet>
              <Bullet>Background checks and NDAs for secure‑area staff</Bullet>
              <Bullet>Device control (no cameras in secure bays)</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Encryption & Keys</h4>
            <ul className="mt-2 space-y-2 text-gray-800">
              <Bullet>TLS in transit; storage encryption for logs and reports</Bullet>
              <Bullet>Key lifecycle with split knowledge; HSM/KMS where applicable</Bullet>
              <Bullet>Crypto‑erase for SEDs; proof of key destruction</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Monitoring & Audit</h4>
            <ul className="mt-2 space-y-2 text-gray-800">
              <Bullet>24×7 CCTV retention by policy; tamper‑evident seals</Bullet>
              <Bullet>SIEM for critical systems; immutable log streams</Bullet>
              <Bullet>Chain‑of‑custody and reconciliation by serials</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6">
            <h4 className="font-medium">Incident & Continuity</h4>
            <ul className="mt-2 space-y-2 text-gray-800">
              <Bullet>IR playbooks, escalation matrix, simulation drills</Bullet>
              <Bullet>Business continuity for secure destruction operations</Bullet>
              <Bullet>Customer notification and evidence handback</Bullet>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Regulatory Alignment</h3>
        <ul className="mt-3 space-y-2 text-gray-800">
          <Bullet>India’s Data Protection and Digital Privacy (DPDP) Act principles</Bullet>
          <Bullet>NIST SP 800‑88 Rev.1 sanitization guidance</Bullet>
          <Bullet>ISO 27001 control objectives (alignment)</Bullet>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Engage with Security</h3>
        <p className="text-gray-700 mt-2">Request our security whitepaper, sample certificates, and a witnessed destruction session.</p>
        <div className="mt-4 flex gap-3">
          <Button className="bg-black text-white rounded-full px-6 py-3" onClick={() => alert('Requested: Security Whitepaper')}>Request Whitepaper</Button>
          <Button variant="ghost" className="border border-black/10 rounded-full px-6 py-3" onClick={() => alert('Requested: Sample Certificates')}>Sample Certificates</Button>
        </div>
      </section>
    </PageFrame>
  )
}

// ---------------- SHARED PARTS ----------------
function Impact() {
  return (
    <section id="impact" className="py-28 px-6 bg-gray-50/60">
      <div className="max-w-6xl mx-auto text-center">
        <p className="uppercase tracking-widest text-xs text-gray-500">Sustainability & Impact</p>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-3"><GText themeIndex={5}>Circular by Design</GText></h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-6">Every ton we recycle reduces CO₂ by up to 1.6 tons. Our closed‑loop systems support India’s 2070 net‑zero vision across electronics, renewable assets, and mobility.</p>
        <p className="text-gray-600 max-w-3xl mx-auto mt-6">We collaborate with state agencies and partners; dashboards surface live offsets, recycled tonnage, and end‑use destinations for recovered materials.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            ['1.6 t', 'CO₂ avoided per ton recycled'],
            ['120K+', 'Tons recovered annually'],
            ['98%', 'Target recovery efficiency'],
          ].map(([k, v], i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="rounded-3xl border border-black/10 p-8 bg-white/70 backdrop-blur">
              <div className="text-3xl font-semibold"><GText themeIndex={(i % 4) + 1}>{k}</GText></div>
              <div className="text-gray-600 mt-2">{v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ({ items = [] }) {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center"><GText themeIndex={1}>Frequently Asked Questions</GText></h2>
        <div className="mt-10 space-y-4">
          {items.map((f, i) => (
            <details key={i} className="group border border-gray-200 rounded-2xl p-6 bg-white/80 backdrop-blur">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="text-lg font-medium"><GText themeIndex={(i % 4) + 1}>{f.q}</GText></span>
                <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="text-gray-700 leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/10 text-center text-sm text-gray-600">© {new Date().getFullYear()} Refibe Innovations Private Limited · Privacy · Terms</footer>
  )
}

// ---------------- DEV SMOKE TESTS ----------------
function SmokeTests({ route }) {
  useEffect(() => {
    try {
      console.assert(document.querySelector('nav'), '[TEST] Nav exists')
      // Routing tests
      const valid = ['/', '/services/ewaste', '/services/ewaste/data-destruction', '/services/epr', '/services/wind', '/services/batteries', '/security']
      console.assert(valid.includes(route), `[TEST] Route ${route} is recognized`)
      // Page minimum elements
      if (route === '/') {
        console.assert(!!document.getElementById('impact'), '[TEST] Impact exists on home')
      }
      // Link sanity
      const links = Array.from(document.querySelectorAll('nav a'))
      console.assert(links.length >= 5, '[TEST] Nav has links')
      console.log('%cSmoke tests OK', 'color: green')
    } catch (e) {
      console.error('[TEST] Smoke tests error', e)
    }
  }, [route])
  return null
}
