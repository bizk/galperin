import type { Prisma } from "@prisma/client";

export type SupplierSearchProduct = {
  readonly title: string;
  readonly productUrl: string;
  readonly imageUrl: string | null;
  readonly price: string | null;
  readonly minimumOrderQuantity: string | null;
  readonly supplierName: string | null;
  readonly supplierRating: string | null;
  readonly rawPayload: Prisma.InputJsonValue;
};

export type SupplierSearchResult = {
  readonly products: readonly SupplierSearchProduct[];
};
