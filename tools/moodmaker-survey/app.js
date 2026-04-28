const questions = [
  { id: "Q01", type: "宴会型", text: "盛り上がっていない場の空気を、自分から変えにいける", reverse: false },
  { id: "Q02", type: "宴会型", text: "初対面の集まりで、自然と中心的な役割を担っていることが多い", reverse: false },
  { id: "Q03", type: "宴会型", text: "人が多い場より、少人数か一人のほうが本来の力を発揮できる", reverse: true },
  { id: "Q04", type: "宴会型", text: "笑いや軽さで重い空気をほぐすのが得意だ", reverse: false },
  { id: "Q05", type: "宴会型", text: "飲み会やイベントの幹事・仕切り役を頼まれることが多い", reverse: false },
  { id: "Q06", type: "宴会型", text: "初対面でも短時間で打ち解けて笑いが生まれることが多い", reverse: false },
  { id: "Q07", type: "宴会型", text: "大勢の場では、場の盛り上がりを常に意識しながら行動している", reverse: false },

  { id: "Q08", type: "教祖型", text: "自分の価値観や信念を言語化して、周囲に示すことが多い", reverse: false },
  { id: "Q09", type: "教祖型", text: "理念や目的を語ることで、周囲を動かした経験が複数ある", reverse: false },
  { id: "Q10", type: "教祖型", text: "「なぜやるのか」よりも「どうやるか」に関心が向きやすい", reverse: true },
  { id: "Q11", type: "教祖型", text: "将来のビジョンについて、自分の言葉で語れるものがある", reverse: false },
  { id: "Q12", type: "教祖型", text: "自分の考えに共感してくれる人が増えると、強くモチベーションが上がる", reverse: false },
  { id: "Q13", type: "教祖型", text: "「あなたに影響を受けた」「考え方が変わった」と言われたことが複数ある", reverse: false },
  { id: "Q14", type: "教祖型", text: "組織や集団の向かう方向性について、自分なりの考えを持って発言している", reverse: false },

  { id: "Q15", type: "勝負型", text: "勝敗や順位がある状況のほうが、燃えて力が出る", reverse: false },
  { id: "Q16", type: "勝負型", text: "「負けたくない」という気持ちが、行動の原動力になっている", reverse: false },
  { id: "Q17", type: "勝負型", text: "リスクを避けて安全策を選ぶことが多く、大きな決断を先送りにしがちだ", reverse: true },
  { id: "Q18", type: "勝負型", text: "不利な状況でも、最後まで勝ちにいく姿勢を崩さないほうだ", reverse: false },
  { id: "Q19", type: "勝負型", text: "数字や成果で自分の貢献を示せる場面のほうが、力が出やすい", reverse: false },
  { id: "Q20", type: "勝負型", text: "意識している競争相手がいるほど、集中力や行動量が増す", reverse: false },
  { id: "Q21", type: "勝負型", text: "目標を達成したときの快感が、次の挑戦へのエネルギーになっている", reverse: false },

  { id: "Q22", type: "知識型", text: "何かを判断するとき、データや根拠を確認してから動くほうだ", reverse: false },
  { id: "Q23", type: "知識型", text: "自分の主張を、構造的に整理して説明することが得意だ", reverse: false },
  { id: "Q24", type: "知識型", text: "細かい分析より、直感や空気感で動くほうが自分には合っている", reverse: true },
  { id: "Q25", type: "知識型", text: "専門性を深めることに、時間やエネルギーを積極的に使っている", reverse: false },
  { id: "Q26", type: "知識型", text: "話の前提や定義が曖昧なまま進むと、違和感や不快感を覚える", reverse: false },
  { id: "Q27", type: "知識型", text: "会議やディスカッションで、論点の整理役を担うことが多い", reverse: false },
  { id: "Q28", type: "知識型", text: "「なんとなく」「雰囲気で」物事を決めることへの抵抗感がある", reverse: false },

  { id: "Q29", type: "色気型", text: "言葉より、雰囲気・表情・間（ま）で人を動かせると感じることがある", reverse: false },
  { id: "Q30", type: "色気型", text: "センスや世界観に「自分らしさ」があると言われる", reverse: false },
  { id: "Q31", type: "色気型", text: "効率・合理性を重視するあまり、雰囲気や感性を後回しにしがちだ", reverse: true },
  { id: "Q32", type: "色気型", text: "場の温度感を読み、自分の存在感でそれを変えることができる", reverse: false },
  { id: "Q33", type: "色気型", text: "服装・話し方・空間づくりに「美意識」や「こだわり」がある", reverse: false },
  { id: "Q34", type: "色気型", text: "言葉にしなくても伝わる、という体験を人よりよくしている", reverse: false },
  { id: "Q35", type: "色気型", text: "「雰囲気がある」「独特の存在感がある」と言われることがある", reverse: false },

  { id: "Q36", type: "柔和型", text: "対立する人の間に入り、双方が納得できる着地点を探すのが得意だ", reverse: false },
  { id: "Q37", type: "柔和型", text: "「話しかけやすい」「相談しやすい」と言われることが多い", reverse: false },
  { id: "Q38", type: "柔和型", text: "チームの和より、正しい結論を優先して自分の主張を押し通すことが多い", reverse: true },
  { id: "Q39", type: "柔和型", text: "人の話を最後まで聞くことが、自然とできている", reverse: false },
  { id: "Q40", type: "柔和型", text: "揉めそうな場面で、自分が一歩引いて場を収めることが多い", reverse: false },
  { id: "Q41", type: "柔和型", text: "誰かが孤立していると感じたとき、自然と気にかけて動いてしまう", reverse: false },
  { id: "Q42", type: "柔和型", text: "「あなたがいると場が安定する」と言われた経験がある", reverse: false },
];

const omoteNashiQuestions = [
  { id: "QO1", text: "誰かが困っているとき、自分のことを後回しにしてでも手を差し伸べることが多い", reverse: false },
  { id: "QO2", text: "「気が利く」「さりげない」と言われることがある", reverse: false },
  { id: "QO3", text: "自分の都合を優先して、周囲への配慮が薄れることがある", reverse: true },
  { id: "QO4", text: "相手の感情の変化に敏感で、表情や雰囲気の変化によく気づく", reverse: false },
  { id: "QO5", text: "頼まれていなくても、場の状況を見て自然と動いていることが多い", reverse: false },
  { id: "QO6", text: "自分が疲れていても、周囲が快適かどうかを気にしてしまう", reverse: false },
  { id: "QO7", text: "自分が得する場面より、周囲が喜ぶ場面を優先しがちだ", reverse: false },
  { id: "QO8", text: "相手に喜んでもらえることより、自分の達成感や満足を優先しがちだ", reverse: true },
];

const types = ["宴会型", "教祖型", "勝負型", "知識型", "色気型", "柔和型"];
const STORAGE_KEY = "moodmaker-survey-v1";
const NARRATIVE_MAX = 4000;
let latestResult = null;

const RESUME_KEYWORDS = {
  宴会型: ["イベント", "懇親会", "チームビルディング", "コミュニケーション", "ファシリテーション", "司会", "幹事", "盛り上げ", "交流", "親睦"],
  教祖型: ["ビジョン", "戦略", "理念", "マネジメント", "リーダー", "組織", "変革", "方針", "文化", "経営"],
  勝負型: ["営業", "目標達成", "KPI", "成果", "売上", "受注", "優勝", "達成率", "トップ", "1位"],
  知識型: ["研究", "分析", "データ", "資格", "開発", "設計", "専門", "学習", "取得", "論文"],
  色気型: ["デザイン", "ブランド", "クリエイティブ", "編集", "PR", "広報", "SNS", "プレゼン", "演出", "企画"],
  柔和型: ["サポート", "カスタマー", "調整", "相談", "支援", "コーチ", "メンター", "傾聴", "ケア", "フォロー"]
};

function readNarrative() {
  return {
    storyType: document.getElementById("narrativeStoryType").value,
    storyEpisode: document.getElementById("narrativeStoryEpisode").value.trim(),
    originText: document.getElementById("narrativeOrigin").value.trim(),
    weaknessPattern: document.getElementById("narrativeWeaknessPattern").value,
    achievementCase: document.getElementById("narrativeAchievementCase").value.trim(),
    missionTemplate: document.getElementById("narrativeMissionTemplate").value,
    missionNote: document.getElementById("narrativeMissionNote").value.trim()
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

  let story;
  if (nar.storyType && storyTypeMap[nar.storyType]) {
    story = `【${nar.storyType}】${storyTypeMap[nar.storyType]}タイプ。`;
    if (nar.storyEpisode) story += nar.storyEpisode;
  } else if (nar.storyEpisode) {
    story = nar.storyEpisode;
  } else {
    story = `${primaryType}としての強みは、一朝一夕ではなく経験の積み重ねの中で育まれてきた。`;
  }

  let background;
  if (nar.originText) {
    background = `${primaryType}としての原体験：「${nar.originText}」。この体験がムードメイクの土台となっている。`;
  } else {
    background = `${primaryType}の特性を活かした経験の積み重ねが、現在のムードメイク力の基盤となっている。`;
  }

  const weakness = weaknessMap[nar.weaknessPattern]
    || `場の文脈が見えにくいと力を出しにくいことがある。目的と役割の明確化で安定する。`;

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

function renderQuestionHtml(q, num) {
  return `
  <div class="q-item" role="group" aria-labelledby="${q.id}_legend">
    <p class="q-title" id="${q.id}_legend">${num}. ${q.text}</p>
    <div class="q-radios">
      ${[
        [1, "よくあてはまる"],
        [2, "ややあてはまる"],
        [3, "どちらともいえない"],
        [4, "あまりあてはまらない"],
        [5, "あてはまらない"]
      ]
        .map(
          ([n, lbl]) => `
        <div class="q-radio-col">
          <span class="q-scale-label">${lbl}</span>
          <label class="q-radio-label">
            <input type="radio" name="${q.id}" id="${q.id}_${n}" value="${n}" />
            <span class="q-radio-num">${n}</span>
          </label>
        </div>`
        )
        .join("")}
    </div>
  </div>`;
}

function renderQuestions() {
  document.getElementById("omoteNashiQuestions").innerHTML =
    omoteNashiQuestions.map((q, i) => renderQuestionHtml(q, i + 1)).join("");
  document.getElementById("questions").innerHTML =
    questions.map((q, i) => renderQuestionHtml(q, i + 1)).join("");
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
    if (data._v !== 2) return;
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

function calcScores() {
  const score = Object.fromEntries(types.map((t) => [t, { total: 0, count: 0 }]));

  for (const q of questions) {
    const v = Number(getQuestionAnswer(q.id));
    if (!v) throw new Error("未回答の質問があります");
    const adjusted = q.reverse ? v : 6 - v;
    score[q.type].total += adjusted;
    score[q.type].count += 1;
  }

  const normalized = {};
  for (const t of types) {
    const avg = score[t].count ? score[t].total / score[t].count : 0;
    normalized[t] = Math.round((avg / 5) * 100);
  }

  let omTotal = 0;
  for (const q of omoteNashiQuestions) {
    const v = Number(getQuestionAnswer(q.id));
    if (!v) throw new Error("未回答の質問があります");
    const adjusted = q.reverse ? v : 6 - v;
    omTotal += adjusted;
  }
  const omoteNashiScore = Math.round((omTotal / omoteNashiQuestions.length / 5) * 100);

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

function renderResult(scores, omoteNashiScore) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primary, secondary] = sorted;
  const matrix = computeOrgMatrixFromScores(scores, readOrgPrefs());
  const fit = { fitScore: matrix.fitScore, fitLabel: matrix.fitLabel };

  renderOmoteNashiBanner(omoteNashiScore);

  const titleEl = document.getElementById("reportTitle");
  if (titleEl) titleEl.textContent = `（${primary[0]}ムードメイカー）`;

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
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("service").classList.remove("hidden");
  document.getElementById("pdfBtnWrap").classList.remove("hidden");
  document.getElementById("jsonBtn").classList.remove("hidden");
  drawRadar(scores);
  drawTrendChart(scores);

  latestResult = buildResultPayload(scores, primary, secondary, fit, matrix, omoteNashiScore);
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

function drawRadar(scores) {
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = 90;
  const steps = 5;
  const angleStep = (Math.PI * 2) / types.length;

  ctx.strokeStyle = "#e5e7eb";
  for (let s = 1; s <= steps; s++) {
    const r = (radius / steps) * s;
    ctx.beginPath();
    for (let i = 0; i < types.length; i++) {
      const a = -Math.PI / 2 + i * angleStep;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.strokeStyle = "#cbd5e1";
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px sans-serif";
  for (let i = 0; i < types.length; i++) {
    const a = -Math.PI / 2 + i * angleStep;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
    const lx = cx + Math.cos(a) * (radius + 18);
    const ly = cy + Math.sin(a) * (radius + 18);
    ctx.fillText(types[i], lx - 14, ly + 4);
  }

  ctx.beginPath();
  for (let i = 0; i < types.length; i++) {
    const a = -Math.PI / 2 + i * angleStep;
    const r = (Math.max(0, Math.min(100, scores[types[i]])) / 100) * radius;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(183,40,46,0.25)";
  ctx.strokeStyle = "#b7282e";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#374151";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("おもてなし", cx, cy);
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
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error();
        } catch {
          throw new Error(`URLは http(s) で始まるURLを入力してください（${id}）`);
        }
      }
    }
    const nar = readNarrative();
    const narrTextFields = ["storyEpisode", "originText", "achievementCase", "missionNote"];
    for (const k of narrTextFields) {
      const v = nar[k] || "";
      if (v.length > NARRATIVE_MAX) throw new Error(`入力が長すぎます（${NARRATIVE_MAX}文字以内）`);
    }
    const { typeScores, omoteNashiScore } = calcScores();
    renderResult(typeScores, omoteNashiScore);
    saveFormState();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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

renderQuestions();
loadFormState();
document.addEventListener("change", saveFormState);
const mainEl = document.querySelector("main");
if (mainEl) mainEl.addEventListener("input", saveFormState);

document.getElementById("contactBtn").addEventListener("click", () => {
  const subj = encodeURIComponent("ムードメーカーサーベイ｜問い合わせ");
  const name = document.getElementById("name").value.trim() || "（未入力）";
  const body = encodeURIComponent(`氏名: ${name}\n\n（診断結果はJSON保存でシェアできます）\n`);
  window.location.href = `mailto:info@singerly.co.jp?subject=${subj}&body=${body}`;
});

document.getElementById("saveReportBtn").addEventListener("click", () => {
  if (latestResult) {
    downloadJson(`${latestResult.profile.name || "moodmaker"}_result.json`, latestResult);
  } else {
    alert("先に「分析する」を実行してください");
  }
});
