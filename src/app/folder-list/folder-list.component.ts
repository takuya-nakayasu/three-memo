import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Folder } from '../entity/folder.entity';
import { SpinnerService } from '../services/spinner.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  public folderCollection: AngularFirestoreCollection<Folder>;
  public ELEMENT_DATA: Folder[];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['title', 'updatedDate', 'star'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private spinnerService: SpinnerService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.retrieveFolder();
  }

  public retrieveFolder() {
    const user = this.afAuth.auth.currentUser;
    // 自分が作成したフォルダーを取得する
    this.folderCollection = this.afStore.collection('folder', ref =>
      ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.folderCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.spinnerService.hide();
    });
  }
}
