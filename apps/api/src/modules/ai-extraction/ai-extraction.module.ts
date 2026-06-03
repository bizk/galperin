import { Module } from "@nestjs/common";
import { AiExtractionService } from "./ai-extraction.service.js";

@Module({
  exports: [AiExtractionService],
  providers: [AiExtractionService]
})
export class AiExtractionModule {}
