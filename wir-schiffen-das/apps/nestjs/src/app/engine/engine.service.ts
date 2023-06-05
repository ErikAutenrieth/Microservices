import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import CircuitBreaker from 'opossum';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { CreateAlgorithmStateDto, MicroserviceAddressEnum, InitializeAlgorithmMicroserviceDto } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';
import { Axios } from 'axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class EngineService {

    constructor( @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>, private httpService: HttpService) {

    }

    circuitBreakerOptions = {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 5000,
    };

    async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        const createdAlgorithmState = new this.algorithmState(createAlgorithmStateDto);
        return createdAlgorithmState.save();
      }


    async sendConfigurationToService(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto, microserviceAddressEnum: MicroserviceAddressEnum): Promise<any> {

      return await firstValueFrom(this.httpService.post(microserviceAddressEnum + "CheckConfiguration", initializeAlgorithmMicroserviceDto));
      // const apiCall = async () => await firstValueFrom(this.httpService.post( microserviceAddressEnum + "CheckConfiguration", initializeAlgorithmMicroserviceDto ));

      // const breaker = new CircuitBreaker(apiCall, this.circuitBreakerOptions);
      // breaker.fire()
      //   .then(console.log)
      //  .catch(console.error);
      

    }
 
      
}
