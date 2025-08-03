import React, { useState } from 'react';
import apiService from '../../services/api';

const ProductForm = ({ product, onSave, onCancel, viewMode = false }) => {
  const [formData, setFormData] = useState({
    productName: product?.productName || '',
    productDescription: product?.productDescription || '',
    pricePerUnit: product?.pricePerUnit || '',
    availableQuantity: product?.availableQuantity || '',
    orderQuantity: product?.orderQuantity || '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.pricePerUnit || parseFloat(formData.pricePerUnit) <= 0) {
      newErrors.pricePerUnit = 'Valid price per unit is required';
    }

    if (!formData.availableQuantity || parseInt(formData.availableQuantity) < 0) {
      newErrors.availableQuantity = 'Available quantity must be 0 or greater';
    }

    if (formData.orderQuantity && parseInt(formData.orderQuantity) < 0) {
      newErrors.orderQuantity = 'Order quantity must be 0 or greater';
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
        pricePerUnit: parseFloat(formData.pricePerUnit),
        availableQuantity: parseInt(formData.availableQuantity),
        orderQuantity: parseInt(formData.orderQuantity) || 0,
      };

      if (product && !viewMode) {
        await apiService.updateProduct(product.productId, submitData);
      } else if (!viewMode) {
        await apiService.addProduct(submitData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ submit: 'Failed to save product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (viewMode) {
    return (
      <div className="product-view">
        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Product Name</label>
              <div className="view-value">{product?.productName || 'N/A'}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>Product ID</label>
              <div className="view-value">{product?.productId || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="view-field">
          <label>Description</label>
          <div className="view-value">{product?.productDescription || 'No description available'}</div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="view-field">
              <label>Price per Unit</label>
              <div className="view-value price">
                ${parseFloat(product?.pricePerUnit || 0).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view-field">
              <label>Available Quantity</label>
              <div className={`view-value quantity ${product?.availableQuantity < 10 ? 'low-stock' : ''}`}>
                {product?.availableQuantity || 0}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view-field">
              <label>Order Quantity</label>
              <div className="view-value">{product?.orderQuantity || 0}</div>
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
    <form onSubmit={handleSubmit} className="product-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.submit}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <div className="invalid-feedback">{errors.productName}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="pricePerUnit" className="form-label">
              Price per Unit <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className={`form-control ${errors.pricePerUnit ? 'is-invalid' : ''}`}
                id="pricePerUnit"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
              />
              {errors.pricePerUnit && (
                <div className="invalid-feedback">{errors.pricePerUnit}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">
          Product Description
        </label>
        <textarea
          className="form-control"
          id="productDescription"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          rows="4"
          placeholder="Enter product description (optional)"
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="availableQuantity" className="form-label">
              Available Quantity <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.availableQuantity ? 'is-invalid' : ''}`}
              id="availableQuantity"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
            {errors.availableQuantity && (
              <div className="invalid-feedback">{errors.availableQuantity}</div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="orderQuantity" className="form-label">
              Order Quantity
            </label>
            <input
              type="number"
              className={`form-control ${errors.orderQuantity ? 'is-invalid' : ''}`}
              id="orderQuantity"
              name="orderQuantity"
              value={formData.orderQuantity}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
            {errors.orderQuantity && (
              <div className="invalid-feedback">{errors.orderQuantity}</div>
            )}
          </div>
        </div>
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
              {product ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
