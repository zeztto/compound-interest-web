/**
 * 계산기 설명 컴포넌트
 */

export function CalculatorInfo() {
  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg">
      <h4 className="font-semibold mb-2">복리 계산 방법</h4>
      <p className="text-sm text-muted-foreground mb-2">
        복리 계산 공식: A = P(1 + r/n)^(nt)
      </p>
      <p className="text-sm text-muted-foreground mb-2">초기에 원금을 한 번 납입하고 추가 납입·출금 없이 계산합니다. 연 365일·12개월로 단위를 환산합니다. 마지막 잔여 기간은 주기 이율의 분수 거듭제곱으로 계산해 표의 마지막 행에 포함합니다. 세금·수수료·금리 변동·환율 환산은 포함하지 않습니다. 원화는 원 단위, 달러는 센트 단위 원금을 입력합니다. 원금·결과는 원화 1조 원, 달러 100억 달러까지 계산합니다. 내부 값은 반올림하지 않고 화면 금액만 원화 0자리·달러 2자리로 표시합니다.</p>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li>• A: 최종 금액</li>
        <li>• P: 원금</li>
        <li>• r: 연 이자율 (소수)</li>
        <li>• n: 연간 복리 횟수</li>
        <li>• t: 투자 기간 (년)</li>
      </ul>
    </div>
  );
}
