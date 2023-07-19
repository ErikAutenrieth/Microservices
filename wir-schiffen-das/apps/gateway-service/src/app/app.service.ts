import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbstractAppService, BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';
import { InitializeAlgorithmMicroserviceDto, ConfigurationDatabaseDto, CheckAlgorithmStateDto, ReturnAlgorithmStateDto, ProdMicroserviceAddressEnum, DevMicroserviceAddressEnum } from '@wir-schiffen-das/types';
import { firstValueFrom } from 'rxjs';

// TODO make a new inheritance for the service only using the database
@Injectable()
export class AppService extends AbstractAppService {

  apiUrls = process.env.production ? ProdMicroserviceAddressEnum : DevMicroserviceAddressEnum;
constructor(private baseDatabase: BaseDatabaseServer,private readonly httpService: HttpService) {
  super( baseDatabase, null);
}


  checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  checkKafkaCompactibility(configuration: ConfigurationDatabaseDto): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  async getAlgorithmStateForUser(algorithm: string, checkStatus: CheckAlgorithmStateDto): Promise<any> {
    
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
