import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav(): void {
    (<HTMLInputElement>document.getElementById('mySidenav1')).style.width = '195px';
  }

  closeNav(): void {
    (<HTMLInputElement>document.getElementById('mySidenav1')).style.width = '0';
  }
}