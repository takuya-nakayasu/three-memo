import { Component, OnInit, Input } from '@angular/core';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from '../services/spinner.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Folder } from '../entity/folder.entity';

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
  public folderCollection: AngularFirestoreCollection<Folder>;
  public numberOfMemos: number;
  public selectedFolder: Folder;

  @Input() isSelected: boolean;

  constructor(
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService,
    private _toastService: ToastService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      const memoId: string = params.get('id');
      const folderId: string = params.get('folderId');
      console.log(`memoId: ${memoId}`);
      console.log(`folderId: ${folderId}`);

      this.retrieveSelectedFolder(folderId);

      // TODO: FolderIDを考慮した処理に変更する
      // ここから
      const user = this.afAuth.auth.currentUser;
      // 自分が作成したメモを取得する
      this.memoCollection = this.afStore.collection('memos', ref =>
        ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
      );
      // ここまでの処理にfolderIdを加えることでFolderIDに準拠したmemoCollectionを作成する
      // TODO: リストヘッダーにメモの数だけでなくフォルダ名も渡してあげること

      if (this.isSelected && !memoId) {
        // メモの新規作成画面ではなく更新画面の場合は、isSelectedがTRUEになる
        // 画面の初期表示のタイミングでのみ呼び出し
        // メモを選択している場合はこの処理をスキップする
        this.memoCollection.get().subscribe(querySnapshot => {
          // 先頭のメモを選択状態にするための処理
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
    });

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

  private retrieveSelectedFolder(folderId: string): void {
    // 選択したフォルダーを取得する
    this.folderCollection = this.afStore.collection('folder', ref =>
      ref.where('id', '==', folderId)
    );

    this.folderCollection.valueChanges().subscribe((data: Folder[]) => {
      this.spinnerService.show();
      this.selectedFolder = data[0];
      console.log(this.selectedFolder);
      this.spinnerService.hide();
    });
  }
}
