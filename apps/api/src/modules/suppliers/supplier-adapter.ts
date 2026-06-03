import type { SupplierSearchInput } from "./models/supplier-search-input.js";
import type { SupplierSearchResult } from "./models/supplier-search-result.js";

export type SupplierCapability = "product-search";

export type SupplierAdapterMetadata = {
  readonly key: string;
  readonly displayName: string;
  readonly capabilities: readonly SupplierCapability[];
};

/**
 * Defines the integration boundary for supplier-specific search behavior.
 */
export interface SupplierAdapter {
  readonly metadata: SupplierAdapterMetadata;

  searchProducts(input: SupplierSearchInput): Promise<SupplierSearchResult>;
}
