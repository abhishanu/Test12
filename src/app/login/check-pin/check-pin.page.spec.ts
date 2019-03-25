import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPinPage } from './check-pin.page';

describe('CheckPinPage', () => {
  let component: CheckPinPage;
  let fixture: ComponentFixture<CheckPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
