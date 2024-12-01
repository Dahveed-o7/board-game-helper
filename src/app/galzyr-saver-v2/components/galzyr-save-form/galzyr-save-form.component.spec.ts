import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSaveFormComponent } from './galzyr-save-form.component';

describe('GalzyrSaveFormComponent', () => {
  let component: GalzyrSaveFormComponent;
  let fixture: ComponentFixture<GalzyrSaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSaveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
