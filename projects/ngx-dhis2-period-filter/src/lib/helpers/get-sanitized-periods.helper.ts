import { getPeriodType } from './get-period-type.helper';
import { getPeriodName } from './get-period-name.helper';

export function getSanitizedPeriods(periods: any[], calendar: string) {
  return (periods || []).map((period: any) => {
    const periodId = period.id.toString();
    const periodType =
      period.type || getPeriodType({ ...period, id: periodId });

    return {
      ...period,
      id: periodId,
      name: period.name || getPeriodName(periodId, periodType, calendar),
      type: periodType
    };
  });
}
