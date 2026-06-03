import type { CreateSearchTaskRequest, SearchTaskDetail, SearchTaskSummary } from "@galperin/shared";

const DEFAULT_API_URL: string = "http://localhost:3001";

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

async function parseResponse<TResponse>(response: Response): Promise<TResponse> {
  if (response.ok) {
    return (await response.json()) as TResponse;
  }

  const responseText: string = await response.text();
  throw new Error(responseText || `API request failed with status ${response.status}.`);
}

export async function createSearchTask(input: CreateSearchTaskRequest): Promise<SearchTaskDetail> {
  const response: Response = await fetch(`${getApiUrl()}/search-tasks`, {
    body: JSON.stringify(input),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  return parseResponse<SearchTaskDetail>(response);
}

export async function listSearchTasks(): Promise<readonly SearchTaskSummary[]> {
  const response: Response = await fetch(`${getApiUrl()}/search-tasks`, {
    cache: "no-store"
  });

  return parseResponse<readonly SearchTaskSummary[]>(response);
}

export async function getSearchTask(searchTaskId: string): Promise<SearchTaskDetail> {
  const response: Response = await fetch(`${getApiUrl()}/search-tasks/${searchTaskId}`, {
    cache: "no-store"
  });

  return parseResponse<SearchTaskDetail>(response);
}
