import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import Modal from '../../common/Modal';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import './Product.css';
import LoadingSpinner from '../../common/LoadingSpinner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleViewProduct = (product) => {
    // For now, just show edit modal in view mode
    setEditingProduct({ ...product, viewMode: true });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async () => {
    await fetchProducts();
    handleCloseModal();
  };

  const columns = [
    {
      header: 'Product ID',
      accessor: 'productId',
      width: '100px'
    },
    {
      header: 'Product Name',
      accessor: 'productName',
      width: '200px'
    },
    {
      header: 'Description',
      accessor: 'productDescription',
      width: '250px',
      render: (item) => (
        <div className="description-cell" title={item.productDescription}>
          {item.productDescription?.substring(0, 100)}
          {item.productDescription?.length > 100 && '...'}
        </div>
      )
    },
    {
      header: 'Price per Unit',
      accessor: 'pricePerUnit',
      width: '120px',
      render: (item) => (
        <span className="price-cell">
          ${parseFloat(item.pricePerUnit || 0).toFixed(2)}
        </span>
      )
    },
    {
      header: 'Available Qty',
      accessor: 'availableQuantity',
      width: '120px',
      render: (item) => (
        <span className={`quantity-badge ${item.availableQuantity < 10 ? 'low-stock' : 'in-stock'}`}>
          {item.availableQuantity || 0}
        </span>
      )
    },
    {
      header: 'Order Qty',
      accessor: 'orderQuantity',
      width: '100px'
    }
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading products..." />;
  }

  return (
    <div className="product-container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Products Management</h1>
          <p className="page-subtitle">Manage your product inventory and details</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          <i className="fas fa-plus me-2"></i>
          Add New Product
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
          data={products}
          columns={columns}
          onEdit={handleEditProduct}
          onView={handleViewProduct}
          searchable={true}
          sortable={true}
          pagination={true}
          pageSize={10}
          maxVisibleRows={25}
        />
      </div>

      {showModal && (
        <Modal 
          title={editingProduct?.viewMode ? 'View Product Details' : 
                 editingProduct ? 'Edit Product' : 'Add New Product'} 
          onClose={handleCloseModal}
          size="lg"
        >
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCloseModal}
            viewMode={editingProduct?.viewMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
