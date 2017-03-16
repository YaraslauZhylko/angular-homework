import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderableListComponent } from './reorderable-list.component';

describe('ReorderableListComponent', () => {
  let component: ReorderableListComponent;
  let fixture: ComponentFixture<ReorderableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
