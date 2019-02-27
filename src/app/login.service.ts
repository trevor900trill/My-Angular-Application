import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders , HttpErrorResponse} from "@angular/common/http";
import { Observable , throwError } from "rxjs";
import { retry ,catchError } from "rxjs/operators";
import { Adress } from "./ip.service";
@Injectable()
export class LoginService {
  url = this.outurl.getIp();
  constructor(private http : HttpClient , public outurl : Adress){}
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
  loginReq(logininfo):Observable <any> {
    const httpOptions = {
         headers : new HttpHeaders({
            "Content-Type":  "application/json",
            "Authorization": "trevor",
            "Access-Control-Allow-Origin" : "*"
         })
     }
    return this.http.post<any>(this.url + "/infinitelogin",logininfo,httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}
