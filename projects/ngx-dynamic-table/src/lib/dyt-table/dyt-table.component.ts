import { AfterViewInit, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'table[dyt-table]',
  imports: [],
  templateUrl: './dyt-table.component.html',
  styleUrl: './dyt-table.component.css'
})
export class DytTableComponent implements AfterViewInit {

  private _width:    string | null;
  private _minWidth: number | null;

  constructor() {
    this._width    = 'auto'; // initalize width as auto to automatic calculate columns width
    this._minWidth = 100; // initialize min width to at least fill the container width
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._width    = 'fit-content'; // change width to fit content and then allow column resizing
      this._minWidth = null; // reset min width to allow resizing to any width
    });
  }

  @HostBinding('style.minWidth.%')
  get minWidth(): number | null {
    return this._minWidth;
  }
  @HostBinding('style.width')
  get width(): string | null {
    return this._width;
  }
}