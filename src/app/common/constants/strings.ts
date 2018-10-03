class AppStrings {
  left: string;
  right: string;
  center: string;
  localStorageKey: string;
  // input types
  text: string;
  checkbox: string;
  date: string;
  // data types
  object: string;
  string: string;
  number: string;
  events: AppEvents;
  monthNames: string[];
}

class AppEvents {
  click: string;
}

const Strings: AppStrings = Object.freeze({
  left: 'left',
  right: 'right',
  center: 'center',
  localStorageKey: 'rbn-settings',
  // input types
  text: 'text',
  checkbox: 'checkbox',
  date: 'date',
  // data types
  object: 'object',
  string: 'string',
  number: 'number',
  events: {
    click: 'click'
  },
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
});

export default Strings;
