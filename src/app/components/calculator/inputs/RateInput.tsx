/**
 * 이자율 입력 컴포넌트
 */

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import type { RateUnit } from "../../../../types/calculator";

interface RateInputProps {
  value: string;
  unit: RateUnit;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unit: RateUnit) => void;
}

export function RateInput({
  value,
  unit,
  onChange,
  onUnitChange,
}: RateInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="rate">이자율 (%)</Label>
      <div className="flex gap-2">
        <Input
          id="rate"
          type="number"
          step="0.1"
          value={value}
          onChange={onChange}
          placeholder="이자율을 입력하세요"
          className="flex-1 min-w-0"
        />
        <ToggleGroup
          aria-label="이자율 기간"
        type="single"
          value={unit}
          onValueChange={(val) => val && onUnitChange(val as RateUnit)}
          className="justify-start"
        >
          <ToggleGroupItem value="day" aria-label="일">
            일
          </ToggleGroupItem>
          <ToggleGroupItem value="month" aria-label="월">
            월
          </ToggleGroupItem>
          <ToggleGroupItem value="year" aria-label="년">
            년
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
