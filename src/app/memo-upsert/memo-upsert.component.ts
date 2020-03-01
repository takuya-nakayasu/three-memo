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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedMemoId = params.get('id');
      this.selectedFolderId = params.get('folderId');
      console.log(`upsert-memoId: ${this.selectedMemoId}`);
      console.log(`upsert-folderId: ${this.selectedFolderId}`);
    });
  }
}
