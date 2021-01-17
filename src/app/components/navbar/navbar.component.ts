import { Component, OnInit } from '@angular/core';
import { UiStyleToggleService } from 'src/app/services/ui-style-toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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