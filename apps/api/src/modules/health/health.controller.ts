import { Controller, Get } from "@nestjs/common";

type HealthResponse = {
  readonly status: "ok";
};

/**
 * Exposes lightweight smoke-test endpoints for the API.
 */
@Controller("health")
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: "ok"
    };
  }
}
