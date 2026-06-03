import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { SearchTaskDetail, SearchTaskSummary } from "@galperin/shared";
import { CreateSearchTaskDto } from "./dto/create-search-task.dto.js";
import { SearchTasksService } from "./search-tasks.service.js";

/**
 * Handles product search task API requests.
 */
@Controller("search-tasks")
export class SearchTasksController {
  constructor(private readonly searchTasksService: SearchTasksService) {}

  @Post()
  createSearchTask(@Body() input: CreateSearchTaskDto): Promise<SearchTaskDetail> {
    return this.searchTasksService.createSearchTask(input);
  }

  @Get()
  listSearchTasks(): Promise<readonly SearchTaskSummary[]> {
    return this.searchTasksService.listSearchTasks();
  }

  @Get(":id")
  getSearchTask(@Param("id") searchTaskId: string): Promise<SearchTaskDetail> {
    return this.searchTasksService.getSearchTask(searchTaskId);
  }
}
