// Core
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces & Settings
import { Asset, Image } from 'src/app/search/asset-list/asset/settings';
import { Categories } from 'src/app/home/category-list/settings';

// External Components
import {
  faPlus,
  faCaretRight,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-manager-asset',
  templateUrl: './manager-asset.component.html',
  styleUrls: ['./manager-asset.component.scss'],
})
export class ManagerAssetComponent implements OnInit {
  public faCaretRight = faCaretRight;
  public currentImg = 0;
  public currentImgSrc = '';
  public modalState = false;
  public categories = Categories;

  @Input() asset: Asset;
  @Input() images: Image[];
  @Input() category: Categories;
  @Output() remove: EventEmitter<Asset> = new EventEmitter();

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.currentImgSrc = this.images[0].image_asset_src;
  }

  nextImage(): void {
    if (this.images.length === this.currentImg + 1) {
      this.currentImg = 0;
    } else {
      this.currentImg = this.currentImg + 1;
    }
    this.currentImgSrc = this.images[this.currentImg].image_asset_src;
  }

  openImageModal() {
    this.managerService.modalStateChanged.emit(true);
  }

  setModalState(state: boolean) {
    this.modalState = state;
    this.managerService.modalStateChanged.emit(state);
  }
}
