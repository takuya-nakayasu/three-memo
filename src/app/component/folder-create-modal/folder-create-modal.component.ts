import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

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
  // FormGroup定義
  public folderFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  // モーダルへの参照をDI
  constructor(
    public dialogRef: MatDialogRef<FolderCreateModalComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();

    // フォームコントロールの設定
    this.titleControl = this.folderFormGroup.get('title') as FormControl;
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.folderFormGroup = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

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
