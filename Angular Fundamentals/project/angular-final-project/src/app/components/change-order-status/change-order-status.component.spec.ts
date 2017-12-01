import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrderStatusComponent } from './change-order-status.component';

describe('ChangeOrderStatusComponent', () => {
  let component: ChangeOrderStatusComponent;
  let fixture: ComponentFixture<ChangeOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
