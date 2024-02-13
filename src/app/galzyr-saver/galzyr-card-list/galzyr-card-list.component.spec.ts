import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrCardListComponent } from './galzyr-card-list.component';

describe('GalzyrCardListComponent', () => {
  let component: GalzyrCardListComponent;
  let fixture: ComponentFixture<GalzyrCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalzyrCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
