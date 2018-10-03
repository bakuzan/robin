import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickboxComponent } from './tickbox.component';

describe('TickboxComponent', () => {
  let component: TickboxComponent;
  let fixture: ComponentFixture<TickboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TickboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
