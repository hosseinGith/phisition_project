// websocket.service.ts
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { TokenType } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from 'src/entitys/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WebsocketService {
 constructor(
  private readonly jwtService: JwtService,
  @InjectRepository(Users)
  private readonly usersRep: Repository<Users>,
 ) {}
 private server: Server;
 private clients: Map<string, Socket> = new Map();
 private logger = new Logger('WebsocketService');

 setServer(server: Server) {
  this.server = server;
 }

 async addClient(client: Socket) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token = client.handshake.auth['token'];
  try {
   if (!token) throw new Error();

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-unsafe-argument
   const res = (await this.jwtService.verify(token)) as TokenType;
   if (res?.number) {
    const user = await this.usersRep.findOneBy({ number: res.number });
    if (!user) throw new Error();
    if (!user?.is_active) throw new Error();

    client['userAccess'] = user?.access || '';
   } else throw new Error();
  } catch {
   client.emit('error', {
    status: 'auth',
   });
   client.disconnect(true);
   return false;
  }
  this.clients.set(client.id, client);
  this.logger.log(
   `Client added: ${client.id}, total clients: ${this.clients.size}`,
  );
 }

 removeClient(clientId: string) {
  this.clients.delete(clientId);
  this.logger.log(
   `Client removed: ${clientId}, total clients: ${this.clients.size}`,
  );
 }

 // ارسال به یک کلاینت خاص
 sendToClient(clientId: string, event: string, data: any) {
  const client = this.clients.get(clientId);
  if (client) {
   client.emit(event, data);
   return true;
  }
  return false;
 }

 // ارسال به همه کلاینت‌ها
 sendToAll(event: string, data: any) {
  this.server.emit(event, data);
  this.logger.log(`Broadcasted ${event} to all clients`);
 }

 // ارسال به همه به جز یک کلاینت خاص
 sendToAllExcept(event: string, data: any, excludeClientId: string) {
  this.clients.forEach((client, id) => {
   if (id !== excludeClientId) {
    client.emit(event, data);
   }
  });
 }
}
