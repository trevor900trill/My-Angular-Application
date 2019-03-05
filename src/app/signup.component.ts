import { Component } from "@angular/core";
import { HttpClient ,HttpParams ,HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { Post } from "./signup";
import { OnInit } from "@angular/core";
@Component({
    selector : 'sign-up',
    templateUrl : "./signup.component.html",
    styleUrls : ["./signup.component.css"],
})
export class SignUpComponent implements OnInit{
  public signuplogo:String = "Sign Up" ;
  public email:String;
  public fullname:String;
  public nickname:String;
  public phone:String;
  private password:String;
  private repeatpass:String;
  public errorcomponent:String;
  public successcomponent:String;
  public render = true;
  constructor( public router : Router, private sig : SignupService){

  }
  ngOnInit(){
    var isloggedin = localStorage.getItem("idr");
    if(!isloggedin)
    {
      //a user is not there
    }
    else
    {
      //a user is there
      this.router.navigate(['/videos']);
    }
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
    if(!this.email || !this.fullname || !this.nickname || !this.phone || !this.password || !this.repeatpass)
    {
      //some of the fields are empty do something
       this.errorcomponent = "Error: fill in all the required fields";
    }
    else
    {
      //check that the repeat password is the same as the Password
      if(this.password !== this.repeatpass)
      {
        //the passwords are different
        this.errorcomponent = "Error: you're repeated password is different from you're password";
      }
      else
      {
        if(this.password.length < 6)
        {
          this.errorcomponent="Error: password must not be less than 6 characters ";
          this.successcomponent = "";
        }
        else
        {
          const infop = {
            email: this.email,
            fullname: this.fullname,
            nickname: this.nickname,
            phone: this.phone,
            password: this.password,
            repeatpass: this.repeatpass
          }
          this.errorcomponent="";
          this.successcomponent = "PROCESSING: please wait for a bit...";
          this.render = false;
            this.sig.getPost(infop)
            .subscribe((data) =>{
                        if(data.code === "not unique")
                        {
                          //block the url
                          this.successcomponent = "";
                          this.router.navigate(['/signup']);
                          this.errorcomponent = "Error: an email like that one already exists";
                          this.render = true;
                        }
                        else if(data.code === "usernamenot")
                        {
                          this.successcomponent = "";
                          this.router.navigate(['/signup']);
                          this.errorcomponent = "Error: username already exists";
                          this.render = true;
                        }
                        else if(data.code === "error")
                        {
                          this.successcomponent = "";
                          this.errorcomponent = "Error: something went wrong the code was not sent try agin later";
                          this.router.navigate(['/signup']);
                          this.render = true;
                        }
                        else if(data.code === "errordata")
                        {
                          this.successcomponent = "";
                          this.errorcomponent = "Error: something went wrong you're information was not saved try agin later";
                          this.router.navigate(['/signup']);
                          this.render = true;
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
                          //i'm not sure why i had to use the toString() method but it works so..
                          sessionStorage.setItem('id', infop.email.toString());
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
        }
      }
    }
  }
}
