import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class EngineService {
    constructor(private http: HttpClient) { }

    test() {
        console.log('EngineService.test()');
        
    }

    
}