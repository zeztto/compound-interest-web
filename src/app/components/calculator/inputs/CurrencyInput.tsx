/**
 * 통화 선택 컴포넌트
 */

import { Label } from "../../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import type { Currency } from "../../../../types/calculator";

interface CurrencyInputProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

export function CurrencyInput({ value, onChange }: CurrencyInputProps) {
  return (
    <div className="space-y-2">
      <Label>통화</Label>
      <ToggleGroup
        aria-label="통화"
        type="single"
        value={value}
        onValueChange={(val) => val && onChange(val as Currency)}
        className="justify-start"
      >
        <ToggleGroupItem value="KRW" aria-label="원화">
          원화 (₩)
        </ToggleGroupItem>
        <ToggleGroupItem value="USD" aria-label="달러">
          달러 ($)
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
