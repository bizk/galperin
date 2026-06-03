import type { SearchTaskStatus } from "./search-task-status.js";

export type CreateSearchTaskRequest = {
  readonly query: string;
  readonly supplierKeys?: readonly string[];
};

export type SearchTaskSummary = {
  readonly id: string;
  readonly query: string;
  readonly status: SearchTaskStatus;
  readonly supplierKeys: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly errorMessage: string | null;
  readonly productCount: number;
};

export type SupplierProductSummary = {
  readonly id: string;
  readonly supplierKey: string;
  readonly title: string;
  readonly productUrl: string;
  readonly imageUrl: string | null;
  readonly price: string | null;
  readonly minimumOrderQuantity: string | null;
  readonly supplierName: string | null;
  readonly supplierRating: string | null;
  readonly createdAt: string;
};

export type SearchTaskDetail = SearchTaskSummary & {
  readonly products: readonly SupplierProductSummary[];
};
