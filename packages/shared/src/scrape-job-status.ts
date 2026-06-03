export const scrapeJobStatuses: readonly string[] = [
  "pending",
  "processing",
  "completed",
  "failed"
] as const;

export type ScrapeJobStatus = (typeof scrapeJobStatuses)[number];
