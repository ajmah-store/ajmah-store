export class Alert {
  icon: string;
  type: string;
  title: string;
  content: string;
}

export const ALERT_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};
