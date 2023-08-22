import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { Server, WebSocket } from 'ws';
import { AppService } from './app.service';
import { OnApplicationShutdown } from '@nestjs/common';
import { UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Observable } from 'rxjs';

// Define the WebSocketGateway and its configuration
@WebSocketGateway({
    transports: ["websocket", "polling"],
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
}
)

export class WSGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(private readonly appService: AppService) { }

    // WebSocketServer decorator to access the underlying socket.io server instance
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
      // Event listener for new connections
        server.on('connection', (ws) => {
            console.log("connection");
        });
        console.log("init");
    }

    // Called when a new client connects
    async handleConnection(socket: Socket) {
        console.log("handleConnection");
    }

    @SubscribeMessage('AlgorithmStates')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() userID: string,
    ): Observable<WsResponse<UpdateKafkaAlgorithmStateDto>> | any {

        console.log("new client in AlgorithmStates for userID: " + userID);

        if (!userID) throw WsException;

        // Subscribe to the KafkaObservable from the AppService using the provided userID
        this.appService.getKafkaObservable(userID).subscribe((message: UpdateKafkaAlgorithmStateDto) => {
            console.log(message);
            // Emit the received message to the client with 'AlgorithmStates'
          this.server.to(client.id).emit("AlgorithmStates", message);
        }
        );
    }

    // WebSocket event listener for 'identity' messages
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: string): Promise<string> {
        return data + " return";
    }
}
