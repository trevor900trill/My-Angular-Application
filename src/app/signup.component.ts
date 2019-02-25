import { Component } from "@angular/core";
import { HttpClient ,HttpParams ,HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { Post } from "./signup";
@Component({
    selector : 'sign-up',
    templateUrl : "./signup.component.html",
    styleUrls : ["./signup.component.css"],
})
export class SignUpComponent {
  public signuplogo:String = "Sign Up" ;
  public email:String;
  public fullname:String;
  public nickname:String;
  public phone:String;
  private password:String;
  private repeatpass:String;
  public errorcomponent:String;
  constructor(public router : Router, private sig : SignupService){

  }
  private signupemail($event){
    this.email = $event.target.value;
  }
  private signupfullname($event){
    this.fullname = $event.target.value;
  }
  private signupnickname($event){
    this.nickname = $event.target.value;
  }
  private signupphone($event){
    this.phone = $event.target.value;
  }
  private signuppassword($event){
    this.password = $event.target.value;
  }
  private signuprepeatpass($event){
    this.repeatpass = $event.target.value;
  }
  public fullsignup(){
    const infop = {
      email: this.email,
      fullname: this.fullname,
      nickname: this.nickname,
      phone: this.phone,
      password: this.password,
      repeatpass: this.repeatpass
    }

      this.sig.getPost(infop)
      .subscribe((data) =>{
                  if(data.code === "not unique")
                  {
                    //block the url
                    this.router.navigate(['/signup']);
                    this.errorcomponent = "Error: an email like that one already exists";
                  }
                  else if(data.code === "usernamenot")
                  {
                    this.router.navigate(['/signup']);
                    this.errorcomponent = "Error: username already exists";
                  }
                  else if(data.code === "error")
                  {
                    this.errorcomponent = "Error: something went wrong the code was not sent try agin later";
                    this.router.navigate(['/signup']);
                  }
                  else if(data.code === "errordata")
                  {
                    this.errorcomponent = "Error: something went wrong you're information was not saved try agin later";
                    this.router.navigate(['/signup']);
                  }
                  else
                  {
                    this.router.navigate(['/confirm']);
                    //send this to a local storage or cookies
                    //TO DO ENCRYPTION
                    //document.cookie = "code="+data.code
                    //now we handle in the verification page;
                    //for now use local storage and session storage
                    sessionStorage.setItem('key', data.code);
                    this.errorcomponent = "";
                  }
                },
                (error) =>{
                  console.log("error event");
                  //block link
                  this.router.navigate(['/']);
                  alert("we are experiencing technical difficlties please try again in a bit");
                }
              );
      //this.newpost = this.http.post<Post>('http://20.20.20.246:8080/infinitesignup', info);
      //console.log(this.newpost);
  }
}
