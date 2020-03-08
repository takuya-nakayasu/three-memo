import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-memo-upsert',
  templateUrl: './memo-upsert.component.html',
  styleUrls: ['./memo-upsert.component.scss']
})
export class MemoUpsertComponent implements OnInit {
  public selectedMemoId: string;
  public selectedFolderId: string;
  public isCreate: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedMemoId = params.get('selectedMemoId');
      this.selectedFolderId = params.get('selectedFolderId');
      this.isCreate = params.get('isCreate') === 'true';
    });
  }
}
