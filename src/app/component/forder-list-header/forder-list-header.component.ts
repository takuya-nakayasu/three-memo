import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forder-list-header',
  templateUrl: './forder-list-header.component.html',
  styleUrls: ['./forder-list-header.component.scss']
})
export class ForderListHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /**
   * フォルダの新規作成
   *
   * @memberof ForderListHeaderComponent
   */
  public create() {
    console.log('create');
  }
}
