import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RouterTestingModule } from '@angular/router/testing'

import { LocalStorageStubService } from 'src/app/testing/stubs/local-storage.stub'

import { LocalStorageService } from '@core/services'

import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        {
          provide: LocalStorageService,
          useClass: LocalStorageStubService
        }

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.activeTheme).toEqual('');
  });

  it('should switch theme', () => {
    component.switchTheme();
    expect(component.activeTheme).toEqual('theme-dark');
  });
});
