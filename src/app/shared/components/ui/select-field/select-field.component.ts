import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { SelectFieldOption } from '@shared/models'

@Component({
  standalone: true,
  selector: '[app-select-field]',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SelectFieldComponent implements OnInit {

  @Input() options: SelectFieldOption[] = [];
  @Input() title: string = '';
  @Output() currentValueChange: EventEmitter<SelectFieldOption> = new EventEmitter();

  public currentValue?: SelectFieldOption;
  public dropdownOpen: boolean = false;
  public get dropdownElement(): Element {return this.elementRef.nativeElement.querySelector('.dropdown-list')}

  private currentIndex = -1;

  constructor(
    private elementRef: ElementRef
  ) { }

  public ngOnInit(): void {
    this.currentValue = this.options[0];
  }

  public handleKeyboardEvents($event: KeyboardEvent) {
    if (this.dropdownOpen) {
        $event.preventDefault();
    } else {
        return;
    }
    if ($event.code === 'ArrowUp') {
      if (this.currentIndex < 0) {
          this.currentIndex = 0;
      } else if (this.currentIndex > 0) {
          this.currentIndex--;
      }
      this.elementRef.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if ($event.code === 'ArrowDown') {
      if (this.currentIndex < 0) {
          this.currentIndex = 0;
      } else if (this.currentIndex < this.options.length-1) {
          this.currentIndex++;
      }
      this.elementRef.nativeElement.querySelectorAll('li').item(this.currentIndex).focus();
    } else if (($event.code === 'Enter' || $event.code === 'NumpadEnter') && this.currentIndex >= 0) {
      this.selectOptionByIndex(this.currentIndex);
    } else if ($event.code === 'Escape') {
      this.closeDropdown();
    }
  }

  public closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', "false");
    this.currentIndex = -1;
    this.dropdownOpen = false;
  }

  public selectOptionByIndex(index: number) {
    let option = this.options[index];
    this.selectOption(option)
  }

  public selectOption(option: SelectFieldOption) {
    this.currentValue = option;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  public toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute('aria-expanded', this.dropdownOpen ? "true" : "false");
  }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(target: ElementRef): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
