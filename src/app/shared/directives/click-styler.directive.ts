import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[app-click-styler]'
})
export class ClickStylerDirective implements OnInit {

  private colors: Array<string> = [
    'black',
    'blue',
    'brown',
    'cyan',
    'gold',
    'grey',
    'green',
    'magenta',
    'maroon',
    'purple',
    'red',
    'violet'
  ];

  private hostElement: HTMLElement;
  private currentColorIdx: number = 0;
  @Input('app-click-styler') initialColor: string;

  constructor(private el: ElementRef) {
    // alert('CREATED');  // DEBUG
    this.hostElement = el.nativeElement;
  }

  ngOnInit() {
    // alert('INIT');  // DEBUG
    if (this.initialColor) {
      this.currentColorIdx = this.colors.indexOf(this.initialColor.trim().toLowerCase());
      if (this.currentColorIdx < 0) {
        this.colors.push(this.initialColor.trim());
        this.currentColorIdx = this.colors.length - 1;
      }
    }
    this.setColor();
  }

  @HostListener('click', ['$event']) onClick(event) {
    // alert('CLICKED');  // DEBUG
    this.currentColorIdx++;
    if (this.currentColorIdx >= this.colors.length) this.currentColorIdx = 0;
    this.setColor();
  }

  setColor() {
    this.hostElement.style.color = this.colors[this.currentColorIdx];
  }

}
