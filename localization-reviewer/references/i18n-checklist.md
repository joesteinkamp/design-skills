# i18n / l10n Checklist

## Text expansion (vs. English)

| English length | Typical expansion |
|----------------|-------------------|
| ≤ 10 characters | up to +200–300% |
| 11–20 | +80–100% |
| 21–70 | +40–80% |
| > 70 | +30% |

Longest common: German, Finnish, Russian, French. CJK is often shorter in characters but needs taller line height and different line breaking.

## Text & layout

- [ ] No fixed widths on buttons, tabs, labels, or table headers; containers grow or wrap.
- [ ] Truncated text has a full-text affordance (tooltip, expand).
- [ ] No text inside images or icons; no icon-only meaning that depends on English puns.
- [ ] No string concatenation: `"You have " + n + " messages"` → ICU `{count, plural, one {# message} other {# messages}}`.
- [ ] Plural categories beyond one/other are supported (ru: one/few/many/other; ar: zero/one/two/few/many/other).
- [ ] Gendered languages: avoid sentences that need the user's gender, or use ICU `select`.
- [ ] Every string is externalized with translator context (where it appears, max length, placeholders).
- [ ] Fonts cover target scripts (CJK, Arabic, Devanagari, Thai); fallback stacks defined.

## Formats

- [ ] Dates and times via `Intl.DateTimeFormat`; never 03/04/2025 hardcoded; respect 24-hour locales and week start.
- [ ] Numbers via `Intl.NumberFormat`: decimal and grouping separators differ (1,234.5 vs 1.234,5 vs 1 234,5).
- [ ] Currency: symbol position, spacing, and decimals vary (¥ has none); show currency code when ambiguous ($).
- [ ] Units: metric vs. imperial by locale.
- [ ] Names: single "Full name" field or locale-aware order; no required last name.
- [ ] Addresses and postal codes: locale-specific fields and validation; no US-only ZIP regex.
- [ ] Phone numbers: E.164 storage, country selector, flexible input.

## Right-to-left

- [ ] Use CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline`) instead of left/right.
- [ ] Layout mirrors: navigation, progress, alignment, carousels.
- [ ] Mirror directional icons (back/forward arrows, chevrons, reply, undo); don't mirror clocks, play buttons, checkmarks, logos, or media controls.
- [ ] Mixed-direction text (Latin names, numbers, URLs inside Arabic) renders correctly; use `dir="auto"` on user content.

## Culture

- [ ] Flags don't stand for languages (Spanish ≠ 🇪🇸 only; English ≠ 🇺🇸 only).
- [ ] Imagery, gestures, and hand signs reviewed for target markets.
- [ ] Color meaning reviewed (e.g., red is positive in China, white associated with mourning in parts of Asia).
- [ ] Idioms, humor, and sports or holiday references flagged for transcreation.
- [ ] Market-required content: legal text, tax display (VAT-inclusive pricing in the EU), cookie consent.

## Pseudo-localization

A pseudo-locale replaces strings with accented, expanded, bracketed versions — e.g., `Save` → `[Šåvé·····]` — so you can:
- spot hardcoded strings (no brackets),
- see overflow (expanded length ~+35%),
- confirm encoding and font fallback (accents render).

Run one pass with a pseudo-locale and one with `dir="rtl"` on the root element.
