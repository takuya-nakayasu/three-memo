import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KintaiTableComponent } from './kintai-table.component';

describe('KintaiTableComponent', () => {
  let component: KintaiTableComponent;
  let fixture: ComponentFixture<KintaiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KintaiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KintaiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
