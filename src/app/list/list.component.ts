import { Component, OnInit } from '@angular/core';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public memo: Memo;
  public memos: Memo[];
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.retrieveMemos();
  }

  public retrieveMemos() {
    this.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('createdDate', 'desc')
    );

    this.memoCollection.valueChanges().subscribe(data => {
      this.memos = data;
      console.log(this.memos);
    });
  }
}
