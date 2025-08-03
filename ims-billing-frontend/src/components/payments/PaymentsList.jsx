import React, { useState, useEffect } from 'react';
import PaymentsForm from './PaymentsForm';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import './Payments.css';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Failed to fetch payments. Please try again.');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = () => {
    setEditingPayment(null);
    setShowModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowModal(true);
  };

  const handleViewPayment = (payment) => {
    setEditingPayment({ ...payment, viewMode: true });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPayment(null);
  };

  const handleSavePayment = async () => {
    await fetchPayments();
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { class: 'success', icon: 'check-circle' },
      'pending': { class: 'warning', icon: 'clock' },
      'failed': { class: 'danger', icon: 'times-circle' },
      'refunded': { class: 'info', icon: 'undo' },
      'cancelled': { class: 'secondary', icon: 'ban' }
    };
    
    const config = statusConfig[status?.toLowerCase()] || { class: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.class} payment-status`}>
        <i className={`fas fa-${config.icon} me-1`}></i>
        {status || 'Unknown'}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    const methodIcons = {
      'credit_card': 'credit-card',
      'debit_card': 'credit-card',
      'paypal': 'paypal',
      'bank_transfer': 'university',
      'cash': 'money-bill',
      'check': 'money-check'
    };
    
    return methodIcons[method?.toLowerCase()] || 'credit-card';
  };

  const columns = [
    {
      header: 'Payment ID',
      accessor: 'paymentId',
      width: '100px'
    },
    {
      header: 'Order ID',
      accessor: 'orderId',
      width: '100px'
    },
    {
      header: 'Amount',
      accessor: 'amount',
      width: '120px',
      render: (item) => (
        <span className="amount-cell">
          ${parseFloat(item.amount || 0).toFixed(2)}
        </span>
      )
    },
    {
      header: 'Payment Method',
      accessor: 'paymentMethod',
      width: '150px',
      render: (item) => (
        <div className="payment-method">
          <i className={`fab fa-${getPaymentMethodIcon(item.paymentMethod.paymentMethod)} me-2`}></i>
          {item.paymentMethod.paymentMethod?.replace(/_/g, ' ').toUpperCase() || 'N/A'}
        </div>
      )
    },
    {
      header: 'Payment Date',
      accessor: 'paymentDate',
      width: '130px',
      render: (item) => (
        item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : 'N/A'
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '120px',
      render: (item) => getStatusBadge(item.paymentStatus.paymentStatusName)
    }
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading payments..." />;
  }

  return (
    <div className="payments-container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments Management</h1>
          <p className="page-subtitle">Track and manage payment transactions</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddPayment}>
          <i className="fas fa-credit-card me-2"></i>
          Add New Payment
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
          data={payments}
          columns={columns}
          onEdit={handleEditPayment}
          onView={handleViewPayment}
          searchable={true}
          sortable={true}
          pagination={true}
          pageSize={10}
          maxVisibleRows={25}
        />
      </div>

      {showModal && (
        <Modal 
          title={editingPayment?.viewMode ? 'View Payment Details' : 
                 editingPayment ? 'Edit Payment' : 'Add New Payment'} 
          onClose={handleCloseModal}
          size="lg"
        >
          <PaymentsForm
            payment={editingPayment}
            onSave={handleSavePayment}
            onCancel={handleCloseModal}
            viewMode={editingPayment?.viewMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default PaymentsList;
