import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpsertRoutingParam } from '../../entity/upsert-routing-param.entity';

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
  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * メモのUpsert画面に遷移する
   *
   * @memberof MainSideMenuComponent
   */
  public gotoUpsert(isCreate = false) {
    const param: UpsertRoutingParam = {
      selectedMemoId: '',
      selectedFolderId: '',
      isCreate
    };
    this.router.navigate(['/home/upsert', param]);
  }
}
