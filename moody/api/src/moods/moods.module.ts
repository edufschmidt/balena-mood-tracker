import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MoodLog } from './entities/mood-log.entity';
import { MoodsController } from './moods.controller';
import { MoodsService } from './moods.service';

@Module({
  providers: [MoodsService],
  controllers: [MoodsController],
  imports: [MikroOrmModule.forFeature({ entities: [MoodLog] })],
})
export class MoodsModule {}
