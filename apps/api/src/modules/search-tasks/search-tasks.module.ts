import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { ProductsModule } from "../products/products.module.js";
import { ScraperJobsModule } from "../scraper-jobs/scraper-jobs.module.js";
import { SuppliersModule } from "../suppliers/suppliers.module.js";
import { SearchTasksController } from "./search-tasks.controller.js";
import { SearchTasksService } from "./search-tasks.service.js";

@Module({
  controllers: [SearchTasksController],
  imports: [PrismaModule, ProductsModule, ScraperJobsModule, SuppliersModule],
  providers: [SearchTasksService]
})
export class SearchTasksModule {}
