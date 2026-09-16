// Doc slugs (relative to /docs) that exist as MDX but are intentionally NOT
// published: they are excluded from static generation and from the search index.
// Consumed by app/docs/[[...slug]]/page.tsx and app/api/search/route.ts — keep in sync.
export const excludedPages = [
  'developer/smart-contracts/boilerplate',
  'developer/smart-contracts/eip-2930/multicall-contract',
  'developer/smart-contracts/eip-2930/solidityInterfaces',
  'developer/smart-contracts/events/poll-events',

  // Idle pages: not in any sidebar meta.json, not linked from any page, and not a
  // redirect target. Content is kept for reference; routes return 404.
  'developer/architecture/consensus-and-sharding-mechanism',
  'developer/architecture/cyclic-operations',
  'developer/architecture/node-lifecycle',
  'developer/deploy-dapps/dapp-radar-guide',
  'developer/json-rpc-old',
  'developer/smart-contracts/deploy/same-address',
  'ecosystem/advanced-operations/docker-setup',
  'ecosystem/advanced-operations',
  'ecosystem/advanced-operations/node-states',
  'ecosystem/advanced-operations/rewards-and-key-security',
  'ecosystem/advanced-operations/staking-and-unstaking',
  'ecosystem/advanced-operations/troubleshooting-guide',
  'ecosystem/advanced-operations/unstaking-and-recovery',
  'ecosystem/json-rpc',
  'ecosystem/node-service-providers',
  'faqs/general',
  'faqs/license',
  'overview/consensus',
  'overview/dynamic-state-sharding',
  'overview/opcodes',
  'overview/sharding',
  'run-a-node/advanced-operations-old/automation',
  'run-a-node/advanced-operations-old/backup-restore',
  'run-a-node/advanced-operations-old/disaster-recovery',
  'run-a-node/advanced-operations-old/networking',
  'run-a-node/advanced-operations-old/overview',
  'run-a-node/advanced-operations-old/performance-tuning',
  'run-a-node/advanced-operations-old/security',
  'run-a-node/advanced-operations-old/upgrades',
];

export function isExcluded(slugs: string[] | undefined): boolean {
  return excludedPages.includes((slugs ?? []).join('/'));
}
