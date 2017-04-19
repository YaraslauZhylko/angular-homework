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

  @Input('app-click-styler') initialColor: string;
  private hostElement: HTMLElement;
  private currentColorIdx: number = 0;

  constructor(private el: ElementRef) {
    this.hostElement = el.nativeElement;
  }

  ngOnInit() {
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
    this.currentColorIdx++;
    if (this.currentColorIdx >= this.colors.length) this.currentColorIdx = 0;
    this.setColor();
  }

  setColor() {
    this.hostElement.style.color = this.colors[this.currentColorIdx];
  }
}
