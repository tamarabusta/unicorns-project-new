import { useState, useEffect } from "react";
import { useUnicorns } from "../context/UnicornContext";

const UnicornForm = () => {
  const {
    createUnicorn,
    updateUnicorn,
    unicorns,
    unicornToEdit,
    setUnicornToEdit,
  } = useUnicorns();

  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");
  const [poder, setPoder] = useState("");
  const [edad, setEdad] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (unicornToEdit) {
      setNombre(unicornToEdit.nombre);
      setColor(unicornToEdit.color);
      setPoder(unicornToEdit.poder);
      setEdad(unicornToEdit.edad);
      setEstado(unicornToEdit.estado || "");
    }
  }, [unicornToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUnicorn = { nombre, color, poder, edad, estado };

    if (unicornToEdit) {
      updateUnicorn(unicornToEdit.id, newUnicorn);
      setUnicornToEdit(null);
    } else {
      createUnicorn(newUnicorn);
    }

    // Resetear campos
    setNombre("");
    setColor("");
    setPoder("");
    setEdad("");
    setEstado("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <h3>{unicornToEdit ? "Editar Unicornio" : "Nuevo Unicornio"}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Poder"
        value={poder}
        onChange={(e) => setPoder(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Estado (ej: Activo/Inactivo)"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />

      <button type="submit" style={{
        marginTop: "1rem",
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        {unicornToEdit ? "Guardar cambios" : "Crear unicornio"}
      </button>
    </form>
  );
};

export default UnicornForm;
