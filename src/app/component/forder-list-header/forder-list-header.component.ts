import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderCreateModalComponent } from '../folder-create-modal/folder-create-modal.component';

@Component({
  selector: 'app-forder-list-header',
  templateUrl: './forder-list-header.component.html',
  styleUrls: ['./forder-list-header.component.scss']
})
export class ForderListHeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * フォルダの新規作成モーダルを表示する
   *
   * @memberof ForderListHeaderComponent
   */
  public create() {
    console.log('create');
    const dialogRef = this.dialog.open(FolderCreateModalComponent, {
      width: '360px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
