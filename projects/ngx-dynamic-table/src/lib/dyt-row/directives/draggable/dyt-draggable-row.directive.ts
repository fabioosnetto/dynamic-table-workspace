import { Directive, HostBinding, HostListener, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { DytInflationBubbleComponent } from '../../../dyt-inflation-bubble/dyt-inflation-bubble.component';
import { first } from 'rxjs';
import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { DynamicTableService } from '../../../services/dynamic-table.service';

@Directive({
  selector: '[dyt-draggable]'
})
export class DytDraggableRowDirective implements OnInit {
  
  // is draggable input
  @Input('dyt-draggable') 
  set isDraggableInput(value: boolean | string) {
    // handle input value to boolean format
    this._isDraggable = (typeof value === 'boolean')
      ? value
      : value.trim().toLocaleLowerCase() === 'true';

    // add/remove drag and drop styles
    if (this._isDraggable) this._appendStyles();
    else this._removeStyles();
  }

  private _isDraggable    : boolean;
  private _isDragging     : boolean;
  private _styles         : { id: string, content: string };
  public  _scrollInterval : NodeJS.Timeout | null;
  public  _scrollSpeed    : number;
  public  _scrollMaxSpeed : number;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _renderer: Renderer2,
    private _cdkDrag: CdkDrag,
    private _dytService: DynamicTableService
  ) {
    this._isDraggable    = true;
    this._isDragging     = false;
    this._styles         = this._getStyles();
    this._scrollInterval = null;
    this._scrollSpeed    = 1;
    this._scrollMaxSpeed = this._scrollSpeed;
  }

  ngOnInit(): void {
    this._appendStyles();
  }

  // Get Styles
  private _getStyles(): { id: string, content: string } {
    return {
      id: 'dyt-draggable-styles',
      content: `
      .dyt-draggable.cdk-drag-preview {
        display: flex;
        border: none;
        box-sizing: border-box;
        border-radius: .5rem;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                    0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
      .dyt-draggable.cdk-drag-preview > * {
        width: 100%;
        min-width: fit-content;
      }
      .dyt-draggable.cdk-drag-placeholder {
        opacity: .5;
      }
      .dyt-draggable.cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drop-list-dragging .dyt-draggable:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }`
      .replace(/\s+/g, ' ').trim()
    };
  }

  // Append Styles
  private _appendStyles(): void {
    // prevent duplicate styles
    const isStyleAdded = !!document.querySelectorAll(`#${this._styles.id}`).length;
    if (isStyleAdded) return;

    // add the drag and drop custom styles
    const style = this._renderer.createElement('style');
    this._renderer.setProperty(style, 'id', this._styles.id);
    this._renderer.setProperty(style, 'innerHTML', this._styles.content);
    this._renderer.appendChild(document.head, style);
  }

  // Remove Styles
  private _removeStyles(): void {
    const style = document.querySelectorAll(`#${this._styles.id}`);
    style.forEach(s => this._renderer.removeChild(document.head, s))
  }

  // Cancel Dragging
  private _cancelDragging(): void {
    this._isDragging = false;
    this._dytService.enableContextMenu();
    this._dytService.enableScroll();
  }

  // Handle Dragging Delay
  private _handleDraggingDelay(event: PointerEvent, delay: number): void {
    requestAnimationFrame(() => {

      // create bubble component
      const bubble             = this._viewContainerRef.createComponent(DytInflationBubbleComponent);
      bubble.instance.duration = delay;
      bubble.instance.x        = event.x;
      bubble.instance.y        = event.y;
      
      // handle when animation is done
      bubble.instance.done.pipe(first()).subscribe(v => bubble.destroy());
    
    });
  }

  // Handle Scroll On Drag Move
  private _handleScrollOnDragMove(event: CdkDragMove): void {
    // get the mouse position from the event
    const { x, y } = event.pointerPosition;
    const pageHeight = window.innerHeight;

    // set scroll max speed
    const ratio = y < 25 || y > pageHeight - 25 ? 10 : 50; // control max speed accordingly to mouse pos
    const prevMaxSpeed = this._scrollMaxSpeed;
    this._scrollMaxSpeed = pageHeight / ratio;

    // set scroll direction
    let direction: null | 'up' | 'down';
    if (y < 50) direction = 'up'; // near the top, scroll up
    else if (y > pageHeight - 50) direction = 'down'; // near the bottom, scroll down
    else direction = null; // not near the edges, do not scroll

    // scroll when the mouse reaches the top or bottom
    if (direction) {
      if (!this._scrollInterval || prevMaxSpeed !== this._scrollMaxSpeed) this._startScrolling(direction);
    }
    // stop scrolling when the mouse is not near the edges
    else this._stopScrolling();
  }

  // Start Scrolling
  public _startScrolling(direction: 'up' | 'down') {
    // return if scrolling is already active
    if (this._scrollInterval) clearInterval(this._scrollInterval);

    // set a new interval to keep scrolling
    this._scrollInterval = setInterval(() => {

      if (this._scrollSpeed < this._scrollMaxSpeed) this._scrollSpeed++; // increase speed for each calling
      else this._scrollSpeed = this._scrollMaxSpeed; // limit the scroll speed

      // scroll
      window.scrollBy({
        top: direction === 'up' ? -this._scrollSpeed : this._scrollSpeed,
        behavior: 'instant'
      });
    }, 40);
  }
  
  // Stop Scrolling
  public _stopScrolling() {
    if (this._scrollInterval) clearInterval(this._scrollInterval);
    this._scrollInterval = null;
    this._scrollSpeed = 1;
  }

  // add class whether a row is draggable
  @HostBinding('class.dyt-draggable')
  public get isDraggable(): boolean {
    return this._isDraggable;
  }

  // listen row pointer down
  @HostListener('pointerdown', ['$event'])
  public onPointerDown(event: PointerEvent): void {
    if (!this._isDraggable) return;

    this._isDragging = true;
    // cancel dragging when pointerup or pointermove
    document.addEventListener('pointerup',   this._cancelDragging.bind(this), { once: true });
    document.addEventListener('pointermove', this._cancelDragging.bind(this), { once: true });

    // handle delay accordingly to the pointer type
    if (event.pointerType === 'mouse') this._cdkDrag.dragStartDelay = 0;
    else this._cdkDrag.dragStartDelay = 275; // drag delay for better usabilty with scroll behaviour


    // handle drag delay
    const handlerDelay = 75;
    if (this._cdkDrag.dragStartDelay) {
      setTimeout(() => {
        if (!this._isDragging) return;
        
        // disable confliting features
        this._dytService.disableContextMenu();
        this._dytService.disableScroll();
        // handle dragging delay
        this._handleDraggingDelay(event, Number(this._cdkDrag.dragStartDelay) - handlerDelay);

      }, handlerDelay); // add a delay to handler, so prevent simple clicks
    }
  }

  // listen row drag moved
  @HostListener('cdkDragMoved', ['$event'])
  public onDragMoved(event: CdkDragMove) {
    this._handleScrollOnDragMove(event);
  }

  // listen row drag end
  @HostListener('cdkDragEnd', ['$event'])
  public onDragEnded(event: CdkDragEnd) {
    this._stopScrolling();
  } 
}