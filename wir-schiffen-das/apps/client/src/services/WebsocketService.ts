import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SessionService } from './SessionService';
import { filter, groupBy, map, mergeMap, Observable, scan, switchMap, tap } from 'rxjs';
import { UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  private sessionID: string;

  constructor(private sessionService: SessionService) {
    this.sessionID = sessionService.getSessionId();
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:3060', {
      transports: ["websocket", "polling"],
    });
    this.socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
  }

  subscribeToAlgorithmStates(): Observable<any> {
    // Emit the 'AlgorithmStates' event with the specified userID
    this.socket.emit('AlgorithmStates', this.sessionID);

    // Create an observable from the 'AlgorithmStates' event
    return new Observable<UpdateKafkaAlgorithmStateDto>((observer) => {
      this.socket.on('AlgorithmStates', (message: UpdateKafkaAlgorithmStateDto) => {
        observer.next(message);
      });
    })
      .pipe(
        filter((message) => message.userId === this.sessionID),
        groupBy((message: UpdateKafkaAlgorithmStateDto) => message.creationDate),
        switchMap(group => group.pipe(
          map((curr: UpdateKafkaAlgorithmStateDto) => curr),
          scan((acc: UpdateKafkaAlgorithmStateDto, curr: UpdateKafkaAlgorithmStateDto) => ({
            ...acc,
            ...curr,
            incompactibleConfigurations: [...(acc.incompactibleConfigurations || []), ...(curr.incompactibleConfigurations || [])]
          }), {}),
        )),
        // tap((message) => console.log('Received message: ' + JSON.stringify(message)))
        );
  }
}