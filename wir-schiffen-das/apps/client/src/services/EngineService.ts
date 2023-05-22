import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckEngineStatusDto } from 'libs/types/src/lib/dtos';
import { DieselEngineEnum } from '@wir-schiffen-das/types';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class EngineService {
    constructor(private http: HttpClient) { }

    test() {
        console.log('EngineService.test()');
        
    }

    checkEngineCompatibility(engineDTO : CheckEngineStatusDto): Observable<any> {
        console.log('EngineService.checkEngineCompatibility()');

        return this.http.post('http://localhost:3000/api/engine/OptEquip', engineDTO);
    }

    
}