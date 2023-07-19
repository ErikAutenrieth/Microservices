import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, BaseDatabaseServer],
})
export class AppModule { }
