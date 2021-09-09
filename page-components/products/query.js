export const query = `
  query {
    catalogue(language: "en", path: "/shop") {
      name
      folders: children {
        name
        products: children {
          name
          ... on Product {
            defaultVariant {
              firstImage {
                url
              }
              price
            }
          }
          summary: component(id: "summary") {
            content {
              ... on RichTextContent {
                plainText
              }
            }
          }
        }
      }
    }
  }
  `;
