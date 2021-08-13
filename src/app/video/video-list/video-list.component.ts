import { Component, OnInit } from '@angular/core';
import { VideoSarchService } from '../video-sarch.service';
import { VideoSessionService } from '../video-session.service';
import { IPageData, IVideo } from '../video.model';


@Component({
  selector: 'va-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  videoList: IVideo[];

  loading = false;

  message: string;

  page = 1;

  searchedData:IVideo;

  pageData : IPageData;

  pageDataForPager: IPageData;

  noResults: boolean;

  constructor(private videoSarchService : VideoSarchService,
              private videoSessionService: VideoSessionService) { }

  ngOnInit(): void {

    this.pageData = {
      totalResults : 0,
      currentPage: 1
    }

  }

  handleSerachedVideo(dataSearched: IVideo, fromSearch = false): void {
      this.loading = true;

      if ( fromSearch ){
        this.searchedData = dataSearched;
        this.page = 1;
      }

      let dataFromsession = this.videoSessionService.checkInSession(dataSearched, this.page);
      if (dataFromsession) {
        this.succesVieHandler(JSON.parse(dataFromsession), dataSearched.title);
        this.loading = false;
        return;
      }


      this.videoSarchService.getVideos(dataSearched, this.page).subscribe((data:any) => {
        if (data && data.Response == "True"){
          this.videoSessionService.saveToSession(data, dataSearched, this.page );
          this.succesVieHandler(data, dataSearched.title);

        } else if (data && data.Response == "False") {
          this.errorViewHandler(data.Error);

        } else {
          this.errorViewHandler("Sorry, something went wrong, please try again");
        }
      },
      (error) => {
          console.error(error);
          this.errorViewHandler("Sorry, something went wrong, please try again");
        },
      () => this.loading = false
      )
  }

  succesVieHandler(data, title) :void{
    this.videoList = data.Search;
    this.message = `${data.totalResults} results were found for <b>"${title}"</b>`;
    this.noResults = false;

    this.pageData.totalResults = +data.totalResults;
    this.pageData.currentPage = this.page;
    this.pageDataForPager = {...this.pageData};
  }

  errorViewHandler(message) :void {
     this.videoList = [];
     this.message = message;
     this.noResults = true;
  }

  onPageSelect(pageSelected: number): void{
    if ( pageSelected !== this.page ) {
      this.page = pageSelected;
      this.handleSerachedVideo(this.searchedData);
    }
  }

}
