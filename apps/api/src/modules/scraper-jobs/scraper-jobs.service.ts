import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { ScrapeJobStatus, SearchTaskStatus } from "@prisma/client";
import type { Queue } from "bullmq";
import { PrismaService } from "../prisma/prisma.service.js";
import { SCRAPER_JOB_NAME, SCRAPER_QUEUE_NAME } from "./scraper-job.constants.js";
import type { ScraperJobPayload } from "./models/scraper-job-payload.js";

type EnqueueSupplierJobsInput = {
  readonly searchTaskId: string;
  readonly supplierKeys: readonly string[];
};

/**
 * Creates durable scrape job records and schedules queue work.
 */
@Injectable()
export class ScraperJobsService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectQueue(SCRAPER_QUEUE_NAME)
    private readonly scraperQueue: Queue<ScraperJobPayload>
  ) {}

  async enqueueSupplierJobs(input: EnqueueSupplierJobsInput): Promise<void> {
    const createdJobs = await Promise.all(
      input.supplierKeys.map((supplierKey: string) =>
        this.prismaService.scrapeJob.create({
          data: {
            searchTaskId: input.searchTaskId,
            status: ScrapeJobStatus.PENDING,
            supplierKey
          }
        })
      )
    );

    await Promise.all(
      createdJobs.map((scrapeJob) =>
        this.scraperQueue.add(SCRAPER_JOB_NAME, {
          scrapeJobId: scrapeJob.id,
          searchTaskId: scrapeJob.searchTaskId,
          supplierKey: scrapeJob.supplierKey
        })
      )
    );

    await this.prismaService.searchTask.update({
      data: {
        status: SearchTaskStatus.PROCESSING
      },
      where: {
        id: input.searchTaskId
      }
    });
  }
}
