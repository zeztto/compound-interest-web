/**
 * 투자 기간 입력 컴포넌트
 */

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import type { PeriodUnit } from "../../../../types/calculator";

interface PeriodInputProps {
  value: string;
  unit: PeriodUnit;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unit: PeriodUnit) => void;
}

export function PeriodInput({
  value,
  unit,
  onChange,
  onUnitChange,
}: PeriodInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="period">투자 기간</Label>
      <div className="flex gap-2">
        <Input
          id="period"
          type="number"
          step="1"
          value={value}
          onChange={onChange}
          placeholder="기간을 입력하세요"
          className="flex-1 min-w-0"
        />
        <ToggleGroup
          aria-label="투자 기간 단위"
        type="single"
          value={unit}
          onValueChange={(val) => val && onUnitChange(val as PeriodUnit)}
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
