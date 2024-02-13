import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSlotPageComponent } from './save-slot-page.component';

describe('SaveSlotPageComponent', () => {
  let component: SaveSlotPageComponent;
  let fixture: ComponentFixture<SaveSlotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSlotPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveSlotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
