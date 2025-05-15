import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado
import { FilterInfo } from "./filter-info/filter-info";
import  { ResetButton}   from "./buttons/ResetButton";
import ImageFrame from "./ImageFrame";

function ImageComparison() {
  const [position, setPosition] = useState(50);

  
  const [beforeImage, setBeforeImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );


  const [filter, setFilter] = useState("none"); // Filtro CSS aplicado à imagem
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

  // Função para lidar com a mudança de filtro
  // Atualiza o estado do filtro e a descrição correspondente
  const handleFilterChange = (e) => {
    const filterName = e.target.value;

    // Atualiza o estado do filtro
    const selectedFilter = filters.find((f) => f.name === filterName);
    setFilter(selectedFilter ? selectedFilter.cssValue : "none");

    // Atualiza a descrição
    setDescription(selectedFilter ? selectedFilter.description : "");
  };

  // Função para baixar a imagem com o filtro aplicado
  // Cria um canvas, aplica o filtro e gera um link de download
  // O canvas é usado para processar a imagem antes de baixá-la
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
    <ImageFrame
  beforeImage={beforeImage}
  afterImage={afterImage}
  filter={filter}
  position={position}
  handleSliderChange={handleSliderChange}
/>

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