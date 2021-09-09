import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
export { query } from "./query";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  pageProduct: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#efefef",
  },
  image: {
    height: "auto",
    width: "100%",
    maxHeight: "80%",
  },
  title: {
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

const Products = ({ pages }) => {
  return (
    <Document>
      {pages.map((page, i) => {
        return (
          <>
            <Page key={i} size="A4" style={styles.page}>
              <Text style={styles.title}>{page.name}</Text>
            </Page>
            {page?.products?.map((product, i) => {
              return (
                <Page key={i} size="A4" style={styles.pageProduct}>
                  <Image
                    style={styles.image}
                    src={product?.defaultVariant?.firstImage?.url}
                  />
                  <View
                    style={{
                      flexGrow: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.productName}>{product?.name}</Text>
                    <Text style={styles.productPrice}>
                      EUR {product?.defaultVariant?.price}{" "}
                    </Text>
                  </View>
                </Page>
              );
            })}
          </>
        );
      })}
    </Document>
  );
};

export default Products;

// <Page key={i} size="A4" style={styles.page}>
//   <Text style={styles.title}>{page.title.content.text}</Text>
//   <Image
//     style={styles.image}
//     src={page.comicStripe.content.firstImage.url}
//   />
// </Page>
