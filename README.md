# SUNCS Website

Astro + TypeScript による静的サイト。デプロイ先は Cloudflare Pages。

コンテンツの参照元は `../01_company_info/business-definition.md`。
数値・サービス名・価格は必ずそこから引く。記載ルール（実績3点セット、注釈、使用禁止の統計）も同ドキュメントに従う。

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # 型チェック（astro check）
npm run build    # check + 静的ビルド → dist/
npm run preview  # ビルド結果のローカル確認
```

Node は `.node-version`（24.19.0）に従う。このマシンでは公式配布物を `~/.local/node` に展開し、
`~/.zshrc` で PATH を通してある。

## Cloudflare Pages 設定

| 項目 | 値 |
|---|---|
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `.node-version` を自動参照（既定は 22.16.0） |

SSR は使わないため `@astrojs/cloudflare` アダプタは導入しない。`dist/` をそのまま配信する。

## コンテンツと素材の置き場所

| 種類 | 置き場所 | 備考 |
|---|---|---|
| お知らせ | `src/content/news/` | 記事の書き方は `src/content/README.md` |
| メディア記事・資料 | `src/content/media/` | 同上 |
| 事例本文 | `src/content/cases/*.md` | ファイル名がURL。`draft: false` で公開 |
| クライアントロゴ | `src/assets/clients/` | 置いたあと `src/consts.ts` の `CLIENTS` に `file` を記入 |
| 人物写真 | `src/assets/people/` | `public/` ではなくここ。ビルド時に最適化される |
| ロゴ・ファビコン | `public/` | 最適化不要のブランドアセット |

**記事の画像は記事フォルダに同梱する。** 詳しくは [`src/content/README.md`](src/content/README.md)。

```
src/content/media/cs-onboarding/
├── index.md          →  /media/cs-onboarding
├── eyecatch.jpg          frontmatter に eyecatch: ./eyecatch.jpg
└── figure-1.png          本文から ![説明](./figure-1.png)
```

スキーマは `src/content.config.ts` を参照。`metrics` を書いた事例には注釈が自動で付く。

### 記事を消したのにビルドが失敗するとき

Astro がコンテンツを `node_modules/.astro` にキャッシュしており、
フォルダごと削除した記事の画像を探しに行って失敗することがある。

```bash
npm run clean && npm run build
```

## ルーティング（Phase 1）

| パス | ファイル |
|---|---|
| `/` | `src/pages/index.astro` |
| `/customercore` | `src/pages/customercore.astro` |
| `/globalcore` | `src/pages/globalcore.astro` |
| `/cases` | `src/pages/cases/index.astro` |
| `/cases/[slug]` | `src/pages/cases/[slug].astro`（`src/content/cases/*.md` から生成） |
| `/company` | `src/pages/company.astro` |
| `/contact` | `src/pages/contact.astro` |
| `/privacy-policy` | `src/pages/privacy-policy.astro` |
| `/terms` | `src/pages/terms.astro` |

## 未着手（Phase 2 以降）

- `/diagnosis` — CS戦闘力診断。Workers Routes で振り分ける別実装（Astro 側には置かない）。
  統合までの暫定として、サイト内のリンクは `src/consts.ts` の `DIAGNOSIS_URL` が指す
  `https://cs-check.sun-cs.workers.dev/` へ飛ぶ。統合時はこの定数を `/diagnosis` に変えるだけでよい
- `/playbook` — 公開時期が確定するまで「開発中」扱い
- `/media/*` — オウンドメディア
- `/en/*` — 英語版（GlobalCore 単独）
- フォーム送信の Workers 実装、GA4 / Search Console / Microsoft Clarity の導入
