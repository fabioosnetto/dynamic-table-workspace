import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytColResizerComponent } from './dyt-col-resizer.component';

describe('DytColResizerComponent', () => {
  let component: DytColResizerComponent;
  let fixture: ComponentFixture<DytColResizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytColResizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytColResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
