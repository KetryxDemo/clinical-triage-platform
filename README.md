# Clinical Triage Platform — sample

Sample repository for a **Git-based item-only** Ketryx setup, modelling an
AI diagnostic product where device and non-device code share one repository.

All content here is synthetic sample data.

## The problem this layout solves

A single repository holds both the regulated device and the platform around it.
Those two things need different release cadences and very different amounts of
process:

| | `platform/**` | `device/**` |
|---|---|---|
| Release train | `v*` | `device-v*` |
| Cadence | daily | weekly |
| Design control | none | full |
| Ketryx project | Platform Services (Non-Device) | Diagnostic Engine (SaMD) |
| Items in Ketryx | none | requirements, risks, specs, tests |

The split is enforced by **path**, not by discipline. Two Ketryx projects read
this same repository with different glob patterns and different release refs, so
a platform commit cannot pull the device into review, and a device commit cannot
ship without one.

## Layout

```
device/                 under design control — scanned as Ketryx items
  requirements/*.md     Requirement items
  risks/*.md            Risk items
  specs/*.md            Software Item Spec items
  evals/*.test.ts       Test Cases (parsed by the `tests` parser)
platform/               NOT under design control — no items scanned
.github/workflows/
  device-release.yml    cuts device-v* independently of the platform train
```

## How an item becomes an item

Each Markdown file under `device/` is one configuration item. Front matter
carries identity and traceability; headings under `## Item fields` carry the
rich-text fields:

```yaml
---
itemId: risk-under-triage
itemType: Risk
itemIsRiskControlledBy: rq-acuity-ceiling, tc-urgent-regression
---
```

Traceability is authored in the file, by `itemId`, and resolves on sync — so the
traceability matrix is a consequence of the repository rather than a document
maintained beside it.

## What is deliberately not in these files

Risk files carry harm, hazard, hazardous situation, and sequence of events.
They do **not** carry likelihood, total probability, severity, or risk
evaluation. Those fields are read-only on the Ketryx item schema and are
computed by its rule engine.

That is the point: `P_total` is derived from `P1 × P2` deterministically, so no
authoring tool — a person, a script, or a coding agent — can assert a
probability that the arithmetic does not support.

## Two ways to split device from non-device

This repository demonstrates the **co-located** option: one repository, path
globs, a separate tagging action.

The alternative is to **split the device into its own repository**, where it
gets its own semver by construction and no glob is needed. That is cleaner and
costs a repository move. Both are supported; the co-located form is shown here
because it is the one that requires configuration to get right.

## Related

- Ketryx: Git-based configuration items — setup and file formats
- Ketryx: system-of-systems, for composing device and non-device versions at a
  system level
