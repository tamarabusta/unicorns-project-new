import { useUnicorns } from "../context/UnicornContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();

  const exportarPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(75, 0, 130);
    doc.text("🦄 Reporte Mágico de Unicornios 🦄", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Tabla
    const columnas = ["Nombre", "Color", "Poder", "Edad", "Estado"];
    const filas = unicorns.map((u) => [
      u.nombre,
      u.color,
      u.poder,
      u.edad,
      u.estado || "No definido",
    ]);

    doc.autoTable({
      startY: 30,
      head: [columnas],
      body: filas,
      theme: "striped",
      styles: {
        halign: "center",
        fontSize: 10,
        cellPadding: 6,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [123, 31, 162],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 235, 255],
      },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.3,
      margin: { top: 30 },
    });

    // Footer con nombre personalizado
    doc.setFontSize(10);
    doc.setTextColor(100);
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.text("Generado por Tamara Bustamante ✨ - Sistema de Unicornios", 14, pageHeight - 10);

    // Descargar PDF
    doc.save("reporte_unicornios_magicos.pdf");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#4e34b9", marginBottom: "1rem" }}>
        🦄 Panel de Control de Unicornios
      </h2>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={exportarPDF}
          style={{
            padding: "12px 30px",
            backgroundColor: "#4e34b9",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          📄 Exportar PDF
        </button>
      </div>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}>
        <thead style={{ backgroundColor: "#4e34b9", color: "white" }}>
          <tr>
            <th style={{ padding: "12px" }}>Nombre</th>
            <th style={{ padding: "12px" }}>Color</th>
            <th style={{ padding: "12px" }}>Poder</th>
            <th style={{ padding: "12px" }}>Edad</th>
            <th style={{ padding: "12px" }}>Estado</th>
            <th style={{ padding: "12px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {unicorns.map((u) => (
            <tr
              key={u.id}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#fdfbff",
              }}
            >
              <td style={{ padding: "10px" }}>{u.nombre}</td>
              <td style={{ padding: "10px" }}>{u.color}</td>
              <td style={{ padding: "10px" }}>{u.poder}</td>
              <td style={{ padding: "10px" }}>{u.edad}</td>
              <td style={{ padding: "10px" }}>{u.estado || "No definido"}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => deleteUnicorn(u.id)}
                  style={{
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnicornsView;
