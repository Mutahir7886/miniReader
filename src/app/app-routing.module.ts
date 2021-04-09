import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LogreaderComponent} from "./components/logreader/logreader.component";
import {LoginGuard, LogReaderGuard} from "../services/Guard";


const routes: Routes = [

  {path: '', redirectTo:'login',pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {path: 'logreader', component: LogreaderComponent, canActivate: [LogReaderGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
