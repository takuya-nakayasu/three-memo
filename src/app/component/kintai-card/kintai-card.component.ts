import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-kintai-card',
  templateUrl: './kintai-card.component.html',
  styleUrls: ['./kintai-card.component.scss']
})
export class KintaiCardComponent implements OnInit {
  public date: string;
  public time: string;
  private timer: Observable<number>;

  constructor() {}

  ngOnInit() {
    // momentにlang:jaを設定する
    moment.lang('ja');
    this.updateTime();
    this.setTimer();
  }

  public startWork(): void {
    console.log('startWork');
  }

  public endWork(): void {
    console.log('endWork');
  }

  public startBreak(): void {
    console.log('startBreak');
  }

  private updateTime(): void {
    this.date = moment().format('YYYY年M月DD日(ddd)');
    this.time = moment().format('HH : mm : ss');
  }

  private setTimer(): void {
    this.timer = interval(1000);
    this.timer.subscribe(() => this.updateTime());
  }
}
