const questions = [
  // ════════════════════════════════════════════════════════════
  // 30問版（v3・組織あるある文体・タイプ表記なし・シャッフル前提）
  // 6タイプ × 4問 = 24問 + おもてなし6問 = 計30問
  // type プロパティは内部スコア計算用。画面には表示しない。
  // ════════════════════════════════════════════════════════════

  // ── 宴会型 ── 場のテンション・盛り上げ
  { id: "Q01", type: "宴会型", text: "会議で気まずい沈黙が10秒続いたら、つい自分から何か言ってしまう", reverse: false },
  { id: "Q02", type: "宴会型", text: "新メンバー歓迎会で、最初に話しかけに行くのは自分のことが多い", reverse: false },
  { id: "Q03", type: "宴会型", text: "全社イベントは、できれば早めに切り上げて静かに過ごしたい", reverse: true },
  { id: "Q04", type: "宴会型", text: "「あの人が来るとなんか場が動く」と言われたことがある", reverse: false },

  // ── 教祖型 ── 意味づけ・ビジョン・信念
  { id: "Q05", type: "教祖型", text: "部下や後輩に「なぜこの仕事をやるのか」を語ったことが何度もある", reverse: false },
  { id: "Q06", type: "教祖型", text: "飲みの席で気づくと、自分の理想や信念について熱く語っている", reverse: false },
  { id: "Q07", type: "教祖型", text: "会議では「やり方」より「意義」の議論を優先したいタイプだ", reverse: false },
  { id: "Q08", type: "教祖型", text: "「あなたの言葉で考えが変わった」と言われた経験がある", reverse: false },

  // ── 勝負型 ── 競争・成果・突破
  { id: "Q09", type: "勝負型", text: "営業数字やKPIが見える化されると、ついランキングを意識してしまう", reverse: false },
  { id: "Q10", type: "勝負型", text: "プレゼンの前に「絶対に通す」と心の中で気合を入れている", reverse: false },
  { id: "Q11", type: "勝負型", text: "大きな決断を求められたとき、慎重になりすぎて先送りしがちだ", reverse: true },
  { id: "Q12", type: "勝負型", text: "同期や同年代の活躍を見ると、自分も負けてられないと火がつく", reverse: false },

  // ── 知識型 ── 構造化・分析・専門性
  { id: "Q13", type: "知識型", text: "議論が感情論になってきたら、いったん論点を整理し直したくなる", reverse: false },
  { id: "Q14", type: "知識型", text: "何か新しいことを始める前に、まず本やデータで調べることが多い", reverse: false },
  { id: "Q15", type: "知識型", text: "直感で動くより、根拠が揃ってから動くほうが自分らしい", reverse: false },
  { id: "Q16", type: "知識型", text: "細かい根拠より、まず手を動かしてしまうほうが性に合っている", reverse: true },

  // ── 色気型 ── 場の温度感知・印象設計
  { id: "Q17", type: "色気型", text: "商談相手によって、自分のキャラや見せ方を意識的に変えている", reverse: false },
  { id: "Q18", type: "色気型", text: "1対1の対話のほうが、大人数の会議より自分の力が出る", reverse: false },
  { id: "Q19", type: "色気型", text: "会議室に入った瞬間、その日の場の温度を感じ取れるほうだ", reverse: false },
  { id: "Q20", type: "色気型", text: "服装や立ち居振る舞いで、自分の見え方を意識することが多い", reverse: false },

  // ── 柔和型 ── 包容・心理的安全性・支え
  { id: "Q21", type: "柔和型", text: "部下が落ち込んでいたら、業務を止めてでもまず話を聞きにいく", reverse: false },
  { id: "Q22", type: "柔和型", text: "会議で発言できずにいる人に気づくと、振る話題をつくってあげたくなる", reverse: false },
  { id: "Q23", type: "柔和型", text: "チームでギスギスした空気になると、自分が間に入って和ませることが多い", reverse: false },
  { id: "Q24", type: "柔和型", text: "自分の主張を通すより、関係性が壊れないことを優先しがちだ", reverse: false },
];

const omoteNashiQuestions = [
  // ── おもてなし指数（6問）：気配り・他者優先・場への貢献
  { id: "QO1", text: "会議のお茶やお弁当が足りなかったら、自分が動いて補充している", reverse: false },
  { id: "QO2", text: "来客があると気づいたら、出迎えや案内が自然にできる", reverse: false },
  { id: "QO3", text: "自分が疲れていても、つい同僚の体調や機嫌を気にしてしまう", reverse: false },
  { id: "QO4", text: "「あなたがいると場が回る」と言われたことがある", reverse: false },
  { id: "QO5", text: "自分の都合より、相手に喜んでもらえることを優先しがちだ", reverse: false },
  { id: "QO6", text: "「気が利く」「さりげない」と言われたことがある", reverse: false },
];

const types = ["宴会型", "教祖型", "勝負型", "知識型", "色気型", "柔和型"];

const TYPE_META = {
  "宴会型":  { color: "#D94A3D", colorDark: "#9C2A20", bg: "#FBE5E2", glyph: "宴" },
  "教祖型":  { color: "#7A1F2A", colorDark: "#4E1019", bg: "#EDD9DC", glyph: "導" },
  "勝負型":  { color: "#C8A050", colorDark: "#8A6C28", bg: "#F5EDD6", glyph: "攻" },
  "知識型":  { color: "#1E5FA8", colorDark: "#133F72", bg: "#DCE7F4", glyph: "知" },
  "色気型":  { color: "#6B3A8E", colorDark: "#44235A", bg: "#E5DAEC", glyph: "魅" },
  "柔和型":  { color: "#2F6B4F", colorDark: "#1C4232", bg: "#D6E5DC", glyph: "和" },
  "おもてなし": { color: "#B7282E", colorDark: "#83151B", bg: "#F4D9DA", glyph: "礼" },
};

const STORAGE_KEY = "moodmaker-survey-v1";
const NARRATIVE_MAX = 4000;
let latestResult = null;
let resumeText = "";

const RESUME_KEYWORDS = {
  宴会型: ["イベント", "懇親会", "チームビルディング", "コミュニケーション", "ファシリテーション", "司会", "幹事", "盛り上げ", "交流", "親睦"],
  教祖型: ["ビジョン", "戦略", "理念", "マネジメント", "リーダー", "組織", "変革", "方針", "文化", "経営"],
  勝負型: ["営業", "目標達成", "KPI", "成果", "売上", "受注", "優勝", "達成率", "トップ", "1位"],
  知識型: ["研究", "分析", "データ", "資格", "開発", "設計", "専門", "学習", "取得", "論文"],
  色気型: ["デザイン", "ブランド", "クリエイティブ", "編集", "PR", "広報", "SNS", "プレゼン", "演出", "企画"],
  柔和型: ["サポート", "カスタマー", "調整", "相談", "支援", "コーチ", "メンター", "傾聴", "ケア", "フォロー"]
};

function analyzeResumeText(text) {
  if (!text) return null;
  const scores = {};
  const hits = {};
  for (const [type, keywords] of Object.entries(RESUME_KEYWORDS)) {
    const found = keywords.filter(kw => text.includes(kw));
    scores[type] = Math.min(100, Math.round((found.length / keywords.length) * 100 * 2));
    hits[type] = found;
  }
  return { scores, hits };
}

async function uploadResume(file) {
  const statusEl = document.getElementById("resumeUploadStatus");
  statusEl.textContent = "アップロード中...";
  statusEl.className = "resume-status uploading";
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result.split(",")[1];
      try {
        const res = await fetch(apiBase() + "/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data: base64 })
        });
        const json = await res.json();
        if (json.ok) {
          resumeText = json.text || "";
          statusEl.textContent = `✓ 抽出完了（${resumeText.length.toLocaleString()}文字）`;
          statusEl.className = "resume-status success";
        } else {
          statusEl.textContent = `エラー: ${json.error || "unknown"}`;
          statusEl.className = "resume-status error";
        }
      } catch {
        statusEl.textContent = "通信エラー（APIが未起動の可能性があります）";
        statusEl.className = "resume-status error";
      }
      resolve();
    };
    reader.readAsDataURL(file);
  });
}

function readNarrative() {
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  return {
    storyType: g("narrativeStoryType"),
    storyEpisode: g("narrativeStoryEpisode").trim(),
    originText: g("narrativeOrigin").trim(),
    weaknessPattern: g("narrativeWeaknessPattern"),
    achievementCase: g("narrativeAchievementCase").trim(),
    missionTemplate: g("narrativeMissionTemplate"),
    missionNote: g("narrativeMissionNote").trim()
  };
}

function analyzeNarrative(nar, primaryType, secondaryType) {
  const storyTypeMap = {
    "下剋上型": "逆境から這い上がった",
    "成長型": "着実な積み重ねで力をつけた",
    "転換型": "大きな転機が転換点となった",
    "開花型": "環境の変化で才能が開花した"
  };

  const weaknessMap = {
    "過熱型": `${primaryType}の熱量が高まりすぎて空回りすることがある。場の温度を意識的にコントロールする習慣を持つことで、影響力がより安定する。`,
    "読みすぎ型": `空気を読みすぎて自分の意見を出しにくい傾向がある。${primaryType}の強みを信じ、発信の場を意図的につくることが成長の鍵。`,
    "協調過剰型": `競争より協調を優先しすぎることがある。${primaryType}としての勝負どころを見極め、主張すべき場面では前に出る勇気を持つことが重要。`,
    "論理過剰型": `知識・論理に偏りすぎて感情的な共感を後回しにすることがある。${secondaryType}の側面も意識したバランスが大切。`,
    "存在感強すぎ型": `存在感が出すぎて周囲が萎縮することがある。${primaryType}としての影響力を自覚した上で、引く場面を意識的につくることが大事。`,
    "埋もれ型": `周囲に合わせすぎて個性が埋もれることがある。${primaryType}としての固有のスタイルを前面に出す機会を増やしていこう。`
  };

  const missionMap = {
    "組織変革": "ムードメイクで組織を変えることをミッションに掲げている。",
    "場づくり": "誰もが輝ける場をつくることを使命としている。",
    "価値証明": "ムードメーカーの価値を社会に証明することを目指している。",
    "架け橋": "人と人をつなぐ架け橋になることを信念としている。"
  };

  // ストーリー生成
  let story;
  if (nar.storyType && storyTypeMap[nar.storyType]) {
    story = `【${nar.storyType}】${storyTypeMap[nar.storyType]}タイプ。`;
    if (nar.storyEpisode) story += nar.storyEpisode;
  } else if (nar.storyEpisode) {
    story = nar.storyEpisode;
  } else {
    story = `${primaryType}としての強みは、一朝一夕ではなく経験の積み重ねの中で育まれてきた。`;
  }

  // バックグラウンド生成
  let background;
  if (nar.originText) {
    background = `${primaryType}としての原体験：「${nar.originText}」。この体験がムードメイクの土台となっている。`;
  } else {
    background = `${primaryType}の特性を活かした経験の積み重ねが、現在のムードメイク力の基盤となっている。`;
  }

  // ウィークポイント生成
  const weakness = weaknessMap[nar.weaknessPattern]
    || `場の文脈が見えにくいと力を出しにくいことがある。目的と役割の明確化で安定する。`;

  // ミッション生成
  let mission;
  if (nar.missionTemplate && nar.missionTemplate !== "カスタム" && missionMap[nar.missionTemplate]) {
    mission = missionMap[nar.missionTemplate];
    if (nar.missionNote) mission += `　${nar.missionNote}`;
  } else if (nar.missionNote) {
    mission = nar.missionNote;
  } else {
    mission = `ムードメイクで世界を前向きにする。${primaryType}としての強みを活かし、ムードメーカーの価値が正当に評価される社会を目指す。`;
  }

  return { story, background, weakness, mission };
}

function analyzeAchievementCase(text, primaryType, secondaryType) {
  if (!text) return { caseText: "", analysisComment: "" };

  const typeHits = {};
  for (const [type, keywords] of Object.entries(RESUME_KEYWORDS)) {
    typeHits[type] = keywords.filter(kw => text.includes(kw));
  }

  const sorted = Object.entries(typeHits).sort((a, b) => b[1].length - a[1].length);
  const [topType, topHits] = sorted[0];

  let analysisComment;
  if (topHits.length > 0) {
    const matchLabel = topType === primaryType
      ? "主属性との一致度：高"
      : topType === secondaryType
        ? "副属性との一致度：高"
        : `${topType}の特性も発揮`;
    analysisComment = `▶ この事例は${topType}の特性が強く現れています（${topHits.join("・")}を検出）。${matchLabel}。`;
  } else {
    analysisComment = `▶ ${primaryType}としての直感と行動力が発揮された場面です。`;
  }

  return { caseText: text, analysisComment };
}

function readOrgPrefs() {
  return {
    preferredSize: document.getElementById("orgPrefSize").value,
    preferredFounding: document.getElementById("orgPrefFounding").value,
    preferredIndustry: document.getElementById("orgPrefIndustry").value,
    position: document.getElementById("orgPrefPosition").value
  };
}

function apiBase() {
  // 同一オリジンを返す。本番（Vercel）では将来 /api/results /api/resume を
  // Vercel Serverless 関数として追加予定。それまでは fetch が 404 になるが、
  // 呼び出し側 (postResultToApi / uploadResume) は try/catch でサイレントに処理する。
  // 旧実装は本番で http://localhost:8787 を返していたため fetch がエラーになっていた。
  return "";
}

function getQuestionAnswer(questionId) {
  const el = document.querySelector(`input[name="${questionId}"]:checked`);
  return el ? el.value : "";
}

function setQuestionAnswer(questionId, value) {
  const radios = document.querySelectorAll(`input[name="${questionId}"]`);
  radios.forEach((r) => {
    r.checked = value != null && value !== "" && String(r.value) === String(value);
  });
}

// ── 全質問リスト──
// タイプを意識させないためシャッフルして表示する。
// 表示順は localStorage に保存し、リロードしても同じ順番を保つ。
const _baseSurveyQuestions = [
  ...omoteNashiQuestions.map(q => ({ ...q, type: "おもてなし" })),
  ...questions
];

function _shuffleOrderFor(questions) {
  const ORDER_KEY = 'moodmaker-survey-order-v3';
  // 保存済みの順を復元
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_KEY) || 'null');
    if (Array.isArray(saved) && saved.length === questions.length) {
      const map = new Map(questions.map(q => [q.id, q]));
      const restored = saved.map(id => map.get(id)).filter(Boolean);
      if (restored.length === questions.length) return restored;
    }
  } catch (_) { /* ignore */ }
  // Fisher-Yates シャッフル
  const arr = questions.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  try { localStorage.setItem(ORDER_KEY, JSON.stringify(arr.map(q => q.id))); } catch (_) {}
  return arr;
}

const allSurveyQuestions = _shuffleOrderFor(_baseSurveyQuestions);

let surveyIdx = 0;

// ニュートラル表示用の単一テーマ（Singerly 赤・タイプを区別しない）
const NEUTRAL_THEME = {
  color: "#B7282E",
  colorDark: "#83151B",
  bg: "#F4D9DA",
  glyph: ""  // タイプグリフは表示しない
};

function getTypeForQ(q) {
  // ずっと同じ色ステーマを返す（タイプを意識させないため）
  return NEUTRAL_THEME;
}

function renderCurrentQuestion() {
  const q = allSurveyQuestions[surveyIdx];
  const total = allSurveyQuestions.length;
  const meta = getTypeForQ(q);
  const saved = getQuestionAnswer(q.id);

  const choicesHtml = [1,2,3,4,5].map(n => {
    const isSel = String(saved) === String(n);
    const selStyle = isSel
      ? `background:${meta.color};border-color:${meta.color};color:#fff;`
      : `background:#f8f8f8;border-color:#e0e0e0;color:${meta.colorDark};`;
    return `<button class="survey-choice${isSel ? " selected" : ""}" style="${selStyle}" onclick="selectAnswer('${q.id}', ${n})" data-n="${n}">${n}</button>`;
  }).join("");

  document.getElementById("survey-question-display").innerHTML = `
    <div class="survey-bg" style="background:${meta.bg}">
      <div class="survey-inner">
        <div class="progress-stepper" style="margin-bottom:24px" id="survey-progress-bar"></div>
        <div class="survey-section-header">
          <div class="survey-type-label">
            <span class="survey-type-name" style="color:${meta.colorDark}">ムードメーカー診断</span>
          </div>
          <div class="survey-counter" style="color:${meta.colorDark}">
            <span class="survey-counter-num">${surveyIdx + 1}</span><span class="survey-counter-total"> / ${total}</span>
          </div>
        </div>
        <div class="survey-card" style="border:2px solid ${meta.color}">
          <div class="survey-q-id" style="color:${meta.colorDark}">Q.${String(surveyIdx + 1).padStart(2, "0")}</div>
          <h2 class="survey-q-text">${q.text}</h2>
          <div class="survey-scale-hint" style="color:${meta.colorDark}">
            <span>← あてはまらない</span><span>よくあてはまる →</span>
          </div>
          <div class="survey-choices">${choicesHtml}</div>
        </div>
        <div class="survey-nav">
          <button class="btn ghost" style="border-color:${meta.colorDark};color:${meta.colorDark}" onclick="surveyBack()">${surveyIdx === 0 ? "← プロフィールに戻る" : "← 戻る"}</button>
          <span class="survey-kbd-hint" style="color:${meta.colorDark}">1〜5を選ぶと自動で次へ進みます</span>
        </div>
      </div>
    </div>`;

  // プログレスバー（survey内）
  const pb = document.getElementById("survey-progress-bar");
  if (pb) {
    const steps = ["プロフィール","サーベイ","組織適合","鑑定書発行"];
    pb.innerHTML = steps.map((label, idx) => {
      const state = idx + 1 < 2 ? "done" : idx + 1 === 2 ? "active" : "todo";
      return `<div class="progress-step ${state}">${idx + 1} ${label}</div>${idx < 3 ? '<div class="progress-sep"></div>' : ""}`;
    }).join("");
    pb.querySelector(".progress-step.active").style.background = meta.color;
    pb.querySelector(".progress-step.active").style.borderColor = meta.color;
  }

  // キーボード入力
  document.onkeydown = (e) => {
    if (["1","2","3","4","5"].includes(e.key)) selectAnswer(q.id, Number(e.key));
  };
}

// 自動遷移タイマーと連打防止ロック
let _autoAdvanceTimer = null;
let _advanceLocked = false;

function selectAnswer(qId, n) {
  if (_advanceLocked) return;
  setQuestionAnswer(qId, n);
  saveFormState();
  renderCurrentQuestion();

  // 350ms 後に自動遷移（連打防止ロック付き）
  clearTimeout(_autoAdvanceTimer);
  _advanceLocked = true;
  _autoAdvanceTimer = setTimeout(() => {
    _advanceLocked = false;
    surveyNext();
  }, 350);
}

function surveyNext() {
  const q = allSurveyQuestions[surveyIdx];
  if (!getQuestionAnswer(q.id)) return;
  if (surveyIdx < allSurveyQuestions.length - 1) {
    surveyIdx++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.onkeydown = null;
    if (typeof goStep === "function") goStep(3);
  }
}

function surveyBack() {
  if (surveyIdx === 0) {
    document.onkeydown = null;
    if (typeof goStep === "function") goStep(1);
  } else {
    surveyIdx--;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderQuestionHtml(q, num) {
  return `<div style="display:none"><input type="radio" name="${q.id}" value=""/></div>`;
}

function renderQuestions() {
  // 非表示ストアにラジオを生成（calcScores が name 属性を参照するため）
  document.getElementById("omoteNashiQuestions").innerHTML =
    omoteNashiQuestions.map((q) =>
      [1,2,3,4,5].map(n => `<input type="radio" name="${q.id}" value="${n}" style="display:none">`).join("")
    ).join("");
  document.getElementById("questions").innerHTML =
    questions.map((q) =>
      [1,2,3,4,5].map(n => `<input type="radio" name="${q.id}" value="${n}" style="display:none">`).join("")
    ).join("");
  // goStep(2) が呼ばれたときに最初の問題を表示
  const origGoStep = window.goStep;
  window._surveyReady = true;
}

function saveFormState() {
  const profile = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    snsX: document.getElementById("snsX").value,
    snsFacebook: document.getElementById("snsFacebook").value,
    snsNote: document.getElementById("snsNote").value,
    mediaUrl1: document.getElementById("mediaUrl1").value,
    mediaUrl2: document.getElementById("mediaUrl2").value,
    mediaUrl3: document.getElementById("mediaUrl3").value
  };
  const narrative = readNarrative();
  const orgPrefs = readOrgPrefs();
  const answers = {};
  for (const q of questions) answers[q.id] = getQuestionAnswer(q.id) || "";
  for (const q of omoteNashiQuestions) answers[q.id] = getQuestionAnswer(q.id) || "";
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, narrative, orgPrefs, answers, _v: 2 }));
}

function loadFormState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data._v !== 2) return; // 旧フォーマットは無視
    const p = data.profile || {};
    const set = (id, v) => {
      const el = document.getElementById(id);
      if (el && v !== undefined) el.value = v;
    };
    set("name", p.name);
    set("email", p.email);
    set("birthdate", p.birthdate);
    set("snsX", p.snsX);
    set("snsFacebook", p.snsFacebook);
    set("snsNote", p.snsNote);
    set("mediaUrl1", p.mediaUrl1);
    set("mediaUrl2", p.mediaUrl2);
    set("mediaUrl3", p.mediaUrl3);
    const op = data.orgPrefs || {};
    set("orgPrefSize", op.preferredSize);
    set("orgPrefFounding", op.preferredFounding);
    set("orgPrefIndustry", op.preferredIndustry);
    set("orgPrefPosition", op.position);
    const n = data.narrative || {};
    set("narrativeStoryType", n.storyType);
    set("narrativeStoryEpisode", n.storyEpisode);
    set("narrativeOrigin", n.originText);
    set("narrativeWeaknessPattern", n.weaknessPattern);
    set("narrativeAchievementCase", n.achievementCase);
    set("narrativeMissionTemplate", n.missionTemplate);
    set("narrativeMissionNote", n.missionNote);
    const answers = data.answers || {};
    for (const q of questions) setQuestionAnswer(q.id, answers[q.id]);
    for (const q of omoteNashiQuestions) setQuestionAnswer(q.id, answers[q.id]);
  } catch (_) {
    // ignore broken storage
  }
}

// v2 標準スケール: 5=よくあてはまる（高スコア） / reverse項目のみ反転
function adjustedScore(v, reverse) {
  return reverse ? 6 - v : v;
}

function calcScores() {
  const score = Object.fromEntries(types.map((t) => [t, { total: 0, count: 0 }]));

  for (const q of questions) {
    const v = Number(getQuestionAnswer(q.id));
    if (!v) throw new Error("未回答の質問があります");
    score[q.type].total += adjustedScore(v, q.reverse);
    score[q.type].count += 1;
  }

  const normalized = {};
  for (const t of types) {
    const avg = score[t].count ? score[t].total / score[t].count : 0;
    normalized[t] = Math.round(((avg - 1) / 4) * 100);
  }

  let omTotal = 0;
  for (const q of omoteNashiQuestions) {
    const v = Number(getQuestionAnswer(q.id));
    if (!v) throw new Error("未回答の質問があります");
    omTotal += adjustedScore(v, q.reverse);
  }
  const omoteNashiScore = Math.round(((omTotal / omoteNashiQuestions.length - 1) / 4) * 100);

  return { typeScores: normalized, omoteNashiScore };
}

function pickService(primaryType) {
  if (primaryType === "勝負型" || primaryType === "教祖型") return "経営者の悩みには、組織文化コンサルティングを提案します。";
  if (primaryType === "知識型") return "転職の悩みには、ムードメーカー特化の人材紹介を提案します。";
  return "個人の悩みには、ムードメイク強化コーチングを提案します。";
}

function computeOrgMatrixFromScores(scores, orgPrefs) {
  if (typeof OrgMatrix === "undefined" || !OrgMatrix.computeOrgMatrix) {
    return {
      rankedSizes: [],
      rankedFounding: [],
      rankedIndustries: [],
      fitScore: 50,
      fitLabel: "注意しながら合う",
      summary: "組織マトリクス用スクリプトの読み込みに失敗しました。ページを再読み込みしてください。",
      secondary: "",
      topCombo: {}
    };
  }
  return OrgMatrix.computeOrgMatrix(scores, types, orgPrefs);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderOrgMatrixPlots(matrix) {
  function rowHtml(item, i, titleKey) {
    const title = item[titleKey] || item.label || item.name || "";
    const desc = item.desc || "";
    const ex = item.examples ? ` <span class="org-bar-examples">（${escapeHtml(item.examples)}）</span>` : "";
    const top = i < 2 ? " org-bar-top" : "";
    return `<div class="org-bar-row${top}">
      <div class="org-bar-label">
        <strong>${escapeHtml(title)}</strong>
        ${desc ? `<span class="org-bar-desc">${escapeHtml(desc)}</span>` : ""}${ex}
      </div>
      <div class="org-bar-track"><div class="org-bar-fill" style="width:${item.plotPct}%"></div></div>
      <span class="org-bar-pct">${item.plotPct}</span>
    </div>`;
  }

  document.getElementById("orgPlotSize").innerHTML = matrix.rankedSizes
    .map((it, i) => rowHtml(it, i, "label"))
    .join("");
  document.getElementById("orgPlotFounding").innerHTML = matrix.rankedFounding
    .map((it, i) => rowHtml(it, i, "label"))
    .join("");
  document.getElementById("orgPlotIndustry").innerHTML = matrix.rankedIndustries
    .map((it, i) => rowHtml(it, i, "name"))
    .join("");

  document.getElementById("orgMatrixSummary").textContent = matrix.summary;
  document.getElementById("orgMatrixSecondary").textContent = matrix.secondary || "";
}

function slimOrgRanked(list, titleField) {
  return list.map((r) => ({
    id: r.id,
    title: r[titleField] || r.label || r.name,
    desc: r.desc || undefined,
    examples: r.examples || undefined,
    plotPct: r.plotPct
  }));
}

function renderOmoteNashiBanner(omoteNashiScore) {
  const el = document.getElementById("omoteNashiBanner");
  if (!el) return;
  let label, cls;
  if (omoteNashiScore >= 70) {
    label = `おもてなし指数: ${omoteNashiScore}／100　― 高い。ムードメーカーとしての素地があります。`;
    cls = "om-high";
  } else if (omoteNashiScore >= 50) {
    label = `おもてなし指数: ${omoteNashiScore}／100　― 標準的。場面によっては発揮できています。`;
    cls = "om-mid";
  } else {
    label = `おもてなし指数: ${omoteNashiScore}／100　― 低い。この状態ではムードメーカーとしての適性に課題があります。まずおもてなしの意識を高めることが先決です。`;
    cls = "om-low";
  }
  el.textContent = label;
  el.className = `om-banner ${cls}`;
  el.classList.remove("hidden");
}

function renderResultHero(primary, secondary, scores) {
  const pm = TYPE_META[primary[0]] || TYPE_META["宴会型"];
  const sm = TYPE_META[secondary[0]] || pm;

  const heroEl = document.getElementById("result-hero");
  if (heroEl) {
    heroEl.style.background = `linear-gradient(135deg, ${pm.colorDark} 0%, #0A0A0A 100%)`;
    heroEl.style.borderBottom = `4px solid ${pm.color}`;
  }
  const glyphEl = document.getElementById("result-hero-glyph");
  if (glyphEl) glyphEl.textContent = pm.glyph;

  const nameEl = document.getElementById("result-type-name");
  if (nameEl) {
    if (primary[0] === secondary[0]) {
      nameEl.innerHTML = `生粋の<span style="color:${pm.color}">${primary[0]}</span>`;
    } else {
      nameEl.innerHTML = `<span style="color:${sm.color}">${sm.glyph}</span> × <span style="color:${pm.color}">${primary[0]}</span>`;
    }
  }
  const catchEl = document.getElementById("result-catchphrase");
  if (catchEl) catchEl.textContent = `— 主属性: ${primary[0]}（${primary[1]}点）  副属性: ${secondary[0]}（${secondary[1]}点）`;

  const badgesEl = document.getElementById("result-type-badges");
  if (badgesEl) {
    badgesEl.innerHTML = [
      { label: "主属性", meta: pm, name: primary[0] },
      { label: "副属性", meta: sm, name: secondary[0] }
    ].map(({ label, meta, name }) => `
      <div class="result-badge">
        <span class="result-badge-label">${label}</span>
        <span class="result-badge-glyph">${meta.glyph}</span>
        <span>${name}</span>
      </div>`).join("");
  }

}

function renderResult(scores, omoteNashiScore) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primary, secondary] = sorted;
  const matrix = computeOrgMatrixFromScores(scores, readOrgPrefs());
  const fit = { fitScore: matrix.fitScore, fitLabel: matrix.fitLabel };

  renderResultHero(primary, secondary, scores);

  // OGP メタタグを結果に合わせて更新（SNSシェア時のタイトル・説明・画像を切り替え）
  if (typeof updateOgMeta === 'function') {
    try { updateOgMeta(primary[0], primary[1] || 0); } catch (_) { /* ignore */ }
  }

  // スコアバー（sortedが使えるここで描画）
  const barListEl = document.getElementById("result-score-bar-list");
  if (barListEl) {
    const scoreLabel = v => v >= 80 ? '突出' : v >= 60 ? '強め' : v >= 40 ? '標準' : '低め';
    barListEl.innerHTML = sorted.map(([t, s]) => {
      const m = TYPE_META[t] || {};
      const isPrimary = t === primary[0];
      const valColor = isPrimary ? m.color : 'var(--text-mute)';
      const nameWeight = isPrimary ? '900' : '700';
      const nameColor = isPrimary ? m.color : 'var(--ink)';
      return `<div class="score-bar-row">
        <span class="score-bar-glyph" style="color:${m.color}">${m.glyph || ""}</span>
        <span class="score-bar-name" style="color:${nameColor};font-weight:${nameWeight}">${t}</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${s}%;background:${m.color}"></div></div>
        <span class="score-bar-val" style="color:${valColor}">${s}</span>
        <span class="score-bar-comment" style="color:${isPrimary ? m.color : 'var(--text-mute)'}">${scoreLabel(s)}</span>
      </div>`;
    }).join("");
  }

  renderOmoteNashiBanner(omoteNashiScore);

  const titleEl = document.getElementById("reportTitle");
  if (titleEl) titleEl.textContent = `${primary[0]}ムードメイカー 鑑定レポート`;

  document.getElementById("scores").innerHTML = sorted
    .map(([t, s]) => `<li>${t}: <strong>${s}</strong></li>`)
    .join("");
  renderScoreTable(sorted);

  document.getElementById("primary").textContent =
    `主属性: ${primary[0]}（${primary[1]}） / 副属性: ${secondary[0]}（${secondary[1]}）`;
  document.getElementById("fit").textContent = `組織マトリクス総合: ${fit.fitLabel}（指標 ${fit.fitScore}／100）※規模・創業・業界の適合バーの平均`;
  const guidanceByType = {
    宴会型: "あなたの強みは場に前向きな変化を作る力です。次の会議で「冒頭1分の目的共有」を試してみてください。",
    教祖型: "組織変革では、あなたのムードメイク特性を部署ごとの運用ルールに落とし込むと再現性が高まります。",
    勝負型: "高い目標を掲げる環境ほど力を発揮できます。あなたの強みが成果に直結する場を積極的に選びましょう。",
    知識型: "転職判断では、あなたの強みが成果に直結する環境条件を先に言語化するのがおすすめです。",
    色気型: "場の温度感を読む力を活かし、チームの雰囲気づくりをリードしていきましょう。",
    柔和型: "信頼関係を作る力が武器です。対立が起きやすい場面で積極的に橋渡し役を担いましょう。"
  };
  document.getElementById("guidance").textContent = guidanceByType[primary[0]] || "あなたのムードメイク力を職場でぜひ活かしてください。";
  document.getElementById("signatureSkill").textContent =
    `${primary[0]}として、場の状態を読みながら人を前向きに巻き込む力が高い傾向です。`;

  const nar = readNarrative();
  const analyzed = analyzeNarrative(nar, primary[0], secondary[0]);
  document.getElementById("story").textContent = analyzed.story;
  document.getElementById("background").textContent = analyzed.background;
  document.getElementById("weakness").textContent = analyzed.weakness;
  const mission = document.getElementById("mission");
  if (mission) mission.textContent = analyzed.mission;
  const achCase = analyzeAchievementCase(nar.achievementCase, primary[0], secondary[0]);
  const ach = document.getElementById("achievements");
  if (ach) ach.textContent = achCase.caseText || `${primary[0]}として、チームや組織の雰囲気を変えてきた実績がある。`;
  const achAnalysis = document.getElementById("achievementsAnalysis");
  if (achAnalysis) achAnalysis.textContent = achCase.analysisComment;

  document.getElementById("serviceText").textContent = pickService(primary[0]);
  document.getElementById("orgFitText").textContent = matrix.summary;
  renderOrgMatrixPlots(matrix);
  document.getElementById("service").classList.remove("hidden");
  document.getElementById("pdfBtnWrap").classList.remove("hidden");
  document.getElementById("jsonBtn").classList.remove("hidden");
  window._moodPrimary   = primary[0];
  window._moodSecondary = secondary[0];
  window._moodName      = document.getElementById('name').value.trim();
  window._moodScores    = scores;
  window._moodOmote     = omoteNashiScore;

  // 結果画面に遷移
  if (typeof goStep === "function") goStep(4);
  drawRadar(scores);
  drawTrendChart(scores);

  latestResult = buildResultPayload(scores, primary, secondary, fit, matrix, omoteNashiScore);
  postResultToApi(latestResult);

  localStorage.setItem('moodmaker-result-v1', JSON.stringify({
    primary:   primary[0],
    secondary: secondary[0],
    name:      document.getElementById('name').value.trim(),
    scores:    scores,
    omote:     omoteNashiScore,
    _v: 1
  }));
}

function renderScoreTable(sorted) {
  const rows = sorted
    .map(([type, score], idx) => `<tr><td>${idx + 1}</td><td>${type}</td><td>${score}</td></tr>`)
    .join("");
  const root = document.getElementById("scoreTableWrap");
  root.innerHTML = `<table class="score-mini-table">
    <thead><tr><th>順位</th><th>属性</th><th>スコア</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function buildResultPayload(scores, primary, secondary, fit, matrix, omoteNashiScore) {
  return {
    generatedAt: new Date().toISOString(),
    profile: {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      birthdate: document.getElementById("birthdate").value,
      snsX: document.getElementById("snsX").value.trim(),
      snsFacebook: document.getElementById("snsFacebook").value.trim(),
      snsNote: document.getElementById("snsNote").value.trim(),
      mediaUrl1: document.getElementById("mediaUrl1").value.trim(),
      mediaUrl2: document.getElementById("mediaUrl2").value.trim(),
      mediaUrl3: document.getElementById("mediaUrl3").value.trim()
    },
    result: {
      typeScores: scores,
      primaryType: primary[0],
      secondaryType: secondary[0],
      omoteNashiScore,
      fitScore: fit.fitScore,
      fitLabel: fit.fitLabel,
      serviceRecommendation: pickService(primary[0]),
      orgMatrixRecommendation: {
        summary: matrix.summary,
        secondary: matrix.secondary,
        topCombo: matrix.topCombo,
        rankedSizes: slimOrgRanked(matrix.rankedSizes, "label"),
        rankedFounding: slimOrgRanked(matrix.rankedFounding, "label"),
        rankedIndustries: slimOrgRanked(matrix.rankedIndustries, "name")
      }
    },
    narrative: {
      raw: readNarrative(),
      analyzed: analyzeNarrative(readNarrative(), primary[0], secondary[0])
    }
  };
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function postResultToApi(payload) {
  try {
    const res = await fetch(apiBase() + "/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn("API save skipped or failed", res.status, err);
    }
  } catch (_) {
    // API未起動時は無視。JSONダウンロードで代替可能。
  }
}

function drawRadar(scores) {
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");

  // Retina / HiDPI support
  const dpr = window.devicePixelRatio || 1;
  const dw = 160, dh = 140;
  canvas.width  = dw * dpr;
  canvas.height = dh * dpr;
  canvas.style.width  = dw + 'px';
  canvas.style.height = dh + 'px';
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, dw, dh);

  const cx = dw / 2;
  const cy = dh / 2 + 2;
  const radius = 44;
  const steps = 4;
  const n = types.length;
  const angleStep = (Math.PI * 2) / n;

  // Dynamic type color from result
  const pmInfo = (window._moodPrimary && TYPE_INFO[window._moodPrimary]) || {};
  const typeColor = pmInfo.color || '#b7282e';

  // Grid rings
  ctx.strokeStyle = '#e0dcd5';
  ctx.lineWidth = 0.8;
  for (let s = 1; s <= steps; s++) {
    const r = (radius / steps) * s;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + i * angleStep;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Spokes + labels
  ctx.strokeStyle = '#d4d0ca';
  ctx.lineWidth = 0.8;
  ctx.fillStyle = '#888';
  ctx.font = '700 9.5px "Hiragino Sans","Noto Sans JP",sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * angleStep;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
    const lx = cx + Math.cos(a) * (radius + 13);
    const ly = cy + Math.sin(a) * (radius + 13);
    ctx.fillText(types[i], lx, ly);
  }

  // Data polygon
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * angleStep;
    const r = (Math.max(0, Math.min(100, scores[types[i]] || 0)) / 100) * radius;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = typeColor + '42';
  ctx.strokeStyle = typeColor;
  ctx.lineWidth = 1.8;
  ctx.fill();
  ctx.stroke();
}

function drawTrendChart(scores) {
  const canvas = document.getElementById("trendChart");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = 20 + (i * (h - 36)) / 4;
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  }

  const points = types.map((t, i) => {
    const x = 28 + (i * (w - 48)) / (types.length - 1);
    const y = h - 16 - ((scores[t] || 0) / 100) * (h - 36);
    return { x, y, t, v: scores[t] || 0 };
  });

  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = "#0089c5";
  ctx.lineWidth = 2;
  ctx.stroke();

  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#b7282e";
    ctx.fill();
  });
}

document.getElementById("analyzeBtn").addEventListener("click", () => {
  try {
    const name = document.getElementById("name").value.trim();
    if (!name) throw new Error("氏名を入力してください");
    const email = document.getElementById("email").value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("メールの形式を確認してください");
    }
    for (const id of ["mediaUrl1", "mediaUrl2", "mediaUrl3", "snsX", "snsFacebook", "snsNote"]) {
      const el = document.getElementById(id);
      const u = el ? el.value.trim() : "";
      if (u) {
        try {
          const parsed = new URL(u);
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            throw new Error();
          }
        } catch {
          throw new Error(`URLは http(s) で始まるURLを入力してください（${id}）`);
        }
      }
    }
    const nar = readNarrative();
    const narrTextFields = ["storyEpisode", "originText", "achievementCase", "missionNote"];
    for (const k of narrTextFields) {
      const v = nar[k] || "";
      if (v.length > NARRATIVE_MAX) {
        throw new Error(`入力が長すぎます（${NARRATIVE_MAX}文字以内）`);
      }
    }
    const { typeScores, omoteNashiScore } = calcScores();
    renderResult(typeScores, omoteNashiScore);
    saveFormState();
    // ムドメわっしょいカウント（1日1回・デバイス単位）
    (function() {
      const key = 'mudome-mm-' + new Date().toLocaleDateString('ja-JP');
      if (localStorage.getItem(key)) return;
      fetch('/api/track-mudome', { method: 'POST' })
        .then(function(r) { if (r.ok) localStorage.setItem(key, '1'); })
        .catch(function() {});
    })();
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById("pdfBtn").addEventListener("click", () => {
  window.print();
});

document.getElementById("jsonBtn").addEventListener("click", () => {
  if (!latestResult) return;
  const base = latestResult.profile.name || "moodmaker_result";
  downloadJson(`${base}_result.json`, latestResult);
});

function checkLastResult() {
  const raw = localStorage.getItem('moodmaker-result-v1');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (!data.primary || !data.scores || data._v !== 1) return;
    const wrap = document.getElementById('hero-resume-wrap');
    if (!wrap) return;
    wrap.classList.remove('hidden');
    const pm = (typeof TYPE_INFO !== 'undefined' && TYPE_INFO[data.primary]) || {};
    const label = document.getElementById('hero-resume-name');
    if (label) {
      label.textContent = (data.name ? data.name + ' · ' : '') + (pm.glyph || '') + ' ' + data.primary;
      label.style.color = pm.color || '';
    }
  } catch (_) {}
}

window.resumeLastResult = function() {
  const raw = localStorage.getItem('moodmaker-result-v1');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    window._moodPrimary   = data.primary;
    window._moodSecondary = data.secondary;
    window._moodName      = data.name;
    window._moodScores    = data.scores;
    window._moodOmote     = data.omote || 0;

    // スコアバーを描画（通常は renderResult が担当）
    const sorted = Object.entries(data.scores || {}).sort((a, b) => b[1] - a[1]);
    const barListEl = document.getElementById('result-score-bar-list');
    if (barListEl && sorted.length) {
      const scoreLabel = v => v >= 80 ? '突出' : v >= 60 ? '強め' : v >= 40 ? '標準' : '低め';
      barListEl.innerHTML = sorted.map(([t, s]) => {
        const m = TYPE_META[t] || {};
        const isPrim = t === sorted[0][0];
        return `<div class="score-bar-row">
          <span class="score-bar-glyph" style="color:${m.color}">${m.glyph || ''}</span>
          <span class="score-bar-name" style="color:${isPrim ? m.color : 'var(--ink)'};font-weight:${isPrim ? '900' : '700'}">${t}</span>
          <div class="score-bar-track"><div class="score-bar-fill" style="width:${s}%;background:${m.color}"></div></div>
          <span class="score-bar-val" style="color:${isPrim ? m.color : 'var(--text-mute)'}">${s}</span>
          <span class="score-bar-comment" style="color:${isPrim ? m.color : 'var(--text-mute)'}">${scoreLabel(s)}</span>
        </div>`;
      }).join('');
    }

    // アクションボタン類を表示（renderResult が担当する箇所）
    ['service', 'pdfBtnWrap', 'jsonBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    goStep(4);
    if (typeof drawRadar === 'function') drawRadar(data.scores);
    if (typeof renderResultExtras === 'function')
      requestAnimationFrame(() => requestAnimationFrame(renderResultExtras));
  } catch (_) {}
};

renderQuestions();
loadFormState();
checkLastResult();
document.addEventListener("change", saveFormState);
const mainEl = document.querySelector("main");
if (mainEl) mainEl.addEventListener("input", saveFormState);

document.getElementById("contactBtn").addEventListener("click", () => {
  const subj = encodeURIComponent("ムードメーカーサーベイ｜問い合わせ");
  const name = document.getElementById("name").value.trim() || "（未入力）";
  const body = encodeURIComponent(`氏名: ${name}\n\n（診断結果は JSON 保存または管理画面で共有できます）\n`);
  window.location.href = `mailto:info@singerly.co.jp?subject=${subj}&body=${body}`;
});

document.getElementById("saveReportBtn").addEventListener("click", () => {
  if (latestResult) {
    downloadJson(`${latestResult.profile.name || "moodmaker"}_result.json`, latestResult);
  } else {
    alert("先に「分析する」を実行してください");
  }
});
