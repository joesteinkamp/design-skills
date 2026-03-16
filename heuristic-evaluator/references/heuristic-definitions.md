# Heuristic Definitions

Reference definitions for usability heuristics used by `heuristic-evaluator`.

## Nielsen's 10 Usability Heuristics (Default Set)

### H1: Visibility of System Status
The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.
- Key indicators: Loading states, progress indicators, confirmation messages, status updates, real-time feedback.

### H2: Match Between System and the Real World
The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.
- Key indicators: Terminology, metaphors, icon meaning, information order following real-world conventions.

### H3: User Control and Freedom
Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue.
- Key indicators: Undo/redo, cancel, back navigation, easy exit from flows, confirmation before destructive actions.

### H4: Consistency and Standards
Users should not have to wonder whether different words, situations, or actions mean the same thing.
- Key indicators: Internal consistency (within the product), external consistency (with platform conventions), design system adherence.

### H5: Error Prevention
Even better than good error messages is a careful design which prevents a problem from occurring in the first place.
- Key indicators: Constraints, defaults, confirmations, input validation, smart defaults, guardrails.

### H6: Recognition Rather Than Recall
Minimize the user's memory load by making elements, actions, and options visible.
- Key indicators: Visible options, contextual help, recent items, breadcrumbs, clear labels, suggested actions.

### H7: Flexibility and Efficiency of Use
Accelerators -- unseen by the novice user -- may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users.
- Key indicators: Shortcuts, customization, power-user features, batch operations, templates, defaults.

### H8: Aesthetic and Minimalist Design
Dialogues should not contain information which is irrelevant or rarely needed.
- Key indicators: Information density, visual noise, content prioritization, progressive disclosure, whitespace usage.

### H9: Help Users Recognize, Diagnose, and Recover from Errors
Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.
- Key indicators: Error message clarity, suggested fixes, recovery paths, error state design.

### H10: Help and Documentation
Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.
- Key indicators: Onboarding, tooltips, contextual help, searchable docs, task-oriented guidance.

## Severity Rating Scale (0-4)

- **0 - Not a problem:** No usability issue identified for this heuristic.
- **1 - Cosmetic:** Cosmetic problem only; fix if time allows.
- **2 - Minor:** Minor usability problem; low priority fix.
- **3 - Major:** Major usability problem; important to fix, high priority.
- **4 - Catastrophe:** Usability catastrophe; imperative to fix before release.

## Extended Heuristic Sets (Optional)

### Weinschenk & Barker Classification (20 Heuristics)
Use when deeper granularity is needed. Includes: user control, human limitations, modal integrity, accommodation, cognitive overload, explicit structure, recognition, visual clarity, error tolerance, forgiveness, responsiveness, flexibility, learnability, consistency, guidance, accessibility, natural language, aesthetics, simplicity, memorability.

### Mobile-Specific Additions
- Touch target sizing (minimum 44x44pt iOS, 48x48dp Android)
- Thumb-zone optimization
- Gesture discoverability
- Offline/degraded state handling
- Interruption recovery (calls, notifications)
