import { Component } from '@angular/core';
import { DytTableComponent } from '../../../ngx-dynamic-table/src/public-api';

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
  imports: [DytTableComponent],
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
}