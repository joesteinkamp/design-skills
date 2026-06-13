# Alt Text Set Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Source | yes | text | where assets came from (Figma export, live URL, attached screenshots) |
> | Page context | yes | text | purpose of the page and surrounding content |
> | Target locale | no | text | language/locale for the alt text; default to source language if absent |
> | Asset count | yes | number | total number of assets covered |
> | Alt Text Set | yes | table | one row per asset; columns: Asset, Classification, Alt Text, Char Count, Notes |
> | Asset | yes | text | identifier or short name of the asset |
> | Classification | yes | enum | decorative / informative / functional |
> | Alt Text | yes | text | the proposed alt value; empty string for decorative |
> | Char Count | yes | number | character count of the alt text; informative should be <= ~125 |
> | Long Descriptions | yes | list | one block per complex visual; "None" if no complex visuals |
> | Placement | yes | enum | adjacent text / aria-describedby / figure caption / details |
> | Decorative Elements | yes | list | each item carries `alt=""` and a reason |
> | Open Questions | yes | list | each carries the asset and what is unresolved |

Use this as the default response structure for `alt-text-generator`.

## Asset Context

- Source:
- Page context:
- Target locale:
- Asset count:

## Alt Text Set

| Asset | Classification | Alt Text | Char Count | Notes |
|-------|----------------|----------|------------|-------|
|       |                |          |            |       |

## Long Descriptions

For each complex visual (chart, diagram, map):

### [Asset name]
- Short alt: (matches the row above)
- Long description: (the data relationships and takeaway, not the styling)
- Placement: (adjacent text / aria-describedby / figure caption / details)

> If there are no complex visuals, state "None".

## Decorative Elements

For each decorative asset:
- [Asset name] — `alt=""` — Reason it is decorative:

## Open Questions

For each unresolved asset:
- Asset:
  - What is unresolved: (cannot classify / missing context / ambiguous purpose)
  - Needed to resolve:

## Downstream Handoff

Produce this section using `alt-text-handoff-schema.md` when passing to `$dev-handoff-writer`.

---

## Starter Example

Below is a concrete example of a completed alt text set. Use this as a quality reference, not a copy-paste template.

### Asset Context
- **Source:** Figma export, "Marketing Home" frame
- **Page context:** Product landing page hero and feature grid
- **Target locale:** en-US
- **Asset count:** 4

### Alt Text Set

| Asset | Classification | Alt Text | Char Count | Notes |
|-------|----------------|----------|------------|-------|
| hero-illustration.png | informative | Team collaborating around a shared dashboard on a laptop | 56 | Conveys the product-in-use scenario |
| search-icon-btn | functional | Search | 6 | Icon button; describes the action |
| divider-swirl.svg | decorative | | 0 | Background flourish, no meaning |
| adoption-trend.png | informative | Line chart of weekly active users rising from Jan to Jun | 56 | Has long description below |

### Long Descriptions

#### adoption-trend.png
- Short alt: Line chart of weekly active users rising from Jan to Jun
- Long description: Weekly active users grew from 12k in January to 41k in June, a 3.4x increase, with the steepest climb between March and April after the mobile launch.
- Placement: aria-describedby on the chart container

### Decorative Elements
- divider-swirl.svg — `alt=""` — Reason it is decorative: purely ornamental background, conveys no information.
