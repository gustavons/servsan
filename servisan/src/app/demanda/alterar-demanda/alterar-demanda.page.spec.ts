import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDemandaPage } from './alterar-demanda.page';

describe('AlterarDemandaPage', () => {
  let component: AlterarDemandaPage;
  let fixture: ComponentFixture<AlterarDemandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDemandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDemandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
