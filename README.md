# slidev-theme-kota

研究進捗報告向けの [Slidev](https://sli.dev) テーマ。`##` の見出しと本文だけで書いた原稿を、そのまま発表資料の見た目にする。

- フォントは同梱の UDEV Gothic (SIL OFL 1.1)。Google Fonts を参照しない
- 本文が収まらないページは文字サイズを自動で縮小する。タイトルの大きさは固定
- 日本語の改行位置は BudouX で決める。数式、コード、図は分割しない
- 表紙以外にページ番号と、最終ページまでの進み具合を示す下部の進捗バーを表示する
- 数式は KaTeX (`$...$` / `$$...$$`)

公開 example: https://yashikota.github.io/slide-theme/

## Install

利用側のプロジェクトに GitHub から追加する。

```bash
pnpm add -D github:yashikota/slide-theme
```

更新を固定したい場合はコミットを指定する。

```bash
pnpm add -D github:yashikota/slide-theme#<commit>
```

原稿の frontmatter でテーマを指定する。`lang` は日本語なら `ja`、英語なら `en`。

```yaml
---
title: 進捗報告 2026/11/19
theme: kota
lang: ja
---
```

`colorSchema: light`、`aspectRatio: 16/9`、`canvasWidth: 1280`、フォント設定はテーマの既定値なので書かなくてよい。

## Writing

1 ページ目は自動で `cover` レイアウトになり、`##` が大きなタイトル、その下の段落が発表者などの情報になる。2 ページ目以降は `##` がページタイトルで、下線付きで固定表示される。

```md
## 進捗報告<br>2026/11/19

発表者名

<!--
読み上げ原稿は HTML コメントに書く。
-->

---

## 前回までの検討

- 検討内容
```

Slidev 組み込みのレイアウト (`two-cols`、`image-right`、`center` など) は frontmatter の `layout:` でそのまま使える。

## Customize

原稿と同じディレクトリの `style.css` で CSS カスタムプロパティを上書きできる。

```css
:root {
  --kota-accent: #0959b0;   /* 見出しの下線、箇条書きの点、進捗バー */
  --kota-ink: #172033;      /* 本文 */
  --kota-muted: #566176;    /* 表紙の補足、ページ番号 */
  --kota-rule: #7a8798;     /* 表の罫線 */
  --kota-track: #e2e8f0;    /* 進捗バーの背景 */
  --kota-cover-bg: #f4faf8; /* 表紙の背景 */
}
```

主要なスタイルは [`styles/index.css`](./styles/index.css)、自動縮小と BudouX と進捗バーは [`slide-bottom.vue`](./slide-bottom.vue) にある。

## Development

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
