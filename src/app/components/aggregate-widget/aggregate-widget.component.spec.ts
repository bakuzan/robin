import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateWidgetComponent } from './aggregate-widget.component';

describe('AggregateWidgetComponent', () => {
  let component: AggregateWidgetComponent;
  let fixture: ComponentFixture<AggregateWidgetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AggregateWidgetComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
