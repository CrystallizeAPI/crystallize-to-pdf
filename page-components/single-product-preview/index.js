import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  productPage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7F0",
  },
  tablePage: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FFF7F0",
  },
  image: {
    height: "auto",
    width: "80%",
    // maxHeight: "80%",
  },
  title: {
    marginBottom: 15,
    fontWeight: "bold",
    fontFamily: "Oswald",
    color: "#373567",
    fontSize: 40,
  },
  productDescription: {
    color: "#373567",
    width: "60%",
    fontSize: 16,
    textAlign: "center",
    lineHeight: "140%",
  },
  price: {
    color: "#373567",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FEE8F0",
    width: 50,
    fontStyle: "bold",
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
    lineHeight: "140%",
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
  table: {
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10%",
  },
  tableRow: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dfdfdf",
  },
  tableCell: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 4,
  },
  tableCellImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  tableCellName: {
    color: "#373567",
    fontSize: 10,
    minWidth: "35%",
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 900,
  },
  tableHeader: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
  tableHeaderName: {
    fontSize: 8,
    color: "#333",
  },
});

const PDFpreview = ({ product }) => {
  console.log({ product });
  const { name, defaultVariant, breif, variants } = product;
  return (
    <Document>
      <Page style={styles.productPage}>
        <Image style={styles.image} src={defaultVariant?.firstImage?.url} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.productDescription}>
          {breif?.content?.plainText}
        </Text>
        <Text style={styles.price}>${defaultVariant?.price}</Text>
      </Page>
      <Page style={styles.tablePage}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text
              style={{
                ...styles.tableHeaderName,
                minWidth: "43%",
                paddingLeft: 40,
              }}
            >
              Name
            </Text>
            {variants?.[0]?.attributes?.map((attr) => (
              <Text style={{ ...styles.tableHeaderName, width: "20%" }}>
                {attr.attribute}
              </Text>
            ))}
            <Text
              style={{
                ...styles.tableHeaderName,
                paddingLeft: "5%",
              }}
            >
              Price
            </Text>
            <Text></Text>
          </View>
          {variants?.map((variant, i) => (
            <View
              key={i}
              style={{
                ...styles.tableRow,
                backgroundColor: `${i % 2 ? "transparent" : "#fff"}`,
              }}
            >
              <Image
                style={styles.tableCellImage}
                src={variant?.firstImage?.url}
              />
              <Text style={styles.tableCellName}>{variant?.name}</Text>
              {variant?.attributes?.map((attr) => (
                <Text style={{ fontSize: 10, color: "#373567", width: "20%" }}>
                  {attr?.value}
                </Text>
              ))}
              <Text
                style={{
                  ...styles.price,
                  marginTop: 0,
                  fontSize: 10,
                  padding: 5,
                }}
              >
                ${variant.price}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFpreview;
