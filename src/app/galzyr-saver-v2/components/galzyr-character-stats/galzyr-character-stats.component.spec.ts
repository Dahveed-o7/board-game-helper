import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrCharacterStatsComponent } from './galzyr-character-stats.component';

describe('GalzyrCharacterStatsComponent', () => {
  let component: GalzyrCharacterStatsComponent;
  let fixture: ComponentFixture<GalzyrCharacterStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrCharacterStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrCharacterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
