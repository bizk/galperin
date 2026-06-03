import { describe, expect, it } from "vitest";
import { searchTaskStatuses } from "./search-task-status.js";

describe("searchTaskStatuses", () => {
  it("contains the public search task lifecycle statuses", () => {
    expect(searchTaskStatuses).toEqual(["pending", "processing", "completed", "failed"]);
  });
});
