import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado
import { FilterInfo } from "./filter-info/filter-info";
import  { ResetButton}   from "./buttons/ResetButton";

function ImageComparison() {
  const [position, setPosition] = useState(50);
  const [beforeImage, setBeforeImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [filter, setFilter] = useState("none");

  const [filters, setFilters] = useState([]); // Armazena os filtros do Firestore
  const [description, setDescription] = useState(""); // Descrição do filtro selecionado

  const canvasRef = useRef(null); // Referência para o canvas

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

    // Atualiza o estado do filtro
    const selectedFilter = filters.find((f) => f.name === filterName);
    setFilter(selectedFilter ? selectedFilter.cssValue : "none");

    // Atualiza a descrição
    setDescription(selectedFilter ? selectedFilter.description : "");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Cria uma nova imagem para desenhar no canvas
    const image = new Image();
    image.src = beforeImage;

    image.onload = () => {
      // Define o tamanho do canvas
      canvas.width = image.width;
      canvas.height = image.height;

      // Aplica o filtro e desenha a imagem no canvas
      ctx.filter = filter;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      // Converte o canvas para uma URL de download
      const link = document.createElement("a");
      link.download = "imagem-com-filtro.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
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
          {filters.map((filter) => (
            <option key={filter.id} value={filter.name}>
              {filter.name}
            </option>
          ))}
        </select>
      </div>


<div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
  <button onClick={handleDownload} disabled={!beforeImage.startsWith("data:image/")}>
    Baixar Imagem com Filtro
  </button>
  <ResetButton
    setBeforeImage={setBeforeImage}
    setAfterImage={setAfterImage}
    setFilter={setFilter}
    setPosition={setPosition}
  />
</div>

      {/* Canvas oculto para processar a imagem */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

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

    
  <FilterInfo filters={filters} filter={filter} description={description}/>
  </div>

    </>
  );
}

export default ImageComparison;