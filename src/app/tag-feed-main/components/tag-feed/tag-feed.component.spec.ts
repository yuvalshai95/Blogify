import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagFeedComponent } from './tag-feed.component';

describe('GlobalFeedComponent', () => {
  let component: TagFeedComponent;
  let fixture: ComponentFixture<TagFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
