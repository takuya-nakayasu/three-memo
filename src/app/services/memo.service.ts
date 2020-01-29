import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Memo } from '../entity/memo.entity';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor(
    private angularFireStore: AngularFirestore,
    private spinnerService: SpinnerService
  ) {}

  /**
   * メモ一覧の取得
   *
   */
  public retrieveMemos() {
    // スピナーを表示する
    this.spinnerService.show();
    this.memoCollection = this.angularFireStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc')
    );
    this.spinnerService.hide();
  }
}
