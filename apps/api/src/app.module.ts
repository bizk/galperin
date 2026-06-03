import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AiExtractionModule } from "./modules/ai-extraction/ai-extraction.module.js";
import { HealthModule } from "./modules/health/health.module.js";
import { PrismaModule } from "./modules/prisma/prisma.module.js";
import { ProductsModule } from "./modules/products/products.module.js";
import { ScraperJobsModule } from "./modules/scraper-jobs/scraper-jobs.module.js";
import { SearchTasksModule } from "./modules/search-tasks/search-tasks.module.js";
import { SuppliersModule } from "./modules/suppliers/suppliers.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>("REDIS_HOST", "localhost"),
          port: configService.get<number>("REDIS_PORT", 6379)
        }
      })
    }),
    PrismaModule,
    HealthModule,
    AiExtractionModule,
    ProductsModule,
    SuppliersModule,
    ScraperJobsModule,
    SearchTasksModule
  ]
})
export class AppModule {}
