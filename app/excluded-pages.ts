// Doc slugs (relative to /docs) that exist as MDX but are intentionally NOT
// published: they are excluded from static generation and from the search index.
// Consumed by app/docs/[[...slug]]/page.tsx and app/api/search/route.ts — keep in sync.
export const excludedPages = [
  'developer/smart-contracts/boilerplate',
  'developer/smart-contracts/eip-2930/multicall-contract',
  'developer/smart-contracts/eip-2930/solidityInterfaces',
  'developer/smart-contracts/events/poll-events',
];

export function isExcluded(slugs: string[] | undefined): boolean {
  return excludedPages.includes((slugs ?? []).join('/'));
}
