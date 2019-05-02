import { getPeriodType } from './get-period-type.helper';
import { getPeriodName } from './get-period-name.helper';

export function getSanitizedPeriods(periods: any[]) {
  return (periods || []).map((period: any) => {
    const periodType = period.type || getPeriodType(period);
    return {
      ...period,
      name: getPeriodName(period.id, periodType),
      type: periodType
    };
  });
}
