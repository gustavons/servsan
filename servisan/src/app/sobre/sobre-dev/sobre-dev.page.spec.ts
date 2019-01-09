import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreDevPage } from './sobre-dev.page';

describe('SobreDevPage', () => {
  let component: SobreDevPage;
  let fixture: ComponentFixture<SobreDevPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreDevPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreDevPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
