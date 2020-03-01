import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-memo-upsert',
  templateUrl: './memo-upsert.component.html',
  styleUrls: ['./memo-upsert.component.scss']
})
export class MemoUpsertComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const memoId = params.get('id');
      const folderId: string = params.get('folderId');
      console.log(`upsert-memoId: ${memoId}`);
      console.log(`upsert-folderId: ${folderId}`);
    });
  }
}
