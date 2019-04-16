import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos.component';
import { SignUpComponent } from './signup.component';
import { ConfirmComponent } from './confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './signup.service';
import { ConfirmService } from './confirm.service';
import { Adress } from './ip.service';
import { ResendService } from './resend.service';
import { DeletionService } from './deletion.service';
import { LoginService } from './login.service';
import { SidebarComponent } from './sidebar.component';
import { NavbarComponent } from './navbar.component';
import { RenderPageComponent } from './rendervideopage.component';
import { MyPlaylistComponent } from './myplaylist.component';
import { PostComponent } from './post.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FetchService } from './fetching.service';
import { WatchComponent } from './watch.component';
@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    MyPlaylistComponent,
    PostComponent,
    SignUpComponent,
    ConfirmComponent,
    SidebarComponent,
    NavbarComponent,
    RenderPageComponent,
    WatchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FileUploadModule,
  ],
  providers: [
    SignupService,
    ConfirmService,
    MyPlaylistComponent,
    VideosComponent,
    Adress,
    ResendService,
    DeletionService,
    LoginService,
    FetchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
