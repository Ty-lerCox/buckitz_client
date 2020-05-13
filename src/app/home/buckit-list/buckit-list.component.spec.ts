import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuckitListComponent } from './buckit-list.component';

describe('BuckitListComponent', () => {
  let component: BuckitListComponent;
  let fixture: ComponentFixture<BuckitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuckitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuckitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
