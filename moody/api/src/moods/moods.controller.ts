import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoodsService } from './moods.service';
import { MoodLog } from './entities/mood-log.entity';
import { CreateMoodLogDto } from './dto/create-mood-log.dto';
import { IMoodLogsRO } from './interfaces/mood-log.interface';
import * as moment from 'moment'

@ApiTags('moods')
@Controller('moods')
export class MoodsController {
  constructor(private readonly moodService: MoodsService) {}

  @ApiOperation({ summary: 'List all mood logs, ordered by creation date' })
  @ApiQuery({ name: 'from', required: false, type: Date })
  @ApiQuery({ name: 'to', required: false, type: Date })
  @ApiResponse({ status: 200, type: [MoodLog] })
  @Get()
  async getMoodLogs(
    @Query('from') from?: Date,
    @Query('to') to?: Date,
  ): Promise<IMoodLogsRO> {
    
    let where = {
      createdAt: {
        $gte: from ? new Date(from) : moment().subtract(1, "year").toDate(),
        $lte: to ? new Date(to) : new Date(),
      }
    }  
    
    console.log(where)

    return this.moodService.findAll({
      where,
    });
  }

  @ApiOperation({ summary: 'Create mood log' })
  @ApiResponse({ status: 200, description: 'Forbidden.', type: MoodLog })
  @Post()
  async createMoodLog(
    @Body() createMoodLogDto: CreateMoodLogDto,
  ) {
    return this.moodService.create(createMoodLogDto);
  }
}

