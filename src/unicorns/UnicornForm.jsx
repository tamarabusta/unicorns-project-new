
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { UnicornContext } from '../context/UnicornContext';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const UnicornForm = () => {
  const { createUnicorn } = useContext(UnicornContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      color: '',
      age: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      color: Yup.string().required('El color es obligatorio'),
      age: Yup.number()
        .required('La edad es obligatoria')
        .positive('La edad debe ser mayor a 0')
        .integer('La edad debe ser un número entero')
    }),
    onSubmit: (values, { resetForm }) => {
      createUnicorn(values);
      resetForm();
    },
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
          placeholder="Ej: Sparkle"
          className={formik.touched.name && formik.errors.name ? 'p-invalid' : ''}
        />
        {formik.touched.name && formik.errors.name ? (
          <small className="p-error">{formik.errors.name}</small>
        ) : null}
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label>Color</label>
        <InputText
          id="color"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ej: Arcoíris"
          className={formik.touched.color && formik.errors.color ? 'p-invalid' : ''}
        />
        {formik.touched.color && formik.errors.color ? (
          <small className="p-error">{formik.errors.color}</small>
        ) : null}
      </div>

      <div className="p-field p-col-12 p-md-4">
        <label>Edad</label>
        <InputText
          id="age"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Ej: 7"
          className={formik.touched.age && formik.errors.age ? 'p-invalid' : ''}
        />
        {formik.touched.age && formik.errors.age ? (
          <small className="p-error">{formik.errors.age}</small>
        ) : null}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button type="submit" label="Crear Unicornio" className="p-button-success" />
      </div>
    </form>
  );
};

export default UnicornForm;
