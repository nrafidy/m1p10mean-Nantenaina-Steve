import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  images = [
    "../../assets/img/testimonial_1.jpg",
    "../../assets/img/testimonial_2.jpg",
    "../../assets/img/testimonial_3.jpg",
    "../../assets/img/testimonial_4.jpg",
  ];
}
