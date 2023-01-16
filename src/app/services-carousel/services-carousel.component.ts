import { Component } from '@angular/core';
import { SlideInterface } from '../interfaces/slide.interface';

@Component({
  selector: 'app-services-carousel',
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss']
})

export class ServicesCarouselComponent {
  current: number = 0;
  services_1: SlideInterface[] = [
    {
      h3:'Services de maintenance',
      p: "Fini les longues heures d'attentes. Prenez rendez-vous",
      img:'../../assets/img/oil-change.jpg',
      class:'impair'
    },
    {
      h3:'Services de réparation',
      p: "Un bruit bizarre mais vous ne savez pas d'où ça vient ? Nous sommes là pour vous aidez à le trouver.",
      img:'../../assets/img/clutch.jpg',
      class:'pair',
    },
  ];
  services_2: SlideInterface[] = [
    {
      h3:'Services de remorquage',
      p: "Où que vous soyez, nous viendrons vous chercher.",
      img:'../../assets/img/tow.jpg',
      class:'pair'
    },
    {
      h3:'Diagnostiques',
      p: "Le voyant 'Check Engine' s'allume ? Faites confiance à nos experts.",
      img:'../../assets/img/diag.jpg',
      class:'impair'
    },
  ];
}
