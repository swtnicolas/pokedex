import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appImgPreload]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})
export class ImgPreloadDirective {

  @Input() src: string = '';
  @Input() appImgPreload: string = '';
  @HostBinding('class') className: string = '';

  constructor() { }

  updateUrl() {
    this.src = this.appImgPreload;
  }
  load() {
    this.className = 'image-loaded';
  }

}
