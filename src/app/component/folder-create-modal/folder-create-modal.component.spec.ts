import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCreateModalComponent } from './folder-create-modal.component';

describe('FolderCreateModalComponent', () => {
  let component: FolderCreateModalComponent;
  let fixture: ComponentFixture<FolderCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
