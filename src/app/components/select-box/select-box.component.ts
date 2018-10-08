import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

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
  selectClasses: string;
  onChange: (_: any) => void;
  onTouched: () => void;
  @ViewChild('select')
  select;
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
  options: number[];
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor(private _renderer: Renderer2) {}

  ngOnInit() {
    this.selectClasses = classNames('select-box', 'has-float-label');
  }

  writeValue(value: any): void {
    const select = this.select.nativeElement;
    this._renderer.setProperty(select, 'value', value);
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

  handleChange(value) {
    this.onChange(value);
  }
}
