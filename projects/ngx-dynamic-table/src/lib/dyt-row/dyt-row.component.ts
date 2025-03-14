import { Component, ElementRef, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tr[dyt-row]',
  imports: [],
  templateUrl: './dyt-row.component.html',
  styleUrl: './dyt-row.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DytRowComponent {

  constructor(
    private _elementRef: ElementRef
  ) {}

  // host tab index
  @HostBinding('tabindex')
  get tabIndex(): number | void {
    // if no tab index was set to element, set tabindex 0
    if (this._elementRef.nativeElement) {
      const el_TabIndex = (this._elementRef.nativeElement as HTMLElement).tabIndex;
      return el_TabIndex >= 0 ? el_TabIndex : 0;
    }
  }
}