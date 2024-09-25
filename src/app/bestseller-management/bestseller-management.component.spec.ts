import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellerManagementComponent } from './bestseller-management.component';

describe('BestsellerManagementComponent', () => {
  let component: BestsellerManagementComponent;
  let fixture: ComponentFixture<BestsellerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestsellerManagementComponent]
    });
    fixture = TestBed.createComponent(BestsellerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
