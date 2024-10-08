import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrCharacterComponent } from './galzyr-character.component';

describe('GalzyrCharacterComponent', () => {
  let component: GalzyrCharacterComponent;
  let fixture: ComponentFixture<GalzyrCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
