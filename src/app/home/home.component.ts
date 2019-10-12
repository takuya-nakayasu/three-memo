import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public member = {
    id: 1,
    name: '大久保綾乃',
    age: 35,
    job: '小学校の教師'
  };

  constructor() {}

  ngOnInit() {}
}
