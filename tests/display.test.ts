import test from 'node:test';import assert from 'node:assert/strict';import React from 'react';import {create,act} from 'react-test-renderer';
import {ResultBreakdown} from '../src/app/components/calculator/results/ResultBreakdown.tsx';
test('actual table never labels a positive tiny residual as zero cycles',()=>{
 let tree:ReturnType<typeof create>;
 act(()=>{tree=create(React.createElement(ResultBreakdown,{currency:'USD',breakdown:[{period:1,periodLabel:'월별',balance:1000,interest:0,principalAmount:0,periodFraction:1e-18}]}));});
 try{const text=JSON.stringify(tree.toJSON());assert.doesNotMatch(text,/잔여 0주기/);assert.match(text,/e-18/);}finally{act(()=>tree.unmount());}
});

test('actual summary describes month durations in 개월 rather than calendar 월',async()=>{
 const {ResultSummary}=await import('../src/app/components/calculator/results/ResultSummary.tsx');const {calculateCompoundInterest}=await import('../src/utils/calculatorUtils.ts');
 const result=calculateCompoundInterest('1000','won','6','year','13','month','6','month','USD')!;let tree:ReturnType<typeof create>;
 act(()=>{tree=create(React.createElement(ResultSummary,{result,currency:'USD',period:'13',periodUnit:'month',compoundPeriod:'6',compoundUnit:'month'}));});
 const text=(node:unknown):string=>{if(typeof node==='string')return node;if(Array.isArray(node))return node.map(text).join('');if(node&&typeof node==='object')return text((node as {children?:unknown}).children);return '';};
 try{const rendered=text(tree.toJSON());assert.match(rendered,/13개월/);assert.match(rendered,/6개월마다/);}finally{act(()=>tree.unmount());}
});
