import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSkillWheelComponent } from './galzyr-skill-wheel.component';

describe('GalzyrSkillWheelComponent', () => {
  let component: GalzyrSkillWheelComponent;
  let fixture: ComponentFixture<GalzyrSkillWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSkillWheelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalzyrSkillWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
