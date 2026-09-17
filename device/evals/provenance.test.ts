import { describe, it, expect } from "vitest";
import { recommend } from "../src/engine";
import { urgentPresentations } from "./datasets/urgent-presentations";

/**
 * Provenance regression.
 *
 * Every recommendation, regardless of disposition, must carry a complete
 * provenance stamp naming the model, the prompt revision, and the evaluation
 * dataset version that qualified the model.
 *
 * @itemId:tc-provenance-stamp
 * @itemType:Test Case
 * @itemTitle:"Every recommendation carries a complete provenance stamp"
 * @itemTests:rq-provenance,sw-provenance-stamp
 */
export async function everyRecommendationCarriesProvenance(): Promise<void> {
  for (const presentation of urgentPresentations) {
    const result = await recommend(presentation);
    expect(result.provenance.modelId).toMatch(/\S/);
    expect(result.provenance.promptRevision).toMatch(/^[0-9a-f]{7,40}$/);
    expect(result.provenance.evalDatasetVersion).toMatch(/\S/);
  }
}

describe("recommendation provenance", () => {
  it("stamps every recommendation", everyRecommendationCarriesProvenance);
});
