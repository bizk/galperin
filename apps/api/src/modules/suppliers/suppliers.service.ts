import { Injectable, NotFoundException } from "@nestjs/common";
import { FakeSupplierAdapter } from "./adapters/fake-supplier.adapter.js";
import type { SupplierAdapter, SupplierAdapterMetadata } from "./supplier-adapter.js";

/**
 * Registry for supplier adapters available to the scraping pipeline.
 */
@Injectable()
export class SuppliersService {
  private readonly adaptersByKey: ReadonlyMap<string, SupplierAdapter>;

  constructor(fakeSupplierAdapter: FakeSupplierAdapter) {
    this.adaptersByKey = new Map<string, SupplierAdapter>([
      [fakeSupplierAdapter.metadata.key, fakeSupplierAdapter]
    ]);
  }

  getDefaultSupplierKeys(): readonly string[] {
    return Array.from(this.adaptersByKey.keys());
  }

  getSupplierMetadata(): readonly SupplierAdapterMetadata[] {
    return Array.from(this.adaptersByKey.values()).map((adapter: SupplierAdapter) => adapter.metadata);
  }

  getAdapterByKey(supplierKey: string): SupplierAdapter {
    const adapter: SupplierAdapter | undefined = this.adaptersByKey.get(supplierKey);

    if (!adapter) {
      throw new NotFoundException(`Supplier adapter '${supplierKey}' is not registered.`);
    }

    return adapter;
  }
}
