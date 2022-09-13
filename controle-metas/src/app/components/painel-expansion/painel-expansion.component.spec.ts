import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelExpansionComponent } from './painel-expansion.component';

describe('PainelExpansionComponent', () => {
  let component: PainelExpansionComponent;
  let fixture: ComponentFixture<PainelExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
