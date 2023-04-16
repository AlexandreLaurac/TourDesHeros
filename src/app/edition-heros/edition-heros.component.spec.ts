import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionHerosComponent } from './edition-heros.component';

describe('EditionHerosComponent', () => {
  let component: EditionHerosComponent;
  let fixture: ComponentFixture<EditionHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionHerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
