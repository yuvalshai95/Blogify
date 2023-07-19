import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RegisterComponent } from './register.component';


const initialState = {};

// class someServiceMock {
//   // getServiceAccountAndSetEnabled = jest.fn();
//   // setServiceAccountStatus = jest.fn();
// }

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  // let someService: SomeService;

  beforeEach((async () => {
   await TestBed.configureTestingModule({
      providers: [
      //   // {
      //   //   provide: SomeService,
      //   //   useClass: someServiceMock,
      //   // },
        provideMockStore({ initialState }),
      //   // provideHttpClient(),
      //   // provideHttpClientTesting(),
      ],
    })
  .compileComponents();
  store = TestBed.inject(MockStore);
    // someService = TestBed.inject(SomeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
