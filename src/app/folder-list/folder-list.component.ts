import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Folder } from '../entity/folder.entity';

const ELEMENT_DATA: Folder[] = [
  {
    id: '1',
    title: 'Hydrogen',
    numberOfFiles: 1,
    createdUser: 'H',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '2',
    title: 'Helium',
    numberOfFiles: 4,
    createdUser: 'He',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '3',
    title: 'Lithium',
    numberOfFiles: 6,
    createdUser: 'Li',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '4',
    title: 'Beryllium',
    numberOfFiles: 9,
    createdUser: 'Be',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '5',
    title: 'Boron',
    numberOfFiles: 10,
    createdUser: 'B',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '6',
    title: 'Carbon',
    numberOfFiles: 12,
    createdUser: 'C',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '7',
    title: 'Nitrogen',
    numberOfFiles: 14,
    createdUser: 'N',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '8',
    title: 'Oxygen',
    numberOfFiles: 15,
    createdUser: 'O',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '9',
    title: 'Fluorine',
    numberOfFiles: 18,
    createdUser: 'F',
    createdDate: '2019/12/5',
    updatedDate: '2019/12/7'
  },
  {
    id: '10',
    title: 'Neon',
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
  displayedColumns: string[] = [
    'title',
    'numberOfFiles',
    'updatedDate',
    'star'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
