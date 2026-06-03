import { describe, expect, it } from "vitest";
import { FakeSupplierAdapter } from "./fake-supplier.adapter.js";
import type { SupplierSearchResult } from "../models/supplier-search-result.js";

describe("FakeSupplierAdapter", () => {
  it("returns deterministic product search results", async () => {
    const adapter: FakeSupplierAdapter = new FakeSupplierAdapter();

    const actualResult: SupplierSearchResult = await adapter.searchProducts({
      page: 1,
      query: "water bottle"
    });

    expect(actualResult.products).toHaveLength(1);
    expect(actualResult.products[0]?.title).toContain("water bottle");
    expect(actualResult.products[0]?.supplierName).toBe("Fake Manufacturing Co.");
  });
});
