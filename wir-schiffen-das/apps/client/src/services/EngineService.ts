import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CheckAlgorithmStateDto,
  CheckConfigurationDto,
  MicroserviceAddressEnum,
  ReturnAlgorithmStateDto
} from '@wir-schiffen-das/types';
import {Observable, tap} from 'rxjs';
import { SessionService } from './SessionService';


@Injectable({providedIn: 'root'})
export class EngineService {
    sessionID: string;

    constructor(private http: HttpClient, private sessionService: SessionService) {
        this.sessionID = sessionService.getSessionId();
    }

    test() {
        console.log('EngineService.test()');

    }

  checkConfiguration(configDTO : CheckConfigurationDto): Observable<any> {
        console.log('EngineService.checkConfiguration()');
        return this.http.post('http://localhost:3000/api/anchor/CheckConfiguration', configDTO);
    }
  checkAlgorithmState(checkAlgorithmStateDto: CheckAlgorithmStateDto, microservice: MicroserviceAddressEnum): Observable<any> {
        console.log('EngineService.checkAlgorithmState()');
        return this.http.post<ReturnAlgorithmStateDto>(microservice + "status", checkAlgorithmStateDto);
    }

}
