import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoUpsertComponent } from './memo-upsert.component';

describe('MemoUpsertComponent', () => {
  let component: MemoUpsertComponent;
  let fixture: ComponentFixture<MemoUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
