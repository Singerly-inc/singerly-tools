const KEEPALIVE_RPC = '/rest/v1/rpc/get_total_mudome_count';

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase keepalive configuration is missing');
    return res.status(500).json({ ok: false, error: 'config_missing' });
  }

  try {
    const upstream = await fetch(`${supabaseUrl}${KEEPALIVE_RPC}`, {
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: '{}',
    });

    if (!upstream.ok) {
      console.error('Supabase keepalive query failed', {
        status: upstream.status,
        requestId: upstream.headers.get('sb-request-id'),
      });
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    const total = await upstream.json();
    const isNumeric =
      (typeof total === 'number' || typeof total === 'string') &&
      String(total).trim() !== '' &&
      Number.isFinite(Number(total));
    if (!isNumeric) {
      console.error('Supabase keepalive returned an unexpected response');
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    return res.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      'Supabase keepalive request failed',
      error instanceof Error ? error.message : 'unknown_error',
    );
    return res.status(502).json({ ok: false, error: 'upstream_unreachable' });
  }
};
