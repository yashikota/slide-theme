---
theme: ./
title: Structure guides attention
layout: cover
info: |
  A bilingual example deck for kota-slide-1.
aspectRatio: 16/9
drawings:
  persist: false
---

# Structure guides attention

主張を先に見せ、視線を迷わせない。<br>
Lead with the claim and guide attention.

::meta::

Kota · 日本語 + English · 2026

---
layout: section
---

# 読ませる順序が、理解を決める

::section::

01 / READING FLOW

---
layout: default
---

# 主張は左上から読み始める

位置と余白が、情報の読む順序を伝えます。

- 主張は上に置く
- 根拠は主張の下に置く
- 補足は最後に置く

::label::

PROXIMITY / 近接

::footer::

Four principles of visual design

---
layout: default
---

# コードは判断に必要な行だけ見せる

```ts
export function parse(input: string): number | null {
  const value = Number(input)
  return Number.isFinite(value) ? value : null
}
```

::label::

CODE / 実装例

---
layout: default
---

# 比較条件を揃えると差が見える

| Method | Latency | Errors |
| --- | ---: | ---: |
| Baseline | 248 ms | 12 |
| Cached | 84 ms | 3 |
| Batched | 61 ms | 2 |

<Callout type="note">
単位と評価条件を揃えてから比較します。
</Callout>

::label::

COMPARISON / 比較

---
layout: two-cols
---

## Before

- 情報量が多い
- 視線の起点が曖昧
- 強調色が競合する

::right::

## After

- 一枚一主張
- 左上から読む
- 強調色は一色だけ

::title::

# 対比は同じ軸で左右に並べる

::footer::

CONTRAST / 対比

---
layout: image-left
---

# 処理の順序は図から読み取れる

左から右へ進む図は、手順の説明に向きます。

1. Client sends a request
2. API validates the input
3. Data store returns a result

::image::

<Figure
  src="/architecture.svg"
  alt="Client、API、Dataの順に進む三段階のリクエストフロー"
  caption="Request flow / リクエストの流れ"
/>

---
layout: image-right
---

# 結論を先に示すと図の意味が決まる

本文を左に置き、判断してから図を確認します。

<Callout type="warning" label="注意">
図ではなく、意味を伝えます。
</Callout>

::image::

<Figure
  src="/architecture.svg"
  alt="ClientからAPIを経由してDataへ到達する処理フロー"
  caption="The same system, a different reading order"
/>

---
layout: quote
---

秩序は、装飾ではなく理解のためにつくる。

::attribution::

Design principle / 設計原則

---
layout: statement
---

# 色は意味の差にだけ使う。

::source::

強調色は一色に絞る。

---
layout: default
---

# 一枚は30〜60秒で伝える

- 本文は短い文にする
- 箇条書きは並列関係に限る

::label::

WRITING / 執筆

---
layout: end
---

# 主張を上に置けば、視線は迷わない。

短く、揃えて、意味だけを強調する。

::meta::

Questions / 質問
