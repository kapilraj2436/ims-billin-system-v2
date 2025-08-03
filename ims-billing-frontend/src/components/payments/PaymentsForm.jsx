import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';

const PaymentsForm = ({ payment, onSave, onCancel, viewMode = false }) => {
  const [formData, setFormData] = useState({
    orderId: payment?.orderId || '',
    amount: payment?.amount || '',
    paymentMethod: payment?.paymentMethod || '',
    paymentDate: payment?.paymentDate ? payment.paymentDate.split('T')[0] : '',
    paymentStatus: payment?.paymentStatus || '',
    transactionId: payment?.transactionId || ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentStatuses, setPaymentStatuses] = useState([]);

  useEffect(() => {
    fetchPaymentStatus();
    fetchPaymentMethods();
  }, []);

  const fetchPaymentStatus = async () => {
    try {
      setLoading(true);
      const paymentStatus = await apiService.getAllPaymentStatus();
      setPaymentStatuses(Array.isArray(paymentStatus) ? paymentStatus : []);
    } catch (error) {
      console.error('Error fetching payment Status:', error);
      setPaymentStatuses([]);
      setErrors({ paymentStatus: 'Failed to load paymentStatus. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const paymentMethod = await apiService.getAllPaymentMethods();
      setPaymentMethods(Array.isArray(paymentMethod) ? paymentMethod : []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setPaymentMethods([]);
      setErrors({ paymentMethod: 'Failed to load paymentMethod. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orderId.trim()) {
      newErrors.orderId = 'Order ID is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (!formData.paymentDate) {
      newErrors.paymentDate = 'Payment date is required';
    } else if (new Date(formData.paymentDate) > new Date()) {
      newErrors.paymentDate = 'Payment date cannot be in the future';
    }

    if (!formData.paymentStatus) {
      newErrors.paymentStatus = 'Payment status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount),
        orderId: parseInt(formData.orderId)
      };

      if (payment && !viewMode) {
        await apiService.updatePayment(payment.paymentId, submitData);
      } else if (!viewMode) {
        await apiService.addPayment(submitData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving payment:', error);
      setErrors({ submit: 'Failed to save payment. Please try again.' });
    } finally {
      setLoading(false);
    }
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
      <span className={`badge bg-${config.class} payment-status-large`}>
        <i className={`fas fa-${config.icon} me-2`}></i>
        {status || 'Unknown'}
      </span>
    );
  };

  if (viewMode) {
    return (
      <div className="payment-view">
        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Payment ID</label>
              <div className="view-value">{payment?.paymentId || 'N/A'}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>Order ID</label>
              <div className="view-value">{payment?.orderId || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Amount</label>
              <div className="view-value amount-large">
                ${parseFloat(payment?.amount || 0).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>Payment Method</label>
              <div className="view-value">
                {payment?.paymentMethod.paymentMethod?.replace(/_/g, ' ').toUpperCase() || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Payment Date</label>
              <div className="view-value">
                {payment?.paymentDate ? 
                  new Date(payment.paymentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'
                }
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>Status</label>
              <div className="view-value">
                {getStatusBadge(payment?.paymentStatus.paymentStatusName)}
              </div>
            </div>
          </div>
        </div>


        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.submit}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="orderId" className="form-label">
              Order ID <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.orderId ? 'is-invalid' : ''}`}
              id="orderId"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              placeholder="Enter order ID"
            />
            {errors.orderId && (
              <div className="invalid-feedback">{errors.orderId}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
              {errors.amount && (
                <div className="invalid-feedback">{errors.amount}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method <span className="text-danger">*</span>
            </label>
            {/* Payment Method Dropdown */}
            <select
              className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Select payment method</option>
              {paymentMethods.map(method => (
                <option key={method.paymentMethodId} value={method.paymentMethodId}>
                  {method.paymentMethod}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <div className="invalid-feedback">{errors.paymentMethod}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="paymentStatus" className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select ${errors.status ? 'is-invalid' : ''}`}
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus.paymentStatus}
              onChange={handleChange}
            >
              {paymentStatuses.map(status => (
                <option key={status.paymentStatusId} value={status.paymentStatusId}>
                  {status.paymentStatusName}
                </option>
              ))}
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="paymentDate" className="form-label">
          Payment Date <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          className={`form-control ${errors.paymentDate ? 'is-invalid' : ''}`}
          id="paymentDate"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.paymentDate && (
          <div className="invalid-feedback">{errors.paymentDate}</div>
        )}
      </div>
      <div className="mb-3">
  <label htmlFor="transactionId" className="form-label">
    Transaction ID <span className="text-danger">*</span>
  </label>
  <input
    type="text"
    className={`form-control ${errors.transactionId ? 'is-invalid' : ''}`}
    id="transactionId"
    name="transactionId"
    value={formData.transactionId}
    onChange={handleChange}
    placeholder="Enter transaction ID"
  />
  {errors.transactionId && (
    <div className="invalid-feedback">{errors.transactionId}</div>
  )}
</div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              {payment ? 'Update Payment' : 'Create Payment'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentsForm;
