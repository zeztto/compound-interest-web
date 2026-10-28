/**
 * 복리 주기별 계산 내역 컴포넌트
 */

import type { PaymentBreakdown, Currency } from "../../../../types/calculator";
import { formatCurrency,formatPeriodFraction } from "../../../../utils/formatUtils";

interface ResultBreakdownProps {
  breakdown: PaymentBreakdown[];
  currency: Currency;
}

export function ResultBreakdown({ breakdown, currency }: ResultBreakdownProps) {
  return (
    <div className="pt-4 border-t border-border">
      <h4 className="font-semibold mb-3">복리 주기별 계산 내역</h4>
      <div className="max-h-96 max-w-full overflow-auto border rounded-md">
        <table className="w-full min-w-[360px] text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          <thead className="sticky top-0 bg-background border-b">
            <tr>
              <th className="p-2 text-left">회차</th>
              <th className="p-2 text-right">이자</th>
              <th className="p-2 text-right">잔액</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-muted/30" : ""}`}
              >
                <td className="p-2">{item.period}회차{item.periodFraction !== undefined && item.periodFraction < 1 ? ` (잔여 ${formatPeriodFraction(item.periodFraction)}주기)` : ''}</td>
                <td className="p-2 text-right text-green-600">
                  +{formatCurrency(item.interest, currency)}
                </td>
                <td className="p-2 text-right font-medium">
                  {formatCurrency(item.balance, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        총 {breakdown.length}개 행 (잔여 기간 포함)
      </p>
    </div>
  );
}
