import { Component, OnInit, Input } from '@angular/core';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

/**
 *　メモ一覧コンポーネント
 *
 * @export
 * @class ListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public memo: Memo;
  public memos: Memo[];
  public memoCollection: AngularFirestoreCollection<Memo>;
  public numberOfMemos: number;

  @Input() isSelected: boolean;

  constructor(
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService,
    private _toastService: ToastService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  public ngOnInit() {
    this.retrieveMemos();
  }

  /**
   *　メモ一覧の取得
   *
   * @memberof ListComponent
   */
  public retrieveMemos(): void {
    const user = this.afAuth.auth.currentUser;
    // 自分が作成したメモを取得する
    this.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    if (this.isSelected) {
      this.memoCollection.get().subscribe(querySnapshot => {
        let index = 0;
        querySnapshot.forEach(memoSnapshot => {
          const memo = memoSnapshot.data();
          console.log(memo);
          index++;
          if (memo && index === 1) {
            // デフォルトでは、先頭のメモを参照する
            this.router.navigate([`/home/update/${memo.id}`]);
          }
        });
      });
    }

    this.memoCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.memos = data;
      this.numberOfMemos = this.memos.length;
      this.spinnerService.hide();
    });
  }

  /**
   * メモの削除
   *
   * @param {string} id
   * @memberof ListComponent
   */
  public delete(id: string): void {
    this.spinnerService.show();
    console.log(`id: ${id}`);
    this.memoCollection
      .doc(id)
      .delete()
      .then(() => {
        console.log('memo deleted');
        // 削除に成功したら、新規メモ作成画面に遷移する
        this.router.navigate(['/home/create']);
        this._toastService.open('メモを削除しました。');
      })
      .catch(error => {
        console.log(error);
        this._toastService.open('メモの削除に失敗しました。');
      })
      .finally(() => this.spinnerService.hide());
  }

  /**
   * 選択したメモの編集に遷移する
   *
   * @param {string} id
   * @memberof ListComponent
   */
  public update(id: string): void {
    this.router.navigate(['/home/update', id]);
  }
}
