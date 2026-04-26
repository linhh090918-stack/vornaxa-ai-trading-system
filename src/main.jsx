import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Activity, Bitcoin, BrainCircuit, BriefcaseBusiness, CheckCircle2, ChevronRight,
  Coins, DatabaseZap, Flame, Gauge, Gem, PieChart, Radar, RefreshCcw,
  ShieldCheck, Sparkles, TrendingUp, WalletCards, LockKeyhole, Loader2
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

const fallbackStocks = [
  { rank: 1, symbol: 'NVDA', theme: 'AI Chip', price: 887.24, changePct: 4.25, aiScore: 97, signal: 'Demo Momentum Leader', risk: 'Medium', reason: ['Demo data until Finnhub connects'] },
  { rank: 2, symbol: 'SMCI', theme: 'AI Server', price: 951.37, changePct: 5.42, aiScore: 94, signal: 'Demo Volume Inflow', risk: 'High', reason: ['Demo data until Finnhub connects'] },
  { rank: 3, symbol: 'AMD', theme: 'AI Chip', price: 164.88, changePct: 4.57, aiScore: 91, signal: 'Demo Rotation Active', risk: 'Medium', reason: ['Demo data until Finnhub connects'] },
  { rank: 4, symbol: 'PLTR', theme: 'AI Software', price: 23.91, changePct: 4.73, aiScore: 86, signal: 'Demo Trend Expansion', risk: 'High', reason: ['Demo data until Finnhub connects'] },
  { rank: 5, symbol: 'MSFT', theme: 'Cloud AI', price: 426.31, changePct: 1.99, aiScore: 80, signal: 'Demo Core Strength', risk: 'Low', reason: ['Demo data until Finnhub connects'] },
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
            <button onClick={() => setPage('stocks')} className="gold-btn">Launch Live AI Stock Scanner</button>
            <button onClick={() => setPage('crypto')} className="cyan-btn">Explore Crypto Signals</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 }}>
          <div className="scanner-preview">
            <div className="scanner-head">
              <div><Radar /> Live AI Scanner</div>
              <span>FINNHUB API</span>
            </div>
            {fallbackStocks.slice(0, 5).map((s) => (
              <div className="preview-row" key={s.symbol}>
                <b>{s.symbol}</b><span>{s.theme}</span><em>{s.aiScore}</em>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureHighlights({ setPage }) {
  const features = [
    { id: 'stocks', icon: TrendingUp, title: 'Live AI Stock Selection', bullets: ['Finnhub quote API', 'AI sector and momentum scoring', 'Risk-controlled watch zones'] },
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

function StockPage() {
  const [stocks, setStocks] = useState(fallbackStocks);
  const [selected, setSelected] = useState(fallbackStocks[0]);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');
  const [error, setError] = useState('');

  async function loadScanner() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stock-scanner');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Scanner failed');
      setStocks(json.data);
      setSelected(json.data[0]);
      setUpdatedAt(json.updatedAt);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadScanner(); }, []);

  return (
    <PageShell eyebrow="Live Finnhub API Connected" title="U.S. Market Intelligent Stock Scanner" subtitle="Click refresh to pull quotes from Finnhub through a secure Vercel backend. AI Score ranks the stock universe by theme weight, intraday momentum, price position and volatility risk.">
      <div className="scanner-layout">
        <div className="stock-list-panel">
          <div className="panel-top">
            <div>
              <h3>AI Selection Pool</h3>
              <p>{updatedAt ? `Updated ${new Date(updatedAt).toLocaleString()}` : 'Demo list shown until live data loads'}</p>
            </div>
            <button onClick={loadScanner} className="refresh-btn" disabled={loading}>
              {loading ? <Loader2 className="spin" /> : <RefreshCcw />} Refresh
            </button>
          </div>
          {error && <div className="error-box">{error}</div>}
          <div className="stock-list">
            {stocks.map((s) => (
              <button key={s.symbol} onClick={() => setSelected(s)} className={selected?.symbol === s.symbol ? 'stock-row active' : 'stock-row'}>
                <span className="rank">{s.rank}</span>
                <div><b>{s.symbol}</b><small>{s.theme}</small></div>
                <strong>{s.aiScore}</strong>
                <em className={(s.changePct || 0) >= 0 ? 'green' : 'red'}>{(s.changePct || 0).toFixed(2)}%</em>
              </button>
            ))}
          </div>
        </div>

        <div className="analysis-panel">
          <div className="analysis-head">
            <div>
              <h3>{selected?.symbol} · {selected?.theme}</h3>
              <p>{selected?.signal}</p>
            </div>
            <div className="score-badge">{selected?.aiScore}</div>
          </div>
          <div className="chart-sim">
            <svg viewBox="0 0 100 48" preserveAspectRatio="none">
              <path d="M0 38 L8 35 L16 37 L24 29 L32 31 L40 25 L48 26 L56 18 L64 20 L72 13 L80 15 L90 8 L100 11" fill="none" stroke="#22d3ee" strokeWidth="1.6" />
              <path d="M0 38 L8 35 L16 37 L24 29 L32 31 L40 25 L48 26 L56 18 L64 20 L72 13 L80 15 L90 8 L100 11 L100 48 L0 48 Z" fill="rgba(34,211,238,.13)" />
            </svg>
          </div>
          <div className="metric-grid">
            <div><span>Price</span><b>${Number(selected?.price || 0).toFixed(2)}</b></div>
            <div><span>Change</span><b className={(selected?.changePct || 0) >= 0 ? 'green' : 'red'}>{Number(selected?.changePct || 0).toFixed(2)}%</b></div>
            <div><span>Risk</span><b>{selected?.risk}</b></div>
            <div><span>Momentum</span><b>{selected?.momentumScore || '--'}</b></div>
          </div>
          <div className="reason-box">
            <h4>AI Selection Logic</h4>
            {(selected?.reason || []).map((r) => <p key={r}><CheckCircle2 /> {r}</p>)}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function CryptoPage() {
  const fallbackCrypto = [
    { rank: 1, symbol: 'BTC', name: 'Bitcoin', category: 'Core Asset', price: 68420, change24h: 2.31, change7d: 4.6, aiScore: 92, signal: 'Demo Breakout Watch', risk: 'Low', reason: ['Demo data until CoinGecko connects'] },
    { rank: 2, symbol: 'ETH', name: 'Ethereum', category: 'Smart Contract', price: 3680, change24h: 3.08, change7d: 5.2, aiScore: 89, signal: 'Demo Rotation Inflow', risk: 'Medium', reason: ['Demo data until CoinGecko connects'] },
    { rank: 3, symbol: 'SOL', name: 'Solana', category: 'High Beta L1', price: 151.2, change24h: 5.44, change7d: 8.1, aiScore: 86, signal: 'Demo Momentum Active', risk: 'High', reason: ['Demo data until CoinGecko connects'] },
    { rank: 4, symbol: 'LINK', name: 'Chainlink', category: 'Oracle / RWA', price: 17.82, change24h: 4.18, change7d: 6.7, aiScore: 82, signal: 'Demo Sector Strength', risk: 'Medium', reason: ['Demo data until CoinGecko connects'] },
    { rank: 5, symbol: 'RNDR', name: 'Render', category: 'AI Crypto', price: 10.64, change24h: 6.21, change7d: 9.4, aiScore: 79, signal: 'Demo High Volatility', risk: 'High', reason: ['Demo data until CoinGecko connects'] },
  ];

  const [coins, setCoins] = useState(fallbackCrypto);
  const [selected, setSelected] = useState(fallbackCrypto[0]);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');
  const [error, setError] = useState('');

  async function loadCryptoScanner() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/crypto-scanner');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Crypto scanner failed');
      setCoins(json.data);
      setSelected(json.data[0]);
      setUpdatedAt(json.updatedAt);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadCryptoScanner(); }, []);

  return (
    <PageShell eyebrow="Live CoinGecko API Connected" title="Crypto Asset Intelligence & Smart Coin Ranking" subtitle="This crypto scanner pulls real-time public market data through a Vercel backend API, then ranks coins by narrative weight, 24H momentum, 7D trend and liquidity activity.">
      <div className="scanner-layout">
        <div className="stock-list-panel">
          <div className="panel-top">
            <div>
              <h3>AI Crypto Selection Pool</h3>
              <p>{updatedAt ? `Updated ${new Date(updatedAt).toLocaleString()}` : 'Demo list shown until live data loads'}</p>
            </div>
            <button onClick={loadCryptoScanner} className="refresh-btn" disabled={loading}>
              {loading ? <Loader2 className="spin" /> : <RefreshCcw />} Refresh
            </button>
          </div>
          {error && <div className="error-box">{error}</div>}
          <div className="stock-list">
            {coins.map((c) => (
              <button key={c.symbol} onClick={() => setSelected(c)} className={selected?.symbol === c.symbol ? 'stock-row active' : 'stock-row'}>
                <span className="rank">{c.rank}</span>
                <div><b>{c.symbol}</b><small>{c.category}</small></div>
                <strong>{c.aiScore}</strong>
                <em className={(c.change24h || 0) >= 0 ? 'green' : 'red'}>{(c.change24h || 0).toFixed(2)}%</em>
              </button>
            ))}
          </div>
        </div>

        <div className="analysis-panel">
          <div className="analysis-head">
            <div>
              <h3>{selected?.symbol} · {selected?.name}</h3>
              <p>{selected?.signal}</p>
            </div>
            <div className="score-badge">{selected?.aiScore}</div>
          </div>
          <div className="chart-sim">
            <svg viewBox="0 0 100 48" preserveAspectRatio="none">
              <path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7" fill="none" stroke="#22d3ee" strokeWidth="1.6" />
              <path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7 L100 48 L0 48 Z" fill="rgba(34,211,238,.13)" />
            </svg>
          </div>
          <div className="metric-grid">
            <div><span>Price</span><b>${Number(selected?.price || 0).toLocaleString(undefined, { maximumFractionDigits: 4 })}</b></div>
            <div><span>24H</span><b className={(selected?.change24h || 0) >= 0 ? 'green' : 'red'}>{Number(selected?.change24h || 0).toFixed(2)}%</b></div>
            <div><span>7D</span><b className={(selected?.change7d || 0) >= 0 ? 'green' : 'red'}>{Number(selected?.change7d || 0).toFixed(2)}%</b></div>
            <div><span>Risk</span><b>{selected?.risk}</b></div>
          </div>
          <div className="reason-box">
            <h4>AI Crypto Selection Logic</h4>
            {(selected?.reason || []).map((r) => <p key={r}><CheckCircle2 /> {r}</p>)}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PortfolioPage() {
  return (
    <PageShell eyebrow="Vornaxa Portfolio Allocation" title="Diversified Portfolio Construction" subtitle="Build a structured allocation plan across U.S. stocks, crypto assets, ETFs, cash reserve and alternative opportunities.">
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
            {['Use U.S. AI leaders as growth core', 'Use BTC / ETH as digital asset anchor', 'Use ETFs and defensive assets to reduce volatility', 'Keep cash reserve for market dislocation', 'Rebalance when risk score changes'].map((x) => <div key={x}><CheckCircle2 />{x}</div>)}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function RiskPage() {
  return (
    <PageShell eyebrow="Risk Management" title="Risk First, Signal Second" subtitle="The platform presents research, education, watchlists and risk frameworks before execution.">
      <div className="risk-grid">
        {[[ShieldCheck, 'No guarantee claims', 'Decision support and education.'], [Gauge, 'Risk bands', 'Signals include volatility and invalidation logic.'], [DatabaseZap, 'Review loop', 'Track thesis and execution discipline.']].map(([Icon, title, text]) => <div key={title} className="risk-card"><Icon /><h3>{title}</h3><p>{text}</p></div>)}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Request Vornaxa AI Access" subtitle="Use this page as the conversion entrance for demo requests and premium AI report access.">
      <div className="contact-box">
        <h3>Start with the AI Market Intelligence Portal</h3>
        <p>Connect this page to your assistant, form, Telegram, WhatsApp or member onboarding flow later.</p>
        <button className="gold-btn">Request Demo</button>
      </div>
    </PageShell>
  );
}

function DashboardCards({ cards }) {
  return (
    <div className="dash-cards">
      {cards.map(([Icon, label, value]) => <div key={label} className="dash-card"><Icon /><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

function DataTable({ rows, type }) {
  const headers = type === 'crypto' ? ['Asset', 'Category', 'Price', '24H', 'AI Score', 'Signal'] : ['Ticker', 'Theme', 'Price', 'Change', 'AI Score', 'Signal'];
  return (
    <div className="table">
      <div className="tr th">{headers.map((h) => <div key={h}>{h}</div>)}</div>
      {rows.map((row) => <div key={row[0]} className="tr">{row.map((c, i) => <div key={i} className={i === 0 ? 'strong' : i === 3 ? 'green' : i === 4 ? 'cyan' : ''}>{c}</div>)}</div>)}
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
          <nav>{nav.map((n) => <button key={n.id} onClick={() => setPage(n.id)} className={page === n.id ? 'active' : ''}>{n.label}</button>)}</nav>
          <button onClick={() => setPage('contact')} className="access-btn">Request Access</button>
        </div>
        <div className="mobile-nav">{nav.map((n) => <button key={n.id} onClick={() => setPage(n.id)} className={page === n.id ? 'active' : ''}>{n.label}</button>)}</div>
      </header>
      <main>{pageView}</main>
      <footer>© 2026 Vornaxa Matrix Capital. AI research, education and portfolio intelligence. Trading involves risk.</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
