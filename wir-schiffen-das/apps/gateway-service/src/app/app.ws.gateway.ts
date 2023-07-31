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
import { DevMicroserviceAddressEnum, UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Observable } from 'rxjs';

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

    @WebSocketServer()
    server: Server;


    afterInit(server: Server) {
        server.on('connection', (ws) => {
            console.log("connection");
        });
        console.log("init");
    }

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
        this.appService.getKafkaObservable(userID).subscribe((message: UpdateKafkaAlgorithmStateDto) => {
            console.log(message);
          this.server.to(client.id).emit("AlgorithmStates", message);
        }
        );
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: string): Promise<string> {
        return data + " return";
    }
}
