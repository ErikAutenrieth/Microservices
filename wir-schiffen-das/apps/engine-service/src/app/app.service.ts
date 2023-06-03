import { Injectable } from '@nestjs/common';
import { DatabaseSubscriptionService } from './database.subscription.service';

@Injectable()
export class AppService {

  constructor(private DatabaseSubscriptionService: DatabaseSubscriptionService) { }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
