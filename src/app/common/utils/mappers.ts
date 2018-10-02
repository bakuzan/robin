import MultiSelectOption from '../models/multi-select-option.model';

export function mapEnumsToObject<T>(arr: ReadonlyArray<string>): T {
  return arr.reduce((p, k) => Object.assign(p, { [k]: k }), {} as T);
}

export const mapEnumToMultiSelectOption = (
  arr: ReadonlyArray<string>
): MultiSelectOption[] =>
  arr.map((x) => ({ value: x, text: x } as MultiSelectOption));
