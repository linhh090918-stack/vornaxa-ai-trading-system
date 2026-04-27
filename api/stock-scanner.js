const STOCK_UNIVERSE = [
  { symbol: 'NVDA', theme: 'AI Chip', weight: 18 },
  { symbol: 'AMD', theme: 'AI Chip', weight: 15 },
  { symbol: 'SMCI', theme: 'AI Server', weight: 16 },
  { symbol: 'AVGO', theme: 'AI Networking', weight: 14 },
  { symbol: 'ARM', theme: 'Semiconductor IP', weight: 12 },
  { symbol: 'MRVL', theme: 'Custom Silicon', weight: 12 },
  { symbol: 'MU', theme: 'HBM / Memory', weight: 11 },
  { symbol: 'PLTR', theme: 'AI Software', weight: 13 },
  { symbol: 'MSFT', theme: 'Cloud AI', weight: 10 },
  { symbol: 'GOOGL', theme: 'Cloud / TPU', weight: 10 },
  { symbol: 'TSLA', theme: 'AI Mobility', weight: 9 },
  { symbol: 'COIN', theme: 'Crypto Equity', weight: 8 }
];

function scoreStock(q, item) {
  const current = Number(q.c || 0);
  const previousClose = Number(q.pc || 0);
  const dayHigh = Number(q.h || 0);
  const dayLow = Number(q.l || 0);
  const changePct = previousClose > 0 ? ((current - previousClose) / previousClose) * 100 : 0;
  const intradayRange = current > 0 ? ((dayHigh - dayLow) / current) * 100 : 0;
  const momentum = Math.max(0, Math.min(35, 17 + changePct * 3.2));
  const position = dayHigh > dayLow ? ((current - dayLow) / (dayHigh - dayLow)) * 22 : 10;
  const riskPenalty = Math.min(18, Math.max(0, intradayRange - 2) * 2.1);
  const aiScore = Math.round(Math.max(35, Math.min(99, 42 + momentum + position + item.weight - riskPenalty)));
  let signal = 'Pullback Watch';
  if (aiScore >= 90 && changePct > 0) signal = 'AI Momentum Leader';
  else if (aiScore >= 82 && changePct > 0) signal = 'Rotation Inflow';
  else if (aiScore >= 74) signal = 'Trend Watch';
  else if (changePct < -2) signal = 'Risk Control Watch';
  let risk = 'Medium';
  if (intradayRange >= 5 || Math.abs(changePct) >= 5) risk = 'High';
  if (intradayRange <= 2.2 && Math.abs(changePct) <= 2.2) risk = 'Low';
  return {
    symbol: item.symbol, theme: item.theme, price: current, previousClose,
    change: current - previousClose, changePct, high: dayHigh, low: dayLow,
    aiScore, momentumScore: Math.round(momentum + item.weight), risk, signal,
    reason: [
      `${item.theme} theme weighting`,
      changePct >= 0 ? 'Positive intraday momentum' : 'Price under pressure, monitor risk',
      dayHigh > dayLow && current > (dayLow + (dayHigh - dayLow) * 0.6) ? 'Trading in upper intraday range' : 'Waiting for stronger confirmation'
    ]
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
  const token = process.env.FINNHUB_API_KEY;
  if (!token) return res.status(500).json({ error: 'FINNHUB_API_KEY is missing. Add it in Vercel Project Settings → Environment Variables, then redeploy.' });
  try {
    const results = await Promise.all(STOCK_UNIVERSE.map(async (item) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(item.symbol)}&token=${token}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Finnhub error for ${item.symbol}`);
      return scoreStock(await response.json(), item);
    }));
    const ranked = results.filter((x) => x.price > 0).sort((a, b) => b.aiScore - a.aiScore).map((x, index) => ({ rank: index + 1, ...x }));
    return res.status(200).json({ updatedAt: new Date().toISOString(), market: 'US', count: ranked.length, data: ranked });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch Finnhub market data.' });
  }
}
