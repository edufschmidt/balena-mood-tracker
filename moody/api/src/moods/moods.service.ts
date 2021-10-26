import { Injectable } from '@nestjs/common';
import { CreateMoodLogDto } from './dto/create-mood-log.dto';
import { IMoodLogsRO } from './interfaces/mood-log.interface';
import { EntityRepository, FilterQuery, FindOptions } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MoodLog } from './entities/mood-log.entity';

@Injectable()
export class MoodsService {
  constructor(
    @InjectRepository(MoodLog)
    private readonly moodLogRepository: EntityRepository<MoodLog>,
  ) { }

  async findAll(params: {
    where?: FilterQuery<MoodLog>,
    options?: FindOptions<MoodLog, any>
  }): Promise<IMoodLogsRO> {
    const moodLogs = await this.moodLogRepository.find(params.where, { orderBy: { 'createdAt': 'DESC' } })
    return { items: moodLogs.map(el => el), count: moodLogs.length };
  }

  async create(dto: CreateMoodLogDto) {
    const moodLog = new MoodLog(dto.raw, dto.mood, dto.intensifier);
    await this.moodLogRepository.persistAndFlush([moodLog])
  }
}
