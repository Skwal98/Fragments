import {
  animate,
  AnimationBuilder,
  keyframes,
  style,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

export const easing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
};

@Component({
  selector: 'app-curve-animation',
  templateUrl: './curve-animation.component.html',
  styleUrls: ['./curve-animation.component.scss'],
})
export class CurveAnimationComponent implements OnInit {
  @Input() public target: string = 'RU';
  @Input() public source: string = 'EN';

  @ViewChild('c') el?: ElementRef;
  @ViewChild('e') el2?: ElementRef;

  constructor(
    private builder: AnimationBuilder,
    private _element: ElementRef
  ) {}

  @HostListener('click') onClick() {
    this.start(this.el!, 0, false);
    this.start(this.el2!, 0, true);
    console.log('cl');
  }

  public get width(): number {
    return (
      this._element.nativeElement.children[0].getBoundingClientRect().width -
      this.el!.nativeElement.getBoundingClientRect().width
    );
  }

  ngOnInit(): void {}

  start(el: ElementRef, rDiff: number, fl: boolean) {
    const r = this.width / 2;
    const stepsNumber = 180;
    const steps = Array(stepsNumber)
      .fill(null)
      .map((e, i) => {
        const degree = i - rDiff;
        let x = r - r * Math.cos((degree * Math.PI) / 180);
        let y = r * Math.sin((degree * Math.PI) / 180);
        if (fl) {
          x = x * -1;
        }
        if (!fl) {
          y = y * -1;
        }
        const transform = style({
          transform: `translate(${x}px, ${y}px)`,
        });
        return transform;
      });

    console.log(steps);

    const animationPlayer = this.builder
      .build(animate(`300ms ${easing.standard}`, keyframes(steps)))
      .create(el!.nativeElement);
    animationPlayer.play();
    animationPlayer.onDone(() => {
      if (el == this.el) {
        this._animationEnd();
      }
      animationPlayer.destroy();
    });
  }

  private _animationEnd() {
    const temp = this.target;
    this.target = this.source;
    this.source = temp;
  }
}
