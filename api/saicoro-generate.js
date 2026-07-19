// ══════════════════════════════════════════════════════════
// Vercel Serverless Function: サイコロトーク AIデッキ生成
// POST /api/saicoro-generate  body: { theme: "営業チームの忘年会" }
// テーマから 6カテゴリ × 6お題 = 36お題 のデッキを生成して返す
// ══════════════════════════════════════════════════════════
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const theme = ((body || {}).theme || '').trim().slice(0, 60);
  if (!theme) return res.status(400).json({ error: 'テーマを入力してください' });

  const prompt = `あなたは日本の研修・懇親会を盛り上げるプロのファシリテーターです。
「サイコロトーク」用のお題デッキを作ります。参加者はサイコロ2つを振り、1つ目でカテゴリ、2つ目でお題が決まり、選ばれた人が「理由を添えて」語ります。

テーマ: 「${theme}」

このテーマの参加者・場にぴったりの、6カテゴリ × 各6お題 = 36お題 を作ってください。

ルール:
- カテゴリ名は2〜8文字程度。テーマに寄せつつ「学生時代」「プライベート」のような自己開示系も1〜2個混ぜる
- お題は5〜14文字程度のなるべく短い文。「一番◯◯だった話」「◯◯の失敗談」のように、具体的なエピソードを引き出す形にする
- 笑える軽いお題と、少し深い自己開示のお題をバランスよく混ぜる
- 同じお題の重複禁止

次のJSONだけを出力:
{"cats": ["カテゴリ1", ..., "カテゴリ6"], "topics": [["カテゴリ1のお題1", ..., "お題6"], ... 6配列]}
※topicsはカテゴリごとの配列(6配列×6お題)`;

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      return res.status(500).json({ error: err.error?.message || 'AI生成に失敗しました' });
    }

    const data = await r.json();
    let parsed;
    try { parsed = JSON.parse(data.choices[0].message.content); }
    catch { return res.status(500).json({ error: 'AIの出力を解析できませんでした。もう一度お試しください' }); }

    let { cats, topics } = parsed;
    if (!Array.isArray(cats) || !Array.isArray(topics)) {
      return res.status(500).json({ error: 'AIの出力形式が不正です。もう一度お試しください' });
    }
    cats = cats.slice(0, 6).map(c => String(c).slice(0, 12));
    while (cats.length < 6) cats.push(`テーマ${cats.length + 1}`);
    const byCat = topics.slice(0, 6).map(col =>
      (Array.isArray(col) ? col : []).slice(0, 6).map(t => String(t).slice(0, 30)));
    while (byCat.length < 6) byCat.push([]);
    byCat.forEach(col => { while (col.length < 6) col.push('フリートーク(好きな話をどうぞ)'); });

    /* topics[カテゴリ][行] → editions形式 topics[行][カテゴリ] に転置 */
    const rows = [];
    for (let r2 = 0; r2 < 6; r2++) rows.push(byCat.map(col => col[r2]));

    res.status(200).json({ label: `✨ ${theme}版`, cats, topics: rows });
  } catch (e) {
    res.status(500).json({ error: '生成中にエラーが発生しました: ' + e.message });
  }
};
