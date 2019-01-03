import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDemandaPage } from './detalhe-demanda.page';

describe('DetalheDemandaPage', () => {
  let component: DetalheDemandaPage;
  let fixture: ComponentFixture<DetalheDemandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheDemandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDemandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
