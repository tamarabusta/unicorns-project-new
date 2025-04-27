import { useState, useEffect } from "react";
import UnicornsView from "./UnicornsView";

const API_URL = "https://crudcrud.com/api/fbf5161bc54e44fab29f97105d4d588b/unicorns"; // Reemplazá TU-API-ENDPOINT por el tuyo

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [newUnicorn, setNewUnicorn] = useState({ name: "", color: "", age: "" });

  useEffect(() => {
    fetchUnicorns();
  }, []);

  const fetchUnicorns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUnicorns(data);
    } catch (error) {
      console.error("Error al traer unicornios:", error);
    }
  };

  const createUnicorn = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUnicorn),
      });
      setNewUnicorn({ name: "", color: "", age: "" });
      fetchUnicorns();
    } catch (error) {
      console.error("Error al crear unicornio:", error);
    }
  };

  const deleteUnicorn = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchUnicorns();
    } catch (error) {
      console.error("Error al borrar unicornio:", error);
    }
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      newUnicorn={newUnicorn}
      setNewUnicorn={setNewUnicorn}
      createUnicorn={createUnicorn}
      deleteUnicorn={deleteUnicorn}
    />
  );
};

export default UnicornsContainer;
