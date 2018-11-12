export enum AlertType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export class AlertData {
  message: string;
  detail: string;
}

export default class Alert {
  id: string;
  type: AlertType;
  message: string;
  detail: string;
  showDetail: boolean;
}
