import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Memo } from '../entity/memo.entity';
import { SpinnerService } from './spinner.service';
import * as firebase from 'firebase';

/**
 * メモ関連のサービスクラス
 *
 * @export
 * @class MemoService
 */
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
   * @memberof MemoService
   *
   */
  public retrieveMemos(): void {
    // スピナーを表示する
    this.spinnerService.show();
    this.memoCollection = this.angularFireStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc')
    );
    this.spinnerService.hide();
  }

  /**
   * メモ１件を取得する
   *
   * @param {string} memoId
   * @memberof MemoService
   */
  public retrieveMemo(memoId: string): void {
    // スピナーを表示する
    this.spinnerService.show();
    // IDをキーにメモを取得
    this.memoCollection = this.angularFireStore.collection('memos', ref =>
      ref.where('id', '==', memoId)
    );
    this.spinnerService.hide();
  }

  /**
   * メモの新規登録
   *
   * @memberof MemoService
   */
  public registerMemo(
    memo: Memo
  ): Promise<firebase.firestore.DocumentReference> {
    return this.angularFireStore.collection('memos').add(memo);
  }

  /**
   * メモの更新
   *
   * @param {Memo} memo
   * @returns {Promise<void>}
   * @memberof MemoService
   */
  public updateMemo(memo: Memo): Promise<void> {
    return this.memoCollection.doc(memo.id).update({
      title: memo.title,
      description: memo.description,
      folderId: memo.folderId,
      updatedDate: memo.updatedDate
    });
  }
}
