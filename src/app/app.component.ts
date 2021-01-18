import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showMe = true;

  constructor(
    private router: Router
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));
  }

  modifyHeader(location: any) {
    let id = location.url.slice(11, 16)
    if (location.url === `/pokemones/${id}`) {
      this.showMe = false;
    } else {
      this.showMe = true;
    }
  }
}
