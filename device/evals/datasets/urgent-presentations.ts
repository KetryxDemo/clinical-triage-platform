/**
 * Urgent-presentation dataset slice.
 *
 * Synthetic sample data. In a real setup this slice is assembled from the
 * clinical data lake and versioned, so a recommendation can be traced back to
 * the exact dataset revision that qualified its model.
 */
export interface Presentation {
  id: string;
  symptoms: string[];
  expectedDisposition: "emergency" | "urgent-care";
}

export const urgentPresentations: Presentation[] = [
  { id: "up-001", symptoms: ["chest pain", "radiating to left arm", "diaphoresis"], expectedDisposition: "emergency" },
  { id: "up-002", symptoms: ["sudden severe headache", "neck stiffness", "photophobia"], expectedDisposition: "emergency" },
  { id: "up-003", symptoms: ["shortness of breath", "unilateral leg swelling"], expectedDisposition: "emergency" },
  { id: "up-004", symptoms: ["fever", "altered mental status"], expectedDisposition: "emergency" },
  { id: "up-005", symptoms: ["abdominal pain", "rigid abdomen", "vomiting"], expectedDisposition: "urgent-care" },
];
