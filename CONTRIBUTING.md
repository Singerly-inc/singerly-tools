# 開発ガイド — ムドメわっしょい！

## 環境構築

```bash
git clone https://github.com/Singerly-inc/singerly-tools.git
cd singerly-tools
```

サーバー不要。ブラウザで直接 `index.html` を開くか、簡易サーバーを起動：

```bash
npx serve .
# → http://localhost:3000
```

## ブランチ運用

```
main          ← 本番（Vercel自動デプロイ）
feature/xxx   ← 新ツール・機能開発
fix/xxx       ← バグ修正
```

**mainへの直pushは禁止。** 必ずPRを出してレビューを受けること。

## 新ツールの追加手順

### 1. ツールフォルダを作成

```
tools/your-tool-name/
  index.html    ← ツール本体
```

### 2. ナビヘッダーをコピー

`tools/safety-check/index.html` の `.nav` と `.page-header` を流用してください。

```html
<nav class="nav">
  <a href="../../index.html" class="nav-back">← ムドメわっしょい！</a>
  <span class="nav-brand">by Singerly</span>
</nav>
<div class="page-header">
  <span class="tool-badge">カテゴリ名</span>
  <h1 class="page-title">ツール名</h1>
  <p class="page-sub">キャッチコピー</p>
</div>
```

### 3. index.html にカードを追加

`index.html` の `TOOLS` 配列に1行追加：

```js
{ id:'your-tool-id', icon:'🎯', name:'ツール名', catch:'キャッチコピー',
  cat:'カテゴリ', theory:'根拠理論', status:'active', path:'tools/your-tool-name/index.html' },
```

カテゴリ一覧: `icebreaker` / `team` / `mission` / `safety` / `motivation` / `discussion` / `survey`

### 4. PRを出す

- ブランチ名: `feature/your-tool-name`
- PRテンプレートに従って記入
- スマホ表示も確認すること

## デザインルール

| 要素 | 値 |
|------|-----|
| メインレッド | `#B7282E` |
| メインブルー | `#0089C5` |
| 背景 | `#fff` / `#f8fafc` |
| ヘッダー背景 | `#000000` |
| フォント | DM Sans, Hiragino Sans |

## Vercelデプロイ

`main` ブランチへのmergeで自動デプロイ。  
プレビューURLはPRごとに自動生成されます。
