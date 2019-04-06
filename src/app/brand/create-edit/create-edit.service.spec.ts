import { TestBed } from '@angular/core/testing';

import { CreateEditService } from './create-edit.service';

describe('CreateEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateEditService = TestBed.get(CreateEditService);
    expect(service).toBeTruthy();
  });
});
