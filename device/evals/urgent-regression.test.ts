import { describe, it, expect } from "vitest";
import { recommend } from "../src/engine";
import { urgentPresentations } from "./datasets/urgent-presentations";

/**
 * Urgent-presentation regression evaluation.
 *
 * Runs the urgent-presentation dataset slice through the engine. The passing
 * criterion is absolute: no case in the slice may yield a self-care
 * recommendation. Executed in CI on every prompt or model change; the run is
 * reported to Ketryx as a test execution against the requirement it tests and
 * stands as verification evidence for the under-triage risk.
 *
 * @itemId:tc-urgent-regression
 * @itemType:Test Case
 * @itemTitle:"Urgent presentations are never self-care"
 * @itemTests:rq-acuity-ceiling
 */
export async function urgentPresentationsAreNeverSelfCare(): Promise<void> {
  for (const presentation of urgentPresentations) {
    const result = await recommend(presentation);
    expect(result.disposition).not.toBe("self-care");
    expect(result.escalated).toBe(true);
  }
}

describe("urgent presentations are never self-care", () => {
  it("escalates every case in the urgent slice", urgentPresentationsAreNeverSelfCare);
});
