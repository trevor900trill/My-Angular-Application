import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { MyPlaylistComponent } from './myplaylist.component';
import { SignUpComponent } from './signup.component';
import { ConfirmComponent } from './confirm.component';
import { AppComponent } from './app.component';
import { RenderPageComponent } from './rendervideopage.component';
import { PostComponent } from "./post.component";
import { WatchComponent } from "./watch.component";
const routes: Routes = [
  { path : '' , component : AppComponent },
  { path:'render' , component: RenderPageComponent,children : [
      { path:'myplaylistgo' ,component : MyPlaylistComponent },
      { path:'sharepost' , component: PostComponent },
      { path:'watch/:id' , component: WatchComponent },
    ]
  },
  { path:'signup' , component : SignUpComponent },
  { path: 'confirm' , component : ConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
