import { TestBed } from '@angular/core/testing';

import { JewelleryShopService } from './jewellery-shop.service';

describe('JewelleryShopService', () => {
  let service: JewelleryShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JewelleryShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
