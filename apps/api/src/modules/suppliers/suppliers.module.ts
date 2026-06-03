import { Module } from "@nestjs/common";
import { FakeSupplierAdapter } from "./adapters/fake-supplier.adapter.js";
import { SuppliersController } from "./suppliers.controller.js";
import { SuppliersService } from "./suppliers.service.js";

@Module({
  controllers: [SuppliersController],
  exports: [SuppliersService],
  providers: [FakeSupplierAdapter, SuppliersService]
})
export class SuppliersModule {}
