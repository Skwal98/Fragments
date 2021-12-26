import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-courusel-select',
  templateUrl: './courusel-select.component.html',
  styleUrls: ['./courusel-select.component.scss'],
})
export class CouruselSelectComponent implements OnInit, AfterViewInit {
  @ViewChildren('item') itemsRef?: QueryList<ElementRef>;

  @HostBinding('style.width') public get widthCurrentItem(): string {
    return this.currentWidth + 'px';
  }

  items!: string[];
  translateStyle?: string;
  currentWidth: number = 0;

  currentIndex = 0;
  isMoving = false;

  constructor(private _cd: ChangeDetectorRef) {
    this.items = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  }

  //todo: fix
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.currentWidth = this._calculateCurrentWidth()!;
      this._cd.detectChanges();
    });
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.moveItem(true);
    } else {
      this.moveItem(false);
    }
  }

  ngOnInit(): void {}

  moveItem(isRight: boolean) {
    if (!this.isMoving) {
      this.isMoving = true;
      if (isRight) {
        if (this.currentIndex < this.items.length - 1) {
          this.currentIndex++;
        }
      } else {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      }
      this.currentWidth = this._calculateCurrentWidth()!;
      this.translateStyle = this._calculateTranslate();
      this._cd.detectChanges();

      setTimeout(() => {
        this.isMoving = false;
      }, 200);
    }
  }

  next() {
    this.moveItem(true);
  }

  back() {
    this.moveItem(false);
  }

  private _calculateTranslate(): string | undefined {
    if (!this.itemsRef) return;
    const sum = this.itemsRef!.filter((e, i) => {
      return i < this.currentIndex;
    })
      .map((x) => x.nativeElement.getBoundingClientRect().width + 10)
      .reduce((prev, cur, ind, arr) => {
        return prev + cur;
      }, 0);

    return `translate(-${sum}px, 0px)`;
  }

  private _calculateCurrentWidth(): number {
    if (!this.itemsRef) return 0;
    return (
      this.itemsRef!.get(
        this.currentIndex
      )!.nativeElement.getBoundingClientRect().width + 10
    );
  }
}
