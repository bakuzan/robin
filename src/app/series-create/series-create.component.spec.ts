import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCreateComponent } from './series-create.component';

describe('SeriesCreateComponent', () => {
  let component: SeriesCreateComponent;
  let fixture: ComponentFixture<SeriesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
