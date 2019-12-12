import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-folder-create-modal',
  templateUrl: './folder-create-modal.component.html',
  styleUrls: ['./folder-create-modal.component.scss']
})
export class FolderCreateModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FolderCreateModalComponent>) {}

  ngOnInit() {}

  /**
   * 作成ボタン押下時に呼び出し
   *
   * @memberof FolderCreateModalComponent
   */
  public onOkClick(): void {
    this.dialogRef.close();
    // TODO: フォルダ作成処理追加
  }

  /**
   * キャンセルボタン押下時に呼び出し
   *
   * @memberof FolderCreateModalComponent
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
