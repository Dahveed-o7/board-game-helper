import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSaverComponent } from './galzyr-saver.component';

describe('GalzyrSaverComponent', () => {
  let component: GalzyrSaverComponent;
  let fixture: ComponentFixture<GalzyrSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSaverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalzyrSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
