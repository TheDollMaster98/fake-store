import { Component, OnInit } from '@angular/core';
import { faCartShopping, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  faUser = faUser;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
