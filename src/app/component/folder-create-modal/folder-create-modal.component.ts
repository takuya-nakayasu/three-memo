import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Folder } from '../../entity/folder.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FolderService } from 'src/app/services/folder.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private authenticationService: AuthenticationService,
    private folderService: FolderService,
    private afStore: AngularFirestore,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();

    this.retrieveFolder();
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.folderFormGroup = this.fb.group({
      title: ['', [Validators.required]]
    });

    // フォームコントロールの設定
    this.titleControl = this.folderFormGroup.get('title') as FormControl;
  }

  /**
   * モーダルの作成ボタン押下時に呼び出し。
   * フォルダを新規作成する
   *
   * @memberof FolderCreateModalComponent
   */
  public onOkClick(): void {
    console.log(this.titleControl.value);
    // スピナーを表示する
    this.spinnerService.show();

    // ログインしているユーザ情報の取得
    const user = this.authenticationService.getCurrentUser();

    // フォルダを新規作成する
    this.folder = {
      id: '',
      title: this.titleControl.value,
      createdUser: user.uid,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updatedDate: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.afStore
      .collection('folder')
      .add(this.folder)
      .then(docRef => {
        this.folderService.folderCollection.doc(docRef.id).update({
          id: docRef.id
        });
      })
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

  /**
   * フォルダ一覧の情報を取得する
   *
   * @memberof FolderCreateModalComponent
   */
  public retrieveFolder() {
    this.folderService.folderCollection = this.afStore.collection(
      'folder',
      ref => ref.orderBy('updatedDate', 'desc')
    );
  }
}
