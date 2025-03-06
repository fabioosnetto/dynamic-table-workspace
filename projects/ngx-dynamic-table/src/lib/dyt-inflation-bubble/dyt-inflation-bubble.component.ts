import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dyt-inflation-bubble',
  imports: [],
  templateUrl: './dyt-inflation-bubble.component.html',
  styleUrl: './dyt-inflation-bubble.component.css'
})
export class DytInflationBubbleComponent implements OnInit, AfterViewInit {

  // animation duration
  @Input('inflateDuration') duration: number;
  // left position
  @HostBinding('style.left.px')
  @Input('x') x: number;
  // top position
  @HostBinding('style.top.px')
  @Input('y') y: number;

  public done : Subject<void>;

  constructor() {
    this.duration = 200;
    this.x        = 0;
    this.y        = 0;
    this.done     = new Subject();
  }

  ngOnInit(): void {
    // cancel bubble
    document.addEventListener('pointerup',   () => this.done.next(), { once: true });
    document.addEventListener('pointermove', () => this.done.next(), { once: true });
  }

  ngAfterViewInit(): void {
    // set animation done
    setTimeout(() => this.done.next(), this.duration + 150);
  }

  // do inflate animation
  @HostBinding('class.inflate')
  get propertiesSet(): boolean {
    return !!(this.duration && this.x && this.y);
  }
}