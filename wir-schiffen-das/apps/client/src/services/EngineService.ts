import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AlgorithmStateEnum,
  CheckAlgorithmStateDto,
  CheckConfigurationDto,
  MicroserviceAddressEnum,
  ReturnAlgorithmStateDto
} from '@wir-schiffen-das/types';
import { Observable, delay, distinctUntilChanged, interval, retry, switchMap, take, takeWhile, tap } from 'rxjs';
import { SessionService } from './SessionService';
import { AlgorithmState } from '@wir-schiffen-das/nestjs-types';


@Injectable({ providedIn: 'root' })
export class EngineService {
  sessionID: string;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.sessionID = sessionService.getSessionId();
  }

  test() {
    console.log('EngineService.test()');

  }

  checkConfiguration(configDTO: CheckConfigurationDto): Observable<any> {
    console.log('EngineService.checkConfiguration()');
    return this.http.post('http://localhost:3000/api/anchor/CheckConfiguration', configDTO);
  }
  checkAlgorithmState(checkAlgorithmStateDto: CheckAlgorithmStateDto, microservice: MicroserviceAddressEnum): Observable<ReturnAlgorithmStateDto> {
    console.log('EngineService.checkAlgorithmState()');

    return interval(3000)
      .pipe(
        switchMap(() => this.http.post<ReturnAlgorithmStateDto>(microservice + "status", checkAlgorithmStateDto)),
        retry({ delay: 3000, count: 5, resetOnSuccess: true }),
        distinctUntilChanged(),
        // tap(res => console.log(res)),
        takeWhile(res => (res.algorithmState !== AlgorithmStateEnum.ready) && (res.algorithmState !== AlgorithmStateEnum.failed), true),
      );
  }

}
