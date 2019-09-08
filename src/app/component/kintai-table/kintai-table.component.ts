import { Component } from '@angular/core';
import { KintaiEntity } from 'src/app/entity/kintai.entity';

const ELEMENT_DATA: KintaiEntity[] = [
  {
    date: '2019/5/12',
    workTime: 8.0,
    start: '9:00',
    end: '18:00',
    breakTime: 1.0
  }
];

@Component({
  selector: 'app-kintai-table',
  templateUrl: './kintai-table.component.html',
  styleUrls: ['./kintai-table.component.scss']
})
export class KintaiTableComponent {
  displayedColumns: string[] = [
    'date',
    'workTime',
    'start',
    'end',
    'breakTime'
  ];
  dataSource = ELEMENT_DATA;
}
