import { Controller, Get } from "@nestjs/common";
import type { SupplierAdapterMetadata } from "./supplier-adapter.js";
import { SuppliersService } from "./suppliers.service.js";

/**
 * Exposes supplier metadata to API clients.
 */
@Controller("suppliers")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  getSuppliers(): readonly SupplierAdapterMetadata[] {
    return this.suppliersService.getSupplierMetadata();
  }
}
