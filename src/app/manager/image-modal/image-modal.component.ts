// Core
import { Component, OnInit, Inject } from '@angular/core';

// External Components
import { Image } from '@ks89/angular-modal-gallery';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from 'src/app/session/session.service';
import { ManagerService } from '../manager.service';

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

  assetID = '';
  images: Image[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    private sessionService: SessionService,
    private managerService: ManagerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const id = Math.round(Math.random() * 1000);
    this.managerService.addModalID(id);
    this.galleryId = id;
    const imagesToSort: Image[] = [];
    this.assetID = data.id;
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
    if (data.index !== 0) {
      // this.setImage(data.index);
    }
  }

  ngOnInit(): void {}

  close() {
    this.sessionService.clearSharedAsset();
    this.dialogRef.close();
  }

  share() {
    const src = document.getElementById('current-image').getAttribute('src');
    const imgIdx = this.images.find((image: Image) => image.modal.img === src)
      .id;
    this.sessionService.shareAssetWithSession(this.assetID, imgIdx);
  }

  setImage(index: number) {
    const src: string = this.images[index].modal.img.toString();
    // document.getElementById('current-image').setAttribute('src', src);
  }
}
