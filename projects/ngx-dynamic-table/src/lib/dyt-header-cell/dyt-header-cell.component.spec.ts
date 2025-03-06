import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytHeaderCellComponent } from './dyt-header-cell.component';

describe('DytHeaderCellComponent', () => {
  let component: DytHeaderCellComponent;
  let fixture: ComponentFixture<DytHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytHeaderCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
