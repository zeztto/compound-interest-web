/**
 * 원금 입력 컴포넌트
 */

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import type { Currency, PrincipalUnit } from "../../../../types/calculator";
import { UNIT_LABELS } from "../../../../utils/constants";

interface PrincipalInputProps {
  value: string;
  displayValue: string;
  unit: PrincipalUnit;
  currency: Currency;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unit: PrincipalUnit) => void;
}

export function PrincipalInput({

  displayValue,
  unit,
  currency,
  onChange,
  onUnitChange,
}: PrincipalInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="principal">원금</Label>
      <div className="flex gap-2">
        <Input
          id="principal"
          type="text"
          value={displayValue}
          onChange={onChange}
          placeholder="원금을 입력하세요"
          className="flex-1 min-w-0"
        />
        <ToggleGroup
          aria-label="원금 단위"
        type="single"
          value={unit}
          onValueChange={(val) => val && onUnitChange(val as PrincipalUnit)}
          className="justify-start"
        >
          <ToggleGroupItem
            value="won"
            aria-label={UNIT_LABELS[currency].won}
          >
            {UNIT_LABELS[currency].won}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="manwon"
            aria-label={UNIT_LABELS[currency].manwon}
          >
            {UNIT_LABELS[currency].manwon}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="eokwon"
            aria-label={UNIT_LABELS[currency].eokwon}
          >
            {UNIT_LABELS[currency].eokwon}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="jowon"
            aria-label={UNIT_LABELS[currency].jowon}
          >
            {UNIT_LABELS[currency].jowon}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
