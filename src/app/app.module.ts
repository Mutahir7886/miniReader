import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {LogreaderComponent} from './components/logreader/logreader.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginGuard, LogReaderGuard} from "../services/Guard";
import {MatButtonModule} from "@angular/material/button";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {ToastrModule} from "ngx-toastr";
import {HttpConfigInterceptor} from "./shared/HttpConfigInterceptor";
import {ErrorInterceptor} from "./shared/HttpConfigErrorInterceptor";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MatTooltipModule} from '@angular/material/tooltip';

const config: SocketIoConfig = { url: environment.baseUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogreaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    NgxUiLoaderModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    ToastrModule.forRoot(),

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ,LoginGuard,LogReaderGuard],
  bootstrap: [AppComponent],
  // exports:[LoginComponent],
})
export class AppModule { }
