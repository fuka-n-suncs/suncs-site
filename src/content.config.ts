import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 1記事 = 1ファイル でも、1記事 = 1フォルダ でも書けるようにする。
 *
 *   news/example.md              → /news/example
 *   news/example/index.md        → /news/example   （画像を同じフォルダに置ける）
 *
 * 画像を含む記事は後者にする。`_` で始まるファイル・フォルダは読み込まない（テンプレート置き場）。
 */
const entryId = ({ entry }: { entry: string }) =>
  entry.replace(/\.mdx?$/, '').replace(/\/index$/, '');

/* `_` で始まるファイル・フォルダはテンプレート置き場なので読み込まない */
const CONTENT_PATTERN = ['**/*.{md,mdx}', '!**/_*', '!**/_*/**'];

/**
 * 導入事例。1事例 = 1 Markdownファイル（src/content/cases/<slug>.md）。
 * ファイル名がそのままURLになる（例: cloud-service.md → /cases/cloud-service）。
 *
 * 記載ルールは business-definition.md「8. 実績の記載ルール」に従う:
 * - client（企業名）は各社の許諾を得たもののみ記入する
 * - metrics を書いた事例には注釈が自動で表示される
 */
const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({
    /** 事例タイトル */
    title: z.string(),
    /** 一覧に出す1〜2行の要約 */
    summary: z.string(),

    /* --- 企業概要 --- */
    /** 事業内容（例: クラウドサービス事業） */
    industry: z.string(),
    /** 会社規模（例: 50〜100名） */
    companySize: z.string(),
    /** 支援期間（例: 9ヶ月（コンサルティング）） */
    supportPeriod: z.string(),

    /** どのサービスの事例か。一覧の絞り込みとサービスページへの掲出に使う */
    service: z.enum(['customercore', 'globalcore-outbound', 'globalcore-inbound']),

    /** CS課題のICPパターン。CustomerCore の事例のみ。該当しなければ省略可 */
    pattern: z.enum(['A', 'B', 'C']).optional(),
    /** 企業名。★許諾を得た事例のみ記入する */
    client: z.string().optional(),

    /** 数値成果。書いた場合は注釈が自動表示される */
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),

    /** 実施内容のフェーズ。Day 0 など強調したい工程は highlight: true にする */
    phases: z
      .array(
        z.object({
          label: z.string(),
          timing: z.string().optional(),
          note: z.string().optional(),
          highlight: z.boolean().default(false),
          items: z.array(z.string()),
        })
      )
      .optional(),

    /** 一覧の並び順（小さいほど先） */
    order: z.number().default(99),
    /** true の間はビルド対象から外れる */
    draft: z.boolean().default(false),
  }),
});

/**
 * お知らせ。プレスリリース・登壇・メディア掲載・会社からの告知など。
 * src/content/news/<slug>.md
 */
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: CONTENT_PATTERN, generateId: entryId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 公開日。一覧はこの降順で並ぶ */
      date: z.coerce.date(),
      category: z.enum(['press', 'event', 'media', 'notice']),
      /** 外部サイトのリリースを指す場合。指定すると一覧から直接そこへ飛ぶ */
      externalUrl: z.string().optional(),

      /** アイキャッチ画像。記事フォルダ内の相対パスで指定する（例: ./eyecatch.jpg） */
      eyecatch: image().optional(),
      /** アイキャッチの代替テキスト。未指定ならタイトルを使う */
      eyecatchAlt: z.string().optional(),

      /** 旧サイトからの移行記事の場合、元のURL。リダイレクト設定の判断に使う */
      originalUrl: z.string().optional(),

      draft: z.boolean().default(false),
    }),
});

/**
 * メディア（オウンドメディア）。記事とお役立ち資料。
 * src/content/media/<slug>.md
 *
 * カテゴリは consts.ts の MEDIA_CATEGORIES（4分類）に対応する。
 */
const media = defineCollection({
  loader: glob({ base: './src/content/media', pattern: CONTENT_PATTERN, generateId: entryId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 一覧とOGPに使う要約 */
      summary: z.string(),
      date: z.coerce.date(),
      /** 最終更新日。リライトしたら入れる */
      updated: z.coerce.date().optional(),
      category: z.enum(['interview', 'cs-design', 'cs-ops', 'global']),
      /** article = 読み物 / material = お役立ち資料 */
      type: z.enum(['article', 'material']).default('article'),

      /** アイキャッチ画像。記事フォルダ内の相対パスで指定する（例: ./eyecatch.jpg） */
      eyecatch: image().optional(),
      /** アイキャッチの代替テキスト。未指定ならタイトルを使う */
      eyecatchAlt: z.string().optional(),

      /** 資料のダウンロード先。未設定なら問い合わせへ誘導する */
      downloadUrl: z.string().optional(),
      /** 検索・関連記事用 */
      tags: z.array(z.string()).default([]),

      /** 旧サイトからの移行記事の場合、元のURL。リダイレクト設定の判断に使う */
      originalUrl: z.string().optional(),

      draft: z.boolean().default(false),
    }),
});

export const collections = { cases, news, media };
