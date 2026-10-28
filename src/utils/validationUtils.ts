/**
 * 검증 유틸리티 함수
 */

import { toast } from "sonner";
import { VALIDATION_LIMITS } from "./constants";
import type { PeriodUnit } from "../types/calculator";

/**
 * 기본 입력값 검증
 */
export const validateBasicInputs = (
  principalValue: number,
  rateValue: number,
  periodValue: number,
  compoundPeriodValue: number
): boolean => {
  // NaN 검사
  if (
    isNaN(principalValue) ||
    isNaN(rateValue) ||
    isNaN(periodValue) ||
    isNaN(compoundPeriodValue)
  ) {
    toast.error("입력 오류", {
      description: "모든 값을 숫자로 입력해주세요.",
    });
    return false;
  }

  // 원금 검증
  if (principalValue <= VALIDATION_LIMITS.MIN_PRINCIPAL) {
    toast.error("원금 오류", {
      description: "원금은 0보다 커야 합니다.",
    });
    return false;
  }

  // 이자율 검증 (rateValue는 이미 /100 된 값)
  if (rateValue < 0 || rateValue > VALIDATION_LIMITS.MAX_RATE / 100) {
    toast.error("이자율 오류", {
      description: `이자율은 0% ~ ${VALIDATION_LIMITS.MAX_RATE}% 사이여야 합니다.`,
    });
    return false;
  }

  // 투자 기간 검증
  if (periodValue <= 0) {
    toast.error("투자 기간 오류", {
      description: "투자 기간은 0보다 커야 합니다.",
    });
    return false;
  }

  // 이자 지급 주기 검증
  if (compoundPeriodValue <= 0) {
    toast.error("이자 지급 주기 오류", {
      description: "이자 지급 주기는 0보다 커야 합니다.",
    });
    return false;
  }

  return true;
};

/**
 * 투자 기간 범위 검증
 */
export const validatePeriod = (
  periodValue: number,
  periodUnit: PeriodUnit
): boolean => {
  switch (periodUnit) {
    case "day":
      if (periodValue > VALIDATION_LIMITS.MAX_PERIOD_DAYS) {
        toast.error("투자 기간 오류", {
          description: `투자 기간은 최대 ${VALIDATION_LIMITS.MAX_PERIOD_YEARS}년(${VALIDATION_LIMITS.MAX_PERIOD_DAYS.toLocaleString()}일)까지만 설정할 수 있습니다.`,
        });
        return false;
      }
      break;
    case "month":
      if (periodValue > VALIDATION_LIMITS.MAX_PERIOD_MONTHS) {
        toast.error("투자 기간 오류", {
          description: `투자 기간은 최대 ${VALIDATION_LIMITS.MAX_PERIOD_YEARS}년(${VALIDATION_LIMITS.MAX_PERIOD_MONTHS.toLocaleString()}개월)까지만 설정할 수 있습니다.`,
        });
        return false;
      }
      break;
    case "year":
      if (periodValue > VALIDATION_LIMITS.MAX_PERIOD_YEARS) {
        toast.error("투자 기간 오류", {
          description: `투자 기간은 최대 ${VALIDATION_LIMITS.MAX_PERIOD_YEARS}년까지만 설정할 수 있습니다.`,
        });
        return false;
      }
      break;
  }
  return true;
};

/**
 * 계산 반복 횟수 검증
 */
export const validateIterations = (n: number, t: number): boolean => {
  const totalIterations = Math.floor(n * t);

  if (totalIterations > VALIDATION_LIMITS.MAX_ITERATIONS) {
    toast.error("계산 제한 초과", {
      description: `총 복리 계산 횟수가 ${totalIterations.toLocaleString()}회로 너무 많습니다. 최대 ${VALIDATION_LIMITS.MAX_ITERATIONS.toLocaleString()}회까지만 가능합니다.`,
    });
    return false;
  }

  if (totalIterations < VALIDATION_LIMITS.MIN_ITERATIONS) {
    toast.error("계산 오류", {
      description:
        "복리 계산 횟수가 최소 1회 이상이어야 합니다. 투자 기간이나 이자 지급 주기를 조정해주세요.",
    });
    return false;
  }

  return true;
};

/**
 * 계산 결과 유효성 검증
 */
export const validateCalculationResult = (
  A: number,
  totalInterest: number
): boolean => {
  if (!isFinite(A) || !isFinite(totalInterest) || isNaN(A) || isNaN(totalInterest)) {
    toast.error("계산 오류", {
      description: "계산 결과가 너무 크거나 유효하지 않습니다. 입력값을 조정해주세요.",
    });
    return false;
  }
  return true;
};
