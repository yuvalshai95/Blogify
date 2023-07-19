import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TopBarItemComponent } from './top-bar-item.component';

describe('TopBarItemComponent', () => {
  let component: TopBarItemComponent;
  let fixture: ComponentFixture<TopBarItemComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
