export const query = `query {
    catalogue(path: "/comics") {
      children {
        id
        name
        title: component(id: "title") {
          content {
            ... on SingleLineContent {
              text
            }
          }
        }
        description: component(id: "caption") {
          content {
            ... on RichTextContent {
              plainText
            }
          }
        }
        comicStripe: component(id: "stripe") {
          content {
            ... on ImageContent {
              firstImage {
                url
              }
            }
          }
        }
      }
    }
  }
  `;
