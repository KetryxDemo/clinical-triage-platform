---
itemId: rq-acuity-ceiling
itemType: Requirement
Requirement type: Software
---

# Triage recommendation must not exceed configured acuity ceiling

## Item fields

### Description

The engine shall withhold any self-care recommendation when the input symptom
set matches a high-acuity pattern, and shall instead escalate the encounter to
clinician review.

The acuity ceiling is evaluated by a deterministic rule outside the model. A
model output that conflicts with the ceiling is suppressed, not ranked.
