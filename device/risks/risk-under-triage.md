---
itemId: risk-under-triage
itemType: Risk
itemIsRiskControlledBy: rq-acuity-ceiling, tc-urgent-regression
Hazard type: Diagnostic information
System categories: Clinical
Risk assessment methodologies: FMEA
---

# Under-triage of high-acuity presentation

## Item fields

### Description

The engine returns a low-acuity recommendation for a presentation that requires
urgent care.

### Harm

Delayed treatment leading to avoidable clinical deterioration.

### Hazard

Diagnostic information failure.

### Hazardous situation

A patient with an urgent presentation receives a self-care recommendation and
does not seek timely care.

### Sequence of events

Symptom input falls outside the evaluation dataset distribution; the model
returns low acuity; no clinician review is triggered; the patient defers care.

### Risk controls description

1. Acuity ceiling rule evaluated deterministically outside the model.
2. Escalation to clinician review on any high-acuity pattern match.
3. Regression evaluation gate on the urgent-presentation dataset slice, run in
   CI before any device release.

<!--
  Likelihood (P1), harm probability (P2), total probability, severity and risk
  evaluation are deliberately absent. Those fields are computed by Ketryx's rule
  engine and are read-only on the item schema, so no authoring tool — human or
  model — can assert them. P_total is derived, never written.
-->
