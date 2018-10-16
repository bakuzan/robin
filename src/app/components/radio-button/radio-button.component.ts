import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements OnInit, ControlValueAccessor {
  tickboxClasses: string;
  checked: boolean;
  onTouched: () => void;
  onChange: (_: any) => void;
  @ViewChild('radio')
  radio;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  value: string | number | boolean;
  @Input()
  text: string;
  @Input()
  disabled: boolean;

  constructor(private _renderer: Renderer2) {}

  ngOnInit() {}

  writeValue(v: boolean): void {
    const radio = this.radio.nativeElement;
    const checked = v === radio.value;
    this._renderer.setProperty(radio, 'checked', checked);
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const radio = this.radio.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this._renderer.setProperty(radio, 'disabled', isDisabled);
    radio[action]('radio__input--disabled');
  }

  handleChange(event) {
    event.stopPropagation();
    const radio = this.radio.nativeElement;
    this._renderer.setProperty(radio, 'checked', true);
    this.onChange(this.value);
  }
}
