import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KintaiCardComponent } from './kintai-card.component';

describe('KintaiCardComponent', () => {
  let component: KintaiCardComponent;
  let fixture: ComponentFixture<KintaiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KintaiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KintaiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
