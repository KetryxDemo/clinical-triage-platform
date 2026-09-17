---
itemId: sw-provenance-stamp
itemType: Software Item Spec
itemFulfills: rq-provenance
---

# Recommendation provenance stamp

## Item fields

### Description

Every recommendation returned by the engine carries an immutable provenance
stamp attached before the response leaves the inference boundary. The stamp
records the model identifier, the prompt revision hash, and the version of the
evaluation dataset that qualified the model.

The stamp is written by the same code path that produces the recommendation,
so a recommendation cannot exist without one. It is persisted alongside the
encounter record and is never rewritten.

### Inputs

Model identifier, prompt revision hash, and evaluation dataset version, all
resolved at process start from the deployed release manifest.

### Outputs

A `provenance` object on every recommendation with the three fields above.
