import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos.component';
import { MyPlaylistComponent } from './myplaylist.component';
import { SignUpComponent } from './signup.component';
import { ConfirmComponent } from './confirm.component';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
