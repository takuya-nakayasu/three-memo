import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertFormComponent } from './upsert-form.component';

describe('UpsertFormComponent', () => {
  let component: UpsertFormComponent;
  let fixture: ComponentFixture<UpsertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
