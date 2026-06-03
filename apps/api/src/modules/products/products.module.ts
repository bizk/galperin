import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { ProductsService } from "./products.service.js";

@Module({
  exports: [ProductsService],
  imports: [PrismaModule],
  providers: [ProductsService]
})
export class ProductsModule {}
