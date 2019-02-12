import { Component } from "@angular/core";

@Component({
  selector : "confirm",
  templateUrl : "./confirm.component.html",
  styleUrls : ["./confirm.component.css"],
})

export class ConfirmComponent {
  public confirmlogots:String = "Confirm you're email address";
  public confirmationtext:String;
  constructor(){

  }
  public confirmationemail($event){
    this.confirmationtext = $event.target.value;
    if(this.confirmationtext === "")
    {
      console.log("nothing is inputed do not accept")
    }
    else if(this.confirmationtext !== "")
    {
      console.log("something has been inputed is it true? " + this.confirmationtext);
    }
  }
}
