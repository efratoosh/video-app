import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'va-page-not-found',
  template: `Ooops...
            page was not found
            <a [routerLink]="['']">go back home></a>`
})
export class PageNotFoundComponent {

}
