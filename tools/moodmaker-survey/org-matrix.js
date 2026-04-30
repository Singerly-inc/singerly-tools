/**
 * 組織適合マトリクス v2
 * ムードメーカー6属性スコア × 自己申告 → 適合スコアリング
 *
 * ベクトル順: [宴会型, 教祖型, 勝負型, 知識型, 色気型, 柔和型]
 *
 * 改善点（v2）:
 *  1. 各次元ベクトルの値を再チューニング（属性ごとの特性をより鮮明に）
 *  2. 自己申告ブレンドを「好みボーナス」から「整合性チェック」に変更
 *  3. plotPct を絶対スケール（最高スコアを100基準）で表示し、フロア20%
 *  4. ポジション別ボーナスをスコアに組み込む
 *  5. fitScore の計算をプロファイル一致度ではなく予測適合度ベースに変更
 */
(function (global) {
  // ── ヘルパー ──
  const V = (a, b, c, d, e, f) => [a, b, c, d, e, f];
  const TYPE_ORDER = ["宴会型", "教祖型", "勝負型", "知識型", "色気型", "柔和型"];

  // ── 組織規模 ──
  const ORG_SIZES = [
    {
      id: "SIZE_S", label: "小規模（〜10名）",
      desc: "全員が顔見知り、社長直轄。スピードと人間関係が鍵。",
      // 宴:高（顔見知り力が最大活用） 教:低（ビジョン語る規模でない） 勝:中（競争相手が少ない）
      // 知:低（専門性より汎用性） 色:高（1対1関係が命） 柔:高（全員をケア）
      vec: V(0.92, 0.28, 0.45, 0.22, 0.78, 0.88)
    },
    {
      id: "SIZE_SM", label: "小中規模（11〜49名）",
      desc: "マネジメント層が生まれる過渡期。文化の設計が重要。",
      vec: V(0.75, 0.48, 0.62, 0.40, 0.65, 0.72)
    },
    {
      id: "SIZE_M", label: "中堅規模（50〜299名）",
      desc: "部門間の壁が生まれ、専門性と調整力が同時に求められる。",
      vec: V(0.52, 0.62, 0.68, 0.72, 0.42, 0.55)
    },
    {
      id: "SIZE_L", label: "大規模（300〜999名）",
      desc: "制度・ルールが整い、組織の安定と変革の両立が求められる。",
      vec: V(0.35, 0.78, 0.58, 0.82, 0.30, 0.45)
    },
    {
      id: "SIZE_XL", label: "巨大規模（1,000名〜）",
      desc: "影響力の波及に時間がかかる。大局観と持続力が重要。",
      vec: V(0.22, 0.88, 0.62, 0.78, 0.25, 0.38)
    }
  ];

  // ── 創業ステージ ──
  const FOUNDING_STAGES = [
    {
      id: "AGE_0_5", label: "創業期（〜5年）",
      desc: "ルール不在・変化激しい。エネルギーと突破力が最優先。",
      // 宴:高（雰囲気作りが生存戦略） 教:中（ビジョンは必要） 勝:最高（生き残り競争）
      // 知:低（動きの速さ優先） 色:中（個の魅力で採用・営業） 柔:低（競争>調和）
      vec: V(0.82, 0.52, 0.95, 0.30, 0.65, 0.28)
    },
    {
      id: "AGE_6_20", label: "成長・拡大期（6〜20年）",
      desc: "組織の型ができ始める。文化を意図的に設計する時期。",
      vec: V(0.68, 0.75, 0.72, 0.55, 0.52, 0.45)
    },
    {
      id: "AGE_21_50", label: "成熟期（21〜50年）",
      desc: "安定と保守化の分岐点。変革か維持かの判断が重要。",
      vec: V(0.45, 0.65, 0.52, 0.82, 0.38, 0.62)
    },
    {
      id: "AGE_51_100", label: "老舗（準）（51〜100年）",
      desc: "地位は確立。硬直化を防ぐ「内側からの革新力」が鍵。",
      vec: V(0.38, 0.55, 0.40, 0.72, 0.48, 0.82)
    },
    {
      id: "AGE_101P", label: "創業100年超",
      desc: "理念・伝統の継承と変革の共存。長期的信頼関係が強み。",
      vec: V(0.30, 0.82, 0.32, 0.68, 0.55, 0.90)
    }
  ];

  // ── 業界 ──
  const INDUSTRIES = [
    {
      id: "IND_01", name: "メーカー/製造業",
      examples: "食品、化学、機械、電気、自動車、精密など",
      // 知識型・勝負型が強い専門+目標達成産業
      vec: V(0.32, 0.38, 0.82, 0.90, 0.20, 0.48)
    },
    {
      id: "IND_02", name: "商社・卸売",
      examples: "総合商社、専門商社、卸売",
      // 勝負型が圧倒的に強い（目標数字・競争）
      vec: V(0.55, 0.40, 0.95, 0.55, 0.32, 0.35)
    },
    {
      id: "IND_03", name: "小売・流通",
      examples: "百貨店、スーパー、コンビニ、専門店、EC",
      // 宴会型・色気型（接客・場の演出）
      vec: V(0.85, 0.28, 0.52, 0.42, 0.82, 0.50)
    },
    {
      id: "IND_04", name: "金融・保険・証券",
      examples: "銀行、証券、カード、保険",
      // 勝負型（数字・目標）+ 知識型（複雑な商品知識）
      vec: V(0.38, 0.50, 0.88, 0.78, 0.30, 0.42)
    },
    {
      id: "IND_05", name: "建設・不動産",
      examples: "建設、住宅、リフォーム、不動産仲介",
      // 勝負型（営業）+ 柔和型（現場人間関係）
      vec: V(0.45, 0.38, 0.75, 0.52, 0.35, 0.62)
    },
    {
      id: "IND_06", name: "情報通信・IT・ソフト",
      examples: "ソフト、ネット、通信、SaaS",
      // 知識型（専門性）+ 教祖型（理念・プロダクトビジョン）
      vec: V(0.50, 0.72, 0.65, 0.92, 0.55, 0.40)
    },
    {
      id: "IND_07", name: "マスコミ・広告・出版",
      examples: "放送、新聞、出版、広告、イベント",
      // 宴会型（場の演出）+ 色気型（センス・表現力）
      vec: V(0.88, 0.50, 0.48, 0.50, 0.92, 0.40)
    },
    {
      id: "IND_08", name: "サービス・レジャー",
      examples: "飲食、宿泊、旅行、エンタメ、美容",
      // 宴会型・色気型・柔和型の三つどもえ
      vec: V(0.90, 0.32, 0.40, 0.35, 0.78, 0.72)
    },
    {
      id: "IND_09", name: "医療・介護・福祉",
      examples: "病院、診療所、介護サービス、社会福祉",
      // 柔和型最強（受容・安心感）+ 知識型（専門）
      vec: V(0.38, 0.35, 0.32, 0.72, 0.28, 0.95)
    },
    {
      id: "IND_10", name: "教育・コンサル・専門職",
      examples: "人材、学校、専門コンサル、士業",
      // 知識型・教祖型（影響力・専門性）
      vec: V(0.50, 0.80, 0.50, 0.90, 0.40, 0.68)
    },
    {
      id: "IND_11", name: "物流・運輸・インフラ",
      examples: "鉄道、航空、海運、運送、電力、ガス",
      // 勝負型（効率・目標）+ 知識型（安全・専門性）
      vec: V(0.40, 0.45, 0.75, 0.75, 0.25, 0.60)
    },
    {
      id: "IND_12", name: "官公庁・公社・団体",
      examples: "公務員、非営利団体、各種法人",
      // 柔和型（調和・安定）+ 教祖型（理念・使命）
      vec: V(0.28, 0.68, 0.28, 0.65, 0.22, 0.85)
    }
  ];

  // ── ポジション別ブースト係数（各属性への重みスケール） ──
  // 値>1: そのポジションでその属性の貢献度が上がる
  const POSITION_BOOST = {
    individual: [1.0, 0.7, 1.1, 1.1, 1.2, 0.8], // 個人: 色気型・知識型・勝負型
    leader:     [1.2, 0.9, 1.0, 0.9, 0.9, 1.1],  // リーダー: 宴会型・柔和型
    manager:    [0.9, 1.1, 0.8, 1.0, 0.7, 1.2],  // マネージャー: 教祖型・柔和型
    exec:       [0.7, 1.3, 1.1, 1.0, 0.8, 0.8],  // 経営: 教祖型・勝負型
  };

  // ── 内積 ──
  function dot(u, v) {
    let s = 0;
    for (let i = 0; i < u.length; i++) s += u[i] * v[i];
    return s;
  }

  // スコア(0-100) → 0-1ベクトル（ポジションブースト適用済み）
  function userVector(scores, position) {
    const boost = POSITION_BOOST[position] || POSITION_BOOST.individual;
    return TYPE_ORDER.map((t, i) => {
      const raw = Math.max(0, Math.min(100, Number(scores[t]) || 0)) / 100;
      return Math.min(1.0, raw * boost[i]);
    });
  }

  /**
   * カテゴリ内アイテムをスコアリングしてソート
   * @param {object} scores  - 属性スコア（0-100）
   * @param {string} position - ポジション
   * @param {Array}  items   - 対象次元アイテム配列
   * @param {string} preferredId - 自己申告ID（任意）
   */
  function rankByProfile(scores, position, items, preferredId) {
    const u = userVector(scores, position);
    const rated = items.map((it) => {
      // 基本: コサイン類似度（u・v / |u||v|）
      const uMag = Math.sqrt(u.reduce((s, x) => s + x * x, 0)) || 1e-9;
      const vMag = Math.sqrt(it.vec.reduce((s, x) => s + x * x, 0)) || 1e-9;
      const cosim = dot(u, it.vec) / (uMag * vMag); // 0〜1

      // 絶対的な適合度（dot積）も加味（50:50ブレンド）
      const dotNorm = dot(u, it.vec) / (it.vec.reduce((s, v) => s + v, 0) || 1);
      let raw = cosim * 0.5 + dotNorm * 0.5;

      // 自己申告一致ボーナス（最大+0.15）
      if (preferredId && it.id === preferredId) {
        raw = Math.min(1.0, raw + 0.15);
      }
      return { ...it, raw };
    });

    const maxRaw = Math.max(...rated.map(r => r.raw), 1e-9);
    return rated
      .map(r => ({
        ...r,
        // フロア20%で最高値を100とする絶対スケール
        plotPct: Math.max(20, Math.round((r.raw / maxRaw) * 100))
      }))
      .sort((a, b) => b.raw - a.raw);
  }

  /**
   * 全体の適合スコア（0-100）を算出
   * - 上位推奨と自己申告の一致度ではなく、属性プロファイルのピーク度合いで決定
   */
  function calcFitScore(scores, rankedSizes, rankedFounding, rankedIndustries, selfReport) {
    const sr = selfReport || {};
    // 上位推奨の絶対スコア平均
    const topAvg = (rankedSizes[0].raw + rankedFounding[0].raw + rankedIndustries[0].raw) / 3;
    // ベースfitScore: 上位推奨の確からしさ（スコア差が大きいほど高精度）
    const s2nd = (rankedSizes[1].raw + rankedFounding[1].raw + rankedIndustries[1].raw) / 3;
    const clarity = Math.min(1.0, (topAvg - s2nd) * 5 + 0.5); // 差が大きいほど明確
    let base = Math.round(topAvg * 80 + clarity * 20);

    // 自己申告がある場合: 一致度でボーナス/ペナルティ
    if (sr.preferredSize || sr.preferredFounding || sr.preferredIndustry) {
      let matchSum = 0, total = 0;
      if (sr.preferredSize) {
        const rank = rankedSizes.findIndex(s => s.id === sr.preferredSize);
        matchSum += rank === 0 ? 1.0 : rank === 1 ? 0.7 : rank === 2 ? 0.4 : 0.0;
        total++;
      }
      if (sr.preferredFounding) {
        const rank = rankedFounding.findIndex(f => f.id === sr.preferredFounding);
        matchSum += rank === 0 ? 1.0 : rank === 1 ? 0.7 : rank === 2 ? 0.4 : 0.0;
        total++;
      }
      if (sr.preferredIndustry) {
        const rank = rankedIndustries.findIndex(i => i.id === sr.preferredIndustry);
        matchSum += rank === 0 ? 1.0 : rank <= 2 ? 0.6 : rank <= 4 ? 0.3 : 0.0;
        total++;
      }
      const matchRate = total > 0 ? matchSum / total : 0.5;
      // 一致度が高いほど+最大15pt、低いと-10pt
      base = Math.round(base + (matchRate - 0.5) * 30);
    }

    return Math.min(98, Math.max(20, base));
  }

  function computeOrgMatrix(scores, _typeOrder, selfReport) {
    const sr = selfReport || {};
    const pos = sr.position || "individual";

    const rankedSizes      = rankByProfile(scores, pos, ORG_SIZES,       sr.preferredSize);
    const rankedFounding   = rankByProfile(scores, pos, FOUNDING_STAGES, sr.preferredFounding);
    const rankedIndustries = rankByProfile(scores, pos, INDUSTRIES,      sr.preferredIndustry);

    const fitScore = calcFitScore(scores, rankedSizes, rankedFounding, rankedIndustries, sr);
    const fitLabel = fitScore >= 78 ? "合う" : fitScore >= 58 ? "注意しながら合う" : "工夫が必要";

    const s0 = rankedSizes[0];
    const f0 = rankedFounding[0];
    const i0 = rankedIndustries[0];

    // ── サマリー生成 ──
    // 主属性（最高スコア）に基づくコメント
    const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [primaryType] = sortedTypes[0] || ["宴会型"];

    const typeInsight = {
      "宴会型": `あなたの場を温め人を巻き込む力は、フラットで人間関係が濃い環境で最大化します。`,
      "教祖型": `理念で動かす力は、ビジョンを組織全体に浸透させる規模・ステージほど活きます。`,
      "勝負型": `成果・数字で動く力は、目標が明確で結果が評価される競争環境で輝きます。`,
      "知識型": `構造と論理で場を整える力は、複雑な意思決定が求められる専門集団で最も発揮されます。`,
      "色気型": `一対一の信頼構築力は、少人数・顧客接点が多い環境でその真価を示します。`,
      "柔和型": `受容と安定を生み出す力は、長期的な信頼関係が組織の生命線になる環境に最適です。`,
    };

    let summary = `${typeInsight[primaryType] || ""}属性分析では、組織規模「${s0.label}」・創業ステージ「${f0.label}」・業界「${i0.name}」との適合が最も高く推定されます。`;

    // 自己申告との乖離コメント
    const mismatches = [];
    if (sr.preferredSize && rankedSizes.findIndex(s => s.id === sr.preferredSize) > 1) {
      const pref = ORG_SIZES.find(s => s.id === sr.preferredSize);
      if (pref) mismatches.push(`規模「${pref.label}」はプロファイルと乖離気味`);
    }
    if (sr.preferredFounding && rankedFounding.findIndex(f => f.id === sr.preferredFounding) > 1) {
      const pref = FOUNDING_STAGES.find(f => f.id === sr.preferredFounding);
      if (pref) mismatches.push(`ステージ「${pref.label}」は適応に工夫が必要`);
    }
    if (sr.preferredIndustry && rankedIndustries.findIndex(i => i.id === sr.preferredIndustry) > 2) {
      const pref = INDUSTRIES.find(i => i.id === sr.preferredIndustry);
      if (pref) mismatches.push(`業界「${pref.name}」は強みが活きにくい傾向`);
    }
    if (mismatches.length > 0) {
      summary += `　注意点：${mismatches.join("、")}。`;
    } else if (sr.preferredSize || sr.preferredFounding || sr.preferredIndustry) {
      summary += `　ご希望と属性プロファイルの方向性が一致しており、強みが活かしやすい環境です。`;
    }

    // ポジション別コメント
    const posNote = {
      individual: "個人プレイヤーとして裁量を持って動ける環境が強みを引き出します。",
      leader:     "チームの雰囲気を主導できるリーダーポジションで最大の影響力を発揮できます。",
      manager:    "マネージャーとして組織の空気を設計できる立場での活躍が向いています。",
      exec:       "経営層として組織文化そのものをムードメイクする役割で最も力を発揮できます。",
    };
    if (sr.position && posNote[sr.position]) {
      summary += `　${posNote[sr.position]}`;
    }

    const secondary = `次点候補: 規模「${rankedSizes[1].label}」／ステージ「${rankedFounding[1].label}」／業界「${rankedIndustries[1].name}」。`;

    return {
      rankedSizes,
      rankedFounding,
      rankedIndustries,
      fitScore,
      fitLabel,
      summary,
      secondary,
      topCombo: { sizeId: s0.id, foundingId: f0.id, industryId: i0.id }
    };
  }

  global.OrgMatrix = { computeOrgMatrix, ORG_SIZES, FOUNDING_STAGES, INDUSTRIES };
})(typeof window !== "undefined" ? window : globalThis);
