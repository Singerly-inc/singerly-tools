// ══════════════════════════════════════════════════════════
// Vercel Serverless Function: GOD賞 投票集計
// Usage: /api/god-votes?sheet=<スプレッドシートID or URL>
// Googleフォームの回答スプレッドシート(リンク共有)をCSVで取得し、
// 「投票」列を集計してランキングJSONを返す。
// ══════════════════════════════════════════════════════════
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");

  const raw = (req.query && req.query.sheet) || "";
  const m = String(raw).match(/[-\w]{25,}/);
  if (!m) {
    res.status(400).json({ error: "sheet パラメータにスプレッドシートのURLまたはIDを指定してください" });
    return;
  }
  const sheetId = m[0];

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const r = await fetch(url, { redirect: "follow" });
    const text = await r.text();

    if (!r.ok || /<html/i.test(text.slice(0, 200))) {
      res.status(403).json({
        error: "スプレッドシートを読み取れません。共有設定を「リンクを知っている全員(閲覧者)」にしてください。",
      });
      return;
    }

    const rows = parseCSV(text);
    if (rows.length < 1) {
      res.status(200).json({ total: 0, ranking: [] });
      return;
    }

    const header = rows[0];
    let voteCol = header.findIndex((h) => /投票/.test(h));
    if (voteCol === -1) voteCol = header.length > 1 ? 1 : 0;
    let reasonCol = header.findIndex((h, i) => i !== voteCol && /理由/.test(h));

    const tally = new Map(); // key: normalized -> { display, votes, reasons }
    for (let i = 1; i < rows.length; i++) {
      const name = (rows[i][voteCol] || "").trim();
      if (!name) continue;
      const key = normalize(name);
      if (!key) continue;
      if (!tally.has(key)) tally.set(key, { name, votes: 0, reasons: [] });
      const e = tally.get(key);
      e.votes++;
      const reason = reasonCol >= 0 ? (rows[i][reasonCol] || "").trim() : "";
      if (reason && e.reasons.length < 6) e.reasons.push(reason);
    }

    const ranking = [...tally.values()].sort((a, b) => b.votes - a.votes);
    res.status(200).json({
      total: ranking.reduce((s, e) => s + e.votes, 0),
      question: header[voteCol] || "",
      updatedAt: new Date().toISOString(),
      ranking,
    });
  } catch (e) {
    res.status(500).json({ error: "集計中にエラーが発生しました: " + e.message });
  }
};

function normalize(name) {
  return name
    .replace(/[\s　]+/g, "")
    .replace(/(さん|サン|様|くん|君|ちゃん|氏)$/u, "")
    .toLowerCase();
}

function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c !== "\r") field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f !== ""));
}
