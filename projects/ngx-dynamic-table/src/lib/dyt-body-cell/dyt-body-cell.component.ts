import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'td[dyt-cell]',
  imports: [],
  templateUrl: './dyt-body-cell.component.html',
  styleUrl: './dyt-body-cell.component.css'
})
export class DytBodyCellComponent implements AfterContentInit, AfterContentChecked {

  @Input({ alias: 'dyt-cell-placeholder', required: false }) placeholder: { value: string, show: boolean };
  @Input({ alias: 'dyt-cell-auto-tip',    required: false }) autoTip: boolean;

  constructor(
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef
  ) {
    this.placeholder = { value: '-', show: false };
    this.autoTip     = false;
  }

  ngAfterContentInit(): void {
    // content can be changed after change detection by the placeholder
    // so the title value can also change
    this._cdr.detectChanges();
  }

  ngAfterContentChecked(): void {
    // content can be changed after change detection by the placeholder
    // so the title value can also change
    this._cdr.detectChanges();
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

  // host title
  @HostBinding('attr.title')
  public get title(): string | null {
    const host     = this._elementRef.nativeElement as HTMLElement;
    const newTitle = host.textContent?.trim() ?? null;

    // set host title with text content if allowed
    if (this.autoTip) return newTitle;
    // keep original title
    else return host.title;
  }
}