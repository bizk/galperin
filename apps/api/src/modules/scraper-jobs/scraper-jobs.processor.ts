import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { ScrapeJobStatus, SearchTaskStatus } from "@prisma/client";
import type { Job } from "bullmq";
import { AiExtractionService } from "../ai-extraction/ai-extraction.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ProductsService } from "../products/products.service.js";
import type { SupplierSearchProduct, SupplierSearchResult } from "../suppliers/models/supplier-search-result.js";
import type { SupplierAdapter } from "../suppliers/supplier-adapter.js";
import { SuppliersService } from "../suppliers/suppliers.service.js";
import { SCRAPER_QUEUE_NAME } from "./scraper-job.constants.js";
import type { ScraperJobPayload } from "./models/scraper-job-payload.js";

/**
 * Executes queued supplier scraping jobs.
 */
@Injectable()
@Processor(SCRAPER_QUEUE_NAME)
export class ScraperJobsProcessor extends WorkerHost {
  constructor(
    private readonly aiExtractionService: AiExtractionService,
    private readonly prismaService: PrismaService,
    private readonly productsService: ProductsService,
    private readonly suppliersService: SuppliersService
  ) {
    super();
  }

  async process(job: Job<ScraperJobPayload>): Promise<void> {
    const payload: ScraperJobPayload = job.data;

    await this.markJobProcessing(payload.scrapeJobId);

    try {
      await this.executeSupplierSearch(payload);
      await this.markJobCompleted(payload.scrapeJobId);
      await this.finalizeSearchTask(payload.searchTaskId);
    } catch (error: unknown) {
      await this.markJobFailed(payload.scrapeJobId, error);
      await this.finalizeSearchTask(payload.searchTaskId);
      throw error;
    }
  }

  private async executeSupplierSearch(payload: ScraperJobPayload): Promise<void> {
    const searchTask = await this.prismaService.searchTask.findUniqueOrThrow({
      where: {
        id: payload.searchTaskId
      }
    });
    const adapter: SupplierAdapter = this.suppliersService.getAdapterByKey(payload.supplierKey);
    const result: SupplierSearchResult = await adapter.searchProducts({
      page: 1,
      query: searchTask.query
    });
    const normalizedProducts: readonly SupplierSearchProduct[] =
      await this.aiExtractionService.normalizeProducts(result.products);

    await this.productsService.saveSupplierProducts({
      products: normalizedProducts,
      searchTaskId: payload.searchTaskId,
      supplierKey: payload.supplierKey
    });
  }

  private async markJobProcessing(scrapeJobId: string): Promise<void> {
    await this.prismaService.scrapeJob.update({
      data: {
        attempts: {
          increment: 1
        },
        startedAt: new Date(),
        status: ScrapeJobStatus.PROCESSING
      },
      where: {
        id: scrapeJobId
      }
    });
  }

  private async markJobCompleted(scrapeJobId: string): Promise<void> {
    await this.prismaService.scrapeJob.update({
      data: {
        finishedAt: new Date(),
        status: ScrapeJobStatus.COMPLETED
      },
      where: {
        id: scrapeJobId
      }
    });
  }

  private async markJobFailed(scrapeJobId: string, error: unknown): Promise<void> {
    await this.prismaService.scrapeJob.update({
      data: {
        errorMessage: this.getErrorMessage(error),
        finishedAt: new Date(),
        status: ScrapeJobStatus.FAILED
      },
      where: {
        id: scrapeJobId
      }
    });
  }

  private async finalizeSearchTask(searchTaskId: string): Promise<void> {
    const unfinishedJobCount: number = await this.prismaService.scrapeJob.count({
      where: {
        searchTaskId,
        status: {
          in: [ScrapeJobStatus.PENDING, ScrapeJobStatus.PROCESSING]
        }
      }
    });

    if (unfinishedJobCount > 0) {
      return;
    }

    const failedJobCount: number = await this.prismaService.scrapeJob.count({
      where: {
        searchTaskId,
        status: ScrapeJobStatus.FAILED
      }
    });
    const nextStatus: SearchTaskStatus =
      failedJobCount > 0 ? SearchTaskStatus.FAILED : SearchTaskStatus.COMPLETED;

    await this.prismaService.searchTask.update({
      data: {
        errorMessage: failedJobCount > 0 ? "One or more supplier scrape jobs failed." : null,
        status: nextStatus
      },
      where: {
        id: searchTaskId
      }
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown scraper job error.";
  }
}
