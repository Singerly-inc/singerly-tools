// ══════════════════════════════════════════════════════════
// Vercel Serverless Function: OGP image generator (SVG)
// Usage: /api/og?type=宴会型&score=78
// SNSシェア時のカード画像をタイプ別に動的生成する。
// ══════════════════════════════════════════════════════════
module.exports = (req, res) => {
  const { type = "宴会型", score: scoreStr = "0" } = req.query || {};
  const score = Math.min(100, Math.max(0, parseInt(scoreStr, 10) || 0));

  const GLYPH = { 宴会型:"宴", 教祖型:"導", 勝負型:"攻", 知識型:"知", 色気型:"魅", 柔和型:"和" };
  const COLOR = { 宴会型:"#D94A3D", 教祖型:"#7A1F2A", 勝負型:"#C8A050", 知識型:"#1E5FA8", 色気型:"#6B3A8E", 柔和型:"#2F6B4F" };

  const glyph = GLYPH[type] || "鑑";
  const color = COLOR[type] || "#c93838";
  const power = Math.round(score * 8000 + 100000);
  const powerStr = (power / 10000).toFixed(1) + "万";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1a0f0a"/>
  <rect x="0" y="0" width="8" height="630" fill="${color}"/>
  <text x="60" y="80" font-family="serif" font-size="28" fill="${color}" font-weight="bold" letter-spacing="6">ムードメーカー鑑定書</text>
  <text x="60" y="350" font-family="serif" font-size="180" fill="${color}" font-weight="900" opacity="0.12">${glyph}</text>
  <text x="600" y="360" font-family="serif" font-size="120" fill="#f5e6d3" font-weight="900" text-anchor="middle">${type}</text>
  <text x="600" y="430" font-family="serif" font-size="36" fill="${color}" text-anchor="middle">ムドメ戦闘力 ${powerStr}</text>
  <text x="600" y="510" font-family="sans-serif" font-size="22" fill="rgba(245,230,211,0.6)" text-anchor="middle">あなたのムードメーカータイプも診断できます — Singerly</text>
  <text x="1150" y="600" font-family="sans-serif" font-size="18" fill="rgba(245,230,211,0.4)" text-anchor="end">singerly-tools.vercel.app</text>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800");
  res.status(200).end(svg);
};
