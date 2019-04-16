import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient ,HttpParams ,HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title:String = 'Infinity Realm';
  public pass;
  public loginemail;
  public errorcomponent:String;
  public successcomponent:String;
  public render:Boolean = true;
  constructor(public router : Router ,public loginserve : LoginService){}

  ngOnInit(){
    var isloggedin = localStorage.getItem("idr");
    if(!isloggedin)
    {
      //a user is not there
      this.router.navigate(['']);
    }
    else
    {
      //a user is there
      this.router.navigate(['/render']);
    }
  }
  public email($event){
    this.loginemail = $event.target.value;
  }
  public password($event){
    this.pass = $event.target.value;
  }
  public login(){
    if(!this.pass || !this.loginemail)
    {
      this.errorcomponent = "Error : fill in all the blanks first";
      this.successcomponent = "";
    }
    else
    {
      this.errorcomponent = "";
      this.successcomponent = "PROCESSING : please wait for a bit";
      this.render = false;
      const loginfo = {
        email : this.loginemail,
        password : this.pass
      };
      this.loginserve.loginReq(loginfo)
        .subscribe((data) => {
                        if(data.error)
                        {
                          //no need for the .error since its the only response with an identifier of error;
                          //an error occured in finding the information from the database
                          this.successcomponent="";
                          this.errorcomponent="Error: there was an unexpected error try again in a bit";
                          this.router.navigate(['/']);
                          this.render = true;
                        }
                        else if(data.message === "noemail")
                        {
                          //there was no email in the database
                          this.successcomponent="";
                          this.errorcomponent="Error: the email you inputed does not exist";
                          this.router.navigate(['/']);
                          this.render = true;
                        }
                        else if(data.message === "incorrectpass")
                        {
                          //password is incorrect
                          this.successcomponent="";
                          this.errorcomponent="Error: incorrect password";
                          this.router.navigate(['/']);
                          this.render = true;
                        }
                        else if(!data)
                        {
                          //the was no data
                          this.successcomponent="";
                          this.errorcomponent="Error: empty response try again in a bit";
                          this.router.navigate(['/']);
                          this.render = true;
                        }
                        else
                        {
                          //POSSIBLE ERRORS
                          //email exists and the password is correct
                          this.successcomponent="";
                          this.errorcomponent="";
                          this.router.navigate(['/render']);
                          this.render = true;
                          localStorage.setItem("idr" , data.id);
                        }
                    },
                    (error) => {
                      //an error occurred
                      this.successcomponent="";
                      this.errorcomponent="Error: Technical issue try again later";
                      this.router.navigate(['/']);
                      this.render = true;
                      alert(" Error : we might be experiencing some technical difficulties try again in a bit");
                    }
              );
    }

  }
}
