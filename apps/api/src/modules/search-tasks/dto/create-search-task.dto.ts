import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

/**
 * Request body used to create a supplier product search task.
 */
export class CreateSearchTaskDto {
  @IsString()
  @MinLength(2)
  readonly query!: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  readonly supplierKeys?: readonly string[];
}
