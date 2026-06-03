import { Injectable } from "@nestjs/common";
import type { SupplierProductSummary } from "@galperin/shared";
import type { SupplierProduct } from "@prisma/client";
import type { SupplierSearchProduct } from "../suppliers/models/supplier-search-result.js";
import { PrismaService } from "../prisma/prisma.service.js";

type SaveSupplierProductsInput = {
  readonly searchTaskId: string;
  readonly supplierKey: string;
  readonly products: readonly SupplierSearchProduct[];
};

/**
 * Persists and reads supplier products discovered by scraper jobs.
 */
@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveSupplierProducts(input: SaveSupplierProductsInput): Promise<number> {
    if (input.products.length === 0) {
      return 0;
    }

    await this.prismaService.supplierProduct.createMany({
      data: input.products.map((product: SupplierSearchProduct) => ({
        imageUrl: product.imageUrl,
        minimumOrderQuantity: product.minimumOrderQuantity,
        price: product.price,
        productUrl: product.productUrl,
        rawPayload: product.rawPayload,
        searchTaskId: input.searchTaskId,
        supplierKey: input.supplierKey,
        supplierName: product.supplierName,
        supplierRating: product.supplierRating,
        title: product.title
      }))
    });

    return input.products.length;
  }

  mapSupplierProduct(product: SupplierProduct): SupplierProductSummary {
    return {
      createdAt: product.createdAt.toISOString(),
      id: product.id,
      imageUrl: product.imageUrl,
      minimumOrderQuantity: product.minimumOrderQuantity,
      price: product.price,
      productUrl: product.productUrl,
      supplierKey: product.supplierKey,
      supplierName: product.supplierName,
      supplierRating: product.supplierRating,
      title: product.title
    };
  }
}
