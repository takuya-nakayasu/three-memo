import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Memo } from 'src/app/entity/memo.entity';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as firebase from 'firebase';
import { Folder } from 'src/app/entity/folder.entity';
import { FolderCode } from '../../constants/folder-code';
import { MemoService } from '../../services/memo.service';
import { FolderService } from 'src/app/services/folder.service';

/**
 * メモ新規作成フォーム
 *
 * @export
 * @class CreateFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  // FormGroup定義
  public createFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  // descriptionフォームのコントロール定義
  public descriptionControl: FormControl;
  public folderControl: FormControl;
  public memo: Memo;
  public folderList: Folder[];
  public folderNone: number;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private folderService: FolderService,
    private memoService: MemoService,
    private spinnerService: SpinnerService
  ) {
    this.createForm();

    // フォームコントロールの設定
    this.folderControl = this.createFormGroup.get('folder') as FormControl;
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
  }

  ngOnInit() {
    this.retrieveMemos();
    this.retrieveFolder();
    this.folderNone = FolderCode.None;
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.createFormGroup = this.fb.group({
      title: ['', [Validators.required]],
      folder: ['', []],
      description: ['', [Validators.required]]
    });
  }

  /**
   * メモの新規作成
   *
   * @memberof CreateComponent
   */
  public onSubmit(form: NgForm) {
    // スピナーを表示する
    this.spinnerService.show();

    // ログインしているユーザ情報の取得
    const user = this.afAuth.auth.currentUser;

    // メモを新規作成する
    this.memo = {
      id: '',
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      folderId: this.folderControl.value,
      createdUser: user.uid,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updatedDate: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.afStore
      .collection('memos')
      .add(this.memo)
      .then(docRef => {
        this.memoService.memoCollection.doc(docRef.id).update({
          id: docRef.id
        });
        // フォームの内容をリセットする
        form.resetForm();
      })
      .finally(() => {
        // スピナーを非表示にする
        this.spinnerService.hide();
      });
  }

  /**
   * メモ一覧の取得
   *
   * @memberof CreateComponent
   */
  public retrieveMemos() {
    this.memoService.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc')
    );
  }

  /**
   * フォルダ一覧の取得とセット
   *
   * @memberof CreateFormComponent
   */
  public retrieveFolder() {
    const user = this.afAuth.auth.currentUser;
    // 自分が作成したフォルダーを取得する
    this.folderService.folderCollection = this.afStore.collection(
      'folder',
      ref =>
        ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.folderService.folderCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.folderList = data;
      this.spinnerService.hide();
    });
  }
}
