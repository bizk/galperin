import type { SearchTaskDetail, SearchTaskStatus, SearchTaskSummary } from "@galperin/shared";
import type { Prisma, SearchTaskStatus as PrismaSearchTaskStatus } from "@prisma/client";
import { ProductsService } from "../products/products.service.js";

export type SearchTaskWithCount = Prisma.SearchTaskGetPayload<{
  include: {
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;

export type SearchTaskWithProducts = Prisma.SearchTaskGetPayload<{
  include: {
    products: true;
  };
}>;

/**
 * Converts persistence models to public search task contracts.
 */
export class SearchTaskMapper {
  constructor(private readonly productsService: ProductsService) {}

  mapSummary(searchTask: SearchTaskWithCount): SearchTaskSummary {
    return {
      createdAt: searchTask.createdAt.toISOString(),
      errorMessage: searchTask.errorMessage,
      id: searchTask.id,
      productCount: searchTask._count.products,
      query: searchTask.query,
      status: this.mapStatus(searchTask.status),
      supplierKeys: searchTask.supplierKeys,
      updatedAt: searchTask.updatedAt.toISOString()
    };
  }

  mapDetail(searchTask: SearchTaskWithProducts): SearchTaskDetail {
    return {
      createdAt: searchTask.createdAt.toISOString(),
      errorMessage: searchTask.errorMessage,
      id: searchTask.id,
      productCount: searchTask.products.length,
      products: searchTask.products.map((product) => this.productsService.mapSupplierProduct(product)),
      query: searchTask.query,
      status: this.mapStatus(searchTask.status),
      supplierKeys: searchTask.supplierKeys,
      updatedAt: searchTask.updatedAt.toISOString()
    };
  }

  private mapStatus(status: PrismaSearchTaskStatus): SearchTaskStatus {
    return status.toLowerCase() as SearchTaskStatus;
  }
}
