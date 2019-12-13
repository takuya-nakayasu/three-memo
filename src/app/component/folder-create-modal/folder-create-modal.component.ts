import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * フォルダ新規作成モーダルのコンポーネントクラス
 *
 * @export
 * @class FolderCreateModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-folder-create-modal',
  templateUrl: './folder-create-modal.component.html',
  styleUrls: ['./folder-create-modal.component.scss']
})
export class FolderCreateModalComponent implements OnInit {
  // モーダルへの参照をDI
  constructor(public dialogRef: MatDialogRef<FolderCreateModalComponent>) {}

  ngOnInit() {}

  /**
   * モーダルの作成ボタン押下時に呼び出し
   *
   * @memberof FolderCreateModalComponent
   */
  public onOkClick(): void {
    // モーダルを閉じる
    this.dialogRef.close();
    // TODO: フォルダ作成処理追加
  }

  /**
   * モーダルのキャンセルボタン押下時に呼び出し
   *
   * @memberof FolderCreateModalComponent
   */
  public onNoClick(): void {
    // モーダルを閉じる
    this.dialogRef.close();
  }
}
