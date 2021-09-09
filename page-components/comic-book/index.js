import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer";
export { query } from "./query";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  image: {
    height: 500,
    width: 500,
    borderRadius: 16,
  },
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
});

const ComicBook = ({ pages }) => (
  <Document>
    {pages.map((page, i) => (
      <Page key={i} size="A4" style={styles.page}>
        <Text style={styles.title}>{page.title.content.text}</Text>
        <Image
          style={styles.image}
          src={page.comicStripe.content.firstImage.url}
        />
      </Page>
    ))}
  </Document>
);

export default ComicBook;
