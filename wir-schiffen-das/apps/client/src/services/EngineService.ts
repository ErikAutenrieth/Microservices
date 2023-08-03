import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CheckConfigurationDto,} from '@wir-schiffen-das/types';
import { Observable} from 'rxjs';
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
  /**
   * Sends a POST request to check the engine configuration using the provided 'configDTO'.
   *
   * @param configDTO - The 'CheckConfigurationDto' object containing the selected engine configurations to be checked.
   * @returns An Observable that resolves with the response from the server after checking the configuration.
   */
  checkConfiguration(configDTO: CheckConfigurationDto): Observable<any> {
    console.log('EngineService.checkConfiguration()');
    return this.http.post(environment.anchorAPI + 'CheckConfiguration', configDTO);
  }
}
