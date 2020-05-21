// Core
import { Component, OnInit, Input } from '@angular/core';

// Interfaces & Settings
import {
  Asset,
  Image as AssetImage,
} from '../../search/asset-list/asset/settings';

// External Components
import {
  AccessibilityConfig,
  Image,
  ImageEvent,
} from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  public imageIndex = 1;
  public galleryId = 1;
  public autoPlay = true;
  public showArrows = true;
  public showDots = true;

  imagesRect: Image[] = [
    new Image(
      0,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/milan-pegasus-gallery-statue.jpg',
        description: 'Description 1',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-milan-pegasus-gallery-statue.jpg',
        title: 'First image title',
        alt: 'First image alt',
        ariaLabel: 'First image aria-label',
      }
    ),
    new Image(
      1,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-47223.jpeg',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-47223.jpg',
      }
    ),
    new Image(
      2,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-52062.jpeg',
        description: 'Description 3',
        title: 'Third image title',
        alt: 'Third image alt',
        ariaLabel: 'Third image aria-label',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-52062.jpg',
        description: 'Description 3',
      }
    ),
    new Image(
      3,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-66943.jpeg',
        description: 'Description 4',
        title: 'Fourth image title (modal obj)',
        alt: 'Fourth image alt (modal obj)',
        ariaLabel: 'Fourth image aria-label (modal obj)',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-66943.jpg',
        title: 'Fourth image title (plain obj)',
        alt: 'Fourth image alt (plain obj)',
        ariaLabel: 'Fourth image aria-label (plain obj)',
      }
    ),
    new Image(
      4,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-93750.jpeg',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-93750.jpg',
      }
    ),
    new Image(
      5,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-94420.jpeg',
        description: 'Description 6',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-94420.jpg',
      }
    ),
    new Image(
      6,
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-96947.jpeg',
      },
      {
        img:
          'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-96947.jpg',
      }
    ),
  ];
  imagesRect1: Image[] = [];
  @Input() asset: Asset;
  @Input() images: Image[];

  constructor() {}

  ngOnInit(): void {}
}
