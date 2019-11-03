import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

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
    private afStore: AngularFirestore
  ) {
    this.createForm();
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
  }

  ngOnInit() {}

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

  onSubmit() {
    console.log(`${this.titleControl.value}/${this.descriptionControl.value}`);

    const user = this.afAuth.auth.currentUser;

    console.log(` uid: ${user.uid} \n providerId: ${user.providerId}`);
    console.log(` email: ${user.email}\n photoURL: ${user.photoURL}`);
    console.log(
      ` providerData: ${user.providerData}\n emailVerified: ${
        user.emailVerified
      }`
    );
    console.log(
      ` displayName: ${user.displayName}\n phoneNumber: ${user.phoneNumber}`
    );
    this.memo = {
      id: '',
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      createdUser: user.uid,
      createdDate: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.afStore
      .collection('memos')
      .add(this.memo)
      .then(docRef => {
        // this.memoCollection.doc(docRef.id).update({
        //   id: docRef.id
        // });
      });
    console.log('memo');
    console.log(this.memo);
  }
}
