import { Component } from '@angular/core';
import { DytTableComponent } from '../../../ngx-dynamic-table/src/public-api';
import { DytRowComponent } from '../../../ngx-dynamic-table/src/lib/dyt-row/dyt-row.component';
import { DytDraggableRowDirective } from '../../../ngx-dynamic-table/src/lib/dyt-row/directives/draggable/dyt-draggable-row.directive';
import { DytSelectableRowDirective } from '../../../ngx-dynamic-table/src/lib/dyt-row/directives/selectable/dyt-selectable-row.directive';

import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';

interface Item {
  id          : number;
  code        : string;
  description : string;
  status      : {
    code        : number,
    description : string
  };
}

@Component({
  selector: 'app-root',
  imports: [DytTableComponent, DytRowComponent, DytDraggableRowDirective, DytSelectableRowDirective, CdkDrag, CdkDropList, CdkScrollable],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  public items: Array<Item>;
  public loading: boolean;

  constructor() {
    this.items = this._getItems();
    this.items.map((r, i) => r.id = i);

    this.loading = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    });
  }

  // Get Items
  private _getItems(): Array<Item> {
    return [
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
      { id: 1, code: 'ABC', description: 'abcdef', status: { code: 1, description: 'Pending' } },
    ];
  }

  // On Row Drop
  public onRowDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // On Row Select
  public onRowSelect(event: boolean, rowIndex: number): void {
    // console.log('selected: ', event, ' - row: ', rowIndex);
  }
}