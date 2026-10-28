/**
 * 계산기 입력 폼 컴포넌트
 */

import { Button } from "../ui/button";
import { Calculator } from "lucide-react";
import { CurrencyInput } from "./inputs/CurrencyInput";
import { PrincipalInput } from "./inputs/PrincipalInput";
import { RateInput } from "./inputs/RateInput";
import { PeriodInput } from "./inputs/PeriodInput";
import { CompoundPeriodInput } from "./inputs/CompoundPeriodInput";
import type {
  Currency,
  PrincipalUnit,
  RateUnit,
  PeriodUnit,
  CompoundFrequency,
} from "../../../types/calculator";

interface CalculatorFormProps {
  // 상태
  currency: Currency;
  principal: string;
  principalDisplay: string;
  principalUnit: PrincipalUnit;
  rate: string;
  rateUnit: RateUnit;
  period: string;
  periodUnit: PeriodUnit;
  compoundPeriod: string;
  compoundUnit: CompoundFrequency;
  // 핸들러
  setCurrency: (value: Currency) => void;
  handlePrincipalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPrincipalUnit: (value: PrincipalUnit) => void;
  setRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRateUnit: (value: RateUnit) => void;
  setPeriod: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPeriodUnit: (value: PeriodUnit) => void;
  setCompoundPeriod: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCompoundUnit: (value: CompoundFrequency) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export function CalculatorForm({
  currency,
  principal,
  principalDisplay,
  principalUnit,
  rate,
  rateUnit,
  period,
  periodUnit,
  compoundPeriod,
  compoundUnit,
  setCurrency,
  handlePrincipalChange,
  setPrincipalUnit,
  setRate,
  setRateUnit,
  setPeriod,
  setPeriodUnit,
  setCompoundPeriod,
  setCompoundUnit,
  onCalculate,
  onReset,
}: CalculatorFormProps) {
  return (
    <div className="space-y-4">
      <CurrencyInput value={currency} onChange={setCurrency} />

      <PrincipalInput
        value={principal}
        displayValue={principalDisplay}
        unit={principalUnit}
        currency={currency}
        onChange={handlePrincipalChange}
        onUnitChange={setPrincipalUnit}
      />

      <RateInput
        value={rate}
        unit={rateUnit}
        onChange={(e) => setRate(e)}
        onUnitChange={setRateUnit}
      />

      <PeriodInput
        value={period}
        unit={periodUnit}
        onChange={(e) => setPeriod(e)}
        onUnitChange={setPeriodUnit}
      />

      <CompoundPeriodInput
        value={compoundPeriod}
        unit={compoundUnit}
        onChange={(e) => setCompoundPeriod(e)}
        onUnitChange={setCompoundUnit}
      />

      <Button onClick={onCalculate} className="w-full" size="lg">
        <Calculator className="w-4 h-4 mr-2" />
        계산하기
      </Button>
      <Button variant="outline" onClick={onReset} className="w-full">초기화</Button>
    </div>
  );
}
