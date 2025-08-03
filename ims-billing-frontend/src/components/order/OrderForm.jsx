import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

const OrderForm = ({ order, onSave, onCancel, viewMode = false }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [formData, setFormData] = useState({
    customerId: order?.customer?.customerId || '',
    orderPrice: order?.orderPrice || '',
    discountId: order?.discount?.discountId || '',
    productLines: order?.products
      ? order.products.map(p => ({
          productId: p.productId,
          quantity: p.quantity,
        }))
      : [{ productId: '', quantity: 1 }],
  });
  const [loadingSelects, setLoadingSelects] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAllSelections();
  }, []);

  const fetchAllSelections = async () => {
    setLoadingSelects(true);
    try {
      const [customerList, productList, discountList] = await Promise.all([
        apiService.getAllCustomers(),
        apiService.getAllProducts(),
        apiService.getAllDiscounts(),
      ]);
      setCustomers(Array.isArray(customerList) ? customerList : []);
      setProducts(Array.isArray(productList) ? productList : []);
      setDiscounts(Array.isArray(discountList) ? discountList : []);
    } finally {
      setLoadingSelects(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleLineChange = (idx, field, value) => {
    setFormData(prev => ({
      ...prev,
      productLines: prev.productLines.map((line, i) =>
        i === idx ? { ...line, [field]: value } : line
      ),
    }));
  };

  const handleAddLine = () => {
    setFormData(prev => ({
      ...prev,
      productLines: [...prev.productLines, { productId: '', quantity: 1 }],
    }));
  };

  const handleRemoveLine = (idx) => {
    setFormData(prev => ({
      ...prev,
      productLines: prev.productLines.filter((_, i) => i !== idx),
    }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.customerId) errs.customerId = 'Customer is required';
    if (!formData.orderPrice || Number(formData.orderPrice) <= 0) errs.orderPrice = 'Order price required';
    if (!formData.discountId) errs.discountId = 'Discount is required';
    if (!formData.productLines.length)
      errs.productLines = 'At least one product required';
    formData.productLines.forEach((line, idx) => {
      if (!line.productId) {
        errs[`productId_${idx}`] = 'Product required';
      }
      if (!line.quantity || parseInt(line.quantity) <= 0) {
        errs[`quantity_${idx}`] = 'Quantity > 0 required';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const submitData = {
        customer: { customerId: parseInt(formData.customerId) },
        orderPrice: Number(formData.orderPrice),
        discount: { discountId: parseInt(formData.discountId) },
        products: formData.productLines.map(line => ({
          productId: parseInt(line.productId),
          quantity: parseInt(line.quantity),
        })),
      };
      if (order?.orderId) {
        submitData.orderId = order.orderId;
        await apiService.updateOrder(order.orderId, submitData);
      } else {
        await apiService.addOrder(submitData);
      }
      onSave();
    } catch (error) {
      setErrors({ submit: 'Failed to save order.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (viewMode) {
    return (
      <div>
        <div><b>Customer:</b> {order?.customer?.customerName} (ID: {order?.customer?.customerId})</div>
        <div><b>Order Price:</b> ₹{order?.orderPrice}</div>
        <div>
          <b>Discount:</b> {order?.discount?.discountName} ({order?.discount?.discountPercent}%)
        </div>
        <div>
          <b>Products:</b>
          <ul>
            {order?.products?.map((p, i) => (
              <li key={i}>
                {p.productName} (x{p.quantity || 1}) {p.pricePerUnit ? `@ ₹${p.pricePerUnit}` : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-actions mt-3">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
      <div className="mb-3">
        <label className="form-label">Customer *</label>
        <select
          name="customerId"
          className={`form-select ${errors.customerId ? 'is-invalid' : ''}`}
          value={formData.customerId}
          onChange={handleChange}
          disabled={loadingSelects}
        >
          <option value="">Select customer</option>
          {customers.map(c => (
            <option key={c.customerId} value={c.customerId}>
              {c.customerName} ({c.customerMobile})
            </option>
          ))}
        </select>
        {errors.customerId && <div className="invalid-feedback">{errors.customerId}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Order Price *</label>
        <input
          type="number"
          className={`form-control ${errors.orderPrice ? 'is-invalid' : ''}`}
          name="orderPrice"
          value={formData.orderPrice}
          onChange={handleChange}
          min={1}
        />
        {errors.orderPrice && <div className="invalid-feedback">{errors.orderPrice}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Discount *</label>
        <select
          name="discountId"
          className={`form-select ${errors.discountId ? 'is-invalid' : ''}`}
          value={formData.discountId}
          onChange={handleChange}
          disabled={loadingSelects}
        >
          <option value="">Select discount</option>
          {discounts.map(d => (
            <option key={d.discountId} value={d.discountId}>
              {d.discountName} ({d.discountPercent}%)
            </option>
          ))}
        </select>
        {errors.discountId && <div className="invalid-feedback">{errors.discountId}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Order Products *</label>
        {formData.productLines.map((line, idx) => (
          <div className="row mb-2" key={idx}>
            <div className="col-md-8">
              <select
                className={`form-select ${errors[`productId_${idx}`] ? 'is-invalid' : ''}`}
                value={line.productId}
                onChange={e => handleLineChange(idx, 'productId', e.target.value)}
              >
                <option value="">Select product</option>
                {products.map(p => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName} - ₹{p.pricePerUnit}
                  </option>
                ))}
              </select>
              {errors[`productId_${idx}`] && (
                <div className="invalid-feedback">{errors[`productId_${idx}`]}</div>
              )}
            </div>
            <div className="col-md-3">
              <input
                type="number"
                min={1}
                className={`form-control ${errors[`quantity_${idx}`] ? 'is-invalid' : ''}`}
                placeholder="Qty"
                value={line.quantity}
                onChange={e => handleLineChange(idx, 'quantity', e.target.value)}
              />
              {errors[`quantity_${idx}`] && (
                <div className="invalid-feedback">{errors[`quantity_${idx}`]}</div>
              )}
            </div>
            <div className="col-md-1 d-flex align-items-center">
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveLine(idx)}
                disabled={formData.productLines.length === 1}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {errors.productLines && (
          <div className="text-danger">{errors.productLines}</div>
        )}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={handleAddLine}
        >
          <i className="fas fa-plus"></i> Add another product
        </button>
      </div>
      <div className="form-actions mt-3">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting || loadingSelects}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              {order ? 'Update Order' : 'Create Order'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
