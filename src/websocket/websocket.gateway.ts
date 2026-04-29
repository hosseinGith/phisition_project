import {
 WebSocketGateway,
 WebSocketServer,
 SubscribeMessage,
 OnGatewayConnection,
 OnGatewayDisconnect,
 ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './gurds/WsAuth.guard';
import { wsAccess } from './gurds/wsAccess.guard';
import { Access } from 'src/shared/guards/access.decorator';
import { AccessType } from 'src/types';
@UseGuards(WsAuthGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway
 implements OnGatewayConnection, OnGatewayDisconnect
{
 @WebSocketServer()
 server: Server;

 constructor(private websocketService: WebsocketService) {}

 @UseGuards(WsAuthGuard)
 handleConnection(client: Socket) {
  void this.websocketService.addClient(client);
 }

 handleDisconnect(client: Socket) {
  this.websocketService.removeClient(client.id);
 }
 @Access(AccessType.PATIENT)
 @UseGuards(wsAccess)
 @SubscribeMessage('start-real-time')
 startRealTimeUpdates(@ConnectedSocket() client: Socket) {
  client.emit('asd');
 }
}
