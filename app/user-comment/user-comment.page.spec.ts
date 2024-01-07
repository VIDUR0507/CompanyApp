import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCommentPage } from './user-comment.page';

describe('UserCommentPage', () => {
  let component: UserCommentPage;
  let fixture: ComponentFixture<UserCommentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
