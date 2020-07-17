import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppDropdown]'
})
export class AppDropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggle(){
    this.isOpen = !this.isOpen
  }

  constructor() { }

}
