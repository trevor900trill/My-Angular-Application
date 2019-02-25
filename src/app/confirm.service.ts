import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError , retry } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Observable , throwError } from "rxjs";
@Injectable()
export class ConfirmService {
  url ="http://20.20.20.246:8080";
  constructor( private http : HttpClient ){}
  confirmreq(body):Observable <any>{
    const httpOptions = {
         headers : new HttpHeaders({
            "Content-Type":  "application/json",
            "Authorization": "trevor",
            "Access-Control-Allow-Origin" : "*"
         })
     };
     //add retry
     return this.http.post(this.url +'/signature',body,httpOptions);
  }
}
