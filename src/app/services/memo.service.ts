import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Memo } from '../entity/memo.entity';
import { SpinnerService } from './spinner.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private spinnerService: SpinnerService
  ) {}

  /**
   * メモ一覧の取得
   *
   * @memberof MemoService
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

  /**
   * メモの新規登録
   *
   * @memberof MemoService
   */
  public registerMemo() {
    // スピナーを表示する
    this.spinnerService.show();

    // ログインしているユーザ情報の取得
    const user = this.angularFireAuth.auth.currentUser;
  }
}
