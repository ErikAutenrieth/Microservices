import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AlgorithmStateEnum,
  CheckAlgorithmStateDto,
  CheckConfigurationDto,
  MicroserviceAddressEnum,
  ReturnAlgorithmStateDto
} from '@wir-schiffen-das/types';
import {Observable, delay, distinctUntilChanged, interval, retry, switchMap, take, takeWhile, tap} from 'rxjs';
import {SessionService} from './SessionService';


@Injectable({providedIn: 'root'})
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

  /**
   * Checks the algorithm state by sending periodic HTTP POST requests to the specified microservice.
   *
   * @param checkAlgorithmStateDto - The data object containing the algorithm state information to be checked.
   * @param microservice - The enum value representing the address of the microservice to send the requests to.
   * @returns An Observable emitting the algorithm state information wrapped in a ReturnAlgorithmStateDto.
   */
  checkAlgorithmState(checkAlgorithmStateDto: CheckAlgorithmStateDto, microservice: MicroserviceAddressEnum): Observable<ReturnAlgorithmStateDto> {
    console.log('EngineService.checkAlgorithmState()');

    return interval(3000)
      .pipe(
        switchMap(() => this.http.post<ReturnAlgorithmStateDto>(microservice + "status", checkAlgorithmStateDto)),
        retry({delay: 3000, count: 5, resetOnSuccess: true}),
        distinctUntilChanged(),
        takeWhile(res => (res.algorithmState !== AlgorithmStateEnum.ready) &&
                 (res.algorithmState !== AlgorithmStateEnum.failed), true),
      );
  }

}
