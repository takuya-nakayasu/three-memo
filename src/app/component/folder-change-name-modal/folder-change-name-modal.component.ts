import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Folder } from 'src/app/entity/folder.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * フォルダー名変更モーダル
 *
 * @export
 * @class FolderChangeNameModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-folder-change-name-modal',
  templateUrl: './folder-change-name-modal.component.html',
  styleUrls: ['./folder-change-name-modal.component.scss']
})
export class FolderChangeNameModalComponent implements OnInit {
  // FormGroup定義
  public folderFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  public folder: Folder;

  // モーダルへの参照をDI
  constructor(
    public dialogRef: MatDialogRef<FolderChangeNameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedFolder: Folder
  ) {}

  ngOnInit() {}

  /**
   * モーダルのキャンセルボタン押下時に呼び出し。
   * 本モーダルを閉じる
   *
   * @memberof FolderCreateModalComponent
   */
  public onNoClick(): void {
    // モーダルを閉じる
    this.dialogRef.close();
  }
}
