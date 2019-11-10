import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Memo } from '../entity/memo.entity';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { SpinnerService } from '../services/spinner.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  // FormGroup定義
  public createFormGroup: FormGroup;
  // Titleフォームのコントロール定義
  public titleControl: FormControl;
  // descriptionフォームのコントロール定義
  public descriptionControl: FormControl;
  public memo: Memo;
  public memoCollection: AngularFirestoreCollection<Memo>;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService
  ) {
    this.createForm();
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
  }

  ngOnInit() {
    this.retrieveMemo();
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

  onSubmit() {
    this.spinnerService.show();
    console.log(`${this.titleControl.value}/${this.descriptionControl.value}`);

    const user = this.afAuth.auth.currentUser;
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
        this.createFormGroup.reset();
        this.spinnerService.hide();
      });
    console.log('memo');
    console.log(this.memo);
  }

  public retrieveMemos() {
    this.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc')
    );
  }

  public retrieveMemo() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.spinnerService.show();
      const paramId = params.get('id');
      console.log(paramId);

      this.memoCollection = this.afStore.collection('memos', ref =>
        ref.where('id', '==', paramId)
      );

      this.memoCollection.valueChanges().subscribe(data => {
        const memo: Memo = data[0];
        this.titleControl.setValue(memo.title);
        this.descriptionControl.setValue(memo.description);
      });
      this.spinnerService.hide();
    });
  }
}
