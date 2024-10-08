import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSlotComponent } from './galzyr-slot.component';

describe('GalzyrSlotComponent', () => {
  let component: GalzyrSlotComponent;
  let fixture: ComponentFixture<GalzyrSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
