// ══════════════════════════════════════════════════════════
// Vercel Serverless Function: サーベイ結果保存
// POST /api/results
// Supabase の survey_results テーブルに保存。
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY) を Vercel 環境変数で設定。
// ══════════════════════════════════════════════════════════
const crypto = require('crypto');

const TYPES = ['宴会型','教祖型','勝負型','知識型','色気型','柔和型'];
const TIERS = ['shogun','taisho','kumigashira','shibun','ashigaru'];
const GENDERS = ['male','female','other','noanswer'];
const AGE_RANGES = ['〜29','30〜39','40〜49','50〜59','60〜'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ error: 'config missing' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // 必須バリデーション
  if (!TYPES.includes(body.primary_type)) {
    return res.status(400).json({ error: 'invalid primary_type' });
  }
  if (body.secondary_type && !TYPES.includes(body.secondary_type)) {
    return res.status(400).json({ error: 'invalid secondary_type' });
  }
  if (body.tier && !TIERS.includes(body.tier)) {
    return res.status(400).json({ error: 'invalid tier' });
  }
  if (body.gender && !GENDERS.includes(body.gender)) {
    return res.status(400).json({ error: 'invalid gender' });
  }
  if (body.age_range && !AGE_RANGES.includes(body.age_range)) {
    return res.status(400).json({ error: 'invalid age_range' });
  }

  // IP ハッシュ（プライバシー保護）
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
           || req.socket?.remoteAddress
           || '';
  const ipHash = ip
    ? crypto.createHash('sha256').update(ip + (process.env.IP_HASH_SALT || 'singerly')).digest('hex').slice(0, 16)
    : null;

  const scores = body.scores || {};
  const payload = {
    primary_type: body.primary_type,
    secondary_type: body.secondary_type || null,
    score_enkai     : clamp(scores['宴会型']),
    score_kyoso     : clamp(scores['教祖型']),
    score_shobu     : clamp(scores['勝負型']),
    score_chishiki  : clamp(scores['知識型']),
    score_iroke     : clamp(scores['色気型']),
    score_nyuwa     : clamp(scores['柔和型']),
    score_omotenashi: clamp(body.omoteNashiScore),
    tier: body.tier || null,
    age_range: body.age_range || null,
    gender   : body.gender    || null,
    industry : trunc(body.industry, 64),
    position : trunc(body.position, 64),
    org_size : trunc(body.org_size, 64),
    founding : trunc(body.founding, 64),
    data_version: 2,
    user_agent    : trunc(req.headers['user-agent'], 256),
    referrer      : trunc(req.headers['referer'],    256),
    client_ip_hash: ipHash,
    device_id     : trunc(body.device_id, 64),
  };

  const r = await fetch(`${url}/rest/v1/survey_results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (r.ok) {
    const arr = await r.json().catch(() => []);
    return res.status(200).json({ ok: true, id: arr?.[0]?.id || null });
  }

  const text = await r.text();
  // ログには status と先頭のみ。本文全部は出さない（PII漏洩予防）
  console.warn('survey_results insert failed', r.status, text.slice(0, 200));
  return res.status(500).json({ error: 'insert failed', status: r.status });
};

function clamp(v) {
  const n = Math.round(Number(v));
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function trunc(v, max) {
  if (v == null) return null;
  const s = String(v);
  return s.length > max ? s.slice(0, max) : (s || null);
}
