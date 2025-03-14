import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RowSelectionService } from './row-selection.service';
import { Subscription } from 'rxjs';
import { iSelectable, iSelectionEvent } from './row-selection.models';

@Directive({
  selector: '[dyt-selectable]'
})
export class DytSelectableRowDirective implements OnInit, OnDestroy {
  
  // is selectable input
  @Input('dyt-selectable') 
  set isSelectableInput(value: boolean | string) {
    // handle input value to boolean format
    this._isSelectable = (typeof value === 'boolean')
      ? value
      : value.trim().toLocaleLowerCase() === 'true';

    // prevent selecting non selectable row
    if (!this._isSelectable && this._isSelected) this._selectionService.unselect(this.trackBy);
  }

  // track by
  @Input('dyt-trackBy') trackBy: iSelectable;

  // emit whether a row is selected
  @Output('dyt-selected') selected: EventEmitter<iSelectionEvent>;

  private _isSelectable  : boolean;
  private _subscription !: Subscription;

  constructor(
    private _selectionService: RowSelectionService
  ) {
    this.trackBy       = { groupId: '', itemId: '' };
    this.selected      = new EventEmitter();
    
    this._isSelectable = true;
  }

  ngOnInit(): void {

    // listen when selection changes
    this._subscription = this._selectionService.selectionChange$.subscribe(({ group, selected }) => {
      // same selection group
      if (group === this.trackBy.groupId) {

        // emit selection
        this.selected.emit({
          selected  : selected.has(this.trackBy.itemId),
          selection : { group, selected },
          trackBy   : this.trackBy
        });

      }
    });

  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  // host is selectable
  @HostBinding('class.dyt-selectable')
  public get isSelectable(): boolean {
    return this._isSelectable;
  }

  // Is Selected
  @HostBinding('class.dyt-selected')
  private get _isSelected(): boolean {
    return this._selectionService.isSelected(this.trackBy);
  }

  // listen row click
  @HostListener('click')
  public onClick(): void {
    // prevent selecting non selectable row
    if (!this._isSelectable) {
      if (this._isSelected) this._selectionService.unselect(this.trackBy);
      return;
    }

    // toggle selection
    if (this._isSelected) this._selectionService.unselect(this.trackBy);
    else this._selectionService.select(this.trackBy);
  }
}