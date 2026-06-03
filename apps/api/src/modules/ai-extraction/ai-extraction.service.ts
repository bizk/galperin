import { Injectable } from "@nestjs/common";
import type { SupplierSearchProduct } from "../suppliers/models/supplier-search-result.js";

/**
 * Wraps AI-assisted extraction and enrichment behind a replaceable boundary.
 */
@Injectable()
export class AiExtractionService {
  async normalizeProducts(products: readonly SupplierSearchProduct[]): Promise<readonly SupplierSearchProduct[]> {
    return products;
  }
}
