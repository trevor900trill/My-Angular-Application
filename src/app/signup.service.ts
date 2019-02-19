import { Injectable } from "@angular/core";
import { HttpClient ,HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { Post } from "./signup";
@Injectable()
export class SignupService{
    constructor( private http: HttpClient){}

    getPost(poster : Post):Observable <Post>{
      const httpOptions = {
           headers : new HttpHeaders({
              "Content-Type":  "application/json",
              "Authorization": "trevor",
              "Access-Control-Allow-Origin" : "*"
           })
       };
      return this.http.post<Post>('http://20.20.20.246:8080/if',poster,httpOptions)
    }

}
