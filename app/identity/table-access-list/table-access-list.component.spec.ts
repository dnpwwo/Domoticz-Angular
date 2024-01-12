import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableAccessListComponent } from './table-access-list.component';

describe('TableAccessListComponent', () => {
  let component: TableAccessListComponent;
  let fixture: ComponentFixture<TableAccessListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAccessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
