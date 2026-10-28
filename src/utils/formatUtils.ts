/**
 * 포맷팅 유틸리티 함수
 */

import type { Currency, CompoundFrequency, PeriodUnit } from "../types/calculator";
import { FREQUENCY_LABELS, PERIOD_UNIT_LABELS } from "./constants";

/**
 * 숫자에 천 단위 구분 기호 추가
 */
export const formatNumberWithCommas = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, "");
  if (!numbers) return "";

  // 천 단위 구분 기호 추가
  return new Intl.NumberFormat("en-US").format(parseInt(numbers));
};

/**
 * 통화 형식으로 포맷
 */
export const formatCurrency = (value: number, currency: Currency): string => {
  if (currency === "KRW") {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }
};

/**
 * 복리 주기 라벨 반환
 */
export const getFrequencyLabel = (freq: CompoundFrequency): string => {
  return FREQUENCY_LABELS[freq];
};

/**
 * 기간 단위 라벨 반환
 */
export const getPeriodUnitLabel = (unit: PeriodUnit): string => {
  return PERIOD_UNIT_LABELS[unit];
};

export const formatPeriodFraction = (value:number):string => value>0 && value<0.000001 ? value.toExponential(2) : new Intl.NumberFormat('ko-KR',{maximumFractionDigits:6}).format(value);
