const TW_UNIVERSE = [
  { symbol: '2330.TW', display: '2330', name: '台積電', theme: '半導體 / AI晶片', weight: 18 },
  { symbol: '2454.TW', display: '2454', name: '聯發科', theme: 'IC設計 / AI邊緣', weight: 14 },
  { symbol: '2317.TW', display: '2317', name: '鴻海', theme: 'AI伺服器 / 電動車', weight: 13 },
  { symbol: '2382.TW', display: '2382', name: '廣達', theme: 'AI伺服器', weight: 15 },
  { symbol: '3231.TW', display: '3231', name: '緯創', theme: 'AI伺服器', weight: 13 },
  { symbol: '6669.TW', display: '6669', name: '緯穎', theme: '雲端伺服器', weight: 14 },
  { symbol: '2408.TW', display: '2408', name: '南亞科', theme: '記憶體', weight: 10 },
  { symbol: '2344.TW', display: '2344', name: '華邦電', theme: '記憶體', weight: 9 },
  { symbol: '3665.TWO', display: '3665', name: '貿聯-KY', theme: '高速傳輸 / 電動車', weight: 10 },
  { symbol: '3163.TWO', display: '3163', name: '波若威', theme: '光通訊 / CPO', weight: 11 },
  { symbol: '3363.TWO', display: '3363', name: '上詮', theme: '光通訊 / CPO', weight: 11 },
  { symbol: '4979.TWO', display: '4979', name: '華星光', theme: '光通訊 / CPO', weight: 10 },
  { symbol: '3491.TWO', display: '3491', name: '昇達科', theme: '低軌衛星', weight: 9 },
  { symbol: '6285.TW', display: '6285', name: '啟碁', theme: '低軌衛星 / 網通', weight: 8 }
];

function number(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function scoreTwStock(q, item) {
  const price = number(q.regularMarketPrice);
  const prevClose = number(q.regularMarketPreviousClose);
  const high = number(q.regularMarketDayHigh);
  const low = number(q.regularMarketDayLow);
  const volume = number(q.regularMarketVolume);
  const avgVolume = number(q.averageDailyVolume3Month || q.averageDailyVolume10Day);
  const changePct = number(q.regularMarketChangePercent);
  const range = price > 0 ? ((high - low) / price) * 100 : 0;
  const volumeRatio = avgVolume > 0 ? volume / avgVolume : 1;

  const momentum = Math.max(0, Math.min(34, 16 + changePct * 2.6));
  const position = high > low ? ((price - low) / (high - low)) * 22 : 10;
  const volumeScore = Math.max(0, Math.min(18, volumeRatio * 9));
  const riskPenalty = Math.min(20, Math.max(0, range - 3.2) * 1.8);
  const aiScore = Math.round(Math.max(35, Math.min(99, 38 + item.weight + momentum + position + volumeScore - riskPenalty)));

  let signal = '等待確認';
  if (aiScore >= 90 && changePct > 0) signal = 'AI強勢主線';
  else if (aiScore >= 82 && changePct > 0) signal = '資金輪動流入';
  else if (aiScore >= 74) signal = '趨勢觀察';
  else if (changePct < -2) signal = '風險控管觀察';

  let risk = '中';
  if (range >= 5 || Math.abs(changePct) >= 5) risk = '高';
  if (range <= 2.2 && Math.abs(changePct) <= 2.2) risk = '低';

  return {
    symbol: item.display,
    yahooSymbol: item.symbol,
    name: item.name,
    theme: item.theme,
    price,
    previousClose: prevClose,
    changePct,
    high,
    low,
    volume,
    volumeRatio,
    aiScore,
    momentumScore: Math.round(momentum + item.weight),
    risk,
    signal,
    reason: [
      `${item.theme} 題材權重加分`,
      changePct >= 0 ? '盤中價格動能偏正向' : '短線價格承壓，需控管追價風險',
      volumeRatio >= 1.2 ? '成交量相對均量放大，資金關注度提升' : '量能尚未明顯放大，等待資金確認',
      high > low && price > (low + (high - low) * 0.6) ? '股價位於日內區間上緣，承接相對積極' : '股價尚未站上日內強勢區，適合觀察回踩承接'
    ]
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    const symbols = TW_UNIVERSE.map((x) => x.symbol).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        'user-agent': 'Mozilla/5.0 VornaxaAI/1.0'
      }
    });
    if (!response.ok) throw new Error(`Yahoo Finance error: ${response.status}`);
    const json = await response.json();
    const quotes = json?.quoteResponse?.result || [];

    const ranked = TW_UNIVERSE
      .map((item) => {
        const q = quotes.find((x) => x.symbol === item.symbol);
        return q ? scoreTwStock(q, item) : null;
      })
      .filter(Boolean)
      .filter((x) => x.price > 0)
      .sort((a, b) => b.aiScore - a.aiScore)
      .map((x, index) => ({ rank: index + 1, ...x }));

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      market: 'TW',
      source: 'Yahoo Finance quote endpoint',
      count: ranked.length,
      data: ranked
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Failed to fetch Taiwan market data.'
    });
  }
}
