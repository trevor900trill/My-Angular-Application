import { Injectable } from "@angular/core";
import { Observable , throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { retry , catchError} from "rxjs/operators";
import { Adress } from "./ip.service";
import { HttpErrorResponse } from "@angular/common/http";
@Injectable()
export class ResendService {
  url = this.outurl.getIp();
  constructor (public outurl : Adress , private http : HttpClient ){}
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
  resendcode(resendcode):Observable <any>{
    const httpOptions = {
         headers : new HttpHeaders({
            "Content-Type":  "application/json",
            "Authorization": "trevor",
            "Access-Control-Allow-Origin" : "*"
         })
     };
    return this.http.post(this.url + '/resent',resendcode,httpOptions)
    .pipe(
      retry(5), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
}
