import { Injectable } from '@angular/core';

export interface iDytSettings {
  columns: {
    [key: string]: iDytColumnSettings
  };
}

export interface iDytColumnSettings {
  width: number;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService {

  private readonly _cacheItemName: string;

  constructor() {
    this._cacheItemName = 'dyt-settings';
  }

  // Get Parent Table
  public getParentTable(element: HTMLElement): HTMLElement | null {
    const parent = (element as HTMLElement).parentElement;
    if (!parent) return null;
    if ((parent.tagName.toLocaleLowerCase() === 'table') && (parent.hasAttribute('dyt-table'))) return parent;
    else return this.getParentTable(parent);
  }

  // Save Column Settings
  public saveColumnSettings(tableId: string, columnId: string, settings: iDytColumnSettings): void {

    const currSettings = this.getCachedSettings(); // request curr cached settings to add new settings
    let   newSettings  = currSettings || null;
    const columnSettings: { [key: string]: iDytSettings } = {
      [tableId]: {
        columns: {
          [columnId]: settings
        }
      }
    };

    // no existent cached settings
    if (!newSettings) {
      newSettings = columnSettings;
    }
    // no existent cached settings on provided table
    else if (!newSettings[tableId]) {
      newSettings[tableId] = columnSettings[tableId];
    }
    // just update column settings
    else {
      newSettings[tableId].columns[columnId] = columnSettings[tableId].columns[columnId];
    }

    // cache settings
    localStorage.setItem(this._cacheItemName, JSON.stringify(newSettings));
  }

  // Get Cached Data
  public getCachedData(cell_element: HTMLElement): iDytColumnSettings | null {
    
    // column id to the cached settings
    const columnId = cell_element.id?.trim();
    if (!columnId) return null;

    // get cell table
    const table_el = this.getParentTable(cell_element);
    if (!table_el) return null;
    // table id to the cached settings
    const tableId  = table_el.id?.trim();
    if (!tableId) return null;

    // cache item
    const item = localStorage.getItem(this._cacheItemName);
    if (!item) return null;

    // get settings on provided table and column id
    return ((JSON.parse(item)?.[tableId] as iDytSettings)?.columns?.[columnId] as iDytColumnSettings) ?? null;
  }

  // Get Cached Settings
  public getCachedSettings(): { [key: string]: iDytSettings } | null {
    const item = localStorage.getItem(this._cacheItemName);
    
    if (!item) return null;
    return (JSON.parse(item) as { [key: string]: iDytSettings }) ?? null;
  }

  // Get Table Settings
  public getTableSettings(tableId: string): iDytSettings | null {
    return this.getCachedSettings()?.[tableId] ?? null;
  }

  // Get Column Settings
  public getColumnSettings(tableId: string, columnId: string): iDytColumnSettings | null {
    return this.getTableSettings(tableId)?.columns?.[columnId] ?? null;
  }

  // Get Computed Width
  public getComputedWidth(element: HTMLElement): number {
    const w = Number(window.getComputedStyle(element).width.replace('px', ''));
    return isNaN(w) ? 0 : w;
  }

  // Prevent Default
  public preventDefault(event: Event): void {
    event.preventDefault();
  }

  // Disable Scroll
  public disableScroll(): void {
    document.body.style.overscrollBehavior = 'contain';
    document.addEventListener('touchmove', this.preventDefault, { passive: false });
    document.addEventListener('mousemove', this.preventDefault, { passive: false });
  }

  // Enable Scroll
  public enableScroll(): void {
    document.body.style.overscrollBehavior = 'contain';
    document.removeEventListener('touchmove', this.preventDefault);
    document.removeEventListener('mousemove', this.preventDefault);
  }

  // Disable Context Menu
  public disableContextMenu(): void {
    document.addEventListener('contextmenu', this.preventDefault, { passive: false });
  }
  
  // Enable Context Menu
  public enableContextMenu(): void {
    document.removeEventListener('contextmenu', this.preventDefault);
  }
}