import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHerosComponent } from './detail-heros.component';

describe('DetailHerosComponent', () => {
  let component: DetailHerosComponent;
  let fixture: ComponentFixture<DetailHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
