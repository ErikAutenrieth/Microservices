import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AlgorithmStateEnum,
  CheckAlgorithmStateDto,
  CheckConfigurationDto,
  DevMicroserviceAddressEnum,
  ReturnAlgorithmStateDto
} from '@wir-schiffen-das/types';
import { Observable, delay, distinctUntilChanged, interval, retry, switchMap, take, takeWhile, tap } from 'rxjs';
import { SessionService } from './SessionService';
import { environment } from './../environments/environment';

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
    return this.http.post(environment.anchorAPI + 'CheckConfiguration', configDTO);
  }

  /**
   * Checks the algorithm state by sending periodic HTTP POST requests to the specified microservice.
   *
   * @param checkAlgorithmStateDto - The data object containing the algorithm state information to be checked.
   * @param microservice - The enum value representing the address of the microservice to send the requests to.
   * @returns An Observable emitting the algorithm state information wrapped in a ReturnAlgorithmStateDto.
   */
  checkAlgorithmState(checkAlgorithmStateDto: CheckAlgorithmStateDto, microservice: DevMicroserviceAddressEnum): Observable<ReturnAlgorithmStateDto> {
    return interval(3000) // Emits a value every 3000 milliseconds (3 seconds)
      .pipe(
        // Makes an HTTP POST request to check the algorithm state
        switchMap(() => this.http.post<ReturnAlgorithmStateDto>(microservice + "status", checkAlgorithmStateDto)),
        retry({ delay: 3000, count: 5, resetOnSuccess: true }), // Retries the HTTP POST request up to 5 times with a 3 seconds delay between retries
        distinctUntilChanged(), // Emits only distinct algorithm states
        // Emits values until the algorithm state is either "ready" or "failed"
        takeWhile(res => (res.algorithmState !== AlgorithmStateEnum.ready) && (res.algorithmState !== AlgorithmStateEnum.failed), true)
      );
  }

}
