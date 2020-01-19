import { Component, OnInit } from '@angular/core';

/**
 * 左端に表示されているサイドメニュー
 * 新規メモ・すべてのメモ・フォルダ などのメニューを表示する
 *
 * @export
 * @class MainSideMenuComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-main-side-menu',
  templateUrl: './main-side-menu.component.html',
  styleUrls: ['./main-side-menu.component.scss']
})
export class MainSideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
