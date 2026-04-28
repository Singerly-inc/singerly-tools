module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // body parse（Vercel は自動パースしない場合がある）
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const { items, access_token } = body;

  if (!access_token) return res.status(401).json({ error: 'ログインが必要です' });

  // Supabase JWT でユーザー確認
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${access_token}`, apikey: supabaseKey },
  });
  if (!userRes.ok) return res.status(401).json({ error: '認証に失敗しました' });

  const user = await userRes.json();
  if (!user.email?.endsWith('@singerly.co.jp')) {
    return res.status(403).json({ error: '@singerly.co.jp のアカウントのみ使用できます' });
  }

  // OpenAI gpt-image-2 で画像生成
  if (!items?.length) return res.status(400).json({ error: 'おにぎりのネタを入力してください' });

  const itemStr = items.slice(0, 5).join('・');
  const count = items.length;
  const prompt =
    `Professional Japanese food photography. ${count} triangular onigiri rice balls arranged in a beautiful row on a natural light wood board. ` +
    `Each onigiri is tightly wrapped in dark crispy nori seaweed and filled with different ingredients: ${itemStr}. ` +
    `Each onigiri has a classic triangular shape. Colorful garnishes and ingredients are visible on top of each onigiri. ` +
    `Slightly overhead angle, soft warm natural side lighting, shallow depth of field, wide landscape shot, food magazine quality. ` +
    `Photorealistic, no text, no watermarks. The subjects must be ${count} triangular Japanese onigiri arranged in a row, nothing else.`;

  const imgRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '1536x1024', quality: 'medium' }),
  });

  if (!imgRes.ok) {
    const err = await imgRes.json().catch(() => ({}));
    return res.status(500).json({ error: err.error?.message || 'OpenAI APIエラー' });
  }

  const data = await imgRes.json();
  return res.status(200).json({ b64_json: data.data[0].b64_json });
};
