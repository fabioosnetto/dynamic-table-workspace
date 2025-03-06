import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[dyt-selectable]'
})
export class DytSelectableRowDirective {

  // is selectable input
  @Input('dyt-selectable') 
  set isSelectableInput(value: boolean | string) {
    // handle input value to boolean format
    this._isSelectable = (typeof value === 'boolean')
      ? value
      : value.trim().toLocaleLowerCase() === 'true';

    // prevent selecting non selectable row
    if (!this._isSelectable && this._isSelected) this._unselect();
  }

  // emit whether a row is selected
  @Output('dyt-selected') selected: EventEmitter<boolean>;

  private _isSelectable : boolean;
  private _isSelected   : boolean;

  constructor() {
    this._isSelectable = true;
    this._isSelected   = false;
    this.selected      = new EventEmitter<boolean>();
  }

  // Select
  private _select(): void {
    this._isSelected = true;
    this.selected.emit(this._isSelected);
  }

  // Unselect
  private _unselect(): void {
    this._isSelected = false;
    this.selected.emit(this._isSelected);
  }

  // add class whether a row is selectable
  @HostBinding('class.dyt-selectable')
  public get isSelectable(): boolean {
    return this._isSelectable;
  }

  // add class whether a row is selected
  @HostBinding('class.dyt-selected')
  public get isSelected(): boolean {
    return this._isSelected;
  }

  // listen row click
  @HostListener('click')
  public onClick(): void {
    // prevent selecting non selectable row
    if (!this._isSelectable) {
      if (this._isSelected) this._unselect();
      return;
    }

    // toggle selection
    if (this._isSelected) this._unselect();
    else this._select();
  }
}