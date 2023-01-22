import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFactureComponent } from './admin-facture.component';

describe('AdminFactureComponent', () => {
  let component: AdminFactureComponent;
  let fixture: ComponentFixture<AdminFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
