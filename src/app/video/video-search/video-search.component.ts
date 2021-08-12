import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IVideo } from '../video.model';

@Component({
  selector: 'va-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss']
})
export class VideoSearchComponent implements OnInit {

  title: string;
  year: string;
  video : IVideo;

  @Output() searchedVideo: EventEmitter<IVideo> = new EventEmitter<IVideo>();

  constructor() { }

  ngOnInit(): void {
    this.video = {title:'', year:''}
  }

  search() : void {
    if (this.video.title !== ''){
      this.searchedVideo.emit(this.video);
    }
  }

  onBlur(e): void{
    if (e.target.value === ""){
      e.target.parentElement.classList.remove('active');
    }
  }

  onFocus(e): void{
    e.target.parentElement.classList.add('active');
  }

}
