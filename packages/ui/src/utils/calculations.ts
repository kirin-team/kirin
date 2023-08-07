import { useMemo } from 'react';

export function getProportions(
  value: number,
  max: number,
  maxFixed: number = 2
) {
  const val = value / max;
  const couldBeDecimalValue = (Number.isNaN(val) ? 0 : val) * 100;

  if (couldBeDecimalValue > 100) return 100;
  if (couldBeDecimalValue < 0) return 0;
  if (!`${couldBeDecimalValue}`.includes('.')) return couldBeDecimalValue;

  const decimal = `${couldBeDecimalValue}`.split('.')[1];
  if (decimal.length < maxFixed) return couldBeDecimalValue;

  return +couldBeDecimalValue.toFixed(maxFixed);
}

export function useProportions(
  value: number,
  max: number,
  maxFixed: number = 2
) {
  return useMemo(
    () => getProportions(value, max, maxFixed),
    [value, max, maxFixed]
  );
}
