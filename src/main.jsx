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
  { id: 'twstocks', label: '台股智能選股' },
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

const allocation = [
  { name: 'U.S. Stocks', value: 45, note: 'AI leaders, cloud, semiconductors' },
  { name: 'Crypto Assets', value: 25, note: 'BTC, ETH, selective high beta' },
  { name: 'ETFs / Defensive', value: 15, note: 'Index, dividend, low volatility' },
  { name: 'Cash Reserve', value: 10, note: 'Opportunity fund and drawdown buffer' },
  { name: 'Alternatives', value: 5, note: 'Pre-IPO / RWA themes' },
];

function QuantBackground() {
  const formulas = ['VaR₀.₀₅ = μ - 1.645σ', 'Sharpe = (Rp - Rf) / σp', 'Kelly = (bp-q)/b', 'β = Cov(Ri,Rm)/Var(Rm)', 'E[R] = Rf + β(Rm-Rf)', 'MACD = EMA12 - EMA26'];
  return (
    <div className="quant-bg">
      <div className="bg-core" />
      <div className="bg-grid" />
      <div className="bg-floor" />
      <div className="bg-dots" />
      <motion.div className="orb orb1" animate={{ x:[0,150,30,0], y:[0,100,190,0] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="orb orb2" animate={{ x:[0,-140,-40,0], y:[0,90,-60,0] }} transition={{ duration:23, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="scan scan1" animate={{ y:[0,260,520,0], opacity:[.1,.8,.12,.1] }} transition={{ duration:10, repeat:Infinity, ease:'linear' }} />
      <motion.div className="scan scan2" animate={{ y:[0,-180,-360,0], opacity:[.1,.65,.15,.1] }} transition={{ duration:13, repeat:Infinity, ease:'linear' }} />
      <svg className="flow-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyanFlow" x1="0" x2="1"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="transparent"/></linearGradient>
          <linearGradient id="greenFlow" x1="0" x2="1"><stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#22c55e"/><stop offset="100%" stopColor="transparent"/></linearGradient>
        </defs>
        <motion.path d="M-140 210 C 230 20, 460 410, 780 220 S 1180 70, 1620 330" fill="none" stroke="url(#cyanFlow)" strokeWidth="1.8" animate={{ pathLength:[.08,1,.08], opacity:[.12,.75,.12] }} transition={{ duration:8.5, repeat:Infinity, ease:'easeInOut' }} />
        <motion.path d="M-120 500 C 250 320, 510 690, 840 460 S 1200 300, 1640 650" fill="none" stroke="url(#greenFlow)" strokeWidth="1.4" animate={{ pathLength:[1,.2,1], opacity:[.1,.58,.1] }} transition={{ duration:12, repeat:Infinity, ease:'easeInOut' }} />
      </svg>
      {formulas.map((f,i)=><motion.div key={f} className="formula" style={{left:`${(i*17)%82}%`, top:`${10+(i*12)%70}%`}} animate={{x:[0,i%2?-42:42,0],y:[0,i%2?18:-18,0],opacity:[.08,.26,.08]}} transition={{duration:9+i,repeat:Infinity,ease:'easeInOut'}}>{f}</motion.div>)}
    </div>
  );
}

function Logo(){return <div className="logo-wrap"><div className="logo-box"><BrainCircuit/></div><div><div className="logo-title">VMC</div><div className="logo-sub">VORNAXA MATRIX CAPITAL</div></div></div>}

function Hero({setPage}){return <section className="hero"><div className="hero-inner"><motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="hero-copy"><div className="pill"><span className="live-dot"/> QUANTITATIVE ANALYSIS SYSTEM · LIVE SIGNALS</div><h1>Vornaxa AI<span>Quant Selection</span></h1><p>Multi-factor AI scoring, live market signals, capital-flow heatmaps, risk matrix and strategy ranking — designed to make market intelligence look and feel institutional.</p><div className="hero-buttons"><button onClick={()=>setPage('stocks')} className="gold-btn">Launch AI Stock Scanner</button><button onClick={()=>setPage('crypto')} className="cyan-btn">Open Crypto Ranking</button><button onClick={()=>setPage('portfolio')} className="glass-btn">Build Portfolio Matrix</button></div><div className="signal-stats">{[['4','Buy Signals','green'],['1','Watchlist','gold'],['0','Sell Signals','red'],['5','Total Assets','cyan']].map(([n,l,t])=><div className="signal-card" key={l}><strong className={t}>{n}</strong><span>{l}</span></div>)}</div><div className="engine-caption">MULTI-FACTOR ENGINE · REAL-TIME SIGNAL PROCESSING · LOW-LATENCY EXECUTION</div></motion.div><motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="premium-dashboard"><div className="premium-top"><div><span></span>AI QUANT ENGINE</div><em>LIVE</em></div><div className="quant-score"><div><small>Quant Score</small><b>98.6</b></div><div className="score-ring"></div></div><div className="bars-demo">{[38,58,42,78,92,65,88,54,96].map((h,i)=><motion.i key={i} style={{height:h}} animate={{height:[h*.65,h,h*.82]}} transition={{duration:2+i*.18,repeat:Infinity,ease:'easeInOut'}} />)}</div><div className="matrix-demo">{Array.from({length:48}).map((_,i)=><motion.span key={i} className={i%7===0?'hot':i%3===0?'mid':''} animate={{opacity:[.25,i%5===0?1:.62,.28]}} transition={{duration:2+(i%6)*.22,repeat:Infinity}} />)}</div></motion.div></div></section>}

function FeatureHighlights({setPage}){const features=[['stocks',TrendingUp,'Live AI Stock Selection',['Finnhub quote API','AI sector and momentum scoring','Risk-controlled watch zones']],['crypto',Bitcoin,'Live AI Crypto Selection',['CoinGecko market API','24H / 7D momentum scoring','Liquidity and risk ranking']],['portfolio',PieChart,'Portfolio Allocation',['Stocks + crypto + ETF model','Cash reserve and drawdown buffer','Risk-adjusted allocation framework']]];return <section className="features"><div className="section-head"><span>System Modules</span><h2>Three AI Engines. One Capital Matrix.</h2></div><div className="feature-grid">{features.map(([id,Icon,title,bullets])=><button key={id} onClick={()=>setPage(id)} className="feature-card"><div className="feature-glow"/><div className="feature-icon"><Icon/></div><h3>{title}</h3><ul>{bullets.map(b=><li key={b}>◆ {b}</li>)}</ul><div className="enter">Enter Intelligence Page <ChevronRight/></div></button>)}</div></section>}

function ScannerPage({type}){const isCrypto=type==='crypto'; const isTw=type==='twstocks'; const fallbackTw=[{rank:1,symbol:'2330',name:'台積電',theme:'半導體 / AI晶片',price:1000,changePct:1.25,aiScore:92,signal:'示範：AI強勢主線',risk:'中',reason:['示範資料，等待台股即時資料連線']},{rank:2,symbol:'2382',name:'廣達',theme:'AI伺服器',price:300,changePct:2.15,aiScore:89,signal:'示範：資金輪動流入',risk:'中',reason:['示範資料，等待台股即時資料連線']},{rank:3,symbol:'2454',name:'聯發科',theme:'IC設計 / AI邊緣',price:1100,changePct:.85,aiScore:84,signal:'示範：趨勢觀察',risk:'低',reason:['示範資料，等待台股即時資料連線']}]; const fallback=isTw?fallbackTw:isCrypto?[{rank:1,symbol:'BTC',name:'Bitcoin',category:'Core Asset',price:68420,change24h:2.31,change7d:4.6,aiScore:92,signal:'Demo Breakout Watch',risk:'Low',reason:['Demo data until CoinGecko connects']},{rank:2,symbol:'ETH',name:'Ethereum',category:'Smart Contract',price:3680,change24h:3.08,change7d:5.2,aiScore:89,signal:'Demo Rotation Inflow',risk:'Medium',reason:['Demo data until CoinGecko connects']},{rank:3,symbol:'SOL',name:'Solana',category:'High Beta L1',price:151.2,change24h:5.44,change7d:8.1,aiScore:86,signal:'Demo Momentum Active',risk:'High',reason:['Demo data until CoinGecko connects']}]:fallbackStocks; const [items,setItems]=useState(fallback); const [selected,setSelected]=useState(fallback[0]); const [loading,setLoading]=useState(false); const [updatedAt,setUpdatedAt]=useState(''); const [error,setError]=useState(''); async function load(){setLoading(true);setError('');try{const res=await fetch(isTw?'/api/tw-stock-scanner':(isCrypto?'/api/crypto-scanner':'/api/stock-scanner'));const json=await res.json();if(!res.ok)throw new Error(json.error||'Scanner failed');setItems(json.data);setSelected(json.data[0]);setUpdatedAt(json.updatedAt)}catch(e){setError(e.message)}finally{setLoading(false)}} useEffect(()=>{load()},[]); return <PageShell eyebrow={isTw?'台股即時智能選股':(isCrypto?'Live CoinGecko API Connected':'Live Finnhub API Connected')} title={isTw?'台股市場智能選股雷達':(isCrypto?'Crypto Asset Intelligence & Smart Coin Ranking':'U.S. Market Intelligent Stock Scanner')} subtitle={isTw?'即時追蹤台股 AI、半導體、AI伺服器、記憶體、CPO光通訊與低軌衛星主線，依照題材權重、盤中動能、成交量與風險分數排序。':(isCrypto?'Ranks crypto assets by narrative weight, 24H momentum, 7D trend and liquidity activity.':'Ranks U.S. stocks by theme weight, intraday momentum, price position and volatility risk.')}><div className="scanner-layout"><div className="stock-list-panel"><div className="panel-top"><div><h3>{isTw?'台股 AI 智能選股池':(isCrypto?'AI Crypto Selection Pool':'AI Selection Pool')}</h3><p>{updatedAt?`Updated ${new Date(updatedAt).toLocaleString()}`:'Demo list shown until live data loads'}</p></div><button onClick={load} className="refresh-btn" disabled={loading}>{loading?<Loader2 className="spin"/>:<RefreshCcw/>} Refresh</button></div>{error&&<div className="error-box">{error}</div>}<div className="stock-list">{items.map((x)=><button key={x.symbol} onClick={()=>setSelected(x)} className={selected?.symbol===x.symbol?'stock-row active':'stock-row'}><span className="rank">{x.rank}</span><div><b>{x.symbol}</b><small>{x.theme||x.category}</small></div><strong>{x.aiScore}</strong><em className={(isCrypto?x.change24h:x.changePct)>=0?'green':'red'}>{Number(isCrypto?x.change24h:x.changePct||0).toFixed(2)}%</em></button>)}</div></div><div className="analysis-panel"><div className="analysis-head"><div><h3>{selected?.symbol} · {selected?.name||selected?.theme}</h3><p>{selected?.signal}</p></div><div className="score-badge">{selected?.aiScore}</div></div><div className="chart-sim"><svg viewBox="0 0 100 48" preserveAspectRatio="none"><path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7" fill="none" stroke="#22d3ee" strokeWidth="1.6"/><path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7 L100 48 L0 48 Z" fill="rgba(34,211,238,.13)"/></svg></div><div className="metric-grid"><div><span>Price</span><b>${Number(selected?.price||0).toLocaleString(undefined,{maximumFractionDigits:4})}</b></div><div><span>{isCrypto?'24H':'Change'}</span><b className={Number(isCrypto?selected?.change24h:selected?.changePct||0)>=0?'green':'red'}>{Number(isCrypto?selected?.change24h:selected?.changePct||0).toFixed(2)}%</b></div><div><span>{isCrypto?'7D':'Risk'}</span><b>{isCrypto?`${Number(selected?.change7d||0).toFixed(2)}%`:selected?.risk}</b></div><div><span>Momentum</span><b>{selected?.momentumScore||'--'}</b></div></div><div className="reason-box"><h4>AI Selection Logic</h4>{(selected?.reason||[]).map(r=><p key={r}><CheckCircle2/> {r}</p>)}</div></div></div></PageShell>}

function PortfolioPage(){return <PageShell eyebrow="Vornaxa Portfolio Allocation" title="Diversified Portfolio Construction" subtitle="Build a structured allocation plan across U.S. stocks, crypto assets, ETFs, cash reserve and alternative opportunities."><div className="portfolio-grid"><div className="side-panel"><h3>Allocation Model</h3><div className="bars">{allocation.map(a=><div key={a.name}><div className="bar-line"><span>{a.name}</span><b>{a.value}%</b></div><div className="bar"><i style={{width:`${a.value}%`}} /></div><small>{a.note}</small></div>)}</div></div><div className="side-panel"><h3>Portfolio Logic</h3><div className="logic-list">{['Use U.S. AI leaders as growth core','Use BTC / ETH as digital asset anchor','Use ETFs and defensive assets to reduce volatility','Keep cash reserve for market dislocation','Rebalance when risk score changes'].map(x=><div key={x}><CheckCircle2/>{x}</div>)}</div></div></div></PageShell>}

function RiskPage(){return <PageShell eyebrow="Risk Management" title="Risk First, Signal Second" subtitle="The platform presents research, education, watchlists and risk frameworks before execution."><div className="risk-grid">{[[ShieldCheck,'No guarantee claims','Decision support and education.'],[Gauge,'Risk bands','Signals include volatility and invalidation logic.'],[DatabaseZap,'Review loop','Track thesis and execution discipline.']].map(([Icon,t,d])=><div key={t} className="risk-card"><Icon/><h3>{t}</h3><p>{d}</p></div>)}</div></PageShell>}

function ContactPage(){return <PageShell eyebrow="Contact" title="Request Vornaxa AI Access" subtitle="Use this page as the conversion entrance for demo requests and premium AI report access."><div className="contact-box"><h3>Start with the AI Market Intelligence Portal</h3><p>Connect this page to your assistant, form, Telegram, WhatsApp or member onboarding flow later.</p><button className="gold-btn">Request Demo</button></div></PageShell>}

function PageShell({eyebrow,title,subtitle,children}){return <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="page"><div className="page-card"><div className="page-glow"/><div className="page-content"><div className="pill"><Sparkles/> {eyebrow}</div><h2>{title}</h2><p>{subtitle}</p>{children}</div></div></motion.section>}

function App(){const [page,setPage]=useState('home'); const view=useMemo(()=>{if(page==='stocks')return <ScannerPage type="stocks"/>; if(page==='twstocks')return <ScannerPage type="twstocks"/>; if(page==='crypto')return <ScannerPage type="crypto"/>; if(page==='portfolio')return <PortfolioPage/>; if(page==='risk')return <RiskPage/>; if(page==='contact')return <ContactPage/>; return <><Hero setPage={setPage}/><FeatureHighlights setPage={setPage}/></>},[page]); return <div className="app"><QuantBackground/><header className="header"><div className="header-inner"><button onClick={()=>setPage('home')} className="logo-button"><Logo/></button><nav>{nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)} className={page===n.id?'active':''}>{n.label}</button>)}</nav><button onClick={()=>setPage('contact')} className="access-btn">Request Access</button></div><div className="mobile-nav">{nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)} className={page===n.id?'active':''}>{n.label}</button>)}</div></header><main>{view}</main><footer>© 2026 Vornaxa Matrix Capital. AI research, education and portfolio intelligence. Trading involves risk.</footer></div>}

createRoot(document.getElementById('root')).render(<App/>);
