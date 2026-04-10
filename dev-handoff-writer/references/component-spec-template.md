# Component Spec Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Component Name | yes | text | specific component name |
> | Design system name | yes | text | name in the design system |
> | Design system token | yes | text | valid token reference |
> | Version | no | text | semver or design system version |
> | Category | yes | enum | layout / navigation / input / display / feedback |
> | API / Properties | yes | table | columns: Property, Type, Default, Required, Description; min 1 row |
> | Variants | yes | list | min 1 variant; each has When to use, Visual differences, Property overrides |
> | Anatomy | yes | list | min 2 elements; each has role, token, sizing |
> | Spacing & Sizing | yes | key-value | Padding, Margin, Min width, Max width, Min height, Max height |
> | Typography | yes | key-value | Font family, Font size, Font weight, Line height, Letter spacing |
> | Colors | yes | key-value | Background, Text, Border, Icon, Per-state overrides |
> | Composition | yes | key-value | Allowed children, Slot definitions, Nesting rules |

Use this for detailed component specifications within a dev handoff document.

## [Component Name]

### Identity
- Design system name:
- Design system token:
- Version:
- Category: (layout / navigation / input / display / feedback)

### API / Properties
| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
|          |      |         |          |             |

### Variants
For each variant:
- Variant name:
  - When to use:
  - Visual differences:
  - Property overrides:

### Anatomy
- Element 1: (role, token, sizing)
- Element 2: (role, token, sizing)
- Element 3: (role, token, sizing)

### Spacing & Sizing
- Padding:
- Margin:
- Min width:
- Max width:
- Min height:
- Max height:

### Typography
- Font family:
- Font size:
- Font weight:
- Line height:
- Letter spacing:

### Colors
- Background:
- Text:
- Border:
- Icon:
- Per-state overrides: (hover, focus, active, disabled, error)

### Composition
- Allowed children:
- Slot definitions:
- Nesting rules:
