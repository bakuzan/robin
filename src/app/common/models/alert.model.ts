/* eslint-disable @typescript-eslint/naming-convention */

export enum AlertType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export interface AlertData {
  message: string;
  detail: string;
}

export default interface Alert {
  id: string;
  type: AlertType;
  message: string;
  detail: string;
  showDetail: boolean;
}
