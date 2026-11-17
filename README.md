# Warrior World Command Center

React, TypeScript, Tailwind and React Router frontend for the supplied Cloudflare Worker. Seven views, all thirty reference managers, responsive navigation, API error/retry handling, manual-flow confirmation, Auto chat, PGR targets and a cent-conserving split calculator.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
cp .env.example .env
npm run dev
npm test
npm run build
```

## Cloudflare Pages

Connect the source repository to Pages. Build command: `npm run build`. Output directory: `dist`. Set `VITE_API_BASE_URL` to the Worker origin before building. The supplied default is `https://warrior-world-command-center.princekoya.workers.dev`. `public/_redirects` supports direct navigation to React Router routes. Alternatively upload the contents of `dist` as a Pages direct-upload project. Attach pemfflix.tv through Pages custom domains after validating the deployment; this archive does not modify domains, Workers, D1 or Stripe.

## Integration contract

The supplied Worker hostname did not resolve in the build environment on November 17, 2026. Live integration is therefore unverified. API calls accept direct JSON or a `{data: ...}` envelope. Lists accept an array or `{managers: [...]}` / `{flows: [...]}`. Manager IDs in the live catalog are used for links and chat. Local IDs are reference slugs only.

Expected dashboard: `{stats:{totalManagers,activeManagers,totalEarnings,totalWarriors,totalGoldInVault,loveDistributed},recentSplits:[{id,source,amount,createdAt}]}`. Also accepts `recent8WaySplits` and top-level stats. Currency values are USD numbers; gold values are grams.

Expected PGR: `{currentLevel,currentPrice,goldBacking,progress,volumeToNextLevel}`; progress is a percentage from 0 to 100. Missing fields display unavailable; schedule targets do not substitute for live prices or reserves.

Manager details accept a manager object or `{manager,flows}`. Sub-managers use `{name,workers?:string[]}`. Flows use `{id,name,managerId,trigger,description,steps}` where steps are strings or `{name}`. Trigger types are lowercase `cron`, `webhook`, `manual`, `event`. Only manual flows can be initiated from this interface. Chat accepts `{response:string}`, `{reply:string}` or `{message:string}`. Trigger acknowledgments are not presented as completed work.

`GET /api/health`, `/api/managers`, `/api/managers/:id`, `/api/flows`, `/api/dashboard`, `/api/pgr-status` and POST `/api/chat`, `/api/trigger-flow`, `/api/8way-split` are wired. The ERB webhook is server-to-server and deliberately has no frontend sender. Stripe webhook signatures must be verified by the backend.

## Allocation rule requiring backend confirmation

The eight weights total 100%. For node earnings the local estimate first reserves 5% of gross, then splits the remaining 95% by 30/20/15/10/10/5/5/5. This is a visible assumption, not a verified protocol rule. Whole-cent rounding remainder goes to Reinvest. The calculator can request the backend calculation and shows its response separately for comparison. It never submits a payment or token transfer.

## Status integrity and security

Your aggregate status totals are 15 Active / 12 Planned / 3 Future. You did not specify which manager receives each status. The offline catalog therefore marks individual statuses Unverified rather than inventing assignments. Workers and revenue terms are likewise not fabricated. Worker count 0 in the reference catalog means no assignments supplied, not proof of no deployed workers.

The frontend is not an authentication boundary. Protect the Worker and dashboard with your existing identity provider before exposing administrative operations. All fetches use `credentials: include`; credentialed cross-origin APIs must return the exact frontend `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials: true`, allow `Content-Type`, and handle OPTIONS. Enforce session authorization and origin/CSRF checks on backend mutations. Do not put API secrets in VITE variables; they are public build-time values. No credentials are stored by this app. Chat is memory-only. API reachability does not certify system health, backing or business performance.

## Deployment acceptance

1. Resolve the Worker hostname and inspect actual endpoint schemas against the contract above.
2. Verify credentialed CORS, protected sessions and unauthorized mutation rejection.
3. Check dashboard values against backend records and gold proof sources.
4. Open a live manager detail, send a context chat and trigger a safe manual flow; independently verify its execution receipt.
5. Confirm node-compound accounting against the backend and validate all split buckets.
6. Reload `/managers` directly on Pages and check navigation on a phone.

Deployment reference: https://vite.dev/guide/static-deploy/#cloudflare-pages

## Build-environment verification

Dependency installation was blocked by DNS resolution for registry.npmjs.org in the authoring environment. Consequently no dependency lockfile, compiled dist bundle, React browser check or production build verification is included. Run `npm install`, `npm test` and `npm run build` in a network-enabled environment before deployment. The pure allocation and catalog checks can also be run without dependencies on Node 24 using `node --experimental-strip-types verify.mjs`.
