import { Component } from "@angular/core";
import { VideosComponent } from "./videos.component";
@Component({
    selector : 'nav-bar',
    templateUrl : "./navbar.component.html",
    styleUrls : ["./navbar.component.css"],
})
export class NavbarComponent {
  public renderundericon:Boolean=false;
  public sendboolside:Boolean=false;
  public shouldshowsettings:Boolean;
  constructor( public isrender : VideosComponent,){}
  public mouseovericon(){
    this.renderundericon = true;
  }
  public mouseouticon(){
    this.renderundericon = false;
  }
  public rendersidebar(){
    this.sendboolside = !this.sendboolside;
    this.isrender.side(this.sendboolside);
  }
  public showpostsettings(){
    this.isrender.shootsettings();
  }
}
