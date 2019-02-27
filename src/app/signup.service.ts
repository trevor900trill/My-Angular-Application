import { Injectable } from "@angular/core";
import { HttpClient ,HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { Post } from "./signup";
import { Adress } from "./ip.service";
import { HttpErrorResponse } from "@angular/common/http";
@Injectable()
export class SignupService{
    url = this.outurl.getIp();
    constructor( public outurl : Adress , private http: HttpClient){}
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent)
        {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        }
        else
        {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    getPost(poster):Observable <any>{
      const httpOptions = {
           headers : new HttpHeaders({
              "Content-Type":  "application/json",
              "Authorization": "trevor",
              "Access-Control-Allow-Origin" : "*"
           })
       };
       //add retry and catch errors here
      return this.http.post<any>(this.url+'/infinitesignup',poster,httpOptions)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    }

}
