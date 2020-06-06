import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';

/**
 * 画面ヘッダーのコンポーネントクラス
 *
 * @export
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isHandset$: Observable<boolean>;
  @Output() drawerToggled = new EventEmitter<void>();

  public currentUser: firebase.User;

  constructor(
    private router: Router,
    private _toastService: ToastService,
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.retrieveUserProfile();
  }

  /**
   * ログアウト処理
   *
   * @memberof HeaderComponent
   */
  public async signOut() {
    // スピナー表示
    this.spinnerService.show();
    // ログアウトAPIを呼び出す
    try {
      await this.authenticationService.signOut();
      // ログアウトが成功したら、ログイン画面に遷移
      this.router.navigate(['/login']);
      this._toastService.open('ログアウトしました。');
    } catch (error) {
      this._toastService.open('ログアウトに失敗しました。');
      console.log(error);
    } finally {
      this.spinnerService.hide();
    }
  }

  public toggle() {
    console.log('toggle');
    this.drawerToggled.emit();
  }

  /**
   * ログインしているユーザーの情報を取得する
   *
   * @private
   * @memberof HeaderComponent
   */
  private retrieveUserProfile() {
    this.currentUser = this.authenticationService.getCurrentUser();
  }
}
