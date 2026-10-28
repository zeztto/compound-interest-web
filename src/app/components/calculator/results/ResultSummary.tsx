/**
 * 계산 결과 요약 컴포넌트
 */

import { TrendingUp } from "lucide-react";
import type { CalculationResult, Currency, PeriodUnit, CompoundFrequency } from "../../../../types/calculator";
import { formatCurrency, getPeriodUnitLabel } from "../../../../utils/formatUtils";

interface ResultSummaryProps {
  result: CalculationResult;
  currency: Currency;
  period: string;
  periodUnit: PeriodUnit;
  compoundPeriod: string;
  compoundUnit: CompoundFrequency;
}

export function ResultSummary({
  result,
  currency,
  period,
  periodUnit,
  compoundPeriod,
  compoundUnit,
}: ResultSummaryProps) {
  return (
    <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="whitespace-nowrap font-semibold">계산 결과</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">원금</span>
          <span className="whitespace-nowrap font-semibold">{formatCurrency(result.principal, currency)}</span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">총 이자</span>
          <span className="whitespace-nowrap font-semibold text-green-600">
            +{formatCurrency(result.totalInterest, currency)}
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">최종 금액</span>
          <span className="whitespace-nowrap font-semibold text-primary">
            {formatCurrency(result.finalAmount, currency)}
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">실효 수익률 (연)</span>
          <span className="whitespace-nowrap font-semibold">
            {result.effectiveRate?.toFixed(2) || "0.00"}%
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">총 수익률 (ROI)</span>
          <span className="whitespace-nowrap font-semibold">
            {result.totalROI?.toFixed(2) || "0.00"}%
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">복리 주기</span>
          <span>
            {compoundPeriod}
            {getPeriodUnitLabel(compoundUnit)}마다
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-background rounded-md">
          <span className="text-muted-foreground">투자 기간</span>
          <span>
            {period}
            {getPeriodUnitLabel(periodUnit)}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          수익률: {((result.finalAmount / result.principal - 1) * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
