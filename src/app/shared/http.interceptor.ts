import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'


@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Intercept request
    /*const modifiedRequest = request.clone({
      headers: request.headers.set('app-language', 'it')
    })*/
    //return next.handle(modifiedRequest) 

    console.log("Request: ", request);

    //Intercept response
    return next.handle(request).do((event: HttpEvent<any>) => {
      if( event instanceof HttpResponse ) {
        console.log("Intercept Response: ", event);
      }
    //Intercept error
    }).catch(response => {
      if (response instanceof HttpErrorResponse) {
        console.log('Intercept Error: ', response);
      }
      return Observable.throw(response);
    })

  }

}