const TW_UNIVERSE = [
  { market: 'tse', code: '2330', name: '台積電', theme: '半導體 / AI晶片', weight: 20 },
  { market: 'tse', code: '2454', name: '聯發科', theme: 'IC設計 / AI邊緣', weight: 15 },
  { market: 'tse', code: '2317', name: '鴻海', theme: 'AI伺服器 / 電動車', weight: 14 },
  { market: 'tse', code: '2382', name: '廣達', theme: 'AI伺服器', weight: 17 },
  { market: 'tse', code: '3231', name: '緯創', theme: 'AI伺服器', weight: 15 },
  { market: 'tse', code: '6669', name: '緯穎', theme: '雲端伺服器', weight: 16 },
  { market: 'tse', code: '2408', name: '南亞科', theme: '記憶體', weight: 12 },
  { market: 'tse', code: '2344', name: '華邦電', theme: '記憶體', weight: 11 },
  { market: 'otc', code: '8299', name: '群聯', theme: '記憶體 / 控制晶片', weight: 12 },
  { market: 'otc', code: '3163', name: '波若威', theme: 'CPO光通訊', weight: 14 },
  { market: 'otc', code: '3363', name: '上詮', theme: 'CPO光通訊', weight: 14 },
  { market: 'otc', code: '4979', name: '華星光', theme: 'CPO光通訊', weight: 13 },
  { market: 'tse', code: '3450', name: '聯鈞', theme: 'CPO光通訊', weight: 12 },
  { market: 'otc', code: '3491', name: '昇達科', theme: '低軌衛星', weight: 11 },
  { market: 'tse', code: '6285', name: '啟碁', theme: '低軌衛星 / 網通', weight: 10 },
  { market: 'tse', code: '2313', name: '華通', theme: '低軌衛星 / PCB', weight: 10 },
  { market: 'tse', code: '2303', name: '聯電', theme: '晶圓代工', weight: 9 },
  { market: 'tse', code: '3711', name: '日月光投控', theme: '先進封裝', weight: 10 },
  { market: 'otc', code: '6274', name: '台燿', theme: '高階材料 / PCB', weight: 10 },
  { market: 'tse', code: '3037', name: '欣興', theme: 'AI PCB / 載板', weight: 11 }
];

function num(value, fallback = 0) {
  if (value === '-' || value === undefined || value === null || value === '') return fallback;
  const n = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(n) ? n : fallback;
}

function scoreQuote(raw, item) {
  const price = num(raw.z, num(raw.y));
  const prevClose = num(raw.y);
  const high = num(raw.h, price);
  const low = num(raw.l, price);
  const open = num(raw.o, prevClose);
  const volume = num(raw.v); // accumulated volume, unit usually shares/lots depending source
  const tickVolume = num(raw.tv);
  const changePct = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;
  const rangePct = price > 0 ? ((high - low) / price) * 100 : 0;
  const dayPosition = high > low ? ((price - low) / (high - low)) * 100 : 50;

  const momentum = Math.max(0, Math.min(34, 16 + changePct * 3));
  const positionScore = Math.max(0, Math.min(22, dayPosition * 0.22));
  const volumeScore = Math.max(0, Math.min(16, Math.log10(Math.max(volume, 1)) * 2.2));
  const riskPenalty = Math.min(22, Math.max(0, rangePct - 3.5) * 2);
  const aiScore = Math.round(Math.max(35, Math.min(99, 38 + item.weight + momentum + positionScore + volumeScore - riskPenalty)));

  let signal = '趨勢觀察';
  if (aiScore >= 90 && changePct > 0) signal = 'AI強勢主線';
  else if (aiScore >= 82 && changePct > 0) signal = '資金輪動流入';
  else if (aiScore >= 74) signal = '主線觀察';
  else if (changePct < -2) signal = '風險控管';

  let risk = '中';
  if (rangePct >= 5 || Math.abs(changePct) >= 5) risk = '高';
  if (rangePct <= 2.2 && Math.abs(changePct) <= 2.2) risk = '低';

  return {
    symbol: item.code,
    name: raw.n || item.name,
    theme: item.theme,
    market: item.market === 'tse' ? '上市' : '上櫃',
    price,
    previousClose: prevClose,
    open,
    high,
    low,
    volume,
    tickVolume,
    changePct,
    rangePct,
    aiScore,
    momentumScore: Math.round(momentum + item.weight),
    risk,
    signal,
    time: `${raw.d || ''} ${raw.t || ''}`.trim(),
    reason: [
      `${item.theme} 主線題材權重加分`,
      changePct >= 0 ? '盤中價格動能偏正向' : '短線價格承壓，先觀察承接力道',
      dayPosition >= 60 ? '股價位於日內區間上緣，買盤承接較積極' : '尚未站上日內強勢區，等待回踩後承接確認',
      volume > 0 ? '即時成交量已納入評分模型' : '目前量能資料較少，分數以價格與題材權重為主'
    ]
  };
}

function themeRanking(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.theme)) map.set(row.theme, []);
    map.get(row.theme).push(row);
  }
  return [...map.entries()]
    .map(([theme, list]) => ({
      theme,
      score: Math.round(list.reduce((sum, x) => sum + x.aiScore, 0) / list.length),
      count: list.length,
      leaders: list.slice().sort((a, b) => b.aiScore - a.aiScore).slice(0, 3).map((x) => `${x.symbol} ${x.name}`)
    }))
    .sort((a, b) => b.score - a.score);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  try {
    const exCh = TW_UNIVERSE.map((x) => `${x.market}_${x.code}.tw`).join('|');
    const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${encodeURIComponent(exCh)}&json=1&delay=0&_=${Date.now()}`;

    const response = await fetch(url, {
      headers: {
        accept: 'application/json,text/plain,*/*',
        referer: 'https://mis.twse.com.tw/stock/fibest.jsp?lang=zh_tw',
        'user-agent': 'Mozilla/5.0 VornaxaAI/1.0'
      }
    });

    if (!response.ok) throw new Error(`台股即時行情來源暫時無法連線：${response.status}`);

    const json = await response.json();
    const msgArray = Array.isArray(json.msgArray) ? json.msgArray : [];

    const rows = TW_UNIVERSE
      .map((item) => {
        const raw = msgArray.find((x) => String(x.c) === item.code);
        return raw ? scoreQuote(raw, item) : null;
      })
      .filter(Boolean)
      .filter((x) => x.price > 0)
      .sort((a, b) => b.aiScore - a.aiScore)
      .map((x, index) => ({ rank: index + 1, ...x }));

    if (!rows.length) {
      return res.status(503).json({
        error: '目前台股即時資料暫時無法取得，請於台股交易時段或稍後重新整理。'
      });
    }

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      market: 'TW',
      source: 'TWSE MIS real-time quote endpoint',
      count: rows.length,
      hotThemes: themeRanking(rows),
      data: rows
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || '台股即時行情取得失敗，請稍後重新整理。'
    });
  }
}
