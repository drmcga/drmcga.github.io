import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado

function ImageComparison() {
  const [position, setPosition] = useState(50);
  const [beforeImage, setBeforeImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [filter, setFilter] = useState("none");

  // Novos estados
  const [filters, setFilters] = useState([]); // Armazena os filtros do Firestore
  const [description, setDescription] = useState(""); // Descrição do filtro selecionado

  // Função para buscar os filtros do Firestore
  useEffect(() => {
    const fetchFilters = async () => {
      const filtersCollection = collection(db, "filters");
      const filtersSnapshot = await getDocs(filtersCollection);
      const filtersList = filtersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilters(filtersList);
    };

    fetchFilters();
  }, []);

  const handleSliderChange = (e) => {
    setPosition(e.target.value);
  };

  const handleBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result;
        setBeforeImage(uploadedImage);
        setAfterImage(uploadedImage); // Atualiza o lado direito também
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (e) => {
    const filterName = e.target.value;
    setFilter(filterName);

    const selectedFilter = filters.find((f) => f.name === filterName);
    setDescription(selectedFilter ? selectedFilter.description : "");

    // Atualiza o valor do filtro CSS
    setFilter(selectedFilter ? selectedFilter.cssValue : "none");
  };

  return (
    <>
      <div className="container" style={{ "--position": `${position}%` }}>
        <div className="image-container">
          <img
            className="image-before slider-image"
            src={beforeImage}
            alt="before"
            style={{ filter }}
          />
          <img
            className="image-after slider-image"
            src={afterImage}
            alt="after"
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleSliderChange}
          aria-label="Percentage of before photo shown"
          className="slider"
        />
        <div className="slider-line" aria-hidden="true"></div>
        <div className="slider-button" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="128"
              y1="40"
              x2="128"
              y2="216"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <line
              x1="96"
              y1="128"
              x2="16"
              y2="128"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="48 160 16 128 48 96"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
            <line
              x1="160"
              y1="128"
              x2="240"
              y2="128"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
            <polyline
              points="208 96 240 128 208 160"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
          </svg>
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <div>
          <label>Inserir uma imagem: </label>
          <input type="file" accept="image/*" onChange={handleBeforeUpload} />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Escolher filtro: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="none">Nenhum</option>
          {filters.map((filter) => (
            <option key={filter.id} value={filter.name}>
              {filter.name}
            </option>
          ))}
        </select>
      </div>

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
    {filter !== "none" && (
      <>
        <div>
          <h2>Filtro: {filters.find((f) => f.cssValue === filter)?.name || "Nenhum"}</h2>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        {filters.find((f) => f.cssValue === filter)?.example_image && (
          <img
            src={filters.find((f) => f.cssValue === filter).example_image}
            alt={`Exemplo do filtro ${filters.find((f) => f.cssValue === filter)?.name}`}
            style={{ maxWidth: "80%", borderRadius: "8px", minWidth: "400px" }}
          />
        )}
      </>
    )}
  </div>

    </>
  );
}

export default ImageComparison;