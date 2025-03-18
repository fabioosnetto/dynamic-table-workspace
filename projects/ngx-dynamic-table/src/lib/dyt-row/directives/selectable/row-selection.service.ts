import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iSelectable, iSelected, iSelection } from './row-selection.models';

@Injectable({
  providedIn: 'root'
})
export class RowSelectionService {
  
  private _selectionMap: Map<number | string, iSelection>; // Key: group ID, Value: selected IDs
  private _selectionChange: BehaviorSubject<iSelected>;
  public  selectionChange$: Observable<iSelected>;

  constructor() {
    this._selectionMap    = new Map();
    this._selectionChange = new BehaviorSubject<iSelected>({ group: '', selected: new Set() });
    this.selectionChange$ = this._selectionChange.asObservable();
  }

  // Select
  public select(item: iSelectable, allowMultiple: boolean = false): void {
    
    if (!allowMultiple) this.unselectAll(item.groupId);

    // add selection group if doesn't exist
    if (!this._selectionMap.has(item.groupId)) {
      this._selectionMap.set(item.groupId, new Set());
    }

    // get selection group
    const selectedSet = this._selectionMap.get(item.groupId);
    if (!selectedSet) return;

    // add selected item if not already selected
    if (!selectedSet.has(item.itemId)) {
      selectedSet.add(item.itemId);
      this._selectionChange.next({ group: item.groupId, selected: new Set(selectedSet) });
    }

  }

  // Unselect
  public unselect(item: iSelectable): void {

    // add selection group if doesn't exist
    if (!this._selectionMap.has(item.groupId)) {
      this._selectionMap.set(item.groupId, new Set());
    }

    // get selection group
    const selectedSet = this._selectionMap.get(item.groupId);
    if (!selectedSet) return;

    // remove selected item if selected
    if (selectedSet.has(item.itemId)) {
      selectedSet.delete(item.itemId);
      this._selectionChange.next({ group: item.groupId, selected: new Set(selectedSet) });
    }
  }

  // Unselect All
  public unselectAll(groupId: string | number) {
    this._selectionMap.set(groupId, new Set());
    this._selectionChange.next({ group: groupId, selected: new Set() });
  }

  // Get Selection
  public getSelection(groupId: string | number): iSelection {
    return this._selectionMap.get(groupId) ?? new Set();
  }

  // Is Selected
  public isSelected(item: iSelectable): boolean {
    return this._selectionMap.get(item.groupId)?.has(item.itemId) ?? false;
  }
}