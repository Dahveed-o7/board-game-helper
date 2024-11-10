import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalzyrSaveListPageComponent } from './galzyr-save-list-page.component';

describe('GalzyrSaveListPageComponent', () => {
  let component: GalzyrSaveListPageComponent;
  let fixture: ComponentFixture<GalzyrSaveListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalzyrSaveListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalzyrSaveListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
