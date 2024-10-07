import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSaverV2Component } from './galzyr-saver-v2.component';

describe('GalzyrSaverV2Component', () => {
  let component: GalzyrSaverV2Component;
  let fixture: ComponentFixture<GalzyrSaverV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSaverV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrSaverV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
