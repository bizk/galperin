import { SearchTaskStatus } from "@prisma/client";
import type { Queue } from "bullmq";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PrismaService } from "../prisma/prisma.service.js";
import { SCRAPER_JOB_NAME } from "./scraper-job.constants.js";
import type { ScraperJobPayload } from "./models/scraper-job-payload.js";
import { ScraperJobsService } from "./scraper-jobs.service.js";

describe("ScraperJobsService", () => {
  const createScrapeJobMock = vi.fn();
  const updateSearchTaskMock = vi.fn();
  const addQueueJobMock = vi.fn();

  beforeEach(() => {
    createScrapeJobMock.mockReset();
    updateSearchTaskMock.mockReset();
    addQueueJobMock.mockReset();
  });

  it("creates one durable scrape job per supplier and enqueues each job", async () => {
    createScrapeJobMock
      .mockResolvedValueOnce({
        id: "job-1",
        searchTaskId: "task-1",
        supplierKey: "fake"
      })
      .mockResolvedValueOnce({
        id: "job-2",
        searchTaskId: "task-1",
        supplierKey: "alibaba"
      });
    updateSearchTaskMock.mockResolvedValue({
      id: "task-1"
    });
    addQueueJobMock.mockResolvedValue({
      id: "queue-job-1"
    });

    const prismaService: PrismaService = {
      scrapeJob: {
        create: createScrapeJobMock
      },
      searchTask: {
        update: updateSearchTaskMock
      }
    } as unknown as PrismaService;
    const queue: Queue<ScraperJobPayload> = {
      add: addQueueJobMock
    } as unknown as Queue<ScraperJobPayload>;
    const service: ScraperJobsService = new ScraperJobsService(prismaService, queue);

    await service.enqueueSupplierJobs({
      searchTaskId: "task-1",
      supplierKeys: ["fake", "alibaba"]
    });

    expect(createScrapeJobMock).toHaveBeenCalledTimes(2);
    expect(addQueueJobMock).toHaveBeenCalledWith(SCRAPER_JOB_NAME, {
      scrapeJobId: "job-1",
      searchTaskId: "task-1",
      supplierKey: "fake"
    });
    expect(addQueueJobMock).toHaveBeenCalledWith(SCRAPER_JOB_NAME, {
      scrapeJobId: "job-2",
      searchTaskId: "task-1",
      supplierKey: "alibaba"
    });
    expect(updateSearchTaskMock).toHaveBeenCalledWith({
      data: {
        status: SearchTaskStatus.PROCESSING
      },
      where: {
        id: "task-1"
      }
    });
  });
});
