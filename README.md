# slidev-theme-kota

研究発表や技術報告向けの [Slidev](https://sli.dev) テーマ。`##` の見出しと本文と読み上げ原稿だけで書いた Markdown を、そのまま発表資料の見た目にする。

- フォントは同梱の UDEV Gothic (SIL OFL 1.1)。Google Fonts を参照しない
- 本文が収まらないページは文字サイズを自動で縮小する。タイトルの大きさは固定
- 日本語の改行位置は BudouX で決める。数式、コード、図は分割しない
- 表紙以外にページ番号と、最終ページまでの進み具合を示す下部の進捗バーを表示する
- 数式は KaTeX (`$...$` / `$$...$$`)

公開 example: https://yashikota.github.io/slide-theme/ (原稿は [`example.md`](./example.md))

## 使い方

### 1. プロジェクトを用意する

Slidev 本体とテーマを devDependencies に入れる。テーマは GitHub から直接取り込む。

```bash
pnpm add -D @slidev/cli playwright-chromium github:yashikota/slide-theme
```

更新を固定したい場合はコミットを指定する。

```bash
pnpm add -D github:yashikota/slide-theme#<commit>
```

`package.json` の最小構成は次のとおり。`playwright-chromium` は PDF や PNG の出力に使う。

```json
{
  "scripts": {
    "dev": "slidev slides.md --open",
    "build": "slidev build slides.md",
    "export": "slidev export slides.md"
  },
  "devDependencies": {
    "@slidev/cli": "^53.0.0",
    "playwright-chromium": "^1.64.0",
    "slidev-theme-kota": "github:yashikota/slide-theme"
  }
}
```

### 2. 原稿の frontmatter でテーマを指定する

`theme: kota` と `lang` だけでよい。`colorSchema: light`、`aspectRatio: 16/9`、`canvasWidth: 1280`、フォント設定はテーマの既定値になる。

```yaml
---
title: 進捗報告 2026/11/19
theme: kota
lang: ja
---
```

英語版は `lang: en` にする。`<html lang>` が変わるだけで、見た目は同じ。

### 3. 原稿を書く

1 ページは「`##` のタイトル」「本文」「`<!-- -->` の読み上げ原稿」の 3 点セットで書き、`---` だけの行でページを区切る。1 ページ目は自動で表紙 (`cover`) になり、`##` が大きなタイトル、その下の段落が発表者などの情報になる。2 ページ目以降は `##` が下線付きのページタイトルとして固定表示され、本文がその下に入る。

```md
---
title: 進捗報告 2026/11/19
theme: kota
lang: ja
---

## 進捗報告<br>2026/11/19

発表者名

<!--
本日の進捗報告を始めます。
-->

---

## 背景

- 取り組む課題
- 既存の方法と残っている問題

<!--
背景として、取り組む課題と既存の方法の問題点を説明します。
-->
```

本文で使える要素と、このテーマでの扱いは次のとおり。

| 要素 | 書き方 | 扱い |
|------|--------|------|
| 箇条書き | `-` / `1.` | 記号はアクセント色。入れ子も可 |
| 表 | GFM の表 | 見出し行の下に太い罫線。幅はページいっぱい |
| 数式 | `$x$` / `$$...$$` | KaTeX。`<div class="equation-legend">` で記号の説明を小さく添えられる |
| コード | フェンスブロック | Shiki でハイライト。縮小対象だが途中で改行されない |
| 画像 | `![](images/fig.png)` | 原稿と同じディレクトリからの相対パス |
| 参考文献 | `### 参考文献` の下に 1 行ずつ | `論文名, 著者, 年度, 学会名` の形式 |
| 小見出し | `###` | アクセント色の見出し |

本文が 1 ページに収まらないときは、タイトルの大きさはそのままに本文だけが自動で縮小される。縮小率はページごとに独立で、数式・表・画像もページの内側に収まるまで縮める。はみ出さないページは縮小されない。縮小が強くかかるページは情報量が多すぎるので、ページを分けたほうが読みやすい。

Slidev 組み込みのレイアウト (`two-cols`、`image-right`、`center` など) は、ページの frontmatter で `layout:` を指定すればそのまま使える。

### 4. プレビューと出力

```bash
pnpm dev             # ブラウザでプレビュー。原稿を保存すると即反映
pnpm build           # 静的サイトを dist/ に出力
pnpm export          # PDF を出力
pnpm exec slidev export slides.md --format png   # ページごとの PNG
```

読み上げ原稿は Slidev の presenter mode (`/presenter/`) でノートとして表示される。

## Customize

原稿と同じディレクトリの `style.css` で CSS カスタムプロパティを上書きできる。色はアクセント 1 色で統一しているので、まず `--kota-accent` を変える。

```css
:root {
  --kota-accent: #0959b0;   /* 見出しの下線、箇条書きの点、小見出し、進捗バー */
  --kota-ink: #172033;      /* 本文 */
  --kota-muted: #566176;    /* 表紙の補足、ページ番号 */
  --kota-rule: #7a8798;     /* 表の罫線 */
  --kota-track: #e2e8f0;    /* 進捗バーの背景 */
  --kota-cover-bg: #f4faf8; /* 表紙の背景 */
}
```

本文の既定サイズは 30px、タイトルは 38px。変えたい場合も `style.css` に書く。

```css
.slidev-layout { font-size: calc(32px * var(--kota-scale)); }
.slidev-layout h2 { font-size: 40px; }
```

主要なスタイルは [`styles/index.css`](./styles/index.css)、自動縮小と BudouX と進捗バーは [`slide-bottom.vue`](./slide-bottom.vue) にある。

## Development

このリポジトリ自体を開発する場合。

```bash
pnpm install
pnpm dev        # example.md をプレビュー
pnpm test       # 構成の検査
pnpm build      # example.md を dist/ に出力
pnpm export     # PDF
pnpm screenshot # PNG
```

`main` への push で [`example.md`](./example.md) を GitHub Pages へデプロイする。リポジトリの **Settings → Pages → Build and deployment** で Source を **GitHub Actions** にしておく。

## License

UDEV Gothic は [yuru7/udev-gothic](https://github.com/yuru7/udev-gothic) v2.2.0 を同梱している。ライセンスは [`assets/fonts/LICENSE`](./assets/fonts/LICENSE) を参照。
