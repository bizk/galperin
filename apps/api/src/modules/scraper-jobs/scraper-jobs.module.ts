import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { AiExtractionModule } from "../ai-extraction/ai-extraction.module.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { ProductsModule } from "../products/products.module.js";
import { SuppliersModule } from "../suppliers/suppliers.module.js";
import { SCRAPER_QUEUE_NAME } from "./scraper-job.constants.js";
import { ScraperJobsProcessor } from "./scraper-jobs.processor.js";
import { ScraperJobsService } from "./scraper-jobs.service.js";

@Module({
  exports: [ScraperJobsService],
  imports: [
    BullModule.registerQueue({
      name: SCRAPER_QUEUE_NAME
    }),
    AiExtractionModule,
    PrismaModule,
    ProductsModule,
    SuppliersModule
  ],
  providers: [ScraperJobsProcessor, ScraperJobsService]
})
export class ScraperJobsModule {}
