import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
    socket: SocketIOClient.Socket | any; // SocketIOClient.Socket;
    constructor() { }
    disconect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    connect() {
        this.socket = io('https://admin.tirgo.io/', {transports: ['websocket']});
        this.socket.on('connect', () => {
            console.log('connect')
                this.socket.emit('authenticate', {token: AuthenticationService.jwt})
                    .on('authenticated', (data:any) => {
                        console.warn('подключился к сокету')
                    })
                    .on('unauthorized', function(msg:any) {
                        console.log('unauthorized: ' + JSON.stringify(msg.data));
                        // throw new Error(msg.data.type);
                    });
            });
            this.socket.on('connect_error', (error: any) => {
                console.error('Socket connection error:', error);
              });
              
    }
    emit(event:any, ...args: any[]) {
        this.socket.emit(event, ...args);
    }
    on(name:any, data:any) {
        this.socket.on(name, data);
    }

    detectOnline() {
        return new Observable<any>(observer => {
            this.socket.on('users-changed', (data:any) => {
                observer.next(data);
            });
        });
    }
    updateAllOrders() {
        return new Observable<any>(observer => {
            this.socket.on('update-all-list', (data:any) => {
                observer.next(data);
            });
        });
    }
    updateAllMessages() {
        return new Observable<any>(observer => {
            this.socket.on('update-all-messages', (data:any) => {
                observer.next(data);
            });
        });
    }

    updateDriverBalance() {
        return new Observable<any>(observer => {
            this.socket.on('update-driver-balance', (data:any) => {
                observer.next(data);
            });
        });
    }
}
