import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableAccessComponent } from './table-access.component';

describe('TableAccessComponent', () => {
  let component: TableAccessComponent;
  let fixture: ComponentFixture<TableAccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
