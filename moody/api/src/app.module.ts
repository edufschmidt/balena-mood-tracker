import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MoodsModule } from './moods/moods.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { staticPath } from './environment';

@Module({
  imports: [
    MoodsModule,
    ServeStaticModule.forRoot({
      rootPath: staticPath,
      exclude: ['/api*'],
    }),
    MikroOrmModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
