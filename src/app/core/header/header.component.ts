import { Component, OnInit } from '@angular/core';
import { UiStyleToggleService } from 'src/app/core/services/configStyles/ui-style-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private theme: string = 'ligth';
  public darkMode: boolean = false;

  constructor(private uiStyleToggleService: UiStyleToggleService) { }

  ngOnInit(): void {
    if (localStorage.getItem('theme')) {
      this.theme = (localStorage.getItem('theme')!);
    }
    if (this.theme === 'light') {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  toggleTheme() {
    this.uiStyleToggleService.toggle();
  }

  openNav(): void {
    (<HTMLInputElement>document.getElementById('mySidenav1')).style.width = '195px';
  }

  closeNav(): void {
    (<HTMLInputElement>document.getElementById('mySidenav1')).style.width = '0';
  }
}