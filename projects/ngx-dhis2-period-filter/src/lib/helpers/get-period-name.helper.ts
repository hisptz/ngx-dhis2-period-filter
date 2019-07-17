import { Fn } from '@iapps/function-analytics';

export function getPeriodName(
  id: string,
  type: string,
  calendar: string
): string {
  if (!id) {
    return undefined;
  }

  const periodInstance = new Fn.Period();

  switch (type) {
    case 'RelativeMonth':
    case 'RelativeQuarter':
    case 'RelativeYear':
    case 'RelativeWeek':
    case 'RelativeBiMonth':
    case 'RelativeFinancialYear': {
      periodInstance
        .setType(type)
        .setCalendar(calendar)
        .get();
      const period = (periodInstance.list() || []).find(
        (periodItem: any) => periodItem.id === id
      );

      return period ? period.name : id;
    }

    default: {
      periodInstance
        .setType(type)
        .setYear(parseInt(id.slice(0, 4), 10))
        .setCalendar(calendar)
        .get();
      const period = (periodInstance.list() || []).find(
        (periodItem: any) => periodItem.id === id
      );

      return period ? period.name : id;
    }
  }
}
