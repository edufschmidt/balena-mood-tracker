import { IsString } from 'class-validator';

export class CreateMoodLogDto {
  
  @IsString()
  readonly raw: string;

  @IsString()
  readonly mood: string;

  @IsString()
  readonly intensifier?: string;
}
