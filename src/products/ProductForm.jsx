import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ProductForm = ({ addProduct }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      price: Yup.number()
        .required('El precio es obligatorio')
        .positive('El precio debe ser mayor a 0'),
      category: Yup.string().required('La categoría es obligatoria')
    }),
    onSubmit: (values, { resetForm }) => {
      addProduct(values);
      resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-fluid p-formgrid p-grid" style={{ marginBottom: '2rem' }}>
      <div className="p-field p-col-12 p-md-4">
        <label>Nombre</label>
        <InputText
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ej: Pelota mágica"
          className={formik.touched.name && formik.errors.name ? 'p-invalid' : ''}
        />
        {formik.touched.name && formik.errors.name && (
          <small className="p-error">{formik.errors.name}</small>
        )}
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label>Precio</label>
        <InputText
          id="price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ej: 150"
          className={formik.touched.price && formik.errors.price ? 'p-invalid' : ''}
        />
        {formik.touched.price && formik.errors.price && (
          <small className="p-error">{formik.errors.price}</small>
        )}
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label>Categoría</label>
        <InputText
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ej: Juguetes"
          className={formik.touched.category && formik.errors.category ? 'p-invalid' : ''}
        />
        {formik.touched.category && formik.errors.category && (
          <small className="p-error">{formik.errors.category}</small>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button type="submit" label="Agregar Producto" className="p-button-success" />
      </div>
    </form>
  );
};

export default ProductForm;
