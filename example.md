---
theme: ./
title: Clarity through structure
layout: cover
info: |
  A bilingual example deck for kota-slide-1.
aspectRatio: 16/9
drawings:
  persist: false
---

# Clarity through structure

読みやすさを、構造からつくる。  
Designing readability through structure.

::meta::

Kota · Technical presentation template · 2026

---
layout: section
---

# 情報を整理する四つの原則

::section::

01 / PRINCIPLES

---
layout: default
---

# 関連する情報を近づける

日本語とEnglishが混在しても、見出し、本文、補足の距離が関係性を示します。

- 同じ意味の要素は近くに置く
- 異なる話題の間には十分な余白を置く
- 一枚につき、中心となる主張は一つに絞る

::label::

PROXIMITY / 近接

::footer::

Four principles of visual design

---
layout: default
---

# 読めるコードだけを載せる

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; reason: string }

export function parse(input: string): Result<number> {
  const value = Number(input)
  return Number.isFinite(value)
    ? { ok: true, value }
    : { ok: false, reason: 'Not a number' }
}
```

::label::

CODE / 実装例

---
layout: default
---

# 数値は桁を揃える

| Method | Latency | Errors |
| --- | ---: | ---: |
| Baseline | 248 ms | 12 |
| Cached | 84 ms | 3 |
| Batched | 61 ms | 2 |

<Callout type="note">
比較では、単位と評価条件を必ず揃えます。Keep units and conditions consistent.
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

# 対比は二列まで

::footer::

CONTRAST / 対比

---
layout: image-left
---

# 図を先に読む

図と本文を分離し、説明の順序を明確にします。

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

# 説明を先に読む

結論から読み始める場合は、本文を左、図を右に置きます。

<Callout type="warning">
図の内容を本文で重複説明しないでください。
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

Design is the conscious effort to impose a meaningful order.

::attribution::

Victor Papanek, *Design for the Real World*

---
layout: statement
---

# 装飾ではなく、情報の差を見せる。

::source::

Show differences in information—not decoration.

---
layout: default
---

# 一枚の上限を決める

- 本文は40字前後の行長を目安にする
- 箇条書きは三〜五項目に抑える
- コードは要点だけを十数行で示す
- 詳細は発表者ノートやリンクへ分離する

<Callout type="note" label="Rule of thumb / 目安">
読めない量は、理解できない量です。
</Callout>

::label::

WRITING / 執筆

---
layout: end
---

# Thank you.

構造が伝われば、内容に集中できる。

::meta::

Questions / 質問
