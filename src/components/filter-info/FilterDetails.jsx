import React from "react";

export const FilterDetails = ({ filters, filter, description, exampleImage }) => {
    if (filter === "none") return <></>; // Não exibe nada se nenhum filtro estiver selecionado

  const selectedFilter = filters.find((f) => f.cssValue === filter);

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr", // Duas colunas: 50% cada
        gap: "1rem", // Espaço entre os elementos
        alignItems: "center", // Centraliza verticalmente
      }}
    >
      <div>
        <h3>Filtro Selecionado</h3>
        <p>
          <strong>Nome:</strong> {selectedFilter?.name || "Nenhum"}
        </p>
        <div>
          <strong>Descrição:</strong>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ marginTop: "0.5rem" }}
          />
        </div>
      </div>
    {exampleImage && (
      <img
        src={exampleImage}
        alt={`Exemplo do filtro ${selectedFilter?.name}`}
        style={{ maxWidth: "80%", borderRadius: "8px", minWidth: "400px" }}
      />
    )}
    </div>
  );
};