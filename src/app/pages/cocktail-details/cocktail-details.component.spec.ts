import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { ActivatedRoute } from '@angular/router'

import { ActivatedRouteStub, CocktailsViewMock } from 'src/app/testing'

import { SharedPipesModule } from '@shared/pipes/pipes.module'

import { CocktailDetailsComponent } from './cocktail-details.component'

describe('CocktailDetailsComponent', () => {
  let component: CocktailDetailsComponent;
  let fixture: ComponentFixture<CocktailDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CocktailDetailsComponent
      ],
      imports: [
        SharedPipesModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init', fakeAsync(() => {
    const expectToHaveSelectedCocktail = component.cocktail == CocktailsViewMock[0];
    const expectToHaveCocktailInstructions = component.activeInstructions == CocktailsViewMock[0].instructions[0];
    const expectToHaveCocktailInstructionsLang = component.instructionsLanguage == CocktailsViewMock[0].instructions[0].lang;

    expect(component).toBeTruthy();
    tick(300);
    expect(expectToHaveSelectedCocktail).toBeTruthy();
    expect(expectToHaveCocktailInstructions).toBeTruthy();
    expect(expectToHaveCocktailInstructionsLang).toBeTruthy();
  }));

  it('should set active language to Italian', () => {
    component.setActiveLanguage('Italian');

    const expectLangToBeItalian = component.instructionsLanguage === 'Italian';
    const expectToHaveItalianInstructions = component.activeInstructions?.text?.includes('Versare tutti');

    expect(expectToHaveItalianInstructions).toBeTruthy();
    expect(expectLangToBeItalian).toBeTruthy();
  });
});
