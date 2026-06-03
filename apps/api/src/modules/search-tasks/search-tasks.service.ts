import { Injectable } from "@nestjs/common";
import type { SearchTaskDetail, SearchTaskSummary } from "@galperin/shared";
import { SearchTaskStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { ProductsService } from "../products/products.service.js";
import { ScraperJobsService } from "../scraper-jobs/scraper-jobs.service.js";
import { SuppliersService } from "../suppliers/suppliers.service.js";
import type { CreateSearchTaskDto } from "./dto/create-search-task.dto.js";
import { SearchTaskMapper, type SearchTaskWithCount, type SearchTaskWithProducts } from "./search-task.mapper.js";

/**
 * Coordinates product search task creation and reads.
 */
@Injectable()
export class SearchTasksService {
  private readonly searchTaskMapper: SearchTaskMapper;

  constructor(
    private readonly prismaService: PrismaService,
    productsService: ProductsService,
    private readonly scraperJobsService: ScraperJobsService,
    private readonly suppliersService: SuppliersService
  ) {
    this.searchTaskMapper = new SearchTaskMapper(productsService);
  }

  async createSearchTask(input: CreateSearchTaskDto): Promise<SearchTaskDetail> {
    const supplierKeys: readonly string[] = this.resolveSupplierKeys(input.supplierKeys);
    const searchTask = await this.prismaService.searchTask.create({
      data: {
        query: input.query.trim(),
        status: SearchTaskStatus.PENDING,
        supplierKeys: [...supplierKeys]
      }
    });

    await this.scraperJobsService.enqueueSupplierJobs({
      searchTaskId: searchTask.id,
      supplierKeys
    });

    return this.getSearchTask(searchTask.id);
  }

  async listSearchTasks(): Promise<readonly SearchTaskSummary[]> {
    const searchTasks: SearchTaskWithCount[] = await this.prismaService.searchTask.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return searchTasks.map((searchTask: SearchTaskWithCount) => this.searchTaskMapper.mapSummary(searchTask));
  }

  async getSearchTask(searchTaskId: string): Promise<SearchTaskDetail> {
    const searchTask: SearchTaskWithProducts = await this.prismaService.searchTask.findUniqueOrThrow({
      include: {
        products: {
          orderBy: {
            createdAt: "desc"
          }
        }
      },
      where: {
        id: searchTaskId
      }
    });

    return this.searchTaskMapper.mapDetail(searchTask);
  }

  private resolveSupplierKeys(inputSupplierKeys: readonly string[] = []): readonly string[] {
    if (inputSupplierKeys.length > 0) {
      return inputSupplierKeys;
    }

    return this.suppliersService.getDefaultSupplierKeys();
  }
}
