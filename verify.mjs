import assert from 'node:assert/strict';
import {calculateSplit,catalog,levels} from './src/data.ts';
for(const node of [true,false])for(const amount of [.01,.03,1,17.89,1000,99999.99]){const r=calculateSplit(amount,node);assert.equal(Math.round((r.rows.reduce((a,b)=>a+b.value,0)+r.compound)*100),Math.round(amount*100));}
assert.equal(calculateSplit(1000,true).compound,50);
assert.equal(calculateSplit(1000,true).rows[0].value,285);
for(const v of [NaN,Infinity,-1,0,.001,1e13])assert.throws(()=>calculateSplit(v,false));
assert.equal(catalog.length,30);assert.equal(new Set(catalog.map(m=>m.id)).size,30);
assert.deepEqual(['Foundation','Sentinel','Sovereign','Core'].map(t=>catalog.filter(m=>m.tier===t).length),[3,3,21,3]);
assert.deepEqual(levels.map(l=>l.gold),[.1,.2,.4,.8,1.6,3.2,7,14,28]);
console.log('PASS: cent conservation across 12 allocation cases, node compound rule, 6 invalid inputs, 30 unique managers, tier counts and PGR targets.');
