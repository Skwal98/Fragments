import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouruselSelectComponent } from './courusel-select.component';

describe('CouruselSelectComponent', () => {
  let component: CouruselSelectComponent;
  let fixture: ComponentFixture<CouruselSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouruselSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouruselSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
