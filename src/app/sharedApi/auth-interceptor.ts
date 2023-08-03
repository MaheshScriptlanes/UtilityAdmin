import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import {finalize} from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(public loader:LoaderService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
     {
       console.log("data in every request",req.body)
       this.loader.show();
       return next.handle(req).pipe(
        finalize(() => this.loader.hide())
    );
    
    }
  }

