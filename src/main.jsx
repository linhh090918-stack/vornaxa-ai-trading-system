import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Activity, Bitcoin, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronRight,
  Coins, Cpu, DatabaseZap, Flame, Gauge, Gem, PieChart, Radar, ShieldCheck,
  Sparkles, TrendingUp, WalletCards, LockKeyhole, CandlestickChart, Binary
} from 'lucide-react';
import './style.css';

const nav = [
  { id: 'home', label: 'Home' },
  { id: 'stocks', label: 'AI Stock Picks' },
  { id: 'crypto', label: 'AI Crypto Picks' },
  { id: 'portfolio', label: 'Portfolio Allocation' },
  { id: 'risk', label: 'Risk Management' },
  { id: 'contact', label: 'Contact' },
];

const stockRows = [
  ['NVDA', 'AI Chip', '$887.24', '+4.25%', '97', 'Momentum Breakout'],
  ['SMCI', 'AI Server', '$951.37', '+5.42%', '94', 'High Volume Inflow'],
  ['AMD', 'AI Chip', '$164.88', '+4.57%', '91', 'Rotation Active'],
  ['PLTR', 'AI Software', '$23.91', '+4.73%', '86', 'Trend Expansion'],
  ['MSFT', 'Cloud AI', '$426.31', '+1.99%', '80', 'Core Strength'],
];

const cryptoRows = [
  ['BTC', 'Core Asset', '$68,420', '+2.31%', '92', 'Breakout Watch'],
  ['ETH', 'Smart Contract', '$3,680', '+3.08%', '89', 'Rotation Inflow'],
  ['SOL', 'High Beta L1', '$151.20', '+5.44%', '86', 'Momentum Active'],
  ['LINK', 'Oracle / RWA', '$17.82', '+4.18%', '82', 'Sector Strength'],
  ['RNDR', 'AI Crypto', '$10.64', '+6.21%', '79', 'High Volatility'],
];

const allocation = [
  { name: 'U.S. Stocks', value: 45, note: 'AI leaders, cloud, semiconductors' },
  { name: 'Crypto Assets', value: 25, note: 'BTC, ETH, selective high beta' },
  { name: 'ETFs / Defensive', value: 15, note: 'Index, dividend, low volatility' },
  { name: 'Cash Reserve', value: 10, note: 'Opportunity fund and drawdown buffer' },
  { name: 'Alternatives', value: 5, note: 'Pre-IPO / RWA themes' },
];

function DeepTechBackground() {
  return (
    <div className="deep-bg">
      <div className="bg-core" />
      <motion.div className="orb orb-1" animate={{ x: [0, 160, 40, 0], y: [0, 100, 210, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="orb orb-2" animate={{ x: [0, -150, -40, 0], y: [0, 90, -55, 0] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="scan-line scan-1" animate={{ y: [0, 240, 520, 0], opacity: [.08, .9, .12, .08] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="scan-line scan-2" animate={{ y: [0, -220, -440, 0], opacity: [.08, .65, .12, .08] }} transition={{ duration: 13, repeat: Infinity, ease: 'linear' }} />
      <div className="grid" />
      <div className="dots" />
      <svg className="flow-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineA" x1="0" x2="1"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="transparent"/></linearGradient>
          <linearGradient id="lineB" x1="0" x2="1"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#fef3c7"/><stop offset="100%" stopColor="transparent"/></linearGradient>
        </defs>
        <motion.path d="M-120 180 C 220 20, 420 400, 760 220 S 1200 80, 1600 320" fill="none" stroke="url(#lineA)" strokeWidth="1.5" animate={{ pathLength: [0.1, 1, 0.1], opacity: [.15, .7, .15] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.path d="M-100 560 C 260 350, 540 720, 860 480 S 1180 350, 1600 650" fill="none" stroke="url(#lineB)" strokeWidth="1.2" animate={{ pathLength: [1, .2, 1], opacity: [.1, .55, .1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        {Array.from({ length: 13 }).map((_, i) => (
          <motion.circle key={i} r="3" fill="#67e8f9" opacity=".7" animate={{ cx: [80 + i * 120, 160 + i * 120, 80 + i * 120], cy: [220 + (i % 4) * 70, 180 + (i % 5) * 80, 220 + (i % 4) * 70] }} transition={{ duration: 8 + i * .25, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-wrap">
      <div className="logo-box"><BrainCircuit /></div>
      <div>
        <div className="logo-title">VMC</div>
        <div className="logo-sub">Vornaxa Matrix Capital</div>
      </div>
    </div>
  );
}

function HologramCore() {
  return (
    <div className="holo">
      <motion.div className="ring ring-1" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="ring ring-2" animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="ring ring-3" animate={{ scale: [1, 1.08, 1], opacity: [.45, .9, .45] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="holo-glow" />
      <motion.div className="core-card" animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <BrainCircuit />
        <span>AI Quant Core</span>
        <strong>98.6</strong>
      </motion.div>
      {[
        ['Signal Radar', '94', 'pos-a', Radar],
        ['Risk Matrix', 'Low', 'pos-b', ShieldCheck],
        ['Liquidity', '+18%', 'pos-c', Activity],
        ['Trend AI', 'Active', 'pos-d', TrendingUp],
      ].map(([label, value, pos, Icon], i) => (
        <motion.div key={label} className={`holo-chip ${pos}`} animate={{ y: [0, i % 2 ? 14 : -14, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}>
          <div><Icon />{label}</div>
          <strong>{value}</strong>
        </motion.div>
      ))}
    </div>
  );
}

function Hero({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-light" />
      <div className="hero-inner">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="pill"><Sparkles /> AI-Driven Quant Intelligence Platform</div>
          <h1>Vornaxa AI Quant Matrix<span>Market Intelligence System.</span></h1>
          <p>An institutional-style AI portal for U.S. stock selection, crypto asset ranking and portfolio allocation. It combines signal scoring, market heat, risk matrix and capital rotation into one visual intelligence system.</p>
          <div className="hero-buttons">
            <button onClick={() => setPage('stocks')} className="gold-btn">Launch AI Stock Picks</button>
            <button onClick={() => setPage('crypto')} className="cyan-btn">Explore Crypto Signals</button>
          </div>
          <div className="hero-stats">
            {[
              ['AI Score', '98.6'],
              ['Markets', 'Stocks + Crypto'],
              ['Risk', 'Matrix Guard'],
              ['Mode', 'Live Radar'],
            ].map(([a, b]) => (
              <div key={a}><span>{a}</span><strong>{b}</strong></div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 }}>
          <HologramCore />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureHighlights({ setPage }) {
  const features = [
    { id: 'stocks', icon: TrendingUp, title: 'AI Stock Selection', bullets: ['U.S. equity heat ranking', 'AI sector and volume scoring', 'Momentum / pullback watch zones'] },
    { id: 'crypto', icon: Bitcoin, title: 'AI Crypto Selection', bullets: ['BTC / ETH regime radar', 'Altcoin liquidity heatmap', 'On-chain narrative watchlist'] },
    { id: 'portfolio', icon: PieChart, title: 'Portfolio Allocation', bullets: ['Stocks + crypto + ETF model', 'Cash reserve and drawdown buffer', 'Risk-adjusted allocation framework'] },
  ];
  return (
    <section className="features">
      <div className="section-head">
        <span>System Modules</span>
        <h2>Three AI Engines. One Capital Matrix.</h2>
      </div>
      <div className="feature-grid">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <button key={f.id} onClick={() => setPage(f.id)} className="feature-card">
              <div className="feature-glow" />
              <div className="feature-icon"><Icon /></div>
              <h3>{f.title}</h3>
              <ul>{f.bullets.map((b) => <li key={b}>◆ {b}</li>)}</ul>
              <div className="enter">Enter Intelligence Page <ChevronRight /></div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DashboardCards({ cards }) {
  return (
    <div className="dash-cards">
      {cards.map(([Icon, label, value]) => (
        <div key={label} className="dash-card">
          <Icon />
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function DataTable({ rows, type }) {
  const headers = type === 'crypto' ? ['Asset', 'Category', 'Price', '24H', 'AI Score', 'Signal'] : ['Ticker', 'Theme', 'Price', 'Change', 'AI Score', 'Signal'];
  return (
    <div className="table">
      <div className="tr th">{headers.map((h) => <div key={h}>{h}</div>)}</div>
      {rows.map((row) => (
        <div key={row[0]} className="tr">
          {row.map((c, i) => <div key={i} className={i === 0 ? 'strong' : i === 3 ? 'green' : i === 4 ? 'cyan' : ''}>{c}</div>)}
        </div>
      ))}
    </div>
  );
}

function SidePanel({ title, items }) {
  return (
    <div className="side-panel">
      <h3>{title}</h3>
      <div className="bars">
        {items.map((item) => {
          const value = Number(item.split(' ').at(-1));
          return (
            <div key={item}>
              <div className="bar-line"><span>{item.replace(/ \d+$/, '')}</span><b>{value}</b></div>
              <div className="bar"><i style={{ width: `${value}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageShell({ eyebrow, title, subtitle, children }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="page">
      <div className="page-card">
        <div className="page-glow" />
        <div className="page-content">
          <div className="pill"><Sparkles /> {eyebrow}</div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          {children}
        </div>
      </div>
    </motion.section>
  );
}

function StockPage() {
  return (
    <PageShell eyebrow="Vornaxa AI Stock Selection" title="U.S. Market Intelligent Stock Picking" subtitle="Designed for U.S. equities. The system ranks AI leaders, cloud platforms, semiconductor momentum, institutional volume and risk-adjusted watch opportunities.">
      <DashboardCards cards={[[Radar, 'Market Heat', '89/100'], [Flame, 'Hot Theme', 'AI Chips'], [Gauge, 'Risk Filter', 'Enabled'], [Activity, 'Signal Mode', 'Momentum']]} />
      <div className="two-col">
        <SidePanel title="AI Sector Heat" items={['AI Semiconductors 92', 'AI Servers 88', 'Cloud Platforms 76', 'Crypto Equities 71', 'Defense Tech 68']} />
        <DataTable rows={stockRows} type="stocks" />
      </div>
    </PageShell>
  );
}

function CryptoPage() {
  return (
    <PageShell eyebrow="Vornaxa AI Crypto Selection" title="Crypto Asset Intelligence & Smart Coin Ranking" subtitle="Built for crypto market rotation. Track BTC dominance, liquidity rotation, on-chain themes, AI coins, RWA narratives and risk-controlled entry readiness.">
      <DashboardCards cards={[[Bitcoin, 'BTC Regime', 'Bullish'], [Coins, 'Altcoin Heat', '76/100'], [WalletCards, 'Liquidity', 'Improving'], [ShieldCheck, 'Risk Guard', 'Strict']]} />
      <div className="two-col">
        <SidePanel title="Crypto Narrative Heat" items={['Bitcoin Core 92', 'Ethereum Ecosystem 89', 'Solana Beta 86', 'RWA / Oracle 82', 'AI Crypto 79']} />
        <DataTable rows={cryptoRows} type="crypto" />
      </div>
    </PageShell>
  );
}

function PortfolioPage() {
  return (
    <PageShell eyebrow="Vornaxa Portfolio Allocation" title="Diversified Portfolio Construction" subtitle="Build a structured allocation plan across U.S. stocks, crypto assets, ETFs, cash reserve and alternative opportunities. The focus is risk-adjusted growth, not blind concentration.">
      <DashboardCards cards={[[PieChart, 'Model Portfolio', 'Balanced'], [BriefcaseBusiness, 'Asset Classes', '5'], [LockKeyhole, 'Cash Buffer', '10%'], [Gem, 'Growth Sleeve', '70%']]} />
      <div className="portfolio-grid">
        <div className="side-panel">
          <h3>Allocation Model</h3>
          <div className="bars">
            {allocation.map((a) => (
              <div key={a.name}>
                <div className="bar-line"><span>{a.name}</span><b>{a.value}%</b></div>
                <div className="bar"><i style={{ width: `${a.value}%` }} /></div>
                <small>{a.note}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="side-panel">
          <h3>Portfolio Logic</h3>
          <div className="logic-list">
            {['Use U.S. AI leaders as growth core', 'Use BTC / ETH as digital asset anchor', 'Use ETFs and defensive assets to reduce volatility', 'Keep cash reserve for market dislocation', 'Rebalance when risk score changes'].map((x) => (
              <div key={x}><CheckCircle2 />{x}</div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function RiskPage() {
  return (
    <PageShell eyebrow="Risk Management" title="Risk First, Signal Second" subtitle="Vornaxa’s public website avoids guaranteed-profit language. The platform presents research, education, watchlists and risk frameworks before execution.">
      <div className="risk-grid">
        {[[ShieldCheck, 'No guarantee claims', 'Position the system as decision support and education.'], [Gauge, 'Risk bands', 'Every signal includes volatility and invalidation logic.'], [DatabaseZap, 'Review loop', 'Track thesis, execution discipline and post-market review.']].map(([Icon, title, text]) => (
          <div key={title} className="risk-card"><Icon /><h3>{title}</h3><p>{text}</p></div>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Request Vornaxa AI Access" subtitle="Use this page as the conversion entrance for demo requests, membership consultation and premium AI report access.">
      <div className="contact-box">
        <h3>Start with the AI Market Intelligence Portal</h3>
        <p>Connect this page to your assistant, form, Telegram, WhatsApp or member onboarding flow later.</p>
        <button className="gold-btn">Request Demo</button>
      </div>
    </PageShell>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const pageView = useMemo(() => {
    if (page === 'stocks') return <StockPage />;
    if (page === 'crypto') return <CryptoPage />;
    if (page === 'portfolio') return <PortfolioPage />;
    if (page === 'risk') return <RiskPage />;
    if (page === 'contact') return <ContactPage />;
    return <><Hero setPage={setPage} /><FeatureHighlights setPage={setPage} /></>;
  }, [page]);

  return (
    <div className="app">
      <DeepTechBackground />
      <header className="header">
        <div className="header-inner">
          <button onClick={() => setPage('home')} className="logo-button"><Logo /></button>
          <nav>
            {nav.map((n) => <button key={n.id} onClick={() => setPage(n.id)} className={page === n.id ? 'active' : ''}>{n.label}</button>)}
          </nav>
          <button onClick={() => setPage('contact')} className="access-btn">Request Access</button>
        </div>
        <div className="mobile-nav">
          {nav.map((n) => <button key={n.id} onClick={() => setPage(n.id)} className={page === n.id ? 'active' : ''}>{n.label}</button>)}
        </div>
      </header>
      <main>{pageView}</main>
      <footer>© 2026 Vornaxa Matrix Capital. AI research, education and portfolio intelligence. Trading involves risk.</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
