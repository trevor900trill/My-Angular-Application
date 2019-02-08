import { Component } from "@angular/core";
@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent{
  public searchinput:String;
  public bars:Boolean = false;
  public cssstyle;
  constructor(){

  }
  public showbars(){
    this.bars = !this.bars;
    console.log(this.bars);
    if( this.bars === true )
    {
      //the sidebar is showing
      this.cssstyle = this.style1();
    }
    else if( this.bars !== true )
    {
      //the sidebar is not showing
      this.cssstyle = this.style2();
    }
    else
    {
      //there was an unknown error
      console.log("unknown error");
    }
  }
  public search($event){
        this.searchinput = $event.target.value;
        //enter is pressed while input field is empty
        if($event.keyCode == 13)
        {
          //enter is pressed but input field is empty
          if($event.target.value === "")
          {
            console.log("enter pressed nothing to show");
          }
          //enter is pressed and input field is not empty
          else if($event.target.value !== "")
          {
            console.log(this.searchinput);
          }
          //unknown error
          else
          {
            console.log("unknown error");
          }
        }
        //if enter is not pressed
        else if($event.keyCode != 13)
        {
          //enter is not pressed  and input field is empty
          if($event.target.value === "")
          {
            console.log("enter not pressed nothing to show");
          }
          //enter is not pressed and input field is not empty
          else if($event.target.value !== "")
          {
            console.log("enter not pressed but there is something there");
          }
          //unknown error
          else
          {
            console.log("unknown error");
          }
        }
  }
  public style1(){
    //the sidebar is clicked
    return({
      "width" : "949px",
      "height" : "100%",
      "float" : "right",
      "display": "flex",
      "align-items" : "center",
      "justify-content": "center",
      "position":"absolute",
      "right" : "0px",
      "background-color":"#46484c",
    });
  }
  public style2(){
    //the sidebar is not clicked
    return({
      "background-color": "#46484c",
      "width": "100%",
      "height":"100%",
      "float":"right",
      "display":"flex",
      "align-items": "center",
      "justify-content": "center",
      "position":"absolute",
      "right":"0px",
    });
  }
  public clicksearch(){
    if(this.searchinput === "")
    {
      //nothing was inputed
      console.log("nothing was inputed");
    }
    else if(this.searchinput !== "")
    {
      //they inputed
      console.log(this.searchinput);
    }
    else
    {
      //unknown error
      console.log("unknown error");
    }
  }
}
