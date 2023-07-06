import {ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MockComponents, MockModule } from 'ng-mocks';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

const TEMPLATE_COMPONENTS: any[] = [];
const initialState = {};

class someServiceMock {
  // getServiceAccountAndSetEnabled = jest.fn();
  // setServiceAccountStatus = jest.fn();
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  // let someService: SomeService;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(CommonModule),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [RegisterComponent, ...MockComponents(...TEMPLATE_COMPONENTS)],
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
    fixture = TestBed.createComponent(RegisterComponent);
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
