import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('user_object')) {
      console.log('user is already logged in plz signOut');
      this.router.navigate(['/logreader']);

      return false;
    } else
      return true;

  }
}

@Injectable()
export class LogReaderGuard implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('user_object')) {

      return true;
    } else
    {
      console.log('no user  logged in PLZ SINGIN ');
      this.router.navigate(['/login']);

    }


    return false;

  }
}
