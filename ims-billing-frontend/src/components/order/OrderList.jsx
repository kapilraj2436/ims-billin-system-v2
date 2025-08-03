import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import InvoiceGenerator from '../invoice/InvoiceGenerator';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowModal(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleViewOrder = (order) => {
    setEditingOrder({ ...order, viewMode: true });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleSaveOrder = async () => {
    await fetchOrders();
    handleCloseModal();
  };

  const columns = [
    {
      header: 'Order ID',
      accessor: 'orderId',
      width: '80px',
    },
    {
      header: 'Customer',
      accessor: 'customer',
      width: '150px',
      render: (order) =>
        order.customer
          ? `${order.customer.customerName} (ID: ${order.customer.customerId})`
          : 'N/A',
    },
    {
      header: 'Products',
      accessor: 'products',
      width: '240px',
      render: (order) =>
        Array.isArray(order.products)
          ? order.products
              .map(
                (p) =>
                  `${p.productName || ''} (x${p.quantity || 1}${
                    p.pricePerUnit ? ', ₹' + p.pricePerUnit.toFixed(2) : ''
                  })`
              )
              .join(', ')
          : 'N/A',
    },
    {
      header: 'Discount',
      accessor: 'discount',
      width: '120px',
      render: (order) =>
        order.discount
          ? `${order.discount.discountName} (${order.discount.discountPercent}%)`
          : 'No Discount',
    },
    {
      header: 'Order Price',
      accessor: 'orderPrice',
      width: '120px',
      render: (order) => `₹${parseInt(order.orderPrice)?.toFixed(2) || '0.00'}`,
    },
    {
      header: 'Payments',
      accessor: 'payments',
      width: '200px',
      render: (order) =>
        Array.isArray(order.payments) && order.payments.length
          ? order.payments
              .map(
                (p) =>
                  `${p.paymentMethod || '-'}: ₹${p.amount?.toFixed(2) || '0.00'} (${
                    p.status || '-'
                  })`
              )
              .join(', ')
          : 'No Payment',
    },
    {
      header: 'Invoice',
      accessor: 'invoice',
      width: '100px',
      render: (order) => <InvoiceGenerator order={order} />,
    },
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading orders..." />;
  }

  return (
    <div className="order-container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Order Management</h1>
          <p className="page-subtitle">Track and manage orders</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddOrder}>
          <i className="fas fa-plus me-2"></i>
          Add Order
        </button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      <div className="content-card">
        <DataTable
          data={orders}
          columns={columns}
          onEdit={handleEditOrder}
          onView={handleViewOrder}
          pagination={true}
          pageSize={15}
          maxVisibleRows={25}
          searchable
          sortable
        />
      </div>
      {showModal && (
        <Modal
          title={
            editingOrder?.viewMode
              ? 'Order Details'
              : editingOrder
              ? 'Edit Order'
              : 'Add New Order'
          }
          onClose={handleCloseModal}
          size="lg"
        >
          <OrderForm
            order={editingOrder}
            onSave={handleSaveOrder}
            onCancel={handleCloseModal}
            viewMode={editingOrder?.viewMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
