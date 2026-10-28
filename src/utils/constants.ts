/**
 * 복리 계산기 상수 정의
 */

import type { Currency, PrincipalUnit } from "../types/calculator";

// 검증 제한값
export const VALIDATION_LIMITS = {
  MAX_RATE: 1000, // 최대 이자율 1000%
  MAX_PERIOD_YEARS: 100, // 최대 투자 기간 100년
  MAX_PERIOD_MONTHS: 1200, // 100년 = 1,200개월
  MAX_PERIOD_DAYS: 36500, // 100년 = 36,500일
  MAX_ITERATIONS: 10000, // 최대 복리 계산 반복 횟수
  MIN_PRINCIPAL: 0, // 최소 원금 (0 초과)
  MIN_ITERATIONS: 1, // 최소 복리 계산 횟수
} as const;

// 통화별 단위 승수
export const UNIT_MULTIPLIERS: Record<Currency, Record<PrincipalUnit, number>> = {
  KRW: {
    won: 1,
    manwon: 10000,
    eokwon: 100000000,
    jowon: 1000000000000,
  },
  USD: {
    won: 1, // $
    manwon: 1000, // k$
    eokwon: 1000000, // m$
    jowon: 1000000000, // b$
  },
} as const;

// 시간 단위 변환 (연 기준)
export const TIME_MULTIPLIERS = {
  day: 365,
  month: 12,
  year: 1,
} as const;

// 통화별 단위 라벨
export const UNIT_LABELS: Record<Currency, Record<PrincipalUnit, string>> = {
  KRW: {
    won: "원",
    manwon: "만원",
    eokwon: "억원",
    jowon: "조원",
  },
  USD: {
    won: "$",
    manwon: "k$",
    eokwon: "m$",
    jowon: "b$",
  },
} as const;

// 주기 라벨
export const FREQUENCY_LABELS = {
  day: "일별",
  month: "월별",
  year: "연별",
} as const;

// 단위 라벨
export const PERIOD_UNIT_LABELS = {
  day: "일",
  month: "개월",
  year: "년",
} as const;
