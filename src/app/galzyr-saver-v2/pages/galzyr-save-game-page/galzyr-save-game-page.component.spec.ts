import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSaveGamePageComponent } from './galzyr-save-game-page.component';

describe('GalzyrSaveGamePageComponent', () => {
  let component: GalzyrSaveGamePageComponent;
  let fixture: ComponentFixture<GalzyrSaveGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSaveGamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrSaveGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
