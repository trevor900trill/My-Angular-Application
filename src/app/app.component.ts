import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title:String = 'Infinity Realm';
  public pass;
  public emai;
  constructor(){

  }
  public email($event){
    this.emai = $event.target.value;
    console.log(this.emai);
  }
  public password($event){
    this.pass = $event.target.value;
    console.log(this.pass);
  }
  public login(){
    if(this.pass === "" || this.emai === "" )
    {
      console.log('fill in all the blanks first');
    }
    else if(this.pass !== "" && this.emai !== "" )
    {
      console.log("clicked");
    }
    else
    {
      console.log("unknown error");
    }
  }
}
