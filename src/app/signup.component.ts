import { Component } from "@angular/core";

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
  public password:String;
  public repeatpass:String;
  constructor(){

  }
  public signupemail($event){
    this.email = $event.target.value;
  }
  public signupfullname($event){
    this.fullname = $event.target.value;
  }
  public signupnickname($event){
    this.nickname = $event.target.value;
  }
  public signupphone($event){
    this.phone = $event.target.value;
  }
  public signuppassword($event){
    this.password = $event.target.value;
  }
  public signuprepeatpass($event){
    this.repeatpass = $event.target.value;
  }
  public fullsignup(){
    
  }
}
