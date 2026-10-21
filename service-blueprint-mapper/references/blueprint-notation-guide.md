# Service Blueprint Notation

## Lanes (top to bottom)

| Lane | Contains | Example (in-store return) |
|------|----------|---------------------------|
| Evidence | What the customer sees, touches, or receives | Return label email, receipt, counter sign |
| Customer actions | What the customer does | Brings item to store, shows order email |
| Frontstage | Employee or interface actions the customer sees | Associate scans order barcode |
| Backstage | Employee actions the customer doesn't see | Associate re-keys order ID into the POS |
| Support processes | Systems, partners, and policies that enable the step | OMS lookup, refund policy, payment provider |

## Lines

- **Line of interaction** — between Customer and Frontstage: every crossing is a touchpoint.
- **Line of visibility** — between Frontstage and Backstage: what the customer can and can't see.
- **Line of internal interaction** — between Backstage and Support: handoffs to other teams or systems.

## Markers

| Marker | Meaning | Record |
|--------|---------|--------|
| ⚠ Fail point | Where things go wrong | Frequency, impact, evidenced/assumed |
| ⏱ Wait point | Where the customer waits | Duration (median, worst case) |
| ⇄ Handoff | Work changes hands across teams or systems | From → to, medium |
| ✎ Manual step | Re-keying, copy-paste, spreadsheets | Time per occurrence |

## Tips

- One scenario, one segment. Variants ("online return", "gift return") get their own blueprint.
- Name the actor by role and the system by name: "Tier-2 support", "Zendesk", "Stripe".
- Arrows crossing the line of visibility repeatedly in one step usually mean the customer is being asked to do backstage work.
- Future-state blueprints should show what is removed, not only what is added.
