// ══════════════════════════════════════════════════════════
// Vercel Serverless Function: 任意エピソード保存
// POST /api/episodes
// 書籍『ムードメイク』の事例蓄積用。
// consent_research = true のものだけが書籍引用候補。
// ══════════════════════════════════════════════════════════
const crypto = require('crypto');

const TYPES = ['宴会型','教祖型','勝負型','知識型','色気型','柔和型'];

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

  // 入力サニタイズ（最大字数で切り詰め）
  const q1 = trunc((body.q1_others_episode    || '').trim(), 240);
  const q2 = trunc((body.q2_self_experience   || '').trim(), 240);
  const q3 = trunc((body.q3_moodmaker_meaning || '').trim(), 140);

  // すべて空ならスパムとみなして拒否
  if (!q1 && !q2 && !q3) {
    return res.status(400).json({ error: 'empty' });
  }

  if (body.primary_type && !TYPES.includes(body.primary_type)) {
    return res.status(400).json({ error: 'invalid primary_type' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
           || req.socket?.remoteAddress
           || '';
  const ipHash = ip
    ? crypto.createHash('sha256').update(ip + (process.env.IP_HASH_SALT || 'singerly')).digest('hex').slice(0, 16)
    : null;

  const payload = {
    q1_others_episode   : q1 || null,
    q2_self_experience  : q2 || null,
    q3_moodmaker_meaning: q3 || null,
    consent_research    : !!body.consent_research,
    primary_type        : body.primary_type || null,
    survey_result_id    : isUuid(body.survey_result_id) ? body.survey_result_id : null,
    client_ip_hash      : ipHash,
    device_id           : trunc(body.device_id, 64),
    user_agent          : trunc(req.headers['user-agent'], 256),
  };

  const r = await fetch(`${url}/rest/v1/episodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (r.ok) return res.status(200).json({ ok: true });

  const text = await r.text();
  console.warn('episodes insert failed', r.status, text.slice(0, 200));
  return res.status(500).json({ error: 'insert failed', status: r.status });
};

function trunc(v, max) {
  if (v == null) return null;
  const s = String(v);
  return s.length > max ? s.slice(0, max) : (s || null);
}

function isUuid(s) {
  return typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}
