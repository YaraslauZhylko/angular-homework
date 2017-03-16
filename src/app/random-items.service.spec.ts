import { TestBed, inject } from '@angular/core/testing';

import { RandomItemsService } from './random-items.service';

describe('RandomItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomItemsService]
    });
  });

  it('should ...', inject([RandomItemsService], (service: RandomItemsService) => {
    expect(service).toBeTruthy();
  }));
});
