import { TestBed } from '@angular/core/testing';

import { KintaiService } from './kintai.service';

describe('KintaiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KintaiService = TestBed.get(KintaiService);
    expect(service).toBeTruthy();
  });
});
