import type {Currency,PrincipalUnit,RateUnit,PeriodUnit,CompoundFrequency,CalculationResult,PaymentBreakdown} from '../types/calculator';
import {UNIT_MULTIPLIERS,TIME_MULTIPLIERS,VALIDATION_LIMITS} from './constants';
import {getFrequencyLabel} from './formatUtils';
export const convertPrincipalToBaseUnit=(value:number,unit:PrincipalUnit,currency:Currency):number=>value*UNIT_MULTIPLIERS[currency][unit];
export const convertRateToAnnual=(rate:number,unit:RateUnit):number=>rate*TIME_MULTIPLIERS[unit];
export const convertPeriodToYears=(period:number,unit:PeriodUnit):number=>period/TIME_MULTIPLIERS[unit];
export const calculateCompoundFrequency=(period:number,unit:CompoundFrequency):number=>TIME_MULTIPLIERS[unit]/period;
const parse=(text:string):number=>/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text.trim())?Number(text):NaN;
export function calculateCompoundInterest(principal:string,principalUnit:PrincipalUnit,rate:string,rateUnit:RateUnit,period:string,periodUnit:PeriodUnit,compoundPeriod:string,compoundUnit:CompoundFrequency,currency:Currency):CalculationResult|null {
 const input=[principal,rate,period,compoundPeriod].map(parse);const [pv,rv,tv,cv]=input;
 if(input.some(n=>!Number.isFinite(n))||pv<=0||rv<0||rv>VALIDATION_LIMITS.MAX_RATE||tv<=0||cv<=0)return null;
 if(!['KRW','USD'].includes(currency)||!UNIT_MULTIPLIERS[currency]?.[principalUnit]||!TIME_MULTIPLIERS[rateUnit]||!TIME_MULTIPLIERS[periodUnit]||!TIME_MULTIPLIERS[compoundUnit])return null;
 const rawP=convertPrincipalToBaseUnit(pv,principalUnit,currency),r=convertRateToAnnual(rv/100,rateUnit),t=convertPeriodToYears(tv,periodUnit),n=calculateCompoundFrequency(cv,compoundUnit);
 const minor=currency==='KRW'?1:100,max=currency==='KRW'?1_000_000_000_000:10_000_000_000;
 const principalMinor=Math.round(rawP*minor),P=principalMinor/minor;
 if(!Number.isSafeInteger(principalMinor)||Math.abs(rawP*minor-principalMinor)>Number.EPSILON*8*Math.max(1,Math.abs(rawP*minor)))return null;
 if(![P,r,t,n].every(Number.isFinite)||P<1/minor||P>max||t>100||n<=0)return null;
 // One initial deposit at time zero; no additional deposits or withdrawals.
 let cycles=n*t;if(!Number.isFinite(cycles)||cycles<=0||cycles>VALIDATION_LIMITS.MAX_ITERATIONS)return null;
 if(Math.round(cycles)>=1&&Math.abs(cycles-Math.round(cycles))<=Number.EPSILON*32*Math.max(1,cycles))cycles=Math.round(cycles);
 const cycleRate=r/n,logGrowth=Math.log1p(cycleRate),effectiveRate=Math.expm1(n*logGrowth)*100;
 if(![cycleRate,logGrowth,effectiveRate].every(Number.isFinite))return null;
 const full=Math.floor(cycles),fraction=cycles-full,breakdown:PaymentBreakdown[]=[];let balance=P;
 for(let i=0;i<full+(fraction>0?1:0);i++){
  const part=i<full?1:fraction;const interest=balance*Math.expm1(logGrowth*part);balance+=interest;
  if(!Number.isFinite(balance)||balance>max||!Number.isFinite(interest))return null;
  breakdown.push({period:i+1,periodLabel:getFrequencyLabel(compoundUnit),balance,interest,principalAmount:0,periodFraction:part});
 }
 const totalInterest=balance-P,totalROI=totalInterest/P*100;
 if(![balance,totalInterest,totalROI,effectiveRate].every(Number.isFinite))return null;
 return {principal:P,totalInterest,finalAmount:balance,effectiveRate,totalROI,breakdown};
}
