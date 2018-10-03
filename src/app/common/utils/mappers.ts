import SelectOption from '../models/select-option.model';

export function mapEnumsToObject<T>(arr: ReadonlyArray<string>): T {
  return arr.reduce((p, k) => Object.assign(p, { [k]: k }), {} as T);
}

export const mapEnumToSelectOption = (
  arr: ReadonlyArray<string>
): SelectOption[] => arr.map((x) => ({ value: x, text: x } as SelectOption));
