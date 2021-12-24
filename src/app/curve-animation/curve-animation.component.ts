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

  constructor(
    private builder: AnimationBuilder,
    private _element: ElementRef
  ) {}

  @HostListener('click') onClick() {
    this.start();
    console.log('cl');
  }

  public get width(): number {
    return (
      this._element.nativeElement.children[0].getBoundingClientRect().width -
      this.el!.nativeElement.getBoundingClientRect().width
    );
  }

  ngOnInit(): void {}

  start() {
    const stepsNumber = Math.trunc(this.width / 2);
    const steps = Array(stepsNumber)
      .fill(null)
      .map((e, i) => {
        const y = i;
        const x = i;

        const transform = style({
          transform: `translate(${x}px, -${y}px)`,
        });

        return transform;
      });

    console.log(steps);

    const animationPlayer = this.builder
      .build(animate(`700ms ${easing.standard}`, keyframes(steps)))
      .create(this.el!.nativeElement);
    animationPlayer.play();
    animationPlayer.onDone(() => {
      this._animationEnd();
      animationPlayer.destroy();
    });
  }

  private _animationEnd() {
    const temp = this.target;
    this.target = this.source;
    this.source = temp;
  }
}
