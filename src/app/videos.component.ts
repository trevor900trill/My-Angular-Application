import { Component } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent{
  public status:Boolean;
  public styleobj;
  constructor( public router : Router,){}
  public side(event){
    this.status = event;
  }
  public renderstyle(){
    if(this.status === true)
    {
      //the sidebar is rendered
      return {
        "background-color":"#46484c",
        "float": "right",
        "margin-top" : "71px",
        "height": "596px",
        "width": "949px",
        "display":"flex",
        "justify-content": "center",
        "align-items": "center",
      }
    }
    else
    {
      //the side bar is not rendered
      return {
        "background-color":"#46484c",
        "float": "right",
        "margin-top" : "71px",
        "height": "596px",
        "width": "100%",
        "display":"flex",
        "justify-content": "center",
        "align-items": "center",
      }
    }
  }
  public shootsettings(){
    this.router.navigate(["/render/sharepost"]);
  }
}
