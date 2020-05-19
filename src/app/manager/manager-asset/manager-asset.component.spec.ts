import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssetComponent } from './manager-asset.component';

describe('ManagerAssetComponent', () => {
  let component: ManagerAssetComponent;
  let fixture: ComponentFixture<ManagerAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
