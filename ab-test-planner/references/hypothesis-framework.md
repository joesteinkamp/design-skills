# Hypothesis Framework

Reference guide for writing strong, falsifiable A/B test hypotheses.

## Hypothesis Structure

**Template:** If [specific change], then [specific metric] will [direction] by [expected magnitude] because [behavioral rationale].

### Components

#### 1. Specific Change (Independent Variable)
- What exactly is different between control and treatment?
- Must be a single, isolatable change (or clearly defined set of changes).
- Bad: "If we improve the checkout" (vague)
- Good: "If we reduce checkout from 4 steps to 2 steps"

#### 2. Specific Metric (Dependent Variable)
- What will you measure to determine success?
- Must be quantifiable and already instrumented (or instrumentable before test).
- Bad: "user satisfaction" (hard to measure)
- Good: "checkout completion rate" (measurable)

#### 3. Direction and Magnitude
- Which direction do you expect the metric to move?
- What is the minimum meaningful change?
- Bad: "will improve" (no magnitude)
- Good: "will increase by at least 5%" (specific threshold)

#### 4. Behavioral Rationale
- Why do you believe this change will produce this effect?
- Should reference user behavior, research, or established UX principles.
- Bad: "because it's better" (no reasoning)
- Good: "because reducing steps decreases cognitive load and form abandonment"

## Hypothesis Quality Checklist

- [ ] Falsifiable: Could the test prove the hypothesis wrong?
- [ ] Specific: Is the change clearly defined?
- [ ] Measurable: Can the metric be tracked?
- [ ] Time-bound: Is there a test duration?
- [ ] Grounded: Is the rationale based on evidence or principles?
- [ ] Single-variable: Is only one thing changing (or is the set clearly defined)?

## Common Hypothesis Patterns

### Simplification
If we [simplify X by removing/reducing Y], then [completion/engagement metric] will [increase] because [reduced cognitive load/friction].

### Visibility
If we [make X more prominent/visible], then [discovery/usage metric] will [increase] because [users currently miss X].

### Personalization
If we [show X based on user characteristic Y], then [relevance/engagement metric] will [increase] because [relevant content drives action].

### Social Proof
If we [add social proof element X], then [conversion metric] will [increase] because [social validation reduces uncertainty].

### Timing
If we [show X at moment Y instead of moment Z], then [engagement metric] will [increase] because [moment Y aligns with user intent].

## Anti-Patterns

- **Testing too many changes at once:** Cannot attribute results to any single change.
- **No baseline data:** Cannot set meaningful MDE without knowing current performance.
- **Vanity metrics as primary:** Page views, time on site without connection to business value.
- **Hypothesis follows test:** Writing the hypothesis after seeing results is not a test.
- **Ignoring guardrails:** Improving one metric while degrading others is not a win.
