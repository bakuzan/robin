import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSuggestionComponent } from './autocomplete-suggestion.component';

describe('AutocompleteSuggestionComponent', () => {
  let component: AutocompleteSuggestionComponent;
  let fixture: ComponentFixture<AutocompleteSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteSuggestionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
