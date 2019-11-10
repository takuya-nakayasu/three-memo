import { Component, OnInit } from '@angular/core';
import { Memo } from '../entity/memo.entity';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public memo: Memo;
  public memos: Memo[];
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor(
    private afStore: AngularFirestore,
    private spinnerService: SpinnerService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  public ngOnInit() {
    this.retrieveMemos();
  }

  public retrieveMemos(): void {
    const user = this.afAuth.auth.currentUser;
    this.memoCollection = this.afStore.collection('memos', ref =>
      ref.orderBy('updatedDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.memoCollection.valueChanges().subscribe(data => {
      this.spinnerService.show();
      this.memos = data;
      console.log(this.memos);
      this.spinnerService.hide();
    });
  }

  public delete(id: string): void {
    this.spinnerService.show();
    console.log(`id: ${id}`);
    this.memoCollection
      .doc(id)
      .delete()
      .then(() => {
        console.log('memo deleted');
        this.spinnerService.hide();
      });
  }

  public update(id: string): void {
    this.router.navigate(['/home/update', id]);
  }
}
