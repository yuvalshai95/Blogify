import {ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockModule } from 'ng-mocks';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';

const TEMPLATE_COMPONENTS: any[] = [];
const initialState = {};

class someServiceMock {
  // getServiceAccountAndSetEnabled = jest.fn();
  // setServiceAccountStatus = jest.fn();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  // let someService: SomeService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(CommonModule),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [LoginComponent, ...MockComponents(...TEMPLATE_COMPONENTS)],
      providers: [
        // {
        //   provide: SomeService,
        //   useClass: someServiceMock,
        // },
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    // someService = TestBed.inject(SomeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   store?.resetSelectors();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
