# kota-slide-1

日英の技術発表向けに、可読性・理解性・視認性を優先したSlidevテーマです。
近接、整列、反復、対比を共通ルールにし、意味のない装飾を加えません。

A restrained Slidev theme for readable bilingual technical presentations.

公開 example: https://yashikota.github.io/slide-theme/

## Install

このリポジトリを開発する場合:

```bash
pnpm install
pnpm dev
```

別のSlidevプロジェクトからローカルテーマとして使う場合:

```bash
pnpm add ../slide-theme
```

利用側の`slides.md`でテーマを指定します。

```yaml
---
theme: kota-slide-1
aspectRatio: 16/9
---
```

## Layouts

- `cover`: タイトル、副題、発表者情報
- `default`: 見出しと本文の標準形
- `section`: 濃色背景の章扉
- `statement`: 一つの結論
- `two-cols`: 二項比較
- `image-left`: 図を先に見せる説明
- `image-right`: 結論を先に読ませる説明
- `quote`: 引用と出典
- `end`: まとめ、質問、終了

名前付きスロットの使い方は[`example.md`](./example.md)を参照してください。

## Components

`Callout`は補足と注意だけに使います。

```html
<Callout type="note">
補足情報 / Supporting context
</Callout>

<Callout type="warning">
見落とすと判断を誤る情報 / Decision-critical caution
</Callout>
```

`Figure`は代替テキストを必須にし、キャプションを統一します。

```html
<Figure
  src="/diagram.svg"
  alt="処理の流れを示す図"
  caption="Request flow / リクエストの流れ"
/>
```

## Writing guide

### 日本語

- 一枚につき主張は一つに絞ります。
- 本文は一行40字前後を目安にします。
- 箇条書きは三〜五項目、コードは十数行以内を目安にします。
- 図に書いた内容を本文で繰り返さず、意味や判断だけを補います。
- タイトルは28px、本文は24px、補足は18pxです。
- 表紙以外にはページ番号を表示します。
- 一枚を30〜60秒で説明できる情報量にします。
- 箇条書きは並列関係にだけ使います。
- 主張を上に置き、位置・大きさ・色で読む順序を示します。
- 英単語が途中で改行されない行長に整えます。

### English

- Keep one claim per slide.
- Keep body copy near 40–60 characters per line.
- Prefer three to five bullets and only the code needed for the point.
- Explain the implication of a figure instead of repeating its labels.

## GitHub Pages

`main`ブランチへのpushで、[`example.md`](./example.md)をGitHub Pagesへ自動デプロイします。
Actionsの実行後、リポジトリの **Settings → Pages → Build and deployment** でSourceが **GitHub Actions** になっていることを確認してください。

## Customize

利用側の`style.css`でCSSカスタムプロパティを上書きできます。
アクセントは一色だけに保ち、本文とのコントラストを確認してください。

```css
:root {
  --color-accent: #0959b0;
}
```

主要なトークンは[`styles/tokens.css`](./styles/tokens.css)にあります。

## Verify

```bash
pnpm test
pnpm build
pnpm export
pnpm screenshot
```
