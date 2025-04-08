import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { DynamicTableService, iDytColumnSettings } from '../services/dynamic-table.service';
import { DytColResizerComponent } from '../dyt-col-resizer/dyt-col-resizer.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'th[dyt-cell]',
  imports: [DytColResizerComponent],
  templateUrl: './dyt-header-cell.component.html',
  styleUrl: './dyt-header-cell.component.css'
})
export class DytHeaderCellComponent implements AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {

  @Input({ alias: 'dyt-cell-placeholder', required: false }) placeholder!: { value: string, show: boolean };
  @Input({ alias: 'dyt-cell-auto-tip',    required: false }) autoTip: boolean;

  private _dytCell       : ElementRef<HTMLElement>;
  private _dytCell_el    : HTMLElement;
  private _width$        : BehaviorSubject<number | null>;
  private _subscriptions : Array<Subscription>;

  constructor(
    private _elementRef: ElementRef,
    private _dytService: DynamicTableService,
    private _cdr: ChangeDetectorRef
  ) {
    this.placeholder = { value: '-', show: false };
    this.autoTip     = false;

    this._dytCell       = this._elementRef;
    this._dytCell_el    = (this._dytCell.nativeElement as HTMLElement);
    this._width$        = new BehaviorSubject<number | null>(null);
    this._subscriptions = new Array();

    // listen to width changes
    this._subscriptions.push(
      this._width$.subscribe((w) => {
        // save settings on update width
        if (w) this._saveColumnSettings();
      })
    );
  }

  ngAfterViewInit(): void {
    this._listenFirstVisibility();
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

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  // Listen First Visibility
  private _listenFirstVisibility(): void {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {

        this._onFirstVisibility();
        observer.disconnect();

      }
    },
    {
      // check visibility in the parent element
      // checking to the viewport can be clipped by overflow
      root: (this._elementRef.nativeElement as HTMLElement)?.parentElement
    });
    observer.observe(this._elementRef.nativeElement)
  }

  // On First Visibility
  private _onFirstVisibility(): void {
    // first initialize width to the width transition behaviour work as expected
    this._initWidth();
    // // then initialize the column settings (like cached width)
    setTimeout(() => { this._initColumnSettings(); })
  }

  // Init Column Settings
  private _initColumnSettings(): void {
    const settings = this._getColumnSettings();

    this._width = settings?.width ?? null;
  }

  // Init Width
  private _initWidth(): void {
    this._dytCell_el.style.width = `${this._dytService.getComputedWidth(this._dytCell_el)}px`;
  }

  // Get Column Settings
  private _getColumnSettings(): iDytColumnSettings | null {
    // verify column id
    if (!this._dytCell_el?.id) return null;
    // verify table id
    const table_el = this._dytService.getParentTable(this._dytCell_el);
    if (!table_el?.id) return null;

    // request cached settings
    return this._dytService.getColumnSettings(table_el.id, this._dytCell_el.id);
  }

  // Save Column Settings
  private _saveColumnSettings(): void {
    // validate width
    if (!this._width) return;
    // verify column id
    if (!this._dytCell_el?.id) return;
    // verify table id
    const table_el = this._dytService.getParentTable(this._dytCell_el);
    if (!table_el?.id) return;

    // build current column settings
    const settings: iDytColumnSettings = { width: this._width };
    // save cache
    this._dytService.saveColumnSettings(table_el.id, this._dytCell_el.id, settings);
  }

  // On Resize Value
  public onResizeValue(width: number): void {
    this._width = this._dytService.getComputedWidth(this._dytCell_el) + width;
  }

  // Width Setter
  private set _width(width: number | null) {
    this._width$.next(width);
  }

  // Width Getter
  private get _width(): number | null {
    return this._width$.value;
  }

  // set column width
  @HostBinding('style.width')
  get widthString(): string | null {
    return this._width ? `${this._width}px` : null;
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