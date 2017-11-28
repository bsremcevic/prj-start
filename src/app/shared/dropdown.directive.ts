import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  //binds the .open css class to this property
  @HostBinding('class.open') isOpen = false;


  //listens for a click
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;

  }
}
