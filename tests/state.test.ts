import test from 'node:test';import assert from 'node:assert/strict';import React from 'react';import {act,create} from 'react-test-renderer';
import {useCalculator} from '../src/hooks/useCalculator.ts';
test('editing every calculation input clears prior result and calculation snapshot',()=>{
 let api:ReturnType<typeof useCalculator>;function Harness(){api=useCalculator();return null;}
 let tree:ReturnType<typeof create>;act(()=>{tree=create(React.createElement(Harness));});
 try{
  const changes=[()=>api.setRate('6'),()=>api.setPeriod('11'),()=>api.setCompoundPeriod('2'),()=>api.setCurrency('USD'),()=>api.setPrincipalUnit('won'),()=>api.setRateUnit('month'),()=>api.setPeriodUnit('month'),()=>api.setCompoundUnit('year')];
  for(const change of changes){act(()=>api.reset());act(()=>api.calculate());assert.ok(api.result);assert.equal(api.resultInput?.currency,'KRW');act(change);assert.equal(api.result,null);assert.equal(api.resultInput,null);}
 }finally{act(()=>tree.unmount());}
});
test('invalid calculation/reset clear results and pure computation never accesses storage',()=>{
 const storage=Object.getOwnPropertyDescriptor(globalThis,'localStorage');Object.defineProperty(globalThis,'localStorage',{configurable:true,get:()=>{throw Error('storage must not be used');}});
 let api:ReturnType<typeof useCalculator>;function Harness(){api=useCalculator();return null;}
 let tree:ReturnType<typeof create>;
 try{act(()=>{tree=create(React.createElement(Harness));});act(()=>api.calculate());assert.ok(api.result);act(()=>api.setRate('NaN'));act(()=>api.calculate());assert.equal(api.result,null);assert.ok(api.error);act(()=>api.reset());assert.equal(api.error,'');assert.equal(api.result,null);assert.equal(api.rate,'5');}
 finally{act(()=>tree?.unmount());if(storage)Object.defineProperty(globalThis,'localStorage',storage);else Reflect.deleteProperty(globalThis,'localStorage');}
});
