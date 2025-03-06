import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DytInflationBubbleComponent } from './dyt-inflation-bubble.component';

describe('DytInflationBubbleComponent', () => {
  let component: DytInflationBubbleComponent;
  let fixture: ComponentFixture<DytInflationBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DytInflationBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DytInflationBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
