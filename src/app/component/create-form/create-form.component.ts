import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { Memo } from 'src/app/entity/memo.entity';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Folder } from 'src/app/entity/folder.entity';
import { FolderCode } from '../../constants/folder-code';
import { MemoService } from '../../services/memo.service';
import { FolderService } from 'src/app/services/folder.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { firestore } from 'firebase';

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
    private folderService: FolderService,
    private authenticationService: AuthenticationService,
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
  public async onSubmit(form: NgForm) {
    // スピナーを表示する
    this.spinnerService.show();

    // ログインしているユーザ情報の取得
    const user = this.authenticationService.getCurrentUser();

    // メモを新規作成する
    this.memo = {
      id: '',
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      folderId: this.folderControl.value,
      createdUser: user.uid,
      createdDate: firestore.FieldValue.serverTimestamp(),
      updatedDate: firestore.FieldValue.serverTimestamp()
    };

    try {
      const docRef = await this.memoService.registerMemo(this.memo);

      this.memoService.memoCollection.doc(docRef.id).update({
        id: docRef.id
      });
      form.resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      // スピナーを非表示にする
      this.spinnerService.hide();
    }
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

    // フォームコントロールの設定
    this.folderControl = this.createFormGroup.get('folder') as FormControl;
    this.titleControl = this.createFormGroup.get('title') as FormControl;
    this.descriptionControl = this.createFormGroup.get(
      'description'
    ) as FormControl;
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
