/* eslint-disable no-underscore-dangle */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  forwardRef,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';
import SelectOption from 'src/app/common/models/select-option.model';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true
    }
  ]
})
export class SelectBoxComponent implements OnInit, ControlValueAccessor {
  @ViewChild('select', { static: false })
  select: ElementRef;
  @Input()
  label: string;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  value: string;
  @Input()
  disabled: boolean;
  @Input()
  required: boolean;
  @Input()
  options: SelectOption[];
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  selectClasses: string;
  onChange: (_: any) => void;
  onTouched: () => void;
  selectedValue: string;

  constructor(private _renderer: Renderer2) {}

  ngOnInit() {
    this.selectClasses = classNames('select-box', 'has-float-label');
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    const select = this.select.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this._renderer.setProperty(select, 'disabled', isDisabled);
    select[action]('select-box--disabled');
  }

  handleChange(value: string) {
    this.onChange(value);
  }
}
