import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';
import { MyPlaylistComponent } from './myplaylist.component';
const routes: Routes = [
  { path:'videos' , component: VideosComponent },
  { path:'myplaylistgo' , component : MyPlaylistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
