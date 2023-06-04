import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckConfigurationDto } from 'libs/types/src/lib/dtos';
import { DieselEngineEnum } from '@wir-schiffen-das/types';
import { Observable } from 'rxjs';
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

    checkEngineCompatibility(engineDTO : CheckConfigurationDto): Observable<any> {
        console.log('EngineService.checkEngineCompatibility()');

        return this.http.post('http://localhost:3000/api/engine/OptEquip', engineDTO);
    }

    
}