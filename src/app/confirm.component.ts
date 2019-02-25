import { Component } from "@angular/core";

@Component({
  selector : "confirm",
  templateUrl : "./confirm.component.html",
  styleUrls : ["./confirm.component.css"],
})

export class ConfirmComponent {
  public confirmlogots:String = "Confirm you're email address";
  public confirmationtext:String;
  public errorcomponent:String;
  constructor(){

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
    }
  }
  public resend(){
    alert("working well");
  }
}
