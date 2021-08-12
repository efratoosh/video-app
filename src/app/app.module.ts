import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoaderComponent } from './general/loader/loader.component';
import { PagerComponent } from './general/pager/pager.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VideoSearchComponent,
    VideoListComponent,
    PageNotFoundComponent,
    MainLayoutComponent,
    LoaderComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
