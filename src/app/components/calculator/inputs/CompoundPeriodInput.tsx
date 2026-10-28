/**
 * 복리 적용 주기 입력 컴포넌트
 */

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import type { CompoundFrequency } from "../../../../types/calculator";

interface CompoundPeriodInputProps {
  value: string;
  unit: CompoundFrequency;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unit: CompoundFrequency) => void;
}

export function CompoundPeriodInput({
  value,
  unit,
  onChange,
  onUnitChange,
}: CompoundPeriodInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="compoundPeriod">복리 적용 주기</Label>
      <div className="flex gap-2">
        <Input
          id="compoundPeriod"
          type="number"
          step="1"
          value={value}
          onChange={onChange}
          placeholder="주기를 입력하세요"
          className="flex-1 min-w-0"
        />
        <ToggleGroup
          aria-label="복리 주기 단위"
        type="single"
          value={unit}
          onValueChange={(val) => val && onUnitChange(val as CompoundFrequency)}
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
