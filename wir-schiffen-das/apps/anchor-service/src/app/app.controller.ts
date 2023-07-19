import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Customer } from '@wir-schiffen-das/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('hello')
  getHello() {
    const cost = new Customer('John Doe', 'email');
    return cost.toString();
  }
}
