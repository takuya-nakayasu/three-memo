import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * トーストの表示を制御するサービス
 *
 * @export
 * @class SpinnerService
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // tslint:disable-next-line:variable-name
  private _actionMessage = 'Close';

  // tslint:disable-next-line:variable-name
  constructor(private _snackBar: MatSnackBar) {}

  public open(message: string): void {
    this._snackBar.open(message, this._actionMessage, {
      duration: 2000
    });
  }
}
