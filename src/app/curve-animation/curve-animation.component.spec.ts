import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveAnimationComponent } from './curve-animation.component';

describe('CurveAnimationComponent', () => {
  let component: CurveAnimationComponent;
  let fixture: ComponentFixture<CurveAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurveAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
