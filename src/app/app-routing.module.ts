import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { VideoListComponent } from './video/video-list/video-list.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
      path:'',
      component: MainLayoutComponent,
      children: [
          {path:'', component: VideoListComponent},
      ]
    },
    { path: '**', component: PageNotFoundComponent }

]



@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
