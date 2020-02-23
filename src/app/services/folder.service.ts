import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Folder } from '../entity/folder.entity';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from './spinner.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  public folderCollection: AngularFirestoreCollection<Folder>;

  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private spinnerService: SpinnerService
  ) {}

  /**
   * フォルダ一覧の取得とセット
   *
   */
  public retrieveFolderList() {
    this.spinnerService.show();
    const user = this.angularFireAuth.auth.currentUser;
    // 自分が作成したフォルダーを取得する
    this.folderCollection = this.angularFireStore.collection('folder', ref =>
      ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );
    this.spinnerService.hide();
  }

  public registerFolder(folder: Folder): Promise<firestore.DocumentReference> {
    return this.angularFireStore.collection('folder').add(folder);
  }
}
