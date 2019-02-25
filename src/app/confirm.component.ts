import { Component } from "@angular/core";
import { Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';
import { ConfirmService } from './confirm.service';
@Component({
  selector : "confirm",
  templateUrl : "./confirm.component.html",
  styleUrls : ["./confirm.component.css"],
})

export class ConfirmComponent {
  public confirmlogots:String = "Confirm you're email address";
  public confirmationtext:String;
  public errorcomponent:String;
  constructor(public router : Router,public check : ConfirmService , private http : HttpClient){

  }
  public confirmationemail($event){
    this.confirmationtext = $event.target.value;
  }
  public confirmbtn(){
    if(!this.confirmationtext)
    {
      this.errorcomponent = "Error: fill in the required code";
    }
    else
    {
      console.log("something has been inputed is it true? " + this.confirmationtext);
      this.errorcomponent = "";
      //continue from here;
      //check if value is correct
      var answer = sessionStorage.getItem('key');
      if( this.confirmationtext !== answer)
      {
        //he got the code wrong do something
        //maybe i should restrict th user from inputing many wrong codes
        this.errorcomponent = "Error: the code you inputed is incorrect please try again";
      }
      else
      {
        this.errorcomponent = "";
        //GET BACK ON THIS MAYBE SEND HIM TO HIS PROFILE PAGE TO EDIT IT
        this.router.navigate(['/videos']);
        //now we make another post request sending the answer
        var emailcheck = sessionStorage.getItem("id");
        const mybody = {
          emailref : emailcheck ,
        }
        this.check.confirmreq(mybody)
          .subscribe((data)=>{
                          if(data.message === "noemail")
                          {
                            //that email was not found
                            this.errorcomponent = "";
                            alert("Error : at this point, you're info was saved but we could not get youre information try login in");
                            this.router.navigate(['/']);
                          }
                          else if(!data.message)
                          {
                            //no response
                            this.errorcomponent = "";
                            alert("Error : unknown error try loging in ");
                            this.router.navigate(['/']);
                          }
                          else
                          {
                            //the data arrived okay
                            this.errorcomponent = "";
                            alert("welcome to infinity realm" + data.message);
                            localStorage.setItem("idr", data.message);
                            this.router.navigate(['/videos']);
                          }
                      },
                      (error) =>{
                          alert("an unknown error occured we mght be experiencing some technical difficulties " + error);
                      }
                    );
      }
    }
  }
  public resend(){
    //button for resending the verification code
    alert("working well");
    //send a request to the server

  }
}
