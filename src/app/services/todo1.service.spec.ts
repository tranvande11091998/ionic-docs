import { TestBed } from '@angular/core/testing';

import { Todo1Service } from './todo1.service';

describe('Todo1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Todo1Service = TestBed.get(Todo1Service);
    expect(service).toBeTruthy();
  });
});
