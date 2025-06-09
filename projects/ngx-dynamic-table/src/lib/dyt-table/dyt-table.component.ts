import { AfterViewInit, Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'table[dyt-table]',
  imports: [],
  templateUrl: './dyt-table.component.html',
  styleUrl: './dyt-table.component.css'
})
export class DytTableComponent implements AfterViewInit {

  @Input({ alias: 'dyt-settings-group-id', required: false })
  public settingsGroupId: string;

  @HostBinding('class.dyt-ready')
  private _isReady : boolean;

  constructor(
    private _elementRef: ElementRef
  ) {
    this.settingsGroupId = '';
    this._isReady         = false;
  }

  ngAfterViewInit(): void {
    this._listenAllHeadersHaveWidth();
  }

  // Listen All Headers Have Width
  private _listenAllHeadersHaveWidth(): void {
    const observer = new MutationObserver(() => {
      // check all th children width  
      const allHeadersHaveWidth = Array.from(
        (this._elementRef.nativeElement as HTMLTableElement)
          .querySelectorAll('thead th') as NodeListOf<HTMLElement>
      )
      .every((th) => th.style.width && th.style.width !== 'auto');
      
      // all headers have width
      if (allHeadersHaveWidth) {
        observer.disconnect();
        this._onAllHeadersHaveWidth();
      }
    });
        
    observer.observe(this._elementRef.nativeElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  }

  // On All Headers Have Width
  private _onAllHeadersHaveWidth(): void {
    requestAnimationFrame(() => {
      this._isReady = true;
    });
  }
}