import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * トーストの表示を制御するサービス
 *
 * @export
 * @class ToastService
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // tslint:disable-next-line:variable-name
  private _actionMessage = 'Close';

  // tslint:disable-next-line:variable-name
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * トーストを表示する
   *
   * @param {string} message トーストに表示するメッセージ
   * @memberof ToastService
   */
  public open(message: string): void {
    // 2000ミリ秒間トーストを表示する
    this._snackBar.open(message, this._actionMessage, {
      duration: 2000
    });
  }
}
