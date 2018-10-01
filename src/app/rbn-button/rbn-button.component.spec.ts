import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbnButtonComponent } from './rbn-button.component';

describe('RbnButtonComponent', () => {
  let component: RbnButtonComponent;
  let fixture: ComponentFixture<RbnButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RbnButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
