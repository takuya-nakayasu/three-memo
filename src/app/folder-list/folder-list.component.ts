import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Folder } from '../entity/folder.entity';
import { SpinnerService } from '../services/spinner.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../services/toast.service';
import { FolderChangeNameModalComponent } from '../component/folder-change-name-modal/folder-change-name-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FolderService } from '../services/folder.service';
import { AuthenticationService } from '../services/authentication.service';
import { firestore } from 'firebase';
import { UpsertRoutingParam } from '../entity/upsert-routing-param.entity';

/**
 * フォルダ一覧コンポーネントクラス
 *
 * @export
 * @class FolderListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  public ELEMENT_DATA: Folder[];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['title', 'updatedDate', 'star'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private spinnerService: SpinnerService,
    private _toastService: ToastService,
    private authenticationService: AuthenticationService,
    private folderService: FolderService,
    private router: Router,
    public dialog: MatDialog,
    private afStore: AngularFirestore
  ) {}

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.retrieveFolder();
  }

  /**
   * フォルダの一覧を取得する
   *
   * @memberof FolderListComponent
   */
  public retrieveFolder() {
    const user = this.authenticationService.getCurrentUser();
    // 自分が作成したフォルダーを取得する
    this.folderService.folderCollection = this.afStore.collection(
      'folder',
      ref =>
        ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.folderService.folderCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.spinnerService.hide();
    });
  }

  /**
   * フォルダ名の変更
   *
   * @param {Folder} selectedFolder
   * @memberof FolderListComponent
   */
  public changeFolderName(selectedFolder: Folder) {
    // フォルダ名称変更モーダルを開く
    const dialogRef = this.dialog.open(FolderChangeNameModalComponent, {
      width: '360px',
      data: selectedFolder
    });

    // モーダルを閉じた後の処理
    dialogRef.afterClosed().subscribe((updatedFolder: Folder) => {
      this.spinnerService.show();
      // APIにアクセスしてフォルダ名称と更新日時をアップデートする
      this.folderService.folderCollection.doc(updatedFolder.id).update({
        title: updatedFolder.title,
        updatedDate: firestore.FieldValue.serverTimestamp()
      });
    });
  }

  /**
   * フォルダを削除する
   *
   * @param {Folder} selectedFolder
   * @memberof FolderListComponent
   */
  public deleteFolder(selectedFolder: Folder) {
    this.spinnerService.show();
    this.folderService.folderCollection
      .doc(selectedFolder.id)
      .delete()
      .then(() => {
        console.log('folder deleted');
        this._toastService.open('フォルダを削除しました。');
      })
      .catch(error => {
        console.log(error);
        this._toastService.open('フォルダの削除に失敗しました。');
      })
      .finally(() => this.spinnerService.hide());
  }

  /**
   * フォルダー内のメモ一覧を表示した更新画面に遷移する
   *
   * @param {Folder} selectedFolder
   * @memberof FolderListComponent
   */
  public moveToFolder(selectedFolder: Folder) {
    console.log(selectedFolder);
    // フォルダー内のメモ一覧を表示した更新画面に遷移する
    const param: UpsertRoutingParam = {
      selectedMemoId: '',
      selectedFolderId: selectedFolder.id || ''
    };
    this.router.navigate(['/home/upsert', param]);
  }
}
