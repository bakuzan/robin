import SelectOption from '../models/select-option.model';
import { capitalise } from '.';

export const mapEnumsToObject = <T>(arr: ReadonlyArray<string>): T =>
  arr.reduce((p, k) => Object.assign(p, { [k]: k }), {} as T);

export const mapEnumToSelectOption = (
  arr: ReadonlyArray<string>
): SelectOption[] => arr.map((x) => ({ value: x, text: x } as SelectOption));

export const mapStringsToSelectOption = (
  arr: ReadonlyArray<string>
): SelectOption[] => arr.map((value) => ({ value, text: capitalise(value) }));
