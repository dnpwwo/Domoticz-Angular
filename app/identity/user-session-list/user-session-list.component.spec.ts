import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserSessionListComponent } from './user-session-list.component';

describe('UserSessionListComponent', () => {
  let component: UserSessionListComponent;
  let fixture: ComponentFixture<UserSessionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
