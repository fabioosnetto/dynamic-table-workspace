import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'td[dyt-cell]',
  imports: [],
  templateUrl: './dyt-body-cell.component.html',
  styleUrl: './dyt-body-cell.component.css'
})
export class DytBodyCellComponent {

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