import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoituresComponent } from './admin-voitures.component';

describe('AdminVoituresComponent', () => {
  let component: AdminVoituresComponent;
  let fixture: ComponentFixture<AdminVoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVoituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
