import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  private _folderTitle = '';
  private _numberOfMemos = 0;

  @Input() set numberOfMemos(numberOfMemos: number) {
    this._numberOfMemos = numberOfMemos || 0;
  }

  get numberOfMemos(): number {
    return this._numberOfMemos;
  }

  @Input() set selectedFolderTitle(selectedFolderTitle: string) {
    this._folderTitle =
      (selectedFolderTitle && selectedFolderTitle.trim()) || 'すべてのメモ';
  }

  get folderTitle(): string {
    return this._folderTitle;
  }

  constructor() {}

  ngOnInit() {}
}
