import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPageData } from 'src/app/video/video.model';

@Component({
  selector: 'va-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

  private _pageData;
  @Input() set pageData(value:IPageData){
    this._pageData = value;
    this.handlePager();
  }

  get pageData(): IPageData{
    return this._pageData;
  }

  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();

  pagerList = [];

  totalBtns:number;

  constructor() { }

  handlePager() {
    this.pagerList.splice(0);

    this.totalBtns = Math.ceil(this.pageData.totalResults/10);

    let startNum;
    let endNum;

    if (this.totalBtns > 3) {
        if (this.pageData.currentPage === 1){
          startNum = 1;
          endNum = startNum + 2;

        } else if (this.pageData.currentPage === this.totalBtns){
          endNum = this.totalBtns;
          startNum = this.totalBtns - 2;

        } else {
          startNum = this.pageData.currentPage - 1;
          endNum = this.pageData.currentPage + 1;

        }
    } else {
      startNum = 1;
      endNum = this.totalBtns;
    }

    for (let i = startNum; i <= endNum; i++ ){
      this.pagerList.push(i);
    }
  }

  handlePagerClick(pageNum): void{
    this.selectedPage.emit(pageNum);
  }

  goToFirst(): void{
    this.handlePagerClick(1);
  }

  goToLast(): void{
    this.handlePagerClick(this.totalBtns);
  }

  isFirst(): boolean{
    return this.pageData.currentPage === 1;
  }

  isLast(): boolean{
    return this.pageData.currentPage === this.totalBtns;
  }

  goToPrev(): void{
    this.handlePagerClick(this.pageData.currentPage - 1);
  }

  goToNext(): void{
    this.handlePagerClick(this.pageData.currentPage + 1);
  }


}
