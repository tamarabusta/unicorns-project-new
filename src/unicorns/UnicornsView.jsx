
import { motion } from 'framer-motion';
import UnicornForm from './UnicornForm';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import { UnicornContext } from '../context/UnicornContext';

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useContext(UnicornContext);

  return (
    <motion.div
      className="p-6"
      style={{ maxWidth: '900px', margin: '0 auto' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🦄 Gestión de Unicornios 🦄</h2>

      <UnicornForm />

      <DataTable value={unicorns} paginator rows={5} responsiveLayout="scroll">
        <Column field="name" header="Nombre"></Column>
        <Column field="color" header="Color"></Column>
        <Column field="age" header="Edad"></Column>
        <Column
          header="Acciones"
          body={(rowData) => (
            <div style={{ textAlign: 'center' }}>
              <Button
                label="Eliminar"
                className="p-button-danger p-button-sm"
                onClick={() => deleteUnicorn(rowData._id)}
              />
            </div>
          )}
        />
      </DataTable>
    </motion.div>
  );
};

export default UnicornsView;
