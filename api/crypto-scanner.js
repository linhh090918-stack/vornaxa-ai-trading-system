const CRYPTO_UNIVERSE = [
  { id: 'bitcoin', symbol: 'BTC', category: 'Core Asset', weight: 18 },
  { id: 'ethereum', symbol: 'ETH', category: 'Smart Contract', weight: 16 },
  { id: 'solana', symbol: 'SOL', category: 'High Beta L1', weight: 14 },
  { id: 'chainlink', symbol: 'LINK', category: 'Oracle / RWA', weight: 13 },
  { id: 'render-token', symbol: 'RNDR', category: 'AI Crypto', weight: 12 },
  { id: 'near', symbol: 'NEAR', category: 'AI / L1', weight: 11 },
  { id: 'avalanche-2', symbol: 'AVAX', category: 'High Beta L1', weight: 10 },
  { id: 'the-graph', symbol: 'GRT', category: 'Data / AI', weight: 9 },
  { id: 'ondo-finance', symbol: 'ONDO', category: 'RWA', weight: 9 },
  { id: 'dogecoin', symbol: 'DOGE', category: 'Meme Liquidity', weight: 6 }
];

function scoreCoin(coin, item) {
  const change24h = Number(coin.price_change_percentage_24h || 0);
  const change7d = Number(coin.price_change_percentage_7d_in_currency || 0);
  const volume = Number(coin.total_volume || 0);
  const marketCap = Number(coin.market_cap || 0);
  const volumeRatio = marketCap > 0 ? (volume / marketCap) * 100 : 0;
  const momentum = Math.max(0, Math.min(34, 16 + change24h * 2.2 + change7d * 0.35));
  const liquidity = Math.max(0, Math.min(22, volumeRatio * 3.8));
  const riskPenalty = Math.min(20, Math.max(0, Math.abs(change24h) - 4) * 1.4);
  const aiScore = Math.round(Math.max(35, Math.min(99, 42 + momentum + liquidity + item.weight - riskPenalty)));
  let signal = 'Watchlist';
  if (aiScore >= 90 && change24h > 0) signal = 'Crypto Momentum Leader';
  else if (aiScore >= 82 && change24h > 0) signal = 'Liquidity Rotation Inflow';
  else if (aiScore >= 74) signal = 'Trend Watch';
  else if (change24h < -5) signal = 'Risk Control Watch';
  let risk = 'Medium';
  if (Math.abs(change24h) >= 8) risk = 'High';
  if (Math.abs(change24h) <= 3 && volumeRatio >= 2) risk = 'Low';
  return {
    symbol: item.symbol, name: coin.name, category: item.category, price: Number(coin.current_price || 0),
    change24h, change7d, marketCap, volume, aiScore, momentumScore: Math.round(momentum + item.weight),
    risk, signal,
    reason: [
      `${item.category} narrative weighting`,
      change24h >= 0 ? 'Positive 24H price momentum' : '24H pressure detected, risk needs control',
      volumeRatio >= 2 ? 'Liquidity is active relative to market cap' : 'Waiting for stronger liquidity confirmation'
    ]
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
  try {
    const ids = CRYPTO_UNIVERSE.map((x) => x.id).join(',');
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids)}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h,7d`;
    const response = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'VornaxaAI/1.0' } });
    if (!response.ok) throw new Error(`CoinGecko error: ${response.status}`);
    const coins = await response.json();
    const ranked = CRYPTO_UNIVERSE.map((item) => {
      const coin = coins.find((c) => c.id === item.id);
      return coin ? scoreCoin(coin, item) : null;
    }).filter(Boolean).sort((a, b) => b.aiScore - a.aiScore).map((x, index) => ({ rank: index + 1, ...x }));
    return res.status(200).json({ updatedAt: new Date().toISOString(), market: 'Crypto', source: 'CoinGecko public market API', count: ranked.length, data: ranked });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch crypto market data.' });
  }
}
