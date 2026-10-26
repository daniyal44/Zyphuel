# Zyphuel Keyword Map — SEO / AEO / GEO (2026-10-26)

Purpose: map every realistic search keyword to exactly one page, so pages stop
competing with each other and each query has a clear "winner" URL.

> **Honest scope note.** Nobody can guarantee position #1 for every keyword —
> not an agency, not this document. What *is* controllable: one page per intent,
> the query in the title/H1/first sentence, matching FAQ schema, fast pages,
> clean structure and steady fresh content. That is what this map does.
> Measured baseline: the site already ranks **#2** for
> *"petrol delivery at home Lahore service diesel doorstep order"*.

---

## 1. Primary money keywords (commercial intent)

| Keyword cluster | Target page | In title | In H1 | Status |
| :--- | :--- | :--- | :--- | :--- |
| online petrol delivery in lahore | `/` | ✅ | ✅ | Ranking |
| doorstep diesel delivery lahore | `/services/` | ✅ | ✅ | Live |
| order fuel online lahore | `/order/` | ✅ | ✅ | Live |
| petrol delivery lahore price | `/order/` | add to FAQ | — | **Gap → FAQ added** |
| diesel delivery lahore price | `/services/` | ✅ | — | Live |
| petrol delivery lahore contact number | `/contact/` | ✅ | — | Live |
| fuel delivery app lahore | `/download/` | ✅ | ✅ | Live |
| petrol delivery near me lahore | `/` | ✅ | — | Live |
| generator diesel delivery lahore | `/blog/generator-refueling-services-lahore/` | ✅ | ✅ | Live |
| emergency petrol delivery lahore | `/order/` | keyword only | — | Live |

**Rule:** one cluster = one page. Never create a second page for a cluster that
already has a winner; strengthen the existing page instead.

---

## 2. Question keywords (AEO — answer engines & featured snippets)

These come from Google's People Also Ask and are already mirrored in the home
page `homeFaqs` array (18 questions) plus `FAQPage` schema:

| Question | Where answered | Schema |
| :--- | :--- | :--- |
| What is Zyphuel? | Home FAQ Q1 | FAQPage |
| Is Zyphuel safe to use? | Home FAQ Q3 | FAQPage |
| Which app delivers petrol in Lahore? | Home FAQ Q15 | FAQPage |
| Can I have petrol delivered to my home? | Home FAQ Q16 | FAQPage |
| What is doorstep diesel delivery? | Home FAQ Q17 | FAQPage |
| Can diesel be delivered at home? | Home FAQ Q18 | FAQPage |
| How much does delivery cost? | Home FAQ Q7 | FAQPage |

**Answer format that wins snippets:** question as an `<h3>`, then a direct
1–2 sentence answer starting with the answer (not "Well…"), then detail.
All current answers follow this shape.

---

## 3. Modifier long-tails (low competition, fast wins)

Observed related searches worth owning:

- `petrol delivery at home lahore price`
- `petrol delivery at home lahore number`
- `petrol delivery at home lahore app`
- `online petrol delivery near me`
- `petrol pump near me lahore` → `/blog/` comparison content
- `diesel delivery companies` → `/services/` (already in keywords)
- `which app delivers petrol` → `/download/` + home FAQ

Local area modifiers already covered in `areaServed` and the home sector cards:
DHA 1–9, Gulberg I–III, Johar Town, Model Town, Bahria Town, Cantt, Wapda Town,
Green Town, Valencia, Lake City, Faisal Town, Garden Town, Township.

---

## 4. GEO keywords (what AI assistants get asked)

| Prompt shape | Page to cite | Source file |
| :--- | :--- | :--- |
| "best doorstep fuel delivery in Lahore" | `/` | `llms.txt` §0 |
| "how much is petrol delivery in Lahore" | `/order/` | `llms.txt` §2 + §9 |
| "is there an app for petrol delivery in Pakistan" | `/download/` | `llms.txt` §0 |
| "fuel delivery service contact number Lahore" | `/contact/` | `llms.txt` §0 |
| "who delivers diesel for generators in Lahore" | `/blog/generator-refueling-services-lahore/` | `llms.txt` §4 |
| "how does Zyphuel compare to CAFU / Booster" | `/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/` | `llms.txt` §6 |

`public/llms.txt` §9 now tells assistants exactly which facts to quote and which
claims **not** to make, which measurably reduces hallucinated pricing.

---

## 5. Content gaps still open (ranked by value)

1. **Pricing page depth** — no dedicated, crawlable price table with
   fuel rate + delivery fee + worked examples (e.g. "10 L petrol = rate × 10 +
   Rs. 300"). Highest-value missing asset for `… price` queries.
2. **Per-area landing depth** — sectors exist as cards, not as indexable sections
   with their own H2 + ETA + FAQ. Adding area-level H2s is safer than new pages.
3. **Annual fuel price history** — a table of OGRA-notified rates over time is a
   natural link magnet and answers "petrol price today Lahore".
4. **Comparison article refresh** — the CAFU/Booster/FuelBuddy table is competing
   with global brands (hard). Reframing to *"doorstep fuel delivery in Pakistan:
   what actually exists in 2026"* is more winnable.

---

## 6. Guardrails (do not break these)

- One H1 per page, containing the primary keyword.
- Do not add a second page targeting an existing cluster (keyword cannibalisation).
- Every FAQ shown visually must also exist in `FAQPage` schema, word-for-word.
- No keyword stuffing — `meta keywords` is ignored by Google and only kept tidy.
- Superlatives ("Pakistan's leading", "premier") only if genuinely provable;
  Google's E-E-A-T treats unverifiable absolutes as a trust negative.


---

## 4. Search Console High-Intent Cluster (2026-10-27 GSC Report)

Identified from live Search Console impressions & clicks:

| Query | Target Page / Winner URL | Status | Implementation |
| :--- | :--- | :--- | :--- |
| can i buy petrol online | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Exact H1, Title, FAQ & Schema |
| can you buy petrol online | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Exact H2, Section 1, FAQ & Schema |
| how to buy petrol online | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | 6-Step How-To Section, FAQ & Schema |
| can i order petrol online | `/order/` & `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Order page keywords & Article Section 2 |
| how to book petrol online | `/order/` & `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Booking walkthrough & FAQ item |
| how to order fuel online | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Article Title, H2 & Step-by-step Guide |
| how to order petrol | `/order/` & `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Quick order flow & FAQ |
| how to order petrol online near me | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Section 3 (GPS auto-pinning & local hubs) |
| how can i get petrol online | `/blog/can-you-buy-petrol-online-how-to-order-guide/` | ✅ Live | Direct Q&A in Home FAQ & Article FAQ |
