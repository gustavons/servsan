import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasDemandasPage } from './minhas-demandas.page';

describe('MinhasDemandasPage', () => {
  let component: MinhasDemandasPage;
  let fixture: ComponentFixture<MinhasDemandasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasDemandasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasDemandasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
