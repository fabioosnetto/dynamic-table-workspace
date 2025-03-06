import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytBodyCellComponent } from './dyt-body-cell.component';

describe('DytBodyCellComponent', () => {
  let component: DytBodyCellComponent;
  let fixture: ComponentFixture<DytBodyCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytBodyCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytBodyCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
