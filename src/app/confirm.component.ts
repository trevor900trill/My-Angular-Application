import { Component } from "@angular/core";
import { Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';
import { ConfirmService } from './confirm.service';
import { ResendService } from './resend.service';
import { DeletionService } from './deletion.service';
import { OnInit } from "@angular/core";
@Component({
  selector : "confirm",
  templateUrl : "./confirm.component.html",
  styleUrls : ["./confirm.component.css"],
})

export class ConfirmComponent implements OnInit{
  public confirmlogots:String = "Confirm you're email address";
  public confirmationtext:String;
  public errorcomponent:String;
  public successcomponent:String;
  public render = true;
  public invalidcount = 0;
  constructor(public del : DeletionService ,public reconfirm : ResendService ,public router : Router,public check : ConfirmService , private http : HttpClient){

  }
  //ngoninit called after components are done not after the page is rendered;
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
      this.router.navigate(['/videos']);
    }
  }
  public confirmationemail($event){
    this.confirmationtext = $event.target.value;
  }
  public confirmbtn(){
    var checkcodeemail = sessionStorage.getItem("id");
    var checkcodenum = sessionStorage.getItem("key");
    if(!checkcodenum || !checkcodeemail)
    {
      alert("resubmit youre information please");
      this.router.navigate(['/signup']);
    }
    else
    {
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
          //yeah i will
          this.invalidcount = this.invalidcount+1;
          if(this.invalidcount > 5)
          {
            alert("limit reached resubmit youre information");
            this.invalidcount = 0;
            this.render = false;
            const deletedata = {
              email : checkcodeemail
            }
            this.del.delete(deletedata)
                .subscribe((data)=>{
                              if(data.delete === "deleted")
                              {
                                //remove code from sessionStorage after delete request;
                                sessionStorage.removeItem("key");
                                sessionStorage.removeItem("id");
                                //the data was deleted
                                this.router.navigate(['/signup']);
                              }
                              else if(data.delete === "not")
                              {
                                //remove code from sessionStorage after delete request;
                                sessionStorage.removeItem("key");
                                sessionStorage.removeItem("id");
                                //the data was not deleted
                                this.router.navigate(['/signup']);
                              }
                           },
                          (error)=>{
                            //an error occured
                            //the data will not be deleted from the database what now?
                            //add a verified value in the database
                            console.log(error);
                            this.router.navigate(['/signup']);
                          }
                    );
          }
          else
          {
            this.errorcomponent = "Error: the code you inputed is incorrect please try again";
          }
        }
        else
        {
          //he got the code correct
          this.errorcomponent = "";
          //GET BACK ON THIS MAYBE SEND HIM TO HIS PROFILE PAGE TO EDIT IT
          this.router.navigate(['/videos']);
          //now we make another post request sending the answer
          //in order to get the id ili nitumiange;
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
                              //illget back to this
                              //no response
                              this.errorcomponent = "";
                              alert("Error : unknown error try loging in ");
                              this.router.navigate(['/']);
                            }
                            else if(data.messageverify === "errorverify")
                            {
                              //the data arrived okay
                              //this user is now verified
                              this.errorcomponent = "";
                              alert("the code was correct but an error occcured and you're email was not verified you can verify it by visiting you're profile page");
                              alert("welcome to infinity realm" + data.message);
                              localStorage.setItem("idr", data.message);
                              this.router.navigate(['/videos']);
                              sessionStorage.removeItem("key");
                              sessionStorage.removeItem("id");
                            }
                            else if(data.messageverify !== "errorverify")
                            {
                              //the data arrived okay
                              //this user is now verified
                              this.errorcomponent = "";
                              alert("success the code was correct and you're email was verified");
                              alert("welcome to infinity realm" + data.message);
                              localStorage.setItem("idr", data.message);
                              this.router.navigate(['/videos']);
                              sessionStorage.removeItem("key");
                              sessionStorage.removeItem("id");
                            }
                            else
                            {
                              //the data arrived okay
                              //this user is now verified
                              this.errorcomponent = "";
                              alert("welcome to infinity realm" + data.message);
                              localStorage.setItem("idr", data.message);
                              this.router.navigate(['/videos']);
                              sessionStorage.removeItem("key");
                              sessionStorage.removeItem("id");
                            }
                        },
                        (error) =>{
                            alert("an unknown error occured we mght be experiencing some technical difficulties " + error);
                        }
                      );
        }
      }
    }
  }
  public resend(){
    //button for resending the verification code
    //send a request to the server
    var emailres = sessionStorage.getItem("id");
    var coderes = sessionStorage.getItem("id");
    if(!coderes || !emailres)
    {
      //no data in session means you did not get the cerification
      alert("resubmit youre information please");
      this.router.navigate(['/signup']);
    }
    else
    {
      //this means that you have not exeeded the number of attemps necessary
      const datatoresend = {
        email : emailres
      }
      this.reconfirm.resendcode(datatoresend)
        .subscribe((data)=>{
                    console.log(data);
                    if(data.message === "error")
                    {
                      this.successcomponent = "";
                      this.errorcomponent="an error occured the code was not sent try again in a bit";
                    }
                    else
                    {
                      this.errorcomponent="";
                      this.successcomponent = "Code successfuly sent...";
                      sessionStorage.setItem("key" , data.message);
                    }
                  },
                  (error)=>{
                    console.log(error);
                  }
                );
    }
  }








}
