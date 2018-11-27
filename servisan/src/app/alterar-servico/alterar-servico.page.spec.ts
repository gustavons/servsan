import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarServicoPage } from './alterar-servico.page';

describe('AlterarServicoPage', () => {
  let component: AlterarServicoPage;
  let fixture: ComponentFixture<AlterarServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
