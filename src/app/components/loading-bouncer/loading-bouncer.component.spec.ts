import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBouncerComponent } from './loading-bouncer.component';

describe('LoadingBouncerComponent', () => {
  let component: LoadingBouncerComponent;
  let fixture: ComponentFixture<LoadingBouncerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingBouncerComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBouncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
