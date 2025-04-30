import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UnicornContext = createContext();

export const useUnicorns = () => useContext(UnicornContext);

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);

  const getUnicorns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/unicorns");
      setUnicorns(res.data);
    } catch (error) {
      console.error("Error al obtener unicornios:", error);
    }
  };

  const createUnicorn = async (newUnicorn) => {
    try {
      const res = await axios.post("http://localhost:3000/unicorns", newUnicorn);
      setUnicorns([...unicorns, res.data]);
    } catch (error) {
      console.error("Error al crear unicornio:", error);
    }
  };

  const deleteUnicorn = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/unicorns/${id}`);
      setUnicorns(unicorns.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error al eliminar unicornio:", error);
    }
  };

  const updateUnicorn = async (id, updatedUnicorn) => {
    try {
      const res = await axios.put(`http://localhost:3000/unicorns/${id}`, updatedUnicorn);
      setUnicorns(unicorns.map((u) => (u.id === id ? res.data : u)));
    } catch (error) {
      console.error("Error al actualizar unicornio:", error);
    }
  };

  useEffect(() => {
    getUnicorns();
  }, []);

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        getUnicorns,
        createUnicorn,
        deleteUnicorn,
        updateUnicorn,
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};
