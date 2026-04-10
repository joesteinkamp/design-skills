# Workshop Planning Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Topic | yes | text | clear workshop subject |
> | Workshop objective | yes | text | specific, measurable outcome |
> | Decision scope | yes | text | what decisions the workshop will address |
> | Audience | yes | text | who will participate |
> | Team size | yes | number | positive integer |
> | Duration | yes | text | time value |
> | Constraints | no | list | known blockers or limitations |
> | Success criteria | yes | list | min 1 observable success signal |
> | Total duration | yes | text | must match sum of segments |
> | Segments | yes | list | min 3 segments; each needs Name, Time box, Goal, Facilitator moves |
> | Time box | yes | text | duration per segment |
> | Exercise name | yes | text | one per exercise |
> | Objective (exercise) | yes | text | per exercise |
> | Duration (exercise) | yes | text | per exercise |
> | Participant prompt | yes | text | copy-ready prompt per exercise |
> | Activity instructions | yes | list | step-by-step per exercise |
> | Expected output (exercise) | yes | text | what the exercise produces |
> | Board capture area | yes | text | label for FigJam zone per exercise |
> | Facilitation Risks | yes | list | min 1; each needs Risk, Why it matters, Intervention |
> | Expected Artifacts | yes | list | min 2 named artifacts |

Use this as the default response structure for `workshop-planner`.

## Workshop Brief

- Topic:
- Workshop objective:
- Decision scope:
- Audience:
- Team size:
- Duration:
- Constraints:
- Success criteria:

## Agenda & Run of Show

- Total duration:
- Segment 1:
  - Name:
  - Time box:
  - Goal:
  - Facilitator moves:
- Segment 2:
  - Name:
  - Time box:
  - Goal:
  - Facilitator moves:
- Segment 3:
  - Name:
  - Time box:
  - Goal:
  - Facilitator moves:
- Segment 4:
  - Name:
  - Time box:
  - Goal:
  - Facilitator moves:

## Exercise Specs

For each exercise:
- Exercise name:
- Objective:
- Duration:
- Participant prompt:
- Activity instructions:
- Expected output:
- Board capture area (label):

## Facilitation Risks & Interventions

- Risk:
  - Why it matters:
  - Intervention:

## Expected Artifacts

- Artifact 1:
- Artifact 2:
- Artifact 3:

## FigJam Creator Handoff

Produce this section using `figjam-handoff-schema.md`.


---

## Starter Example

Below is a concrete example of a completed exercise spec. Use as a quality reference.

### Exercise 2: Priority Mapping (20 minutes)

**Objective:** Reduce the brainstormed solutions list to 3 prioritized initiatives the team commits to pursuing.

**Setup:**
- Pre-populate a 2×2 matrix on the board: X-axis = Effort (Low → High), Y-axis = Impact (Low → High).
- Place all sticky notes from Exercise 1 in a parking area to the left of the matrix.

**Participant Prompt:**
"Take the solutions from our brainstorm and place each one on the matrix based on your gut assessment of effort and impact. Don't overthink it — we'll discuss disagreements. You have 5 minutes."

**Activity Instructions:**
1. Silent placement (5 min): Each participant drags their top 3 stickies onto the matrix.
2. Cluster and discuss (10 min): Facilitator groups overlapping stickies. Team discusses items where placement disagrees (e.g., same idea in high-impact/low-effort AND low-impact/high-effort).
3. Dot vote (5 min): Each participant gets 3 votes. Vote on the items in the "high impact" row only. Top 3 by vote count become the committed initiatives.

**Expected Output:**
- 3 named initiatives in priority order.
- Each initiative has a preliminary owner (assigned in Exercise 3).
- "Parking lot" list of good ideas that didn't make the cut, preserved for future reference.

**Facilitation Risk:** Dominant voices place stickies first and anchor the group. Mitigation: Use silent placement phase strictly — no discussion until all stickies are placed.

