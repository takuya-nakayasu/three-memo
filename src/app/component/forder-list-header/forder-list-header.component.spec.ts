import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForderListHeaderComponent } from './forder-list-header.component';

describe('ForderListHeaderComponent', () => {
  let component: ForderListHeaderComponent;
  let fixture: ComponentFixture<ForderListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForderListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForderListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
