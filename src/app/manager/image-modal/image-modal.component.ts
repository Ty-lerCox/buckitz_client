// Core
import { Component, OnInit, Inject } from '@angular/core';

// External Components
import { Image } from '@ks89/angular-modal-gallery';
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
    data.dataImages.forEach((image: string, index: number) => {
      const newImage: Image = {
        id: index,
        modal: {
          img: image,
        },
      };
      imagesToSort.push(newImage);
    });
    this.images = imagesToSort.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  share() {}
}
