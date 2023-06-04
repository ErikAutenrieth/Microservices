import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { CreateAlgorithmStateDto, MicroserviceAddressEnum, InitializeAlgorithmMicroserviceDto } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';

@Injectable()
export class EngineService {

    constructor( @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>, private httpService: HttpService) {
    }

    async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        const createdAlgorithmState = new this.algorithmState(createAlgorithmStateDto);
        return createdAlgorithmState.save();
      }


    async sendConfigurationToService(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto, microserviceAddressEnum: MicroserviceAddressEnum) {

      //TODO add interceptor
      return this.httpService.post(microserviceAddressEnum + "CheckConfiguration", initializeAlgorithmMicroserviceDto)

    }
 
      
}
