import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { VideosComponent } from "./videos.component";
import { FileSelectDirective , FileUploader } from "ng2-file-upload";
import { Adress } from "./ip.service";
import { OnInit } from "@angular/core";
@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent{
  public errorcomp:String;
  public errorlanding;
  private myip=this.ipimpo.getIp()+"/fileuploadfiles";
  uploader:FileUploader = new FileUploader({
    url : this.myip,
    disableMultipart : false,
  });
  ngOnInit(){
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }
  public styleobj;
  public attachmentList:any = [];
  constructor( private ipimpo : Adress ,public thestyle : VideosComponent,){
    //when a successful file upload this function is called;
    this.uploader.onCompleteItem = (item:any , response:any , status:any , headers:any)=>{
        console.log(JSON.parse(response));
        this.errorlanding = JSON.parse(response);
        if(this.errorlanding.error === "notloaded")
        {
          this.errorcomp = "Error: something went wrong the file was never saved try again later";
        }
        else if(this.errorlanding.error === "format")
        {
          this.errorcomp = "Error: Either the file format or the file size is not accepted";
        }
        else
        {
          this.errorcomp = "";
          console.log("successful")
        }
    }
  }
  public renderstyle3(){
    return this.thestyle.renderstyle();
  }
}
