import {useState} from 'react';
import type {CalculatorInput,CalculationResult} from '../types/calculator';
import {calculateCompoundInterest} from '../utils/calculatorUtils';
const DEFAULT:CalculatorInput={principal:'1000',principalUnit:'manwon',principalDisplay:'1,000',rate:'5',rateUnit:'year',period:'10',periodUnit:'year',compoundPeriod:'1',compoundUnit:'month',currency:'KRW'};
function formatDraft(value:string):string {
 const clean=value.replace(/,/g,'');if(!/^\d*(?:\.\d*)?$/.test(clean))return value;
 const [integer,fraction]=clean.split('.');return integer.replace(/\B(?=(\d{3})+(?!\d))/g,',')+(fraction===undefined?'':'.'+fraction);
}
export function useCalculator(){
 const [input,setInput]=useState<CalculatorInput>({...DEFAULT});const [result,setResult]=useState<CalculationResult|null>(null);const [error,setError]=useState('');const [resultInput,setResultInput]=useState<CalculatorInput|null>(null);
 const change=<K extends keyof CalculatorInput>(key:K,value:CalculatorInput[K])=>{setInput(previous=>({...previous,[key]:value}));setResult(null);setResultInput(null);setError('');};
 const handlePrincipalChange=(e:React.ChangeEvent<HTMLInputElement>)=>{const display=formatDraft(e.target.value);setInput(previous=>({...previous,principal:display.replace(/,/g,''),principalDisplay:display}));setResult(null);setResultInput(null);setError('');};
 const calculate=()=>{const next=calculateCompoundInterest(input.principal,input.principalUnit,input.rate,input.rateUnit,input.period,input.periodUnit,input.compoundPeriod,input.compoundUnit,input.currency);setResult(next);setResultInput(next?{...input}:null);setError(next?'':'원금·기간·주기는 양수, 이자율은 0~1,000% 범위로 입력해 주세요. 기간은 최대 100년, 계산은 10,000회이며 통화별 안전 금액 범위를 넘을 수 없습니다.');};
 const reset=()=>{setInput({...DEFAULT});setResult(null);setResultInput(null);setError('');};
 return {...input,result,resultInput,error,handlePrincipalChange,calculate,reset,setPrincipal:(v:string)=>change('principal',v),setPrincipalDisplay:(v:string)=>change('principalDisplay',v),setPrincipalUnit:(v:CalculatorInput['principalUnit'])=>change('principalUnit',v),setRate:(v:string)=>change('rate',v),setRateUnit:(v:CalculatorInput['rateUnit'])=>change('rateUnit',v),setPeriod:(v:string)=>change('period',v),setPeriodUnit:(v:CalculatorInput['periodUnit'])=>change('periodUnit',v),setCompoundPeriod:(v:string)=>change('compoundPeriod',v),setCompoundUnit:(v:CalculatorInput['compoundUnit'])=>change('compoundUnit',v),setCurrency:(v:CalculatorInput['currency'])=>change('currency',v)};
}
