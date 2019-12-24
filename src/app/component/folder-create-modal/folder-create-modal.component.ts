import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Folder } from '../../entity/folder.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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
  public folder: Folder;
  // モーダルへの参照をDI
  constructor(
    public dialogRef: MatDialogRef<FolderCreateModalComponent>,
    private spinnerService: SpinnerService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
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
    // TODO: フォルダ作成処理追加
    console.log(this.titleControl.value);
    // スピナーを表示する
    this.spinnerService.show();

    // ログインしているユーザ情報の取得
    const user = this.afAuth.auth.currentUser;

    // メモを新規作成する
    this.folder = {
      id: '',
      title: this.titleControl.value,
      numberOfFiles: 0,
      createdUser: user.uid,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updatedDate: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.afStore
      .collection('folder')
      .add(this.folder)
      .then(docRef => {})
      .finally(() => {
        // スピナーを非表示にする
        this.spinnerService.hide();
        // モーダルを閉じる
        this.dialogRef.close();
      });
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
