import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderChangeNameModalComponent } from './folder-change-name-modal.component';

describe('FolderChangeNameModalComponent', () => {
  let component: FolderChangeNameModalComponent;
  let fixture: ComponentFixture<FolderChangeNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderChangeNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderChangeNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
