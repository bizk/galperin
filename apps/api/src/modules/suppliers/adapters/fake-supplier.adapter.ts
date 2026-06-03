import { Injectable } from "@nestjs/common";
import type { SupplierSearchInput } from "../models/supplier-search-input.js";
import type { SupplierSearchResult } from "../models/supplier-search-result.js";
import type { SupplierAdapter, SupplierAdapterMetadata } from "../supplier-adapter.js";

/**
 * Provides deterministic supplier results for local pipeline validation.
 */
@Injectable()
export class FakeSupplierAdapter implements SupplierAdapter {
  readonly metadata: SupplierAdapterMetadata = {
    capabilities: ["product-search"],
    displayName: "Fake Supplier",
    key: "fake"
  };

  async searchProducts(input: SupplierSearchInput): Promise<SupplierSearchResult> {
    const normalizedQuery: string = input.query.trim();

    return {
      products: [
        {
          imageUrl: null,
          minimumOrderQuantity: "100 units",
          price: "$12.50 - $18.00",
          productUrl: `https://example.com/suppliers/fake/products/${encodeURIComponent(normalizedQuery)}`,
          rawPayload: {
            page: input.page,
            query: normalizedQuery,
            source: "fake"
          },
          supplierName: "Fake Manufacturing Co.",
          supplierRating: "4.8",
          title: `${normalizedQuery} supplier sample`
        }
      ]
    };
  }
}
