import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';
import {  CheckAlgorithmStateDto, ProdMicroserviceAddressEnum, DevMicroserviceAddressEnum, UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Observable, Subject, filter, firstValueFrom} from 'rxjs';
import { Kafka } from 'kafkajs';

// TODO make a new inheritance for the service only using the database

/**
 * AppService handles interactions with the database and external services.
 * It connects to a Kafka topic, receives messages, and provides a Kafka observable filtered by userId.
 */
@Injectable()
export class AppService implements OnModuleInit {
  apiUrls = process.env.production ? ProdMicroserviceAddressEnum : DevMicroserviceAddressEnum;

  private kafkaClient: Kafka;
  private kafkaSubject: Subject<UpdateKafkaAlgorithmStateDto> = new Subject();

  constructor(
    private readonly baseDatabase: BaseDatabaseServer,
    private readonly httpService: HttpService,
  ) { }


  /**
   * Lifecycle hook that runs once the module is initialized.
   * Connects to Kafka, subscribes to a topic, and listens for messages.
   */
  async onModuleInit() {
    this.kafkaClient = new Kafka({
      // clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    console.log("kafkaClient init");
    const kafkaConsumer =  this.kafkaClient.consumer({ groupId: 'wir-schiffen-das' });
    await kafkaConsumer.connect();

    await kafkaConsumer.subscribe({ topic: RegExp('config_update.*'), fromBeginning: true });

    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(topic);
        const updatemessage: UpdateKafkaAlgorithmStateDto = JSON.parse(message.value.toString());
        this.kafkaSubject.next(updatemessage);
      }
    });

  }
  /**
   * Returns an observable that filters Kafka messages by userId.
   *
   * @param userId - The userId used to filter Kafka messages.
   * @returns An observable filtered by userId.
   */
  public getKafkaObservable(userId: string) : Observable<any> {

    return this.kafkaSubject.pipe(
      // filter the messages by userId
      filter((message) => message.userId === userId)
    );

  }
  /**
   * Sends a POST request to the specified algorithm's API to get the status of the algorithm for a user.
   *
   * @param algorithm - The name of the algorithm.
   * @param checkStatus - The data object containing the user's algorithm state details.
   * @returns A promise that resolves with the response from the algorithm's API.
   */
  async getRESTAlgorithmStateForUser(algorithm: string, checkStatus: CheckAlgorithmStateDto): Promise<any> {

    return await firstValueFrom(
      this.httpService.post(
        this.apiUrls[algorithm] + 'Status',
        checkStatus
      )
    );
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
