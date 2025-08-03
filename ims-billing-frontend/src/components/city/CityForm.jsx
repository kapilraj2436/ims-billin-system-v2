import React, { useState } from 'react';
import apiService from '../../services/api';

const CityForm = ({ city, onSave, onCancel, viewMode = false }) => {
  const [formData, setFormData] = useState({
    cityName: city?.cityName || '',
    cityPinCode: city?.cityPinCode || '',
    cityDescription: city?.cityDescription || '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!formData.cityName.trim()) {
      newErrors.cityName = 'City name is required';
    }

    if (!formData.cityPinCode.trim()) {
      newErrors.cityPinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.cityPinCode)) {
      newErrors.cityPinCode = 'PIN code must be exactly 6 digits';
    }

    if (!formData.cityDescription.trim()) {
      newErrors.cityDescription = 'City description is required';
    } else if (formData.cityDescription.length < 10) {
      newErrors.cityDescription = 'Description should be at least 10 characters long';
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
        cityName: formData.cityName.trim(),
        cityPinCode: formData.cityPinCode.trim(),
        cityDescription: formData.cityDescription.trim(),
      };

      if (city && !viewMode) {
        // Include cityId for update
        submitData.cityId = city.cityId;
        await apiService.updateCity(city.cityId, submitData);
      } else if (!viewMode) {
        await apiService.addCity(submitData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving city:', error);
      setErrors({ submit: 'Failed to save city. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (viewMode) {
    return (
      <div className="city-view">
        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>City ID</label>
              <div className="view-value city-id">{city?.cityId || 'N/A'}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>PIN Code</label>
              <div className="view-value pin-code-display">
                <i className="fas fa-map-pin me-2"></i>
                {city?.cityPinCode || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="view-field">
          <label>City Name</label>
          <div className="view-value city-name-large">
            <i className="fas fa-city me-2"></i>
            {city?.cityName || 'N/A'}
          </div>
        </div>

        <div className="view-field">
          <label>City Description</label>
          <div className="view-value city-description-full">
            <i className="fas fa-info-circle me-2"></i>
            {city?.cityDescription || 'No description available'}
          </div>
        </div>

        <div className="view-field">
          <label>Complete Information</label>
          <div className="view-value city-summary">
            <div className="summary-card">
              <div className="summary-header">
                <i className="fas fa-location-dot me-2"></i>
                <strong>{city?.cityName}</strong>
              </div>
              <div className="summary-body">
                <div className="summary-item">
                  <span className="label">PIN Code:</span>
                  <span className="value">{city?.cityPinCode}</span>
                </div>
                <div className="summary-description">
                  {city?.cityDescription}
                </div>
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
    <form onSubmit={handleSubmit} className="city-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.submit}
        </div>
      )}

      <div className="form-section">
        <h5 className="section-title">
          <i className="fas fa-city me-2"></i>
          City Information
        </h5>

        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="cityName" className="form-label">
                City Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.cityName ? 'is-invalid' : ''}`}
                id="cityName"
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                placeholder="Enter city name"
              />
              {errors.cityName && (
                <div className="invalid-feedback">{errors.cityName}</div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="cityPinCode" className="form-label">
                PIN Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.cityPinCode ? 'is-invalid' : ''}`}
                id="cityPinCode"
                name="cityPinCode"
                value={formData.cityPinCode}
                onChange={handleChange}
                placeholder="Enter PIN code"
                maxLength="6"
              />
              {errors.cityPinCode && (
                <div className="invalid-feedback">{errors.cityPinCode}</div>
              )}
              <div className="form-text">
                6-digit Indian postal code
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="cityDescription" className="form-label">
            City Description <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${errors.cityDescription ? 'is-invalid' : ''}`}
            id="cityDescription"
            name="cityDescription"
            value={formData.cityDescription}
            onChange={handleChange}
            rows="3"
            placeholder="Enter a brief description of the city"
          />
          {errors.cityDescription && (
            <div className="invalid-feedback">{errors.cityDescription}</div>
          )}
          <div className="form-text">
            Provide information about the city (minimum 10 characters)
          </div>
        </div>

        {/* Preview Section */}
        {(formData.cityName || formData.cityPinCode) && (
          <div className="preview-section">
            <h6 className="preview-title">
              <i className="fas fa-eye me-2"></i>
              Preview
            </h6>
            <div className="preview-card">
              <div className="preview-header">
                <i className="fas fa-city me-2"></i>
                <strong>{formData.cityName || 'City Name'}</strong>
              </div>
              <div className="preview-body">
                <div className="preview-item">
                  <span className="label">PIN Code:</span>
                  <span className="value">{formData.cityPinCode || 'XXXXXX'}</span>
                </div>
                {formData.cityDescription && (
                  <div className="preview-description">
                    {formData.cityDescription}
                  </div>
                )}
              </div>
            </div>
          </div>
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
              {city ? 'Update City' : 'Create City'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CityForm;
