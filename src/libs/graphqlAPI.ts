// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  details {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  date
  authorName
  categoryName
  articleImage {
    url
  }
`;

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["articles"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse: any) {
  return fetchResponse?.data?.pageBlogPostCollection?.items;
}

export async function getAllArticles(
  // For this demo set the default limit to always return 3 articles.
  limit = 0,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const articles = await fetchGraphQL(
    `query {
      pageBlogPostCollection(limit:${limit}){
        items{
          slug
          title
          publishedDate
          shortDescription
          sys{
            id
          }
          featuredImage{
            url
            height
            width
          }
        }
      }
    }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

export async function getArticle(slug: string, isDraftMode = false) {
  const article = await fetchGraphQL(
    `query {
      pageBlogPostCollection(
        where:{slug:"${slug}"},
        limit: 1
      ) {
        items {
          seoFields {
            pageTitle
            pageDescription
            canonicalUrl
            nofollow
            noindex
            shareImagesCollection{
              items{
                url
                width
                height
                description
                contentType
              }
            }
          }
          title
          shortDescription
          featuredImage{
            url
          }
          content{
            json
            links{
              assets{
                block{
                  url
                }
              }
              entries{
                block{
                  ... on ComponentRichImage{
                    sys{
                      id
                    }
                    image{
                      url
                      width
                      height
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    isDraftMode
  );

  return extractArticleEntries(article)[0];
}
