import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Memo } from 'src/app/entity/memo.entity';
import { Folder } from 'src/app/entity/folder.entity';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MemoService } from 'src/app/services/memo.service';
import { FolderService } from 'src/app/services/folder.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FolderCode } from 'src/app/constants/folder-code';
import { firestore } from 'firebase';

@Component({
  selector: 'app-upsert-form',
  templateUrl: './upsert-form.component.html',
  styleUrls: ['./upsert-form.component.scss']
})
export class UpsertFormComponent implements OnInit {
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
  // insertかupdateの判断で使用する
  public memoId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private memoService: MemoService,
    private folderService: FolderService,
    private authenticationService: AuthenticationService,
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
  public async onSubmit() {
    // スピナーを表示する
    this.spinnerService.show();

    this.memo.title = this.titleControl.value;
    this.memo.description = this.descriptionControl.value;
    this.memo.folderId = this.folderControl.value;
    this.memo.updatedDate = firestore.FieldValue.serverTimestamp();

    try {
      await this.memoService.updateMemo(this.memo);
      // 入力フォームをリセットする
      this.createFormGroup.reset();
    } catch (err) {
      console.log(err);
    } finally {
      // スピナーを非表示にする
      this.spinnerService.hide();
    }
  }

  /**
   * メモ一覧で選択したメモを取得
   *
   * @memberof UpdateComponent
   */
  public retrieveMemo() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // 画面遷移で渡したIDをキーにメモを取得
      this.memoService.retrieveMemo(params.get('id'));

      this.memoService.memoCollection.valueChanges().subscribe(data => {
        this.memo = data[0];
        if (this.memo) {
          this.titleControl.setValue(this.memo.title);
          this.descriptionControl.setValue(this.memo.description);
          this.folderControl.setValue(this.memo.folderId);
        }
      });
    });
  }

  public retrieveFolder() {
    const user = this.authenticationService.getCurrentUser();
    // 自分が作成したフォルダーを取得する
    this.folderService.folderCollection = this.afStore.collection(
      'folder',
      ref =>
        ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.setFolderList();
  }

  /**
   * 取得したフォルダーの一覧をセットする
   *
   * @private
   * @memberof UpdateFormComponent
   */
  private setFolderList() {
    this.folderService.folderCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.folderList = data;
      this.spinnerService.hide();
    });
  }
}
