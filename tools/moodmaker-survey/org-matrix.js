/**
 * 組織適合マトリクス: ムードメーカー6類型スコアから
 * 「組織規模 × 創業ステージ × 業界」の適合をドット積でプロット用スコア化
 * ベクトル順: [宴会型, 教祖型, 勝負型, 知識型, 色気型, 柔和型]
 */
(function (global) {
  const V = (a, b, c, d, e, f) => [a, b, c, d, e, f];

  const ORG_SIZES = [
    {
      id: "SIZE_S",
      label: "小規模（〜10名）",
      desc: "全員が顔見知り、社長の直轄。",
      vec: V(0.9, 0.45, 0.35, 0.22, 0.42, 0.82)
    },
    {
      id: "SIZE_SM",
      label: "小中規模（11〜49名）",
      desc: "マネジメント層が必要になる過渡期。",
      vec: V(0.68, 0.52, 0.48, 0.42, 0.42, 0.62)
    },
    {
      id: "SIZE_M",
      label: "中堅規模（50〜299名）",
      desc: "部門間の壁ができ始める。産業医選任などの節目。",
      vec: V(0.48, 0.55, 0.55, 0.68, 0.38, 0.52)
    },
    {
      id: "SIZE_L",
      label: "大規模（301〜999名）",
      desc: "制度が整い、組織が安定。",
      vec: V(0.42, 0.65, 0.58, 0.78, 0.32, 0.42)
    },
    {
      id: "SIZE_XL",
      label: "巨大規模（1,000名〜）",
      desc: "グループ会社や拠点が分散。",
      vec: V(0.35, 0.82, 0.65, 0.76, 0.48, 0.38)
    }
  ];

  const FOUNDING_STAGES = [
    {
      id: "AGE_0_5",
      label: "創業期（〜5年）",
      desc: "ルールがなく、変化が激しい。スピード重視。",
      vec: V(0.78, 0.48, 0.88, 0.32, 0.68, 0.32)
    },
    {
      id: "AGE_6_20",
      label: "成長・拡大期（6〜20年）",
      desc: "組織の型ができ始める時期。制度化の推進。",
      vec: V(0.62, 0.72, 0.68, 0.58, 0.48, 0.45)
    },
    {
      id: "AGE_21_50",
      label: "成熟期（21〜50年）",
      desc: "安定。保守化か変革（第二創業）かの分岐点。",
      vec: V(0.48, 0.58, 0.58, 0.78, 0.38, 0.55)
    },
    {
      id: "AGE_51_100",
      label: "老舗（準）（51〜100年）",
      desc: "地域や業界での地位が確立。硬直化に注意。",
      vec: V(0.42, 0.52, 0.42, 0.62, 0.52, 0.78)
    },
    {
      id: "AGE_101P",
      label: "創業100年超（101年以上）",
      desc: "独自の理念、長期的視点、伝統と革新の共存。",
      vec: V(0.38, 0.78, 0.38, 0.68, 0.58, 0.82)
    }
  ];

  const INDUSTRIES = [
    {
      id: "IND_01",
      name: "メーカー/製造業",
      examples: "食品、化学、薬品、機械、電気、自動車、精密など",
      vec: V(0.38, 0.38, 0.78, 0.88, 0.22, 0.48)
    },
    {
      id: "IND_02",
      name: "商社・卸売",
      examples: "総合商社、専門商社、卸売",
      vec: V(0.52, 0.42, 0.92, 0.55, 0.32, 0.38)
    },
    {
      id: "IND_03",
      name: "小売・流通",
      examples: "百貨店、スーパー、コンビニ、専門店、EC",
      vec: V(0.82, 0.32, 0.52, 0.42, 0.78, 0.48)
    },
    {
      id: "IND_04",
      name: "金融・保険・証券",
      examples: "銀行、証券、カード、保険、リース",
      vec: V(0.42, 0.52, 0.88, 0.72, 0.32, 0.42)
    },
    {
      id: "IND_05",
      name: "建設・不動産",
      examples: "建設、住宅、リフォーム、不動産仲介・管理",
      vec: V(0.48, 0.42, 0.72, 0.52, 0.35, 0.58)
    },
    {
      id: "IND_06",
      name: "情報通信・IT・ソフト",
      examples: "ソフト、ネット、通信、各種システム",
      vec: V(0.52, 0.68, 0.62, 0.88, 0.55, 0.42)
    },
    {
      id: "IND_07",
      name: "マスコミ・広告・出版",
      examples: "放送、新聞、出版、広告、イベント",
      vec: V(0.88, 0.52, 0.48, 0.48, 0.88, 0.42)
    },
    {
      id: "IND_08",
      name: "サービス・レジャー",
      examples: "飲食、宿泊、旅行、エンタメ、美容、冠婚葬祭",
      vec: V(0.88, 0.38, 0.42, 0.38, 0.72, 0.68)
    },
    {
      id: "IND_09",
      name: "医療・介護・福祉",
      examples: "病院、診療所、介護サービス、社会福祉",
      vec: V(0.42, 0.38, 0.38, 0.68, 0.28, 0.92)
    },
    {
      id: "IND_10",
      name: "教育・コンサル・専門職",
      examples: "人材、学校、塾、専門コンサル、士業",
      vec: V(0.52, 0.75, 0.52, 0.88, 0.42, 0.68)
    },
    {
      id: "IND_11",
      name: "物流・運輸・インフラ",
      examples: "鉄道、航空、海運、運送、電力、ガスなど",
      vec: V(0.42, 0.48, 0.72, 0.72, 0.28, 0.58)
    },
    {
      id: "IND_12",
      name: "官公庁・公社・団体",
      examples: "公務員、非営利団体、各種法人",
      vec: V(0.32, 0.62, 0.32, 0.62, 0.25, 0.78)
    }
  ];

  function dot(u, v) {
    let s = 0;
    for (let i = 0; i < u.length; i++) s += u[i] * v[i];
    return s;
  }

  function userVector(scores, typeOrder) {
    return typeOrder.map((t) => Math.max(0, Math.min(1, (Number(scores[t]) || 0) / 100)));
  }

  function rankByProfile(scores, typeOrder, items, preferredId) {
    const u = userVector(scores, typeOrder);
    const ranked = items.map((it) => {
      let raw = dot(u, it.vec);
      if (preferredId && it.id === preferredId) {
        raw = raw * 0.6 + 1.0 * 0.4;
      }
      return { ...it, raw };
    });
    const raws = ranked.map((r) => r.raw);
    const maxR = Math.max(...raws);
    const minR = Math.min(...raws);
    const span = maxR - minR || 1e-6;
    return ranked
      .map((r) => ({
        ...r,
        plotPct: Math.round(((r.raw - minR) / span) * 100)
      }))
      .sort((a, b) => b.raw - a.raw);
  }

  function computeOrgMatrix(scores, typeOrder, selfReport) {
    const order = typeOrder || ["宴会型", "教祖型", "勝負型", "知識型", "色気型", "柔和型"];
    const sr = selfReport || {};

    const rankedSizes = rankByProfile(scores, order, ORG_SIZES, sr.preferredSize);
    const rankedFounding = rankByProfile(scores, order, FOUNDING_STAGES, sr.preferredFounding);
    const rankedIndustries = rankByProfile(scores, order, INDUSTRIES, sr.preferredIndustry);

    const hasPrefs = sr.preferredSize || sr.preferredFounding || sr.preferredIndustry;
    let fitScore;
    if (hasPrefs) {
      let matchPoints = 0;
      let totalPoints = 0;
      if (sr.preferredSize) {
        totalPoints += 33;
        const rank = rankedSizes.findIndex((s) => s.id === sr.preferredSize);
        if (rank === 0) matchPoints += 33;
        else if (rank === 1) matchPoints += 22;
        else if (rank === 2) matchPoints += 11;
      }
      if (sr.preferredFounding) {
        totalPoints += 33;
        const rank = rankedFounding.findIndex((f) => f.id === sr.preferredFounding);
        if (rank === 0) matchPoints += 33;
        else if (rank === 1) matchPoints += 22;
        else if (rank === 2) matchPoints += 11;
      }
      if (sr.preferredIndustry) {
        totalPoints += 34;
        const rank = rankedIndustries.findIndex((i) => i.id === sr.preferredIndustry);
        if (rank === 0) matchPoints += 34;
        else if (rank <= 2) matchPoints += 22;
        else if (rank <= 4) matchPoints += 11;
      }
      fitScore = totalPoints > 0 ? Math.round(matchPoints * (100 / totalPoints)) : 70;
    } else {
      const avgRaw = (rankedSizes[0].raw + rankedFounding[0].raw + rankedIndustries[0].raw) / 3;
      fitScore = Math.min(95, Math.round(avgRaw * 130));
    }

    const fitLabel =
      fitScore >= 75 ? "合う" : fitScore >= 55 ? "注意しながら合う" : "工夫が必要";

    const s0 = rankedSizes[0];
    const f0 = rankedFounding[0];
    const i0 = rankedIndustries[0];

    let summary = `あなたのプロファイルでは、組織規模「${s0.label}」、創業ステージ「${f0.label}」、業界「${i0.name}」との相対的な適合が最も高く見込まれます（属性区分マトリクスによる推奨）。`;

    if (hasPrefs) {
      const mismatches = [];
      if (sr.preferredSize && rankedSizes.findIndex((s) => s.id === sr.preferredSize) > 1) {
        const pref = ORG_SIZES.find((s) => s.id === sr.preferredSize);
        if (pref) mismatches.push(`規模（希望：${pref.label}）`);
      }
      if (sr.preferredFounding && rankedFounding.findIndex((f) => f.id === sr.preferredFounding) > 1) {
        const pref = FOUNDING_STAGES.find((f) => f.id === sr.preferredFounding);
        if (pref) mismatches.push(`創業ステージ（希望：${pref.label}）`);
      }
      if (sr.preferredIndustry && rankedIndustries.findIndex((i) => i.id === sr.preferredIndustry) > 2) {
        const pref = INDUSTRIES.find((i) => i.id === sr.preferredIndustry);
        if (pref) mismatches.push(`業界（希望：${pref.name}）`);
      }
      if (mismatches.length > 0) {
        summary += `　なお、${mismatches.join("、")}は属性プロファイルとの乖離が見られます。活躍には意識的な環境への適応が鍵になりそうです。`;
      } else {
        summary += `　ご自身の希望と属性プロファイルの方向性が一致しています。`;
      }
    }

    const positionNote = {
      individual: "個人プレイヤーとして動きやすい、裁量の大きい環境が強みを引き出します。",
      leader: "チームリーダーとしての影響力が活きる、中規模〜大規模組織での活躍が期待できます。",
      manager: "マネージャーとして、チームの雰囲気を設計できる立場での活躍が向いています。",
      exec: "経営層として、組織文化そのものをムードメイクする役割が最も力を発揮できます。"
    };
    if (sr.position && positionNote[sr.position]) {
      summary += `　${positionNote[sr.position]}`;
    }

    const secondary = `次点: 規模「${rankedSizes[1].label}」／ステージ「${rankedFounding[1].label}」／業界「${rankedIndustries[1].name}」も検討価値があります。`;

    return {
      rankedSizes,
      rankedFounding,
      rankedIndustries,
      fitScore,
      fitLabel,
      summary,
      secondary,
      topCombo: {
        sizeId: s0.id,
        foundingId: f0.id,
        industryId: i0.id
      }
    };
  }

  global.OrgMatrix = {
    computeOrgMatrix,
    ORG_SIZES,
    FOUNDING_STAGES,
    INDUSTRIES
  };
})(typeof window !== "undefined" ? window : globalThis);
