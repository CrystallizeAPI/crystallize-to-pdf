export const query = `
query ITEM_TYPE($path: String!) {
  catalogue(language: "en", path: $path) {
    type
    language
    name
    children {
      type
    }
  }
}  
  `;
