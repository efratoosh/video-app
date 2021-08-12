import { Component, OnInit } from '@angular/core';
import { VideoSarchService } from '../video-sarch.service';
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

  constructor(private videoSarchService : VideoSarchService) { }

  ngOnInit(): void {

    this.pageData = {
      totalResults : 0,
      currentPage: 1
    }

  }

  handleSerachedVideo(dataSearched, fromSearch = false): void {
      this.loading = true;

      if ( fromSearch ){
        this.searchedData = dataSearched;
        this.page = 1;
      }

      this.videoSarchService.getVideos(dataSearched, this.page).subscribe((data:any) => {
        console.log("data:", data);

        if (data && data.Response == "True"){
            this.videoList = data.Search;
            this.message = `${data.totalResults} results were found for <b>"${dataSearched.title}"</b>`;
            this.noResults = false;

            this.pageData.totalResults = +data.totalResults;
            this.pageData.currentPage = this.page;
            this.pageDataForPager = {...this.pageData};

        } else if (data && data.Response == "False") {
          console.log(data.Error);
          this.errorViewHandler(data.Error);

        } else {
          this.errorViewHandler("Sorry, something went wrong, please try again");
        }
      },
      (error) => {
          console.log(error);
          this.errorViewHandler("Sorry, something went wrong, please try again");
        },
      () => this.loading = false
      )
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
