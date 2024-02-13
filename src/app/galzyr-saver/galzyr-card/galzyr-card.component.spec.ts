import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrCardComponent } from './galzyr-card.component';

describe('GalzyrCardComponent', () => {
  let component: GalzyrCardComponent;
  let fixture: ComponentFixture<GalzyrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalzyrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
