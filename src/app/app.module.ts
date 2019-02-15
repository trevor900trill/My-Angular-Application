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
@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    MyPlaylistComponent,
    SignUpComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
