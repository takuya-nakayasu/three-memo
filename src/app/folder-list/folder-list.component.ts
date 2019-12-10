import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Folder } from '../entity/folder.entity';

const ELEMENT_DATA: Folder[] = [
  {
    id: '1',
    name: 'Hydrogen',
    numberOfFiles: 1,
    createdUser: 'H',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '2',
    name: 'Helium',
    numberOfFiles: 4,
    createdUser: 'He',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '3',
    name: 'Lithium',
    numberOfFiles: 6,
    createdUser: 'Li',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '4',
    name: 'Beryllium',
    numberOfFiles: 9,
    createdUser: 'Be',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '5',
    name: 'Boron',
    numberOfFiles: 10,
    createdUser: 'B',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '6',
    name: 'Carbon',
    numberOfFiles: 12,
    createdUser: 'C',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '7',
    name: 'Nitrogen',
    numberOfFiles: 14,
    createdUser: 'N',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '8',
    name: 'Oxygen',
    numberOfFiles: 15,
    createdUser: 'O',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '9',
    name: 'Fluorine',
    numberOfFiles: 18,
    createdUser: 'F',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '10',
    name: 'Neon',
    numberOfFiles: 20,
    createdUser: 'Ne',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  }
];
@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'numberOfFiles', 'updatedDate', 'star'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * フォルダの新規作成
   *
   * @memberof FolderListComponent
   */
  public create() {
    console.log('create');
  }
}
