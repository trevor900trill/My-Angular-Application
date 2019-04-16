import { Component } from "@angular/core";
import { VideosComponent } from "./videos.component";
import { Router } from '@angular/router';
import { Adress } from "./ip.service";
import { OnInit } from "@angular/core";
import { FetchService } from './fetching.service';
@Component({
  selector : 'my-playlist',
  templateUrl : "./myplaylist.component.html",
  styleUrls : ["./myplaylist.component.css"],
})
export class MyPlaylistComponent implements OnInit{
  public pictureforaudios:String="/assets/images/75863081-musical-symbols-on-a-black-background-to-understand-a-concept-of-music-education.jpg";
  public renderarray = [];
  ngOnInit(){
    this.fetchservice.fetchfunction()
        .subscribe((data) =>{
          this.renderarray.push(data.data);
          this.callback();
        });
  }
  constructor(public router : Router , public fetchservice : FetchService , public impostyle : VideosComponent,){}
  public renderstyle2(){
    return this.impostyle.renderstyle();
  }
  public callback(){
    //what to do after array is ready
    console.log(this.renderarray);
  }
  public gotofile(){
  }
}
