import { Component, OnInit, Input } from '@angular/core';

/**
 * フォルダーサブメニューのヘッダーのコンポーネントクラス
 *
 * @export
 * @class ListHeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  // 選択しているフォルダ名
  private _folderTitle = '';
  // フォルダ内のメモの数
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
