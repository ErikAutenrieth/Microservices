import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SessionService } from './SessionService';
import { filter, groupBy, map, Observable, scan, switchMap } from 'rxjs';
import { UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  private sessionID: string;

  constructor(private sessionService: SessionService) {

    this.sessionID = sessionService.getSessionId();
    // Connect to the Socket.IO server
    this.socket = io(environment.gatewayAPI, {
      transports: ["websocket", "polling"],
    });
    this.socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
  }
  /**
   * Subscribes to the 'AlgorithmStates' event on the WebSocket server to receive updates on algorithm states.
   * Emits the 'AlgorithmStates' event with the specified userID to the server to identify the user's session.
   *
   * @returns An observable of type UpdateKafkaAlgorithmStateDto that emits algorithm state messages.
   */
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
        filter((message) => message.userId === this.sessionID), // Filter messages based on the sessionID
        groupBy((message: UpdateKafkaAlgorithmStateDto) => message.creationDate),                       // Group messages by creationDate
        switchMap(group => group.pipe(
          map((curr: UpdateKafkaAlgorithmStateDto) => curr),                                          // Map the group to individual messages
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
