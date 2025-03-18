import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tr[dyt-row]',
  imports: [],
  templateUrl: './dyt-row.component.html',
  styleUrl: './dyt-row.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DytRowComponent {

  @Input({ alias: 'dyt-row-highlight-on-hover', required: false })
  set highlightOnHover(value: boolean | string) {
    // handle input value to boolean format
    this._highlightOnHover = (typeof value === 'boolean')
      ? value
      : value.trim().toLocaleLowerCase() === 'true';
  }

  @HostBinding('class.dyt-row-highlight-on-hover')
  private _highlightOnHover: boolean;

  constructor(
    private _elementRef: ElementRef
  ) {
    this._highlightOnHover = true;
  }

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