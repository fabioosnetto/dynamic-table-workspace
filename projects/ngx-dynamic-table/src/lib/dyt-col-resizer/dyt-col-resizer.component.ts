import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { DynamicTableService } from '../services/dynamic-table.service';

@Component({
  selector: 'dyt-col-resizer',
  imports: [],
  templateUrl: './dyt-col-resizer.component.html',
  styleUrl: './dyt-col-resizer.component.css'
})
export class DytColResizerComponent {
  
  @Output('resizeValue') resizeValue: EventEmitter<number>;

  private _lastX: number;

  constructor(private _dytService: DynamicTableService) {
    this.resizeValue    = new EventEmitter<number>();
    this._lastX         = 0;
    this._onPointerMove = this._onPointerMove.bind(this);
  }

  // Handle Pointer Move
  private _onPointerMove(event: PointerEvent): void {
    // calculate the difference of current position from last position
    // then emit to the resize value
    this.resizeValue.emit(event.x - this._lastX);
    // update last x position
    this._lastX = event.x;
  }

  // handle resizer pointerdown
  @HostListener('pointerdown', ['$event'])
  public onPointerDown(event: PointerEvent): void {

    // init last x position
    this._lastX = this._dytService.roundToHalf(event.x);

    // disable confliting features
    this._dytService.disableContextMenu();
    this._dytService.disableScroll();
    // handle resizing by pointermove
    document.addEventListener('pointermove', this._onPointerMove);

    // stop resizing
    document.addEventListener('pointerup', () => {
      // enable confliting features
      this._dytService.enableContextMenu();
      this._dytService.enableScroll();
      // remove pointermove listener
      document.removeEventListener('pointermove', this._onPointerMove)
    }, { once: true });
    
  }
}
