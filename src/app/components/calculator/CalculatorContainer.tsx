/**
 * 복리 계산기 메인 컨테이너 컴포넌트
 */

import { Card, CardContent } from "../ui/card";
import { useCalculator } from "../../../hooks/useCalculator";
import { CalculatorHeader } from "./CalculatorHeader";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResult } from "./CalculatorResult";
import { CalculatorInfo } from "./CalculatorInfo";

export function CalculatorContainer() {
  const {
    // 상태
    principal,
    principalUnit,
    principalDisplay,
    rate,
    rateUnit,
    period,
    periodUnit,
    compoundPeriod,
    compoundUnit,
    currency,
    result,
    resultInput,
    error,
    reset,
    // 상태 업데이트
    setPrincipalUnit,
    setRate,
    setRateUnit,
    setPeriod,
    setPeriodUnit,
    setCompoundPeriod,
    setCompoundUnit,
    setCurrency,
    // 핸들러
    handlePrincipalChange,
    calculate,
  } = useCalculator();

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <CalculatorHeader />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <CalculatorForm
            currency={currency}
            principal={principal}
            principalDisplay={principalDisplay}
            principalUnit={principalUnit}
            rate={rate}
            rateUnit={rateUnit}
            period={period}
            periodUnit={periodUnit}
            compoundPeriod={compoundPeriod}
            compoundUnit={compoundUnit}
            setCurrency={setCurrency}
            handlePrincipalChange={handlePrincipalChange}
            setPrincipalUnit={setPrincipalUnit}
            setRate={(e) => setRate(e.target.value)}
            setRateUnit={setRateUnit}
            setPeriod={(e) => setPeriod(e.target.value)}
            setPeriodUnit={setPeriodUnit}
            setCompoundPeriod={(e) => setCompoundPeriod(e.target.value)}
            setCompoundUnit={setCompoundUnit}
            onCalculate={calculate}
            onReset={reset}
          />

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {result && resultInput && (
            <CalculatorResult
              result={result}
              currency={resultInput.currency}
              period={resultInput.period}
              periodUnit={resultInput.periodUnit}
              compoundPeriod={resultInput.compoundPeriod}
              compoundUnit={resultInput.compoundUnit}
            />
          )}
        </CardContent>
      </Card>

      <CalculatorInfo />
    </div>
  );
}
