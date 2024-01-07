import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostUpdatePage } from './post-update.page';

describe('PostUpdatePage', () => {
  let component: PostUpdatePage;
  let fixture: ComponentFixture<PostUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
