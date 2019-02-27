import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { MyPlaylistComponent } from './myplaylist.component';
import { SignUpComponent } from './signup.component';
import { ConfirmComponent } from './confirm.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path : '' , component : AppComponent },
  { path:'videos' , component: VideosComponent },
  { path:'myplaylistgo' , component : MyPlaylistComponent },
  { path:'signup' , component : SignUpComponent },
  { path: 'confirm' , component : ConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
