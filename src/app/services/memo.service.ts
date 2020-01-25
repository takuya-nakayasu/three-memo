import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Memo } from '../entity/memo.entity';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  public memoCollection: AngularFirestoreCollection<Memo>;

  constructor() {}
}
