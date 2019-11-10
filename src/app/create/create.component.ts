import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { SpinnerService } from '../services/spinner.service';

/**
 * メモの新規作成画面
 *
 * @export
 * @class CreateComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // FormGroup定義
  public createFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  // descriptionフォームのコントロール定義
  public descriptionControl: FormControl;
  public memo: Memo;
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService
  ) {
    this.createForm();

    // フォームコントロールの設定
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
  }

  ngOnInit() {
    this.retrieveMemos();
  }

  /**
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.createFormGroup = this.fb.group({
      title: ['', [Validators.required]],
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
      createdUser: user.uid,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updatedDate: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.afStore
      .collection('memos')
      .add(this.memo)
      .then(docRef => {
        this.memoCollection.doc(docRef.id).update({
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
    this.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc')
    );
  }
}
