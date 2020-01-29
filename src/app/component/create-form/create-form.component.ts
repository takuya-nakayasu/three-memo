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
  ) {}

  ngOnInit() {
    this.createForm();

    this.memoService.retrieveMemos();
    this.folderService.retrieveFolder();
    this.setFolderList();

    this.folderNone = FolderCode.None;
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
   * フォーム設定の作成
   *
   */
  private createForm() {
    // フォームコントロールの設定
    this.folderControl = this.createFormGroup.get('folder') as FormControl;
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;

    this.createFormGroup = this.fb.group({
      title: ['', [Validators.required]],
      folder: ['', []],
      description: ['', [Validators.required]]
    });
  }

  /**
   * フォルダ一覧のセット
   *
   * @memberof CreateFormComponent
   */
  private setFolderList() {
    this.folderService.folderCollection.valueChanges().subscribe(data => {
      this.folderList = data;
    });
  }
}
