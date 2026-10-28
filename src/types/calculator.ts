/**
 * 복리 계산기 타입 정의
 */

export type Currency = "KRW" | "USD";
export type CompoundFrequency = "day" | "month" | "year";
export type PeriodUnit = "day" | "month" | "year";
export type RateUnit = "day" | "month" | "year";
export type PrincipalUnit = "won" | "manwon" | "eokwon" | "jowon";

export interface CalculationResult {
  principal: number;
  totalInterest: number;
  finalAmount: number;
  effectiveRate: number;
  totalROI: number;
  breakdown: PaymentBreakdown[];
}

export interface PaymentBreakdown {
  periodFraction?: number;
  period: number;
  periodLabel: string;
  balance: number;
  interest: number;
  principalAmount: number;
}

export interface CalculatorInput {
  principal: string;
  principalUnit: PrincipalUnit;
  principalDisplay: string;
  rate: string;
  rateUnit: RateUnit;
  period: string;
  periodUnit: PeriodUnit;
  compoundPeriod: string;
  compoundUnit: CompoundFrequency;
  currency: Currency;
}

export interface ValidationError {
  field: string;
  message: string;
  description?: string;
}
