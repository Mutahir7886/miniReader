import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miniReader';
  constructor(private socket:Socket)
  {

    // socket.emit("message", "Message from Mutahir");

    // socket.on("connection", (data)=>{
    //     console.log('connected', data);
    // })
    // socket.on("disconnect", (data)=>{
    //   console.log('disconnected',  data);
    // })
    socket.on("event", (data)=>{
      console.log('event12', data);
    })

  }
}
