import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

export const dynamicParams = false; // Prevent dynamic fallback generation

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);
  if (page == null) notFound();

  const MDX = page.data.exports.default;

  return (
    <DocsPage toc={page.data.exports.toc}>
      <DocsBody>
        <h1>{page.data.title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const excluded = [
    'developer/architecture/apis-and-interfaces',
    'developer/smart-contracts/boilerplate',
    'developer/smart-contracts/deploy/foundry',
    'developer/smart-contracts/deploy/hardhat',
    'developer/smart-contracts/eip-2930/multicall-contract',
    'developer/smart-contracts/eip-2930/solidityInterfaces',
    'developer/smart-contracts/events/poll-events',
  ];

  return getPages()
    .filter((page) => !excluded.includes(page.slugs?.join('/')))
    .map((page) => ({
      slug: page.slugs,
    }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);
  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
