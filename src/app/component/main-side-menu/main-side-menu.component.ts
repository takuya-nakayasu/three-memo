import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UpsertRoutingParam } from '../../entity/upsert-routing-param.entity';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  @Input() isHandset: boolean;
  @Output() drawerClosed = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  /**
   * メモのUpsert画面に遷移する
   *
   * @memberof MainSideMenuComponent
   */
  public gotoUpsert(isCreate = false) {
    this.drawerClose();
    const param: UpsertRoutingParam = {
      selectedMemoId: '',
      selectedFolderId: '',
      isCreate
    };
    this.router.navigate(['/home/upsert', param]);
  }

  public drawerClose() {
    if (this.isHandset) {
      this.drawerClosed.emit();
    }
  }
}
