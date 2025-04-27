import { motion } from 'framer-motion';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { initialProducts } from './productsData';
import ProductForm from './ProductForm';

const ProductsView = () => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  return (
    <motion.div
      className="p-6"
      style={{ maxWidth: '900px', margin: '0 auto' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🛒 Gestión de Productos 🛒</h2>

      <ProductForm addProduct={addProduct} />

      <DataTable value={products} paginator rows={5} responsiveLayout="scroll">
        <Column field="name" header="Nombre"></Column>
        <Column field="price" header="Precio ($)"></Column>
        <Column field="category" header="Categoría"></Column>
      </DataTable>
    </motion.div>
  );
};

export default ProductsView;

