import {
  animate,
  AnimationBuilder,
  AnimationStyleMetadata,
  keyframes,
  style,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';

export const easing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
};

@Component({
  selector: 'app-curve-animation',
  templateUrl: './curve-animation.component.html',
  styleUrls: ['./curve-animation.component.scss'],
})
export class CurveAnimationComponent {
  @Input() public target: string = 'RU';
  @Input() public source: string = 'EN';

  @ViewChildren('block') blocks?: QueryList<ElementRef>;

  private _isAnimation = false;

  constructor(
    private builder: AnimationBuilder,
    private _element: ElementRef,
    private _cd: ChangeDetectorRef
  ) {}

  @HostListener('click') onClick() {
    if (!this._isAnimation) {
      this._isAnimation = true;
      this._startAnimation();
    }
  }

  public get sourceBlock(): ElementRef {
    return this.blocks!.first;
  }

  public get targetBlock(): ElementRef {
    return this.blocks!.last;
  }

  public get width(): number {
    return (
      this._element.nativeElement.children[0].getBoundingClientRect().width -
      this.targetBlock!.nativeElement.getBoundingClientRect().width
    );
  }

  private _startAnimation() {
    this.blocks!.forEach((x, i) => {
      const data = this._calculateTransform(i === 1);

      const animationPlayer = this.builder
        .build(animate(`300ms ${easing.standard}`, keyframes(data)))
        .create(x!.nativeElement);

      animationPlayer.play();
      animationPlayer.onDone(() => {
        animationPlayer.destroy();
        if (i === 0) {
          this._moveItems();
          this._cd.detectChanges();
          this._isAnimation = false;
        }
      });
    });
  }

  private _backupAnimationStyle: AnimationStyleMetadata[][] = [];

  private _calculateTransform(up: boolean): AnimationStyleMetadata[] {
    let backup = this._getFromBackup(up);
    if (backup !== null) {
      return backup;
    }

    const stepsNumber = 180;
    const r = this.width / 2;
    const data = Array(stepsNumber)
      .fill(null)
      .map((e, i) => {
        const degree = i;
        let x = r - r * Math.cos((degree * Math.PI) / 180);
        let y = r * Math.sin((degree * Math.PI) / 180);
        if (up) {
          x = x * -1;
        } else {
          y = y * -1;
        }
        return style({
          transform: `translate(${x}px, ${y}px)`,
        });
      });
    this._saveToBackup(up, data);
    return data;
  }

  private _getFromBackup(up: boolean): AnimationStyleMetadata[] | null {
    const index = up ? 0 : 1;
    if (this._backupAnimationStyle[index] !== undefined) {
      return this._backupAnimationStyle[index];
    }
    return null;
  }

  private _saveToBackup(up: boolean, data: AnimationStyleMetadata[]): void {
    const index = up ? 0 : 1;
    this._backupAnimationStyle[index] = data;
  }

  private _moveItems() {
    const temp = this.target;
    this.target = this.source;
    this.source = temp;
  }
}
