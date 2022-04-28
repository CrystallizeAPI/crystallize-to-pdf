import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SingleProduct from "./../../../page-components/single-product-preview";

const tenantIdentifier = `dounot`;

async function simplyFetchFromGraph({
  uri = `https://api.crystallize.com/${tenantIdentifier}/catalogue`,
  query,
  variables,
}) {
  const body = JSON.stringify({
    query,
    variables: {
      ...variables,
      language: process.env.NEXT_PUBLIC_CRYSTALLIZE_CATALOGUE_LANGUAGE,
    },
  });

  const response = await fetch(uri, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function getStaticPaths({ locales, defaultLocale }) {
  const paths = [];
  async function handleLocale(localeName) {
    const locale = getValidLocale(localeName);

    function handleItem({ path, name, children, type, variants }) {
      const generateUrl = () => {
        const constructedSlug = `${path}`;

        if (defaultLocale !== locale.locale) {
          paths.push(`/${locale.locale}${constructedSlug.slice(0, -1)}`);
        } else {
          paths.push(constructedSlug.slice(0, -1));
        }
      };
      if (path !== "/index" && !name?.startsWith("_")) {
        if (type === "product") {
          if (variants?.length > 1) {
            variants.forEach(generateUrl);
          }
        }
        if (defaultLocale !== locale.locale) {
          paths.push(`/${locale.locale}${path}`);
        } else {
          paths.push(path);
        }
      }

      children?.forEach(handleItem);
    }

    try {
      const allCatalogueItems = await simplyFetchFromGraph({
        query: `
             query GET_ALL_CATALOGUE_ITEMS($language: String!) {
               catalogue(language: $language, path: "/") {
                 children {
                   path
                   name
                   type
                    children {
                      path
                      name
                      type
                    }
                 }
               }
             }
           `,
        variables: {
          language: "en",
        },
      });

      allCatalogueItems.data.catalogue.children?.children?.forEach(handleItem);
    } catch (error) {
      console.error(
        "Could not get all catalogue items for ",
        JSON.stringify(locale, null, 3)
      );
      console.log(error);
    }
  }
  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const productPath = context.params.product;

  const response = await simplyFetchFromGraph({
    query: `
         query ITEM_TYPE($path: String!) {
           catalogue(language: "en", path: $path) {
             name
            ... on Product {
              id
              defaultVariant {
                sku
                price
                name
                firstImage {
                  url
                }
              }
              variants {
                id
                price
                name
                sku
                firstImage {
                  url
                }
                attributes {
                  attribute
                  value
                }
              }
            }
            breif: component(id: "brief") {
              content {
                ... on RichTextContent {
                  plainText
                }
              }
            }
            nutritions: component(id: "nutrition") {
              content {
                ... on PropertiesTableContent {
                  sections {
                    title
                    properties {
                      key
                      value
                    }
                  }
                }
              }
            }
            body: component(id: "body") {
              content {
                ... on ParagraphCollectionContent {
                  paragraphs {
                    title {
                      text
                    }
                    body {
                      plainText
                    }
                    images {
                      url
                    }
                  }
                }
              }
            }
           }
         }
       `,
    variables: {
      path: `/shop/${productPath}`,
    },
  });
  console.log({ response });
  return {
    props: {
      data: response,
    },
  };
}

export default function ProductPDFpreview({ data }) {
  if (!data) {
    return <div>Loading ...</div>;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      {typeof window !== "undefined" && (
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <SingleProduct product={data?.data?.catalogue} />
        </PDFViewer>
      )}
    </div>
  );
}
