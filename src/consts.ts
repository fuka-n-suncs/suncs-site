/**
 * サイト共通の定数。
 * 文言・数値は 01_company_info/business-definition.md を唯一の参照元とする。
 * ここに書かれていない主張をページに載せない。
 */

export const SITE_TITLE = 'SUNCS';
export const SITE_URL = 'https://sun-cs.co.jp';

/**
 * CS戦闘力診断。サイト全体の主導線。
 *
 * 2026-09-08、Workers Routeで sun-cs.co.jp/diagnosis/* を cs-check Workerに
 * ルーティングする設定を追加し、本体ドメインへ統合済み。
 * 旧ドメイン（cs-check.sun-cs.workers.dev）は当面そのままアクセス可能。
 */
export const DIAGNOSIS_URL = '/diagnosis';
export const DIAGNOSIS_LABEL = 'CS戦闘力診断（無料）';

/** DIAGNOSIS_URL が外部ドメインを指している間だけ true */
export const DIAGNOSIS_IS_EXTERNAL = /^https?:\/\//.test(DIAGNOSIS_URL);

export type NavItem = {
  href: string;
  label: string;
};

/** ヘッダーの主ナビゲーション。CTA（診断）は別枠なのでここには入れない */
export const NAV: NavItem[] = [
  { href: '/customercore', label: 'CustomerCore' },
  { href: '/globalcore', label: 'GlobalCore' },
  { href: '/cases', label: '導入事例' },
  { href: '/media', label: 'メディア' },
  { href: '/news', label: 'お知らせ' },
  { href: '/company', label: '会社概要' },
];

/** フッターの列構成 */
export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'サービス',
    items: [
      { href: '/customercore', label: 'CustomerCore' },
      { href: '/globalcore', label: 'GlobalCore' },
      { href: '/cases', label: '導入事例' },
    ],
  },
  {
    heading: '会社',
    items: [
      { href: '/company', label: '会社概要' },
      { href: '/news', label: 'お知らせ' },
      { href: '/contact', label: 'お問い合わせ' },
    ],
  },
  {
    heading: 'メディア',
    items: [
      { href: '/media', label: 'メディア一覧' },
      { href: '/media/category/interview', label: '対談・インタビュー' },
      { href: '/media/category/cs-design', label: 'CS設計・立ち上げ' },
      { href: '/media/category/cs-ops', label: 'CS運用・改善' },
      { href: '/media/category/global', label: '海外展開・グローバル' },
    ],
  },
];

/** フッターの法務リンク */
export const LEGAL_NAV: NavItem[] = [
  { href: '/privacy-policy', label: 'プライバシーポリシー' },
  { href: '/terms', label: '利用規約' },
];

/** 事例カードに出すサービス名の表示ラベル */
export const SERVICE_LABEL = {
  customercore: 'CustomerCore',
  'globalcore-outbound': 'GlobalCore｜海外進出支援',
  'globalcore-inbound': 'GlobalCore｜日本進出支援',
} as const;

/** お知らせのカテゴリ表示名 */
export const NEWS_CATEGORY_LABEL = {
  press: 'プレスリリース',
  event: 'イベント・登壇',
  media: 'メディア掲載',
  notice: 'お知らせ',
} as const;

/** メディアのカテゴリ。4分類（consts.ts が唯一の参照元） */
export const MEDIA_CATEGORIES = [
  {
    slug: 'interview',
    label: '対談・インタビュー',
    description: 'CS実践者や経営者との対話から見えてくる、現場のリアル。',
  },
  {
    slug: 'cs-design',
    label: 'CS設計・立ち上げ',
    description: 'カスタマーサクセスをこれから作る、作り直す段階の話。',
  },
  {
    slug: 'cs-ops',
    label: 'CS運用・改善',
    description: '動いているCSを、どう回し、どう良くしていくか。',
  },
  {
    slug: 'global',
    label: '海外展開・グローバル',
    description: '市場をまたぐときに何が起きるか。海外展開と日本参入の両方を扱う。',
  },
] as const;

export const MEDIA_CATEGORY_LABEL = Object.fromEntries(
  MEDIA_CATEGORIES.map((c) => [c.slug, c.label])
) as Record<(typeof MEDIA_CATEGORIES)[number]['slug'], string>;

/** メディアの種別表示名 */
export const MEDIA_TYPE_LABEL = {
  article: '記事',
  material: 'お役立ち資料',
} as const;

/**
 * 掲載可のクライアント名（business-definition.md「クライアント名の掲載」）。
 * ロゴ画像は src/assets/clients/<file> に置き、file を埋めると表示対象になる。
 */
export type Client = {
  name: string;
  /** src/assets/clients/ 配下のファイル名。未入稿なら null */
  file: string | null;
  /** 公式サイト。設定するとロゴがリンクになる */
  url?: string;
};

export const CLIENTS: Client[] = [
  { name: 'AVILEN', file: 'avilen.png' },
  { name: 'amidex', file: 'amidex.png' },
  { name: 'Life Ship', file: 'life-ship.png' },
  { name: 'CLF PARTNERS', file: 'clf-partners.png', url: 'https://clfpartners.co.jp/' },
  { name: 'TENHO', file: 'tenho.png' },
  { name: 'HUMANFORCE', file: 'humanforce.png', url: 'https://humanforce.co.jp/' },
  { name: 'LINK, INC.', file: 'link.png' },
  { name: 'idea;record', file: 'idea-record.png' },
  { name: 'RIMO', file: 'rimo.png' },
  { name: 'YACHIYO Solutions', file: 'yachiyo.png' },
];

/** クライアントロゴのファイル名を社名から引く */
export const clientLogoFile = (name: string) =>
  CLIENTS.find((client) => client.name === name)?.file ?? null;
