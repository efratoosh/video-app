import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'va-footer',
  template: '<footer class="page-footer"></footer>',
  styles: [`.page-footer{background:#0C163B ;color:#B3CFFB;height: 70px;}
            :host{flex-shrink: 0; flex-grow: 0;}
`]
})
export class FooterComponent {

}
