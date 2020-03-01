import { Component, OnInit, Input } from '@angular/core';
import { Memo } from '../entity/memo.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { SpinnerService } from '../services/spinner.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Folder } from '../entity/folder.entity';
import { MemoService } from '../services/memo.service';
import { FolderService } from '../services/folder.service';
import { AuthenticationService } from '../services/authentication.service';

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
  public numberOfMemos: number;
  public selectedFolderTitle: string;
  public selectedFolder: Folder;

  @Input() isSelected: boolean;
  @Input() selectedMemoId: string;
  @Input() selectedFolderId: string;

  constructor(
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService,
    private memoService: MemoService,
    private folderService: FolderService,
    private _toastService: ToastService,
    private authenticationService: AuthenticationService,
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
      // listコンポーネントに遷移してきたら
      const memoId: string = params.get('id');
      const folderId: string = params.get('folderId');
      console.log(`memoId: ${memoId}`);
      console.log(`folderId: ${folderId}`);

      this.retrieveSelectedFolder(folderId);

      if (folderId) {
        return;
      }
      // すべてのメモで検索をスタートする
      // ここから
      const user = this.authenticationService.getCurrentUser();
      // 自分が作成したメモを取得する
      this.memoService.memoCollection = this.afStore.collection('memos', ref =>
        ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
      );
      // ここまでの処理にfolderIdを加えることでFolderIDに準拠したmemoCollectionを作成する

      if (this.isSelected && !memoId) {
        // メモの新規作成画面ではなく更新画面の場合は、isSelectedがTRUEになる
        // 画面の初期表示のタイミングでのみ呼び出し
        // メモを選択している場合はこの処理をスキップする
        this.selectFirstMemo();
      }
    });

    this.setMemoList();
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
    this.memoService.memoCollection
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
    this.router.navigate(['/home/upsert', id]);
  }

  private retrieveSelectedFolder(folderId: string): void {
    // 選択したフォルダーを取得する
    this.folderService.folderCollection = this.afStore.collection(
      'folder',
      ref => ref.where('id', '==', folderId)
    );

    this.folderService.folderCollection
      .valueChanges()
      .subscribe((data: Folder[]) => {
        if (data.length === 0) {
          return;
        }
        this.spinnerService.show();
        this.selectedFolder = data[0];
        this.selectedFolderTitle = this.selectedFolder.title;
        this.retrieveMemoByFolderId(this.selectedFolder.id);
        console.log(this.selectedFolder);
        this.spinnerService.hide();
      });
  }

  /**
   * 選択したフォルダー内のメモをセットする
   *
   * @private
   * @param {string} folderId
   * @memberof ListComponent
   */
  private retrieveMemoByFolderId(folderId: string): void {
    this.memoService.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc').where('folderId', '==', folderId)
    );

    // TODO: フォルダをリセットしないように最初のメモを選択する方法を検討する
    // this.selectFirstMemo();

    this.setMemoList();
  }

  /**
   *　先頭のメモを選択状態にする
   *
   * @private
   * @memberof ListComponent
   */
  private selectFirstMemo() {
    this.memoService.memoCollection.get().subscribe(querySnapshot => {
      // 先頭のメモを選択状態にするための処理
      let index = 0;
      querySnapshot.forEach(memoSnapshot => {
        const memo = memoSnapshot.data();
        console.log(memo);
        index++;
        if (memo && index === 1) {
          // デフォルトでは、先頭のメモを参照する
          this.router.navigate([`/home/upsert/${memo.id}`]);
        }
      });
    });
  }

  /**
   * 取得したメモの一覧をセットする
   *
   * @private
   * @memberof ListComponent
   */
  private setMemoList() {
    if (!this.memoService.memoCollection) {
      return;
    }
    this.memoService.memoCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.memos = data;
      this.numberOfMemos = this.memos.length;
      this.spinnerService.hide();
    });
  }
}
