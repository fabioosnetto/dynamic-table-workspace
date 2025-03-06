import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytTableComponent } from './dyt-table.component';

describe('DytTableComponent', () => {
  let component: DytTableComponent;
  let fixture: ComponentFixture<DytTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
