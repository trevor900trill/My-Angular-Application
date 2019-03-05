import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos.component';
import { MyPlaylistComponent } from './myplaylist.component';
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
@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    MyPlaylistComponent,
    SignUpComponent,
    ConfirmComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SignupService,
    ConfirmService,
    Adress,
    ResendService,
    DeletionService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
