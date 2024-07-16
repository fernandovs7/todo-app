import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirstLetter]',
  standalone: true
})
export class CapitalizeFirstLetterDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 0) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
  }

  @HostListener('blur', ['$event']) onInputBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 0) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
  }

}
