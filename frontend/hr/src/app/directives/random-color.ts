import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'

})
export class RandomColor {

  constructor(private el:ElementRef) {

   const colors=['red','blue','black','aqua','brown'];
   let color = colors[Math.floor(Math.random() * colors.length)] ;
    el.nativeElement.style.backgroundColor = color;

  }

}
