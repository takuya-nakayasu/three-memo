import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-folder-create-modal',
  templateUrl: './folder-create-modal.component.html',
  styleUrls: ['./folder-create-modal.component.scss']
})
export class FolderCreateModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FolderCreateModalComponent>) {}

  ngOnInit() {}

  /**
   * キャンセルボタン押下時に呼び出し
   *
   * @memberof FolderCreateModalComponent
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
