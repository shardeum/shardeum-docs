import { getPages } from '@/app/source';
import { isExcluded } from '@/app/excluded-pages';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: getPages()
    .filter((page) => !isExcluded(page.slugs))
    .map((page) => ({
      title: page.data.title,
      structuredData: page.data.exports.structuredData,
      id: page.url,
      url: page.url,
    })),
});
