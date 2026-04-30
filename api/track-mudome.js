module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const url = process.env.SUPABASE_URL;
  // SUPABASE_SERVICE_ROLE_KEY があれば RLS をバイパス。なければ anon key で試行
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return res.status(500).json({ error: 'config missing' });

  const r = await fetch(`${url}/rest/v1/tool_logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      user_email: 'moodmaker-survey@singerly-tools',
      tool_id: 'moodmaker-survey',
      tool_name: 'ムードメーカー診断',
    }),
  });

  if (r.ok) return res.status(200).json({ ok: true });
  const text = await r.text();
  return res.status(500).json({ error: text });
};
