# Clinical Triage Platform — sample

Sample repository for a **Git-based item-only** Ketryx setup, modelling an AI
diagnostic product where device and non-device code share one repository and one
Ketryx project.

All content here is synthetic sample data.

## Two boundaries

This layout draws two lines that are easy to confuse. They are independent.

### 1. Device vs. non-device — drawn by path

| | `platform/**` | `device/**` |
|---|---|---|
| Release train | `v*` | `device-v*` |
| Cadence | daily | weekly |
| Design control | none | full |
| Scanned as Ketryx items | no | yes |

One repository, one Ketryx project, two tag trains. Ketryx scans **only**
`device/**` for configuration items, so platform code cannot become a controlled
item however often it ships. The boundary is enforced by path, not by
discipline: moving a file into `device/` is what puts it under design control.

`.github/workflows/device-release.yml` runs on `device/**` changes and reports
test results to Ketryx. `platform-release.yml` runs on everything else and
reports nothing. The absence of a compliance step in the second file is the
point.

### 2. Git-owned vs. Ketryx-owned items — drawn by item type

| Item type | Lives in | Why |
|---|---|---|
| Requirement | Git | authored with the code that implements it |
| Software Item Spec | Git | describes code; belongs beside it |
| Test Case | Git | the test *is* the file |
| **Risk** | **Ketryx** | probability arithmetic is computed, not authored |
| **CAPA, complaint, nonconformance** | **Ketryx** | quality records, no code counterpart |

Risks are deliberately **not** in this repository. On the Ketryx Risk schema,
likelihood (P1), harm probability (P2), total probability, severity, and risk
evaluation are read-only — computed by its rule engine. `P_total` is derived
from `P1 × P2` deterministically, so no authoring tool (a person, a script, or a
coding agent) can assert a probability the arithmetic does not support. Putting
risk files in Git would invite exactly that.

Traceability still crosses the boundary: a Git requirement is linked as a risk
control measure from the Ketryx side. The sample risk *Under-triage of
high-acuity presentation* is a Ketryx-native item whose control measure is
`rq-acuity-ceiling` in this repository.

Quality records (CAPA, nonconformance, complaint, document control) follow the
Ketryx eQMS configuration blueprint and are tracked as a separate task:
[issue #1](https://github.com/KetryxDemo/clinical-triage-platform/issues/1).

## Layout

```
device/                 under design control — scanned as Ketryx items
  requirements/*.md     Requirement items
  specs/*.md            Software Item Spec items
  evals/*.test.ts       Test Cases (parsed by the `typescript` parser)
  evals/datasets/       evaluation data, versioned with the tests
platform/               NOT under design control — no items scanned
.github/workflows/
  device-release.yml    evals + Ketryx reporting, then tags device-v*
  platform-release.yml  tags v*, reports nothing
```

## How a file becomes an item

Each Markdown file under `device/` is one configuration item. Front matter
carries identity and traceability; headings under `## Item fields` carry the
rich-text fields:

```yaml
---
itemId: rq-acuity-ceiling
itemType: Requirement
Requirement type: Software
---
```

Test files declare what they cover with a tag comment:

```ts
/** @tests:rq-acuity-ceiling */
```

Traceability is authored in the file, by `itemId`, and resolves on sync — so the
traceability matrix is a consequence of the repository rather than a document
maintained beside it.

## Two ways to split device from non-device

This repository demonstrates the **co-located** option: one repository, path
globs, separate tagging workflows.

The alternative is to **split the device into its own repository**, where it
gets its own semver by construction and no glob is needed. That is cleaner and
costs a repository move. Both are supported; the co-located form is shown here
because it is the one that needs configuration to get right.

## Related

- Ketryx: Git-based configuration items — setup and file formats
- Ketryx: eQMS configuration blueprint, for the Ketryx-side quality items
