import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytRowComponent } from './dyt-row.component';

describe('DytRowComponent', () => {
  let component: DytRowComponent;
  let fixture: ComponentFixture<DytRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
