import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Folder } from '../entity/folder.entity';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  public folderCollection: AngularFirestoreCollection<Folder>;

  constructor() {}
}
