import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router,
              private toaster: ToastrService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401)
      {
        if (request.url.includes("login"))
        {
          this.toaster.error('Unauthorized Access. \r\n Invalid Email or Password.')
        }
        else
          {
          this.toaster.error('Unauthorized Access')
        }
      }

      else if (err.status == 500)
      {
        this.toaster.error('Internal Server Error')
      }
      else
        {

        this.toaster.error('Something went wrong.Please try again later')
      }

      if (err.error.data) {
        console.log('checking err data', err.error.data);
        return throwError(err);
      }
      const e = err.error.message || err.statusText;
      return throwError(e);
    }));
  }
}
