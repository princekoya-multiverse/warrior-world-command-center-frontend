export type Tier='Foundation'|'Sentinel'|'Sovereign'|'Core';
export interface SubManager {name:string;workers?:string[]}
export interface Manager {id:string;name:string;tier:Tier;status:string;revenueModel:string;subManagers:number|SubManager[];workers:number;personality?:string;flows?:Flow[]}
export interface Flow {id:string;name:string;managerId?:string;manager?:string;trigger:string;description:string;steps:(string|{name:string})[]}
const groups:[Tier,[string,string,string][]][]=[
 ['Foundation',[
 ['hosting','Web3 Hosting Manager','Sovereign Bunker, Hermes AI Agency, Commander Browser'],
 ['wisdom','Warrior Wisdom Manager','Curriculum, PoA, Astra AI Coach, B2B Licensing'],
 ['affiliate','Affiliate Manager','Referral Network, Marketing Engine']]],
 ['Sentinel',[
 ['w3x','W3X Exchange Manager','Trading Desk, Alpha Ops, AI Concierge, 5-to-1 Peg'],
 ['bank','Warrior Bank Manager','Sovereign Wallet, Self-Liquidating Card, Gold Desk, Wealth AI, Lending'],
 ['community','Community Connect Manager','Warrior-Book, Warrior-Gram, Warrior-Tube, PEMF TV, Warrior-Commerce']]],
 ['Sovereign',[
 ['pemf','PEMF Health Manager','Equipment, Licensing, Retreats, Coaching'],['forex','Forex Manager 4X','Education, Prop Desks, Brokerage, Arbitrage'],['gold','Gold Manager','GCR, Physical Gold, Gold Credit, Vaulting, Bullion'],['crypto','Crypto Manager','W3X Flow, Validators, Launchpad, Treasury, DePIN'],['creator','Creator Manager','Podcasts, Courses, Documentary'],['travel','Travel Manager','Resorts, Jets, Yachts, Virtual Tours'],['realty','Realty Manager','Physical Property, Tokenized RE, Metaverse'],['media','Media Manager','Productions, Broadcasting'],['sports','Sports Manager','Championships, Wrestling, Merchandise'],['entertainment','Entertainment Manager','Streaming, PPV, Live Events'],['wellness','Wellness Manager','Fitness, Nutrition, Mental Wellness'],['edutech','Edutech Manager','ITeachProtocols, Certification, Advisory'],['venture','Venture Manager','Token Incubator, Startup Investments'],['institution','Institution Manager','Corporate Programs, Athlete Endorsements'],['genome','Genome Manager','Biological Baselines, DNA, Health Optimization'],['quantum','Quantum Manager','Quantum Security, Advanced Computing'],['legacy','Legacy Manager','Generational Wealth, Trust Services'],['legal','Sovereign Legal Manager','Legal Sovereignty, Tax Optimization'],['philanthropy','Philanthropy Manager','Scholarship NWO Bucket 1%, Community Giving'],['space','Space Manager','Satellite DePIN, Orbital Compute'],['infinity','Infinity Manager','Cross-Chain, Infinite Scaling']]],
 ['Core',[
 ['wow','WOW Token Manager','8-Way Split, PGR Staircase, Whale-Shield'],['love','LOVE Token Manager','Staking Pool, Weekly Payouts, GCR Harvest, 4 Gates'],['erb','External Revenue Bridge ERB','Stripe Webhooks, Storefront Router, On-Chain Transmutation']]]];
export const catalog:Manager[]=groups.flatMap(([tier,items])=>items.map(([id,name,subs])=>({id,name,tier,status:'Unverified',revenueModel:'Revenue terms pending backend connection',subManagers:subs.split(', ').map(name=>({name})),workers:0})));
export const levels=[25,50,100,200,400,800,1600,3200,6400].map((price,level)=>({level,price,gold:[.1,.2,.4,.8,1.6,3.2,7,14,28][level]}));
export const buckets=[['Treasury',30,'#d4af37'],['Staking',20,'#648e70'],['Operations',15,'#8594b5'],['Development',10,'#af93c3'],['Gold reserve',10,'#e8c878'],['GCR',5,'#60b8b0'],['Creator',5,'#cb8c70'],['Reinvest',5,'#888d91']] as const;
export function calculateSplit(amount:number,node:boolean){if(!Number.isFinite(amount)||amount<=0||amount>1e12)throw new Error('Enter an amount between $0.01 and $1 trillion.');const cents=Math.round(amount*100);if(cents<1)throw new Error('Minimum amount is $0.01.');const compound=node?Math.round(cents*.05):0;const remaining=cents-compound;let used=0;const rows=buckets.map(([name,percent,color],i)=>{const value=i===7?remaining-used:Math.floor(remaining*percent/100);used+=value;return {name,percent,color,value:value/100}});return {rows,compound:compound/100,total:cents/100};}
export const money=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n):'Unavailable';
