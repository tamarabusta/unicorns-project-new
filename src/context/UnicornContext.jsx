    import { createContext, useState, useEffect } from "react";

    export const UnicornContext = createContext();
    
    export const UnicornProvider = ({ children }) => {
      const [unicorns, setUnicorns] = useState([]);
    
      const API_URL = "https://crudcrud.com/api/fbf5161bc54e44fab29f97105d4d588b/unicorns"; // ⚠️ Cambiá TU-ENDPOINT por el tuyo
    
      const getUnicorns = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setUnicorns(data);
        } catch (error) {
          console.error("Error obteniendo unicornios:", error);
        }
      };
    
      const createUnicorn = async (unicorn) => {
        try {
          await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(unicorn),
          });
          getUnicorns();
        } catch (error) {
          console.error("Error creando unicornio:", error);
        }
      };
    
      const editUnicorn = async (id, updatedUnicorn) => {
        try {
          await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUnicorn),
          });
          getUnicorns();
        } catch (error) {
          console.error("Error editando unicornio:", error);
        }
      };
    
      const deleteUnicorn = async (id) => {
        try {
          await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });
          getUnicorns();
        } catch (error) {
          console.error("Error eliminando unicornio:", error);
        }
      };
    
      useEffect(() => {
        getUnicorns();
      }, []);
    
      return (
        <UnicornContext.Provider
          value={{ unicorns, getUnicorns, createUnicorn, editUnicorn, deleteUnicorn }}
        >
          {children}
        </UnicornContext.Provider>
      );
    };
    