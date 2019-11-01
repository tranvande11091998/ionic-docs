import { TestBed } from '@angular/core/testing';

import { Todo2Service } from './todo2.service';

describe('Todo2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Todo2Service = TestBed.get(Todo2Service);
    expect(service).toBeTruthy();
  });
});
