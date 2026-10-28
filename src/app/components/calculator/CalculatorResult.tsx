/**
 * 계산 결과 표시 컴포넌트
 */

import type { CalculationResult, Currency, PeriodUnit, CompoundFrequency } from "../../../types/calculator";
import { ResultSummary } from "./results/ResultSummary";
import { ResultBreakdown } from "./results/ResultBreakdown";

interface CalculatorResultProps {
  result: CalculationResult;
  currency: Currency;
  period: string;
  periodUnit: PeriodUnit;
  compoundPeriod: string;
  compoundUnit: CompoundFrequency;
}

export function CalculatorResult({
  result,
  currency,
  period,
  periodUnit,
  compoundPeriod,
  compoundUnit,
}: CalculatorResultProps) {
  return (
    <>
      <ResultSummary
        result={result}
        currency={currency}
        period={period}
        periodUnit={periodUnit}
        compoundPeriod={compoundPeriod}
        compoundUnit={compoundUnit}
      />
      <ResultBreakdown breakdown={result.breakdown} currency={currency} />
    </>
  );
}
