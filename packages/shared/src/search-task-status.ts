export const searchTaskStatuses: readonly string[] = [
  "pending",
  "processing",
  "completed",
  "failed"
] as const;

export type SearchTaskStatus = (typeof searchTaskStatuses)[number];
