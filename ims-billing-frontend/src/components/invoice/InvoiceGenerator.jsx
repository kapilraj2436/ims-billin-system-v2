import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

// Optional: Register a custom font if you want (commented out here)
// Font.register({
//   family: 'Open Sans',
//   src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2',
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#f8f9fa',
    color: '#34495e',
  },
  headerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#34495e',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 4,
  },
  companyInfo: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
    color: '#2c3e50',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderInfoItem: {
    flexBasis: '45%',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableCell: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 11,
  },
  colIndex: { width: '5%', textAlign: 'center' },
  colProduct: { width: '45%' },
  colQty: { width: '15%', textAlign: 'right' },
  colUnitPrice: { width: '17.5%', textAlign: 'right' },
  colTotal: { width: '17.5%', textAlign: 'right' },
  totalSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  totalValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e67e22',
    marginLeft: 10,
  },
  paymentsSection: {
    marginTop: 12,
    fontSize: 11,
    color: '#2980b9',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#95a5a6',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#16a085',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
  },
});

// The actual invoice document component
const InvoiceDocument = ({ order }) => {
  const products = Array.isArray(order.products) ? order.products : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>INVOICE</Text>
          <Text style={styles.companyInfo}>InventoryPro Store</Text>
          <Text style={styles.companyInfo}>www.inventorypro.com</Text>
          <Text style={styles.companyInfo}>support@inventorypro.com | +91-999-000-9999</Text>
        </View>

        {/* Order and Customer Info */}
        <View style={[styles.section, styles.orderInfoRow]}>
          <View style={styles.orderInfoItem}>
            <Text style={styles.label}>Order Number</Text>
            <Text>{order.orderId || '-'}</Text>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.label}>Order Date</Text>
            <Text>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Customer</Text>
          <Text>
            {order.customer?.customerName || '-'} {order.customer?.customerMobile ? `(${order.customer.customerMobile})` : ''}
          </Text>
        </View>

        {/* Products Table */}
        <View style={[styles.section, styles.tableContainer]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colIndex]}>#</Text>
            <Text style={[styles.tableHeaderCell, styles.colProduct]}>Product</Text>
            <Text style={[styles.tableHeaderCell, styles.colQty]}>Quantity</Text>
            <Text style={[styles.tableHeaderCell, styles.colUnitPrice]}>Unit Price</Text>
            <Text style={[styles.tableHeaderCell, styles.colTotal]}>Total</Text>
          </View>

          {products.length > 0 ? (
            products.map((p, i) => (
              <View style={{ flexDirection: 'row' }} key={i}>
                <Text style={[styles.tableCell, styles.colIndex]}>{i + 1}</Text>
                <Text style={[styles.tableCell, styles.colProduct]}>{p.productName || '-'}</Text>
                <Text style={[styles.tableCell, styles.colQty]}>{p.quantity || 1}</Text>
                <Text style={[styles.tableCell, styles.colUnitPrice]}>
                  ₹{p.pricePerUnit?.toFixed(2) || '0.00'}
                </Text>
                <Text style={[styles.tableCell, styles.colTotal]}>
                  ₹{((p.pricePerUnit || 0) * (p.quantity || 1)).toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <View>
              <Text style={[styles.tableCell, { textAlign: 'center' }]}>No Products</Text>
            </View>
          )}
        </View>

        {/* Discount & Order Price */}
        <View style={styles.totalSection}>
          {order.discount && (
            <Text style={{ color: '#16a085', marginRight: 20 }}>
              Discount: {order.discount.discountName} ({order.discount.discountPercent}%)
            </Text>
          )}
          <Text style={styles.totalLabel}>Order Price:</Text>
          <Text style={styles.totalValue}>₹{parseInt(order.orderPrice)?.toFixed(2) || '0.00'}</Text>
        </View>

        {/* Payments Info */}
        {order.payments && order.payments.length > 0 && (
          <View style={styles.paymentsSection}>
            <Text>
              Payments:{' '}
              {order.payments
                .map(
                  (p) =>
                    `${p.paymentMethod || '-'}: ₹${p.amount?.toFixed(2) || '0.00'} (${p.status || '-'})`
                )
                .join(', ')}
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business! {'\n'}
          Invoice generated by InventoryPro
        </Text>
      </Page>
    </Document>
  );
};

// Wrapper component with PDF download button
const InvoiceGenerator = ({ order }) => {
  if (!order) return null;

  return (
    <PDFDownloadLink
      document={<InvoiceDocument order={order} />}
      fileName={`invoice_order_${order.orderId || 'unknown'}.pdf`}
      style={{
        textDecoration: 'none',
        padding: '6px 12px',
        backgroundColor: '#16a085',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 4,
        fontSize: 12,
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
      aria-label="Download Invoice PDF"
      title="Download Invoice PDF"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i> Preparing...
          </span>
        ) : (
          <>
            <i className="fas fa-file-invoice"></i> Invoice
          </>
        )
      }
    </PDFDownloadLink>
  );
};

export default InvoiceGenerator;
