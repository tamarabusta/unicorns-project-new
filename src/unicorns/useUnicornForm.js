import { useState, useContext } from "react";
import { UnicornContext } from "../context/UnicornContext";

export const useUnicornForm = () => {
  const { createUnicorn } = useContext(UnicornContext);
  const [newUnicorn, setNewUnicorn] = useState({
    name: '',
    color: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUnicorn({ ...newUnicorn, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUnicorn.name || !newUnicorn.color || !newUnicorn.age) {
      alert("Por favor completá todos los campos.");
      return;
    }
    createUnicorn(newUnicorn);
    setNewUnicorn({ name: '', color: '', age: '' });
  };

  return {
    newUnicorn,
    handleChange,
    handleSubmit,
  };
};
