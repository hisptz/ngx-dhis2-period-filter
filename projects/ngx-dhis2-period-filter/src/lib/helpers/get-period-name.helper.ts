import { getPeriodsBasedOnType } from './get-periods-based-on-type.helper';

export function getPeriodName(id: string, type: string): string {
  if (!id) {
    return undefined;
  }

  switch (type) {
    case 'RelativeMonth':
    case 'RelativeQuarter':
    case 'RelativeYear':
    case 'RelativeWeek':
    case 'RelativeBiMonth':
    case 'RelativeFinancialYear': {
      const period = (getPeriodsBasedOnType(type, undefined) || []).find(
        (periodItem: any) => periodItem.id === id
      );

      return period ? period.name : id;
    }

    default: {
      const period = (
        getPeriodsBasedOnType(type, parseInt(id.slice(0, 4), 10)) || []
      ).find((periodItem: any) => periodItem.id === id);

      return period ? period.name : id;
    }
  }
}
