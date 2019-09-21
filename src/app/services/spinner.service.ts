import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * スピナーの表示を制御するサービス
 *
 * @export
 * @class SpinnerService
 */
@Injectable()
export class SpinnerService {
  public isLoading = new Subject<boolean>();

  constructor() {}

  public show(): void {
    this.isLoading.next(true);
  }

  public hide(): void {
    this.isLoading.next(false);
  }
}
