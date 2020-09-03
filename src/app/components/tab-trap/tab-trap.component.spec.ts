import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTrapComponent } from './tab-trap.component';

describe('TabTrapComponent', () => {
  let component: TabTrapComponent;
  let fixture: ComponentFixture<TabTrapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabTrapComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
