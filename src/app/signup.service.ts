import { Injectable } from "@angular/core";
import { HttpClient ,HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { Post } from "./signup";
const httpOptions = {
     headers : new HttpHeaders({
        "Content-Type":  "application/json;",
        "Authorization": "my-auth-token",
        "Access-Control-Allow-Origin" : "*"
     })
 };
@Injectable()
export class SignupService{
    constructor( private http: HttpClient){}

    getPost(poster : Post):Observable <Post>{

      return this.http.post<Post>('http://20.20.20.246:8080/infinitesignup',poster,httpOptions)
    }

}
