import { z } from "zod";

export const presentationSchema = z.object({
  id: z.string(),
  symptoms: z.array(z.string()).min(1),
  durationHours: z.number().nonnegative().default(0),
  severity: z.enum(["mild", "moderate", "severe"]).default("mild"),
  ageBand: z.enum(["child", "adult", "older-adult"]).default("adult"),
});
export type Presentation = z.infer<typeof presentationSchema>;

export type Disposition = "self-care" | "routine-appointment" | "clinician-review";

export interface Provenance {
  modelId: string;
  promptRevision: string;
  evalDatasetVersion: string;
}

export interface Recommendation {
  disposition: Disposition;
  escalated: boolean;
  rationale: string;
  provenance: Provenance;
}

// Release manifest values. In production these are resolved at process start
// from the deployed release; here they are fixed so the sample is reproducible.
const manifest: Provenance = {
  modelId: "triage-foundation-model-2026-08",
  promptRevision: "a3f9c1e",
  evalDatasetVersion: "urgent-presentations@2026.09",
};

// The acuity ceiling pattern table. Deterministic, versioned with the code,
// evaluated outside the model. Any match forces escalation.
const HIGH_ACUITY_PATTERNS: ReadonlyArray<ReadonlySet<string>> = [
  new Set(["chest pain", "radiating to left arm"]),
  new Set(["chest pain", "shortness of breath"]),
  new Set(["sudden severe headache", "neck stiffness"]),
  new Set(["shortness of breath", "unilateral leg swelling"]),
  new Set(["fever", "altered mental status"]),
  new Set(["fever", "neck stiffness"]),
  new Set(["abdominal pain", "rigid abdomen"]),
  new Set(["sudden weakness", "facial droop"]),
];

const normalize = (s: string) => s.trim().toLowerCase();

export function matchesAcuityCeiling(symptoms: readonly string[]): boolean {
  const set = new Set(symptoms.map(normalize));
  return HIGH_ACUITY_PATTERNS.some((pattern) => [...pattern].every((s) => set.has(s)));
}

// Stand-in for model inference. A real deployment calls the hosted model; the
// sample ranks by severity so the ceiling has something to override.
async function inferDisposition(p: Presentation): Promise<Disposition> {
  if (p.severity === "severe") return "clinician-review";
  if (p.severity === "moderate" || p.durationHours > 72) return "routine-appointment";
  return "self-care";
}

export async function recommend(input: unknown): Promise<Recommendation> {
  const p = presentationSchema.parse(input);
  const modelDisposition = await inferDisposition(p);

  if (matchesAcuityCeiling(p.symptoms)) {
    return {
      disposition: "clinician-review",
      escalated: true,
      rationale: "Symptom set matches a high-acuity pattern; model output suppressed.",
      provenance: { ...manifest },
    };
  }

  return {
    disposition: modelDisposition,
    escalated: modelDisposition === "clinician-review",
    rationale: `Model disposition ${modelDisposition} within acuity ceiling.`,
    provenance: { ...manifest },
  };
}
