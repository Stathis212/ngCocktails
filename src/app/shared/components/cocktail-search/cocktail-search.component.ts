import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import {
  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule
} from '@angular/forms'

import { debounceTime, Subscription } from 'rxjs'

import { CocktailFilterForm, CocktailFilterFormValue, SelectFieldOption } from '@shared/models'

import { SelectFieldComponent } from '../ui/select-field/select-field.component'

@Component({
  selector: 'app-cocktail-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SelectFieldComponent
  ],
  templateUrl: './cocktail-search.component.html',
  styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit, OnDestroy {

  @Input() public set categories(data: SelectFieldOption[]) {
    this.options = [...data];
  }
  @Output() public searchFiltersEmitter: EventEmitter<CocktailFilterFormValue> = new EventEmitter<CocktailFilterFormValue>();

  public filterForm: FormGroup<CocktailFilterForm>;
  public options: SelectFieldOption[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder ) {
    this.filterForm = this.fb.group<CocktailFilterForm>({
      name: new FormControl('', { nonNullable: true }),
      category: new FormControl(null)
    })
  }

  public ngOnInit(): void {
    this.subscribeToFormChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public filterByCategory(categoryOption: SelectFieldOption): void {
    this.filterForm.controls.category.patchValue(categoryOption.value);
  }

  private subscribeToFormChanges(): void {
    this.subscriptions.add(
      this.filterForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((() => this.searchFiltersEmitter.emit(this.filterForm.getRawValue())))
    );
  }
}
