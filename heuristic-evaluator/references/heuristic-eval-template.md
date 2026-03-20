# Heuristic Evaluation Template

Use this as the default response structure for `heuristic-evaluator`.

## Evaluation Scope

- Target: (screens, flows, or components evaluated)
- Heuristic set: (Nielsen's 10 / extended / custom)
- Evaluation depth: (quick scan / deep evaluation)
- Context: (platform, user type, design stage)

## Scorecard

| Heuristic | Score (0-4) | Violations | Key Finding |
|-----------|-------------|------------|-------------|
| H1: Visibility of System Status | | | |
| H2: Match Between System and Real World | | | |
| H3: User Control and Freedom | | | |
| H4: Consistency and Standards | | | |
| H5: Error Prevention | | | |
| H6: Recognition Rather Than Recall | | | |
| H7: Flexibility and Efficiency of Use | | | |
| H8: Aesthetic and Minimalist Design | | | |
| H9: Help Users Recognize/Recover from Errors | | | |
| H10: Help and Documentation | | | |

Overall Score: [average or weighted average]

## Findings

For each finding:
- Finding:
  - Heuristic: (H1-H10)
  - Severity: (0-4)
  - Location: (screen, component, or flow step)
  - Description:
  - Evidence:
  - Recommendation:
  - Rationale:

## Severity Matrix

| Severity | Count | Findings |
|----------|-------|----------|
| 4 - Catastrophe | | |
| 3 - Major | | |
| 2 - Minor | | |
| 1 - Cosmetic | | |

## Top 3 Priority Fixes

1. Fix:
   - Heuristic:
   - Severity:
   - Impact:
   - Recommendation:
   - Effort: (small / medium / large)

2. Fix:
   - Heuristic:
   - Severity:
   - Impact:
   - Recommendation:
   - Effort:

3. Fix:
   - Heuristic:
   - Severity:
   - Impact:
   - Recommendation:
   - Effort:

## Positive Patterns

- Pattern 1:
  - Heuristic:
  - Why it works:
- Pattern 2:
  - Heuristic:
  - Why it works:

---

## Starter Example

Below is a concrete example of a completed finding. Use as a quality reference.

### Finding: No undo after deleting a project

- **Heuristic:** H3 — User control and freedom
- **Severity:** 3 (Major usability problem)
- **Location:** Project list → three-dot menu → "Delete project"
- **Evidence:** Clicking "Delete project" shows a confirmation dialog with "Delete" and "Cancel" buttons. If the user clicks "Delete," the project is permanently removed with no undo option, no trash, and no recovery path.
- **Frequency:** Affects every user who deletes a project. Risk is highest for users managing many projects who may misclick.
- **Recommendation:** Add a 15-second undo toast ("Project deleted. Undo") that soft-deletes the project and allows one-click recovery. If the toast expires, proceed with permanent deletion. This follows the pattern used by Gmail, Slack, and Notion.
- **Effort:** Medium (requires soft-delete infrastructure + toast component).

### Positive Pattern Example

- **Heuristic:** H1 — Visibility of system status
- **Location:** File upload flow
- **What works well:** The upload progress bar shows percentage, estimated time remaining, and a cancel button. After completion, a green checkmark replaces the progress bar with the filename and file size. This gives users continuous feedback and control throughout the process.
