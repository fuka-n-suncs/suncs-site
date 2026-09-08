# 人物写真

## 用途と推奨サイズ

| 用途 | ファイル名 | 推奨サイズ |
|---|---|---|
| 代表挨拶（/company） | `nakamura-fuka.jpg` | 1600×1200px 以上 |
| 社員・チーム写真 | `team-*.jpg` | 1600×1067px 以上 |

## 入稿ルール

- 形式: JPG（写真）。切り抜きが必要な場合のみPNG
- 解像度: 表示サイズの2倍以上。Astro が WebP/AVIF に自動変換し複数解像度を出力する
- 圧縮前の状態で入稿してよい（ビルド時に最適化されるため）
- 縦横比は用途ごとに統一する

## 使い方

```astro
import { Image } from 'astro:assets';
import portrait from '../assets/people/nakamura-fuka.jpg';

<Image src={portrait} alt="代表取締役 中村 風夏" width={640} />
```

`public/` ではなくここに置くこと。`public/` は最適化もハッシュ付与もされない。
