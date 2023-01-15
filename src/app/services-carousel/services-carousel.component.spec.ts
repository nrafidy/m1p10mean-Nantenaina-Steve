import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCarouselComponent } from './services-carousel.component';

describe('ServicesCarouselComponent', () => {
  let component: ServicesCarouselComponent;
  let fixture: ComponentFixture<ServicesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
