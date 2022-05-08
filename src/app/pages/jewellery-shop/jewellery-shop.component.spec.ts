import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelleryShopComponent } from './jewellery-shop.component';

describe('JewelleryShopComponent', () => {
  let component: JewelleryShopComponent;
  let fixture: ComponentFixture<JewelleryShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelleryShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JewelleryShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
