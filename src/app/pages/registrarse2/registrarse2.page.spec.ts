import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrarse2Page } from './registrarse2.page';

describe('Registrarse2Page', () => {
  let component: Registrarse2Page;
  let fixture: ComponentFixture<Registrarse2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Registrarse2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
