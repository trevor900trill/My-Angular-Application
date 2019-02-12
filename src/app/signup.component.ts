import { Component } from "@angular/core";
import { HttpClient ,HttpParams ,HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
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
  public newpost:Observable<any>;
  constructor(private http: HttpClient){

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
      const info: Post = {
        email: this.email,
        fullname:this.fullname,
        nickname:this.nickname,
        phone:this.phone,
        password:this.password,
        repeatpass:this.repeatpass,
      }
      this.newpost = this.http.post<Post>('http://20.20.20.246:8080/infinitesignup', info);
      console.log(this.newpost);

  }


}
