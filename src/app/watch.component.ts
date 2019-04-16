import { Component } from "@angular/core";
import { VideosComponent } from "./videos.component";
import { Router } from '@angular/router';
import { Adress } from "./ip.service";
import { OnInit } from "@angular/core";
import { FetchService } from './fetching.service';
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from '@angular/common';
import { Inject }  from '@angular/core';
@Component({
  selector : 'watch',
  templateUrl : "./watch.component.html",
  styleUrls : ["./watch.component.css"],
})

export class WatchComponent implements OnInit{
  //now we have the id now we use mataudio to play the files
  public idparam:String;
  public routetowatch;
  public yu;
  public trace;
  public myaud;
  public classio;
  public ans;
  public paused:Boolean=false;
  public mysrc:String = "/assets/images/icons8-pause-64.png";
  ngOnInit(){
    let audio = new Audio();
    //access the audio object in the class
    this.myaud = audio;
    //we wiil use this as our progess handle instead of using onprogress function
    //since when we seek we update the time we kill 2 birds with one variable
    audio.ontimeupdate=()=>{
        this.yu = audio.currentTime /  audio.duration * 100;
        //get duration in minutes and seconds
        let minutesdurr= Math.floor(audio.duration / 60);
        let secondsdurr= Math.floor(audio.duration % 60);
        //get currentTime in minutes and seconds
        let minutescurr= Math.floor(audio.currentTime / 60);
        let secondscurr= Math.floor(audio.currentTime % 60);
        this.trace = minutescurr+"."+secondscurr+" / "+ minutesdurr +"."+secondsdurr;
        this.classio = {
          "background": `linear-gradient(to top right, #ff9900 ${this.yu}%, #cc33ff 88%)`
        }
    };
    //buffering handler
    audio.onwaiting = () => {
      //console.log("buffering");
      //now we can play around with the pages color
      this.trace = "buffering...";
    }
    this.route.paramMap.subscribe(params => {
      this.idparam = params.get("id");
      this.routetowatch = 'http://192.168.0.19:8080/reader/'+this.idparam;
      let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
      audio.crossOrigin = "anonymous";
      audio.src = this.routetowatch;
      audio.controls = false;
      audio.loop = true;
      audio.autoplay = true;
      audio.load();
      audio.play();
      //after the meta data has been loaded check the duration
      initpl();
      function initpl(){
        document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext();
        analyser = context.createAnalyser();
        canvas = document.getElementById('analyser_render');
        ctx = canvas.getContext('2d');
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
      	analyser.connect(context.destination);
        frameLooper();
      }
      function frameLooper(){
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#002D3C'; // Color of the bars
        bars = 100;//number of bars
        for (var i = 0; i < bars; i++) {
          bar_x = i * 3;//the spacing of each bar
          bar_width = 2;//the width of each bar
          bar_height = -(fbc_array[i] / 2);
          //  the method that draws the bars fillRect( x, y, width, height ) // Explanation of the parameters below
          ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
      }
      const fetchbone = {
        idval : this.idparam,
      };
      this.fetchservice.fecthdatatowatch(fetchbone)
          .subscribe((data) =>{
            //this is the picture
            console.log(this.routetowatch);
          });
    })
  }
  constructor(@Inject(DOCUMENT) document,private route: ActivatedRoute , public router : Router , public fetchservice : FetchService , public impostyle : VideosComponent,){}
  public renderstyle3(){
    return this.impostyle.renderstyle();
  }
  public classico(){
    return this.classio;
  }
  //play and pause operators
  public changestateofaudio(){
    if(this.paused === true)
    {
      this.myaud.play();
      this.paused = false;
      this.mysrc = "/assets/images/icons8-pause-64.png"
    }
    else
    {
      this.myaud.pause();
      this.paused = true;
      this.mysrc = "/assets/images/icons8-play-64.png"
    }
  }
  //seeking operators
  public mouse($event){
    this.ans = this.myaud.duration * ($event.target.value / 100);
    this.myaud.currentTime = this.ans;
    console.log(this.ans);
  }
}
