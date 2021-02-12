import { fetchAPI } from '@/services/api';

export async function getAll() {
  const data = await fetchAPI(
    `
      query MyQuery {
        releasesOne(where: {orderby: {field: DATE, order: ASC}}) {
          nodes {
            id
            title
            slug
            excerpt
            date
            acf_link_release {
              arquivo {
                uri
              }
            }
          }
        }
      }
    `,
  );
  return data?.releasesOne;
}
