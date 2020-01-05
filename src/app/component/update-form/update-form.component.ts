import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Memo } from 'src/app/entity/memo.entity';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as firebase from 'firebase';
import { Folder } from 'src/app/entity/folder.entity';
import { FolderCode } from 'src/app/constants/folder-code';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  // FormGroup定義
  public createFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  // descriptionフォームのコントロール定義
  public descriptionControl: FormControl;
  public folderControl: FormControl;
  public memo: Memo;
  public memoCollection: AngularFirestoreCollection<Memo>;
  public folderCollection: AngularFirestoreCollection<Folder>;
  public folderList: Folder[];
  public folderNone: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService
  ) {
    this.createForm();
    this.folderControl = this.createFormGroup.get('folder') as FormControl;
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
  }

  ngOnInit() {
    this.retrieveMemo();
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
   * メモ更新処理
   *
   * @memberof UpdateComponent
   */
  public onSubmit() {
    this.spinnerService.show();
    console.log(`${this.titleControl.value}/${this.descriptionControl.value}`);

    this.memoCollection
      .doc(this.memo.id)
      .update({
        title: this.titleControl.value,
        description: this.descriptionControl.value,
        folderId: this.folderControl.value,
        updatedDate: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        this.createFormGroup.reset();
        this.spinnerService.hide();
      });
  }

  /**
   * メモ一覧で選択したメモを取得
   *
   * @memberof UpdateComponent
   */
  public retrieveMemo() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.spinnerService.show();
      // メモ一覧で選択したメモのIDを取得
      const paramId = params.get('id');
      console.log(paramId);

      // IDをキーにメモを取得
      this.memoCollection = this.afStore.collection('memos', ref =>
        ref.where('id', '==', paramId)
      );

      this.memoCollection.valueChanges().subscribe(data => {
        this.memo = data[0];
        if (this.memo) {
          this.titleControl.setValue(this.memo.title);
          this.descriptionControl.setValue(this.memo.description);
          this.folderControl.setValue(this.memo.folderId);
        }
      });
      this.spinnerService.hide();
    });
  }

  public retrieveFolder() {
    const user = this.afAuth.auth.currentUser;
    // 自分が作成したフォルダーを取得する
    this.folderCollection = this.afStore.collection('folder', ref =>
      ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.folderCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.folderList = data;
      this.spinnerService.hide();
    });
  }
}
