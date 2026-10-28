/**
 * 계산기 헤더 컴포넌트
 */

import { Calculator } from "lucide-react";

export function CalculatorHeader() {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Calculator className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">복리 투자 수익 계산기</h1>
      </div>
      <p className="text-muted-foreground">
        원금과 이자율을 입력하여 복리 투자 수익을 계산하세요
      </p>
    </div>
  );
}
