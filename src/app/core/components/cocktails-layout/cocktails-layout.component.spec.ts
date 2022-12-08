import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RouterTestingModule } from '@angular/router/testing'

import { CocktailsLayoutComponent } from './cocktails-layout.component'

describe('CocktailsLayoutComponent', () => {
  let component: CocktailsLayoutComponent;
  let fixture: ComponentFixture<CocktailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CocktailsLayoutComponent
      ,
    ],
    imports: [
      RouterTestingModule
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
