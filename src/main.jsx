import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowRight, BarChart3, BrainCircuit, CheckCircle2, ChevronDown, Globe2, Layers3, LineChart, Lock, Menu, Play, Radar, ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import './style.css';

const copy = {
  en: {
    nav: ['Platform', 'Signals', 'Performance', 'Security', 'FAQ'],
    lang: 'English',
    badge: 'Institutional-style AI market intelligence',
    headline: 'Vornaxa AI Quant Trading System',
    sub: 'A multilingual AI quant research interface built for stocks, crypto, ETFs and macro-driven market rotation. Detect structure, rank opportunities and convert complex market data into clear trading plans.',
    primary: 'Request Live Demo',
    secondary: 'Watch System Preview',
    livePanelTitle: 'Live Quant Dashboard',
    livePanelSub: 'Real-time signal simulation',
    why: 'Why Vornaxa',
    whyTitle: 'Built like a command center, not a simple stock picker.',
    whyText: 'The system is designed for educators, investment communities and active traders who need fast market interpretation without losing discipline.',
    modules: [
      ['AI Trend Scanner', 'Detects price structure, momentum expansion, sector rotation and unusual strength across watchlists.'],
      ['Risk Control Engine', 'Maps support, resistance, volatility bands and position sizing before any trade decision.'],
      ['Macro Event Layer', 'Tracks CPI, Fed speeches, earnings, geopolitical shocks and liquidity shifts that may reprice markets.'],
      ['Portfolio Companion', 'Helps members classify holdings into trend continuation, pullback watch, reduce-risk and no-touch zones.']
    ],
    workflowTitle: 'Signal Workflow',
    workflowSub: 'AI signal logic from data to execution.',
    workflow: [
      ['01', 'Collect', 'Market prices, volume, volatility, news catalysts and macro variables are synchronized.'],
      ['02', 'Score', 'AI ranks assets by trend quality, liquidity, catalyst strength and downside risk.'],
      ['03', 'Plan', 'The system converts the score into watch zones, invalidation levels and execution notes.'],
      ['04', 'Review', 'Every trade thesis is tracked for post-market review and member education.']
    ],
    performanceTitle: 'Performance-style presentation for communities',
    performanceText: 'Use clean visual reports to show watchlist tracking, closed trades, unrealized positions and strategy discipline. The website is designed to support trust-building, education and conversion.',
    tableHead: ['Theme', 'Signal', 'Action', 'Risk'],
    table: [['AI Servers','Strong','Pullback watch','High'], ['Memory','Improving','Rotation opportunity','Medium'], ['Low Earth Orbit','Active','Momentum monitor','Medium'], ['Crypto Majors','Volatile','Risk-controlled entry','High']],
    trust: ['No guaranteed profit claims', 'Risk disclosure ready', 'Multilingual member onboarding', 'Education-first positioning'],
    ctaTitle: 'Turn market noise into a structured trading plan.',
    ctaText: 'Launch Vornaxa as a premium AI trading system website for your global investment community.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      ['Is this fully automated trading?', 'The site positions Vornaxa as an AI decision-support and quant research system. It can be connected to execution later, but the public page avoids unrealistic guaranteed-profit claims.'],
      ['Which languages are supported?', 'This prototype supports English, Traditional Chinese, Simplified Chinese and Japanese. More languages can be added.'],
      ['Can this become a real website?', 'Yes. It can be deployed to Vercel and connected to your domain vornaxaai.com.']
    ]
  },
  zhTW: {
    nav: ['平台', '訊號', '績效', '安全', 'FAQ'],
    lang: '繁體中文',
    badge: '機構級 AI 市場情報介面',
    headline: 'Vornaxa AI 交易系統',
    sub: '一套支援多語系的 AI 量化研究介面，覆蓋股票、加密貨幣、ETF 與宏觀資金輪動，協助判斷結構、排序機會，並把複雜市場資料轉成清楚的交易計畫。',
    primary: '預約即時演示',
    secondary: '觀看系統預覽',
    livePanelTitle: '即時量化儀表板',
    livePanelSub: '訊號模擬追蹤',
    why: '為什麼選 Vornaxa',
    whyTitle: '它不是普通選股器，而是市場作戰指揮中心。',
    whyText: '系統適合投資教育者、投資社群與主動交易者，目標是在快速解讀市場的同時保留紀律。',
    modules: [
      ['AI 趨勢掃描', '偵測價格結構、動能擴張、族群輪動與觀察名單中的異常強勢。'],
      ['風控引擎', '交易判斷前，先標示支撐、壓力、波動區間與部位配置。'],
      ['宏觀事件層', '追蹤 CPI、Fed 談話、財報、地緣衝擊與流動性變化。'],
      ['持倉輔助系統', '協助會員把持股分類為續抱、等拉回、降低風險與暫時不碰。']
    ],
    workflowTitle: '訊號工作流程',
    workflowSub: 'AI 訊號從資料到執行。',
    workflow: [['01','收集','同步價格、成交量、波動率、新聞催化與宏觀變數。'], ['02','評分','AI 依照趨勢品質、流動性、催化強度與下行風險排序。'], ['03','計畫','將分數轉成觀察區、失效點與執行備註。'], ['04','復盤','每一個交易邏輯都可用於盤後追蹤與會員教學。']],
    performanceTitle: '適合社群展示的績效呈現',
    performanceText: '用乾淨視覺報告展示觀察名單、已平倉交易、未平倉部位與策略紀律，幫助建立信任、教育學員並推動轉化。',
    tableHead: ['主線', '訊號', '動作', '風險'],
    table: [['AI 伺服器','強勢','拉回觀察','高'], ['記憶體','改善','輪動機會','中'], ['低軌衛星','活躍','動能追蹤','中'], ['加密主流幣','波動大','風控進場','高']],
    trust: ['不宣稱保證獲利', '可加入風險揭露', '支援多語會員導流', '以教育與紀律為核心'],
    ctaTitle: '把市場雜訊，變成有結構的交易計畫。',
    ctaText: '將 Vornaxa 打造成面向全球投資社群的高端 AI 交易系統網站。',
    faqTitle: '常見問題',
    faqs: [['這是全自動交易嗎？','這個頁面將 Vornaxa 定位為 AI 決策輔助與量化研究系統。'], ['支援哪些語言？','目前支援英文、繁體中文、簡體中文與日文。'], ['可以變成正式網站嗎？','可以，部署到 Vercel 後可綁定你的 vornaxaai.com。']]
  },
  zhCN: {
    nav: ['平台', '信号', '业绩', '安全', 'FAQ'],
    lang: '简体中文',
    badge: '机构级 AI 市场情报界面',
    headline: 'Vornaxa AI 交易系统',
    sub: '一套支持多语言的 AI 量化研究界面，覆盖股票、加密货币、ETF 与宏观资金轮动，帮助判断结构、排序机会，并把复杂市场数据转成清晰交易计划。',
    primary: '预约实时演示',
    secondary: '观看系统预览',
    livePanelTitle: '实时量化仪表盘',
    livePanelSub: '信号模拟追踪',
    why: '为什么选择 Vornaxa',
    whyTitle: '它不是普通选股器，而是市场作战指挥中心。',
    whyText: '系统适合投资教育者、投资社群与主动交易者，目标是在快速解读市场的同时保留纪律。',
    modules: [['AI 趋势扫描','识别价格结构、动能扩张、板块轮动与观察名单里的异常强势。'], ['风控引擎','交易判断前先标记支撑、压力、波动区间与仓位配置。'], ['宏观事件层','跟踪 CPI、Fed 讲话、财报、地缘冲击与流动性变化。'], ['持仓辅助系统','帮助会员把持仓分类为继续观察、等待回踩、降低风险和暂时不碰。']],
    workflowTitle: '信号工作流程',
    workflowSub: 'AI 信号从数据到执行。',
    workflow: [['01','收集','同步价格、成交量、波动率、新闻催化与宏观变量。'], ['02','评分','AI 按趋势质量、流动性、催化强度与下行风险排序。'], ['03','计划','将分数转成观察区、失效点与执行备注。'], ['04','复盘','每个交易逻辑都可用于盘后跟踪与会员教学。']],
    performanceTitle: '适合社群展示的业绩呈现',
    performanceText: '用干净视觉报告展示观察名单、已平仓交易、未平仓持仓与策略纪律，帮助建立信任、教育学员并推动转化。',
    tableHead: ['主线', '信号', '动作', '风险'],
    table: [['AI 服务器','强势','回踩观察','高'], ['存储','改善','轮动机会','中'], ['低轨卫星','活跃','动能追踪','中'], ['加密主流币','波动大','风控进场','高']],
    trust: ['不宣称保证获利', '可加入风险披露', '支持多语会员导流', '以教育与纪律为核心'],
    ctaTitle: '把市场噪音，变成有结构的交易计划。',
    ctaText: '将 Vornaxa 打造成面向全球投资社群的高端 AI 交易系统网站。',
    faqTitle: '常见问题',
    faqs: [['这是全自动交易吗？','该页面将 Vornaxa 定位为 AI 决策辅助与量化研究系统。'], ['支持哪些语言？','目前支持英文、繁体中文、简体中文和日文。'], ['可以变成正式网站吗？','可以，部署到 Vercel 后可绑定你的 vornaxaai.com。']]
  },
  ja: {
    nav: ['Platform', 'Signals', 'Performance', 'Security', 'FAQ'],
    lang: '日本語',
    badge: '機関投資家水準のAI市場インテリジェンス',
    headline: 'Vornaxa AI Trading System',
    sub: '株式、暗号資産、ETF、マクロ主導の資金ローテーションを分析する多言語AIクオンツ研究インターフェース。',
    primary: 'ライブデモを依頼',
    secondary: 'システムを見る',
    livePanelTitle: 'ライブクオンツダッシュボード',
    livePanelSub: 'リアルタイム信号シミュレーション',
    why: 'Why Vornaxa',
    whyTitle: '単なるスクリーナーではなく、市場の司令塔。',
    whyText: '投資教育者、投資コミュニティ、アクティブトレーダー向けに設計されています。',
    modules: [['AI Trend Scanner','価格構造、モメンタム、セクターローテーションを検出。'], ['Risk Control Engine','支持線、抵抗線、ボラティリティ範囲、ポジション管理を可視化。'], ['Macro Event Layer','CPI、FRB発言、決算、地政学リスク、流動性変化を追跡。'], ['Portfolio Companion','保有銘柄を継続、押し目待ち、リスク低減、見送りに分類。']],
    workflowTitle: 'Signal Workflow',
    workflowSub: 'AI signal logic from data to execution.',
    workflow: [['01','Collect','価格、出来高、ニュース、マクロ変数を同期。'], ['02','Score','トレンド品質、流動性、材料、下落リスクを評価。'], ['03','Plan','監視ゾーン、無効化ライン、実行メモへ変換。'], ['04','Review','取引仮説をレビューと教育に活用。']],
    performanceTitle: 'コミュニティ向けの実績表示',
    performanceText: 'ウォッチリスト、決済済み取引、保有ポジション、戦略規律を視覚的に提示します。',
    tableHead: ['Theme', 'Signal', 'Action', 'Risk'],
    table: [['AI Servers','Strong','Pullback watch','High'], ['Memory','Improving','Rotation','Medium'], ['LEO Satellite','Active','Momentum','Medium'], ['Crypto Majors','Volatile','Risk entry','High']],
    trust: ['利益保証なし', 'リスク開示対応', '多言語オンボーディング', '教育重視'],
    ctaTitle: '市場ノイズを、構造化された取引計画へ。',
    ctaText: 'Vornaxaをグローバル投資コミュニティ向けのプレミアムAI取引サイトとして展開。',
    faqTitle: 'FAQ',
    faqs: [['完全自動売買ですか？','本ページではAI意思決定支援とクオンツ研究システムとして位置付けています。'], ['対応言語は？','英語、繁体字中国語、簡体字中国語、日本語に対応しています。'], ['正式サイト化できますか？','Vercelにデプロイし、vornaxaai.comに接続できます。']]
  }
};

const langs = [{key:'en',label:'English'}, {key:'zhTW',label:'繁體中文'}, {key:'zhCN',label:'简体中文'}, {key:'ja',label:'日本語'}];

function Chart(){
  const points=[58,74,66,86,78,92,84,96,91,104,98,116], max=120;
  const path=points.map((p,i)=>`${i===0?'M':'L'} ${(i/(points.length-1))*100} ${100-(p/max)*100}`).join(' ');
  return <div className="chart"><svg viewBox="0 0 100 100">{[20,40,60,80].map(y=><line key={y} x1="0" x2="100" y1={y} y2={y}/>)}
    <path className="line" d={path}/><path className="area" d={`${path} L 100 100 L 0 100 Z`}/>
    {points.map((p,i)=><circle key={i} cx={(i/(points.length-1))*100} cy={100-(p/max)*100} r="1.4"/>)}</svg></div>
}

function App(){
  const [lang,setLang]=useState('en');
  const [open,setOpen]=useState(false);
  const t=useMemo(()=>copy[lang],[lang]);
  return <div className="site">
    <div className="bg"></div>
    <header className="header"><div className="wrap navrow">
      <div className="brand"><div className="logo"><BrainCircuit size={22}/></div><div><b>VORNAXA</b><span>AI Trading System</span></div></div>
      <nav>{t.nav.map(x=><a key={x} href="#platform">{x}</a>)}</nav>
      <div className="lang"><button onClick={()=>setOpen(!open)}><Globe2 size={16}/>{langs.find(l=>l.key===lang).label}<ChevronDown size={16}/></button>{open&&<div className="drop">{langs.map(l=><button key={l.key} onClick={()=>{setLang(l.key);setOpen(false)}}>{l.label}</button>)}</div>}</div>
      <Menu className="mobile" />
    </div></header>
    <main>
      <section className="hero wrap">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
          <p className="badge"><Sparkles size={16}/>{t.badge}</p>
          <h1>{t.headline}</h1>
          <p className="sub">{t.sub}</p>
          <div className="actions"><a className="btn primary">{t.primary}<ArrowRight size={20}/></a><a className="btn ghost"><Play size={18}/>{t.secondary}</a></div>
          <div className="stats">{[['24/7','AI Market Radar'],['20+','Global Markets'],['5.5','Signal Engine'],['Risk-first','Execution Logic']].map(s=><div className="stat" key={s[1]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div>
        </motion.div>
        <motion.div className="panel" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.6,delay:.1}}>
          <div className="paneltop"><div><h3>{t.livePanelTitle}</h3><span>{t.livePanelSub}</span></div><p className="live">LIVE</p></div>
          <div className="cards"><div className="mini"><Radar/><span>AI Signal Score</span><b>87<em>/100</em></b><i><u></u></i></div><div className="mini"><ShieldCheck/><span>Risk Band</span><b>B+</b><p>Volatility controlled</p></div></div>
          <Chart/>
          <div className="triples">{[[TrendingUp,'Momentum','+12.8%'],[Activity,'Rotation','Active'],[Lock,'Discipline','Strict']].map(([Icon,a,b])=><div key={a}><Icon/><span>{a}</span><b>{b}</b></div>)}</div>
        </motion.div>
      </section>
      <section id="platform" className="wrap section"><p className="eyebrow">{t.why}</p><h2>{t.whyTitle}</h2><p className="sectionText">{t.whyText}</p><div className="grid4">{t.modules.map((m,i)=>{const icons=[BrainCircuit,ShieldCheck,Globe2,Layers3]; const Icon=icons[i]; return <div className="feature" key={m[0]}><Icon/><h3>{m[0]}</h3><p>{m[1]}</p></div>})}</div></section>
      <section className="wrap section split"><div><p className="eyebrow">{t.workflowTitle}</p><h2>{t.workflowSub}</h2></div><div className="grid2">{t.workflow.map(w=><div className="step" key={w[0]}><b>{w[0]}</b><h3>{w[1]}</h3><p>{w[2]}</p></div>)}</div></section>
      <section className="wrap section performance"><div><BarChart3/><h2>{t.performanceTitle}</h2><p>{t.performanceText}</p>{t.trust.map(x=><p className="check" key={x}><CheckCircle2 size={18}/>{x}</p>)}</div><div className="table"><div className="tr head">{t.tableHead.map(h=><b key={h}>{h}</b>)}</div>{t.table.map(r=><div className="tr" key={r[0]}>{r.map((c,i)=><span key={i} className={i===3?'pill':''}>{c}</span>)}</div>)}</div></section>
      <section className="wrap section"><h2>{t.faqTitle}</h2><div className="grid3">{t.faqs.map(f=><div className="faq" key={f[0]}><h3>{f[0]}</h3><p>{f[1]}</p></div>)}</div></section>
      <section className="wrap cta"><Zap/><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><a className="btn white">{t.primary}<ArrowRight size={20}/></a></section>
    </main>
    <footer>© 2026 Vornaxa AI Trading System. Research and education platform. Trading involves risk.</footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
