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
  { id: 'agent', label: 'AI Agent Terminal' },
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

function ScannerPage({type}){const isCrypto=type==='crypto'; const isTw=type==='twstocks'; const fallbackTw=[]; const fallback=isTw?fallbackTw:isCrypto?[{rank:1,symbol:'BTC',name:'Bitcoin',category:'Core Asset',price:68420,change24h:2.31,change7d:4.6,aiScore:92,signal:'Demo Breakout Watch',risk:'Low',reason:['Demo data until CoinGecko connects']},{rank:2,symbol:'ETH',name:'Ethereum',category:'Smart Contract',price:3680,change24h:3.08,change7d:5.2,aiScore:89,signal:'Demo Rotation Inflow',risk:'Medium',reason:['Demo data until CoinGecko connects']},{rank:3,symbol:'SOL',name:'Solana',category:'High Beta L1',price:151.2,change24h:5.44,change7d:8.1,aiScore:86,signal:'Demo Momentum Active',risk:'High',reason:['Demo data until CoinGecko connects']}]:fallbackStocks; const [items,setItems]=useState(fallback); const [selected,setSelected]=useState(fallback[0]); const [loading,setLoading]=useState(false); const [updatedAt,setUpdatedAt]=useState(''); const [error,setError]=useState(''); const [hotThemes,setHotThemes]=useState([]); async function load(){setLoading(true);setError('');try{const res=await fetch(isTw?'/api/tw-stock-scanner':(isCrypto?'/api/crypto-scanner':'/api/stock-scanner'));const json=await res.json();if(!res.ok)throw new Error(json.error||'Scanner failed');setItems(json.data);setSelected(json.data[0]);setUpdatedAt(json.updatedAt); if(isTw)setHotThemes(json.hotThemes||[])}catch(e){setError(e.message)}finally{setLoading(false)}} useEffect(()=>{load()},[]); return <PageShell eyebrow={isTw?'台股即時智能選股':(isCrypto?'Live CoinGecko API Connected':'Live Finnhub API Connected')} title={isTw?'台股市場智能選股雷達':(isCrypto?'Crypto Asset Intelligence & Smart Coin Ranking':'U.S. Market Intelligent Stock Scanner')} subtitle={isTw?'即時追蹤台股 AI、半導體、AI伺服器、記憶體、CPO光通訊與低軌衛星主線，依照題材權重、盤中動能、成交量與風險分數排序。':(isCrypto?'Ranks crypto assets by narrative weight, 24H momentum, 7D trend and liquidity activity.':'Ranks U.S. stocks by theme weight, intraday momentum, price position and volatility risk.')}><div className="scanner-layout"><div className="stock-list-panel"><div className="panel-top"><div><h3>{isTw?'台股 AI 智能選股池':(isCrypto?'AI Crypto Selection Pool':'AI Selection Pool')}</h3><p>{updatedAt?`更新時間 ${new Date(updatedAt).toLocaleString()}`:(isTw?'點擊 Refresh 取得台股即時排行':'Demo list shown until live data loads')}</p></div><button onClick={load} className="refresh-btn" disabled={loading}>{loading?<Loader2 className="spin"/>:<RefreshCcw/>} Refresh</button></div>{error&&<div className="error-box">{error}</div>}{isTw&&hotThemes.length>0&&<div className="hot-theme-box"><b>今日熱門主線</b>{hotThemes.slice(0,3).map(h=><span key={h.theme}>{h.theme} · {h.score}</span>)}</div>}{isTw&&!loading&&!error&&items.length===0&&<div className="error-box">請點擊 Refresh 取得台股即時選股排行。</div>}<div className="stock-list">{items.map((x)=><button key={x.symbol} onClick={()=>setSelected(x)} className={selected?.symbol===x.symbol?'stock-row active':'stock-row'}><span className="rank">{x.rank}</span><div><b>{x.symbol}</b><small>{x.theme||x.category}</small></div><strong>{x.aiScore}</strong><em className={(isCrypto?x.change24h:x.changePct)>=0?'green':'red'}>{Number(isCrypto?x.change24h:x.changePct||0).toFixed(2)}%</em></button>)}</div></div><div className="analysis-panel"><div className="analysis-head"><div><h3>{selected?.symbol||'--'} · {selected?.name||selected?.theme||'等待資料'}</h3><p>{selected?.signal||'即時排序等待更新'}</p></div><div className="score-badge">{selected?.aiScore}</div></div><div className="chart-sim"><svg viewBox="0 0 100 48" preserveAspectRatio="none"><path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7" fill="none" stroke="#22d3ee" strokeWidth="1.6"/><path d="M0 34 L8 31 L16 36 L24 28 L32 23 L40 26 L48 18 L56 21 L64 12 L72 16 L80 9 L90 13 L100 7 L100 48 L0 48 Z" fill="rgba(34,211,238,.13)"/></svg></div><div className="metric-grid"><div><span>Price</span><b>${Number(selected?.price||0).toLocaleString(undefined,{maximumFractionDigits:4})}</b></div><div><span>{isCrypto?'24H':'Change'}</span><b className={Number(isCrypto?selected?.change24h:selected?.changePct||0)>=0?'green':'red'}>{Number(isCrypto?selected?.change24h:selected?.changePct||0).toFixed(2)}%</b></div><div><span>{isCrypto?'7D':'Risk'}</span><b>{isCrypto?`${Number(selected?.change7d||0).toFixed(2)}%`:selected?.risk}</b></div><div><span>Momentum</span><b>{selected?.momentumScore||'--'}</b></div></div><div className="reason-box"><h4>AI Selection Logic</h4>{(selected?.reason||[]).map(r=><p key={r}><CheckCircle2/> {r}</p>)}</div></div></div></PageShell>}



function AgentTerminalPage(){
  const baseAgents=[
    ['news-edge','AI news scanner',1853.14,'active','green'],
    ['arb-scanner','cross-market arbitrage',820.51,'active','green'],
    ['spread-farmer','spread monitor',652.11,'active','green'],
    ['copy-trader','wallet replication',457.98,'active','green'],
    ['whale-tracker','smart money tracker',386.53,'active','gold'],
    ['pump-sniper','momentum entry',210.77,'active','gold'],
    ['liq-hunter','liquidity sweep',-127.20,'idle','red'],
    ['dex-rebal','portfolio rebalance',98.20,'active','purple']
  ];
  const tools=['Phantom','Binance','CoinMarketCap','Polymarket','Jupiter','DexScreener','OKX','CoinGlass'];
  const actions=['signal(swap 2.1 SOL)','getPrices(BTC Sol)','getQuote(ETH)','screenShot(polymarket)','getFundingRate()','getOrder(BUY)','scanMemePool()','routeBalance()'];
  const agentNames=baseAgents.map(a=>a[0]);

  const [tick,setTick]=useState(0);
  const [pnl,setPnl]=useState(4348.04);
  const [agents,setAgents]=useState(baseAgents);
  const [logs,setLogs]=useState([
    ['11:47:31','news-edge','Phantom','signal(swap 2.1 SOL)','confirmed',18.40],
    ['11:47:28','arb-scanner','Binance','getPrices(BTC Sol)','4 candles',25.75],
    ['11:47:25','spread-farmer','CoinMarketCap','getQuote(ETH)','$3,847.21',10.40],
    ['11:47:21','whale-tracker','Polymarket','screenShot(polymarket)','captured',6.30],
    ['11:47:18','pump-sniper','Binance','getFundingRate()','81% crowded',-11.10],
    ['11:47:15','copy-trader','Binance','getOrder(BUY)','filled qty 50',22.10],
    ['11:47:12','news-edge','CoinMarketCap','scapdevs()','3 signals found',0],
    ['11:47:10','dex-rebal','Jupiter','routeBalance()','complete',9.80]
  ]);
  const [fills,setFills]=useState([
    ['pump-sniper','SELL','$57',-5.30,'red'],
    ['news-edge','BUY','$189',22.85,'green'],
    ['arb-scanner','SELL','$188',23.15,'green'],
    ['whale-tracker','BUY','$188',53.92,'green'],
    ['copy-trader','SELL','$177',57.45,'green']
  ]);
  const [wallets,setWallets]=useState([
    ['0xb27bc932bf8...',225950,'score 98'],
    ['0x4fa11e8821a...',118440,'score 92'],
    ['0x8cd3982fba1...',84200,'score 88'],
    ['0x2e11fcba302...',61000,'score 81']
  ]);

  function money(n){
    const sign=n>=0?'+':'-';
    return `${sign}$${Math.abs(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  }
  function timeNow(){return new Date().toLocaleTimeString('en-US',{hour12:false});}
  function rand(min,max){return Math.random()*(max-min)+min}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

  useEffect(()=>{
    const id=setInterval(()=>{
      setTick(t=>t+1);
      const delta=rand(-18,42);
      setPnl(p=>Math.max(1000,p+delta));
      setAgents(prev=>prev.map((a,i)=>{
        const drift=rand(-8,18);
        const next=a[2]+drift;
        const tone=next>=0?(i<4?'green':i<6?'gold':'purple'):'red';
        const status=Math.random()>.12?'active':'idle';
        return [a[0],a[1],next,status,tone];
      }));
      const agent=pick(agentNames);
      const tool=pick(tools);
      const action=pick(actions);
      const result=Math.random()>.28?'confirmed':Math.random()>.5?'captured':'SCAN';
      const logPnl=rand(-28,56);
      setLogs(prev=>[[timeNow(),agent,tool,action,result,logPnl],...prev].slice(0,8));
      const side=Math.random()>.5?'BUY':'SELL';
      const fillPnl=rand(-18,72);
      setFills(prev=>[[agent,side,`$${Math.round(rand(40,220))}`,fillPnl,fillPnl>=0?'green':'red'],...prev].slice(0,5));
      setWallets(prev=>prev.map(w=>[w[0],Math.max(1000,w[1]+rand(-1600,4200)),`score ${Math.max(70,Math.min(99,Number(w[2].replace('score ',''))+Math.round(rand(-1.5,1.8))))}`]));
    },1400);
    return()=>clearInterval(id);
  },[]);

  const winRate=(68.4+Math.sin(tick/3)*2.1).toFixed(1);
  const sharpe=(2.41+Math.sin(tick/4)*0.18).toFixed(2);
  const returnPct=Math.round(16846+Math.sin(tick/2)*360+tick*3);
  const totalTrades=793+tick;
  const uptime=`08:${String(24+Math.floor(tick/60)).padStart(2,'0')}:${String(38+tick%60).padStart(2,'0')}`;

  return <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="agent-page">
    <div className="agent-topbar">
      <div><span className="agent-pulse"></span>AI AGENT ORCHESTRATOR</div>
      <div className="agent-stats"><b>ALPHA <em>+{(2.34+Math.sin(tick/5)*.18).toFixed(2)}%</em></b><b>BETA <em>{(0.87+Math.cos(tick/6)*.04).toFixed(2)}</em></b><b>SHARPE <em>{sharpe}</em></b><b>WIN RATE <em>{winRate}%</em></b></div>
    </div>
    <div className="agent-hero">
      <div className="agent-left">
        <h3>AGENT P&L // SESSION</h3>
        <div className="agent-list">{agents.map(([name,desc,value,status,tone])=><div className="agent-row flash-row" key={name}>
          <div><strong>{name}</strong><small>{desc} · {status}</small><i><u className={tone} style={{width:`${Math.max(22,Math.min(96,Math.abs(value)/22))}%`}}></u></i></div><b className={value>=0?tone:'red'}>{money(value)}</b>
        </div>)}</div>
      </div>
      <div className="agent-main">
        <div className="agent-title">CUMULATIVE P&L // AI EXECUTION CURVE</div>
        <motion.div key={Math.round(pnl)} initial={{scale:1.03,opacity:.65}} animate={{scale:1,opacity:1}} className="agent-pnl">{money(pnl)}</motion.div>
        <div className="curve-box">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none">
            <motion.path d={`M0 54 C10 ${52-Math.sin(tick)*2} 15 48 22 ${45-Math.cos(tick)*2} S34 40 40 ${34-Math.sin(tick/2)*2} S50 30 58 ${23-Math.cos(tick/2)*2} S70 17 78 ${10-Math.sin(tick/3)*2} S90 7 100 ${2+Math.cos(tick/2)*2}`} fill="none" stroke="#22c55e" strokeWidth="1.2"/>
            <motion.path d={`M0 54 C10 ${52-Math.sin(tick)*2} 15 48 22 ${45-Math.cos(tick)*2} S34 40 40 ${34-Math.sin(tick/2)*2} S50 30 58 ${23-Math.cos(tick/2)*2} S70 17 78 ${10-Math.sin(tick/3)*2} S90 7 100 ${2+Math.cos(tick/2)*2} L100 60 L0 60 Z`} fill="rgba(34,197,94,.22)"/>
          </svg>
        </div>
      </div>
      <div className="agent-right">
        <h3>PERFORMANCE STATS</h3>
        {[
          ['TOTAL P&L',money(pnl),'green'],
          ['SEED CAPITAL','$25.80',''],
          ['RETURN',`+${returnPct.toLocaleString()}%`,'green'],
          ['TOTAL TRADES',String(totalTrades),''],
          ['WIN RATE',`${winRate}%`,'green'],
          ['SHARPE RATIO',sharpe,'cyan'],
          ['MAX DRAWDOWN',`-$${(48.2+Math.sin(tick)*4).toFixed(2)}`,'red'],
          ['UPTIME',uptime,'green']
        ].map(([a,b,t])=><div className="perf-line flash-row" key={a}><span>{a}</span><b className={t}>{b}</b></div>)}
      </div>
    </div>
    <div className="agent-bottom">
      <div className="agent-panel">
        <h3>TOP WALLETS // COPIED</h3>
        {wallets.map(([w,v,s])=><div className="wallet-row flash-row" key={w}><span>{w}</span><b>${Math.round(v).toLocaleString()}</b><small>{s}</small></div>)}
      </div>
      <div className="agent-panel logs">
        <h3>EXECUTION LOG // TOOL CALLS</h3>
        {logs.map(([time,agent,tool,action,result,pnl],idx)=><div className={idx===0?'log-row newest':'log-row'} key={time+agent+action+idx}><span>{time}</span><b>{agent}</b><em>{tool}</em><p>{action}</p><strong className={Number(pnl)<0?'red':'green'}>{Number(pnl)===0?String(result):money(Number(pnl))}</strong></div>)}
      </div>
      <div className="agent-panel">
        <h3>RECENT FILLS</h3>
        {fills.map(([agent,side,size,pnl,t],idx)=><div className={idx===0?'fill-row newest':'fill-row'} key={agent+side+idx}><span>{agent}</span><b className={side==='BUY'?'green':'red'}>{side}</b><em>{size}</em><strong className={t}>{money(Number(pnl))}</strong></div>)}
      </div>
    </div>
    <div className="onchain-feed">
      <h3>ON-CHAIN FEED</h3>
      {['TRANSFER  SWAP 500 USDC → 2.07 SOL confirmed','TRANSFER  MEME BASKET +17.3% signal','PROFIT  copied wallet closed +$48.94','ALERT  whale accumulation detected'].map((x,i)=><p className={i===0?'newest':''} key={x+tick}>{timeNow()} · {x}</p>)}
    </div>
  </motion.section>
}

function PortfolioPage(){return <PageShell eyebrow="Vornaxa Portfolio Allocation" title="Diversified Portfolio Construction" subtitle="Build a structured allocation plan across U.S. stocks, crypto assets, ETFs, cash reserve and alternative opportunities."><div className="portfolio-grid"><div className="side-panel"><h3>Allocation Model</h3><div className="bars">{allocation.map(a=><div key={a.name}><div className="bar-line"><span>{a.name}</span><b>{a.value}%</b></div><div className="bar"><i style={{width:`${a.value}%`}} /></div><small>{a.note}</small></div>)}</div></div><div className="side-panel"><h3>Portfolio Logic</h3><div className="logic-list">{['Use U.S. AI leaders as growth core','Use BTC / ETH as digital asset anchor','Use ETFs and defensive assets to reduce volatility','Keep cash reserve for market dislocation','Rebalance when risk score changes'].map(x=><div key={x}><CheckCircle2/>{x}</div>)}</div></div></div></PageShell>}

function RiskPage(){return <PageShell eyebrow="Risk Management" title="Risk First, Signal Second" subtitle="The platform presents research, education, watchlists and risk frameworks before execution."><div className="risk-grid">{[[ShieldCheck,'No guarantee claims','Decision support and education.'],[Gauge,'Risk bands','Signals include volatility and invalidation logic.'],[DatabaseZap,'Review loop','Track thesis and execution discipline.']].map(([Icon,t,d])=><div key={t} className="risk-card"><Icon/><h3>{t}</h3><p>{d}</p></div>)}</div></PageShell>}

function ContactPage(){return <PageShell eyebrow="Contact" title="Request Vornaxa AI Access" subtitle="Use this page as the conversion entrance for demo requests and premium AI report access."><div className="contact-box"><h3>Start with the AI Market Intelligence Portal</h3><p>Connect this page to your assistant, form, Telegram, WhatsApp or member onboarding flow later.</p><button className="gold-btn">Request Demo</button></div></PageShell>}

function PageShell({eyebrow,title,subtitle,children}){return <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="page"><div className="page-card"><div className="page-glow"/><div className="page-content"><div className="pill"><Sparkles/> {eyebrow}</div><h2>{title}</h2><p>{subtitle}</p>{children}</div></div></motion.section>}

function App(){const [page,setPage]=useState('home'); const view=useMemo(()=>{if(page==='stocks')return <ScannerPage type="stocks"/>; if(page==='twstocks')return <ScannerPage type="twstocks"/>; if(page==='crypto')return <ScannerPage type="crypto"/>; if(page==='agent')return <AgentTerminalPage/>; if(page==='portfolio')return <PortfolioPage/>; if(page==='risk')return <RiskPage/>; if(page==='contact')return <ContactPage/>; return <><Hero setPage={setPage}/><FeatureHighlights setPage={setPage}/></>},[page]); return <div className="app"><QuantBackground/><header className="header"><div className="header-inner"><button onClick={()=>setPage('home')} className="logo-button"><Logo/></button><nav>{nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)} className={page===n.id?'active':''}>{n.label}</button>)}</nav><button onClick={()=>setPage('contact')} className="access-btn">Request Access</button></div><div className="mobile-nav">{nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)} className={page===n.id?'active':''}>{n.label}</button>)}</div></header><main>{view}</main><footer>© 2026 Vornaxa Matrix Capital. AI research, education and portfolio intelligence. Trading involves risk.</footer></div>}

createRoot(document.getElementById('root')).render(<App/>);
