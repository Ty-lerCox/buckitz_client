// Core
import { Component, OnInit, Input, Inject } from '@angular/core';

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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  images: Image[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const imagesToSort: Image[] = [];
    data.dataImages.forEach((image: AssetImage) => {
      const newImage: Image = {
        id: image.image_index,
        modal: {
          img: image.image_asset_src,
        },
      };
      imagesToSort.push(newImage);
    });
    this.images = imagesToSort.sort((a, b) => (a.id > b.id ? 1 : -1));

    console.log(data);
  }

  ngOnInit(): void {
    console.log(this.images);
  }

  close() {
    this.dialogRef.close();
  }

  share() {}
}
