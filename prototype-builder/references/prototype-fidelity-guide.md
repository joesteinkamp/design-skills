# Prototype Fidelity Guide

## Fidelity levels

| Level | Looks like | Use when | Content |
|-------|-----------|----------|---------|
| Low | Grayscale, system font, boxes | Testing structure, flow, and comprehension | Real labels and copy in tested areas; placeholders elsewhere |
| Mid | shadcn defaults, real components | Testing interaction and task completion | Realistic scenario content |
| High | Project tokens, real imagery and copy | Testing trust, brand, desirability, or stakeholder buy-in | Production-like content |

Fidelity should match the question. High fidelity on an unvalidated flow invites feedback on color instead of on the flow.

## Real vs. faked

Make real what the test question depends on; fake the rest.

| Usually real | Usually faked |
|--------------|---------------|
| The tested interaction (form validation, drag, filters) | Authentication, payments, back-end calls |
| Navigation between tested screens | Screens outside the tested tasks (show a "Not part of this prototype" page) |
| States the tasks can reach | Search across real data (use a fixed dataset) |

## Single-file hash router

```html
<main id="app">
  <section data-screen="home"> … <a href="#/invite">Invite teammate</a></section>
  <section data-screen="invite" hidden> … </section>
  <section data-screen="not-in-prototype" hidden>
    <h1 tabindex="-1">Not part of this prototype</h1>
    <a href="#/home">Back to start</a>
  </section>
</main>
<script>
  const show = () => {
    const name = location.hash.replace(/^#\//, "") || "home";
    let target = document.querySelector(`[data-screen="${name}"]`);
    if (!target) target = document.querySelector('[data-screen="not-in-prototype"]');
    document.querySelectorAll("[data-screen]").forEach((s) => (s.hidden = s !== target));
    target.querySelector("h1")?.focus(); // move focus for keyboard and screen-reader users
  };
  addEventListener("hashchange", show);
  show();
</script>
```

Give every screen an `<h1 tabindex="-1">` so focus can land on it.

## Simulating states

- **Loading:** `await new Promise(r => setTimeout(r, 600))` before rendering results.
- **Error:** trigger with a magic input (e.g., email containing `fail@`) or a facilitator toggle hidden behind `?debug=1`.
- **Empty:** a query-string flag (`?empty=1`) or a "Clear data" facilitator control.
- **Success:** confirm with a toast or a success screen, and return focus sensibly.
- **Reset:** a facilitator control that clears in-memory state and `localStorage` and returns to `#/home`.

## Realistic content

- Use plausible names, amounts, and dates for the scenario (an accounting tool shows invoices like "INV-1042 · $1,280.00 · Due Nov 3").
- Vary lengths: one long name, one missing avatar, one zero value — prototypes that only show perfect data hide layout problems.
- Never use lorem ipsum in a tested area; participants read it and get confused.
