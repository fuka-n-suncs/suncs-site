// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sun-cs.co.jp',

  // 全ページ静的生成。Cloudflare Pages は dist/ をそのまま配信するため
  // アダプタ（@astrojs/cloudflare）は入れない。
  output: 'static',

  // sitemap.xml を自動生成。診断ツールなど外部ドメインは対象外（このリポジトリのページのみ）。
  integrations: [sitemap()],
});