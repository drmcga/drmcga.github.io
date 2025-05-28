import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado
import { ResetButton } from "./buttons/ResetButton";
import ImageFrame from "./ImageFrame";
import { FilterDetails } from "./filter-info/FilterDetails";
import { ImageDropzone } from "./buttons/ImageDropzone";


function ImageComparison() {
  const [position, setPosition] = useState(50);
  const [beforeImage, setBeforeImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [filter, setFilter] = useState("none");
  const [filters, setFilters] = useState([]);
  const [description, setDescription] = useState("");

  const [selectedFilterName, setSelectedFilterName] = useState("none");

  const canvasRef = useRef(null);

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



  const handleFilterChange = (e) => {
  const filterName = e.target.value;
  setSelectedFilterName(filterName);

  if (filterName === "none") {
    setFilter("none");
    setDescription("Nenhuma descrição disponível.");
  } else {
    const selectedFilter = filters.find((f) => f.name === filterName);
    setFilter(selectedFilter ? selectedFilter.cssValue : "none");
    setDescription(selectedFilter ? selectedFilter.description : "Nenhuma descrição disponível.");
  }
};

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = beforeImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.filter = filter;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const link = document.createElement("a");
      link.download = "imagem-com-filtro.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

return (
  <>
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      {/* Quadro de imagem */}
      <div>
        <ImageFrame
          beforeImage={beforeImage}
          afterImage={afterImage}
          filter={filter}
          position={position}
          handleSliderChange={handleSliderChange}
        />
      </div>

      {/* Controles */}
      <div style={{ minWidth: 320, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ImageDropzone onFile={(file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const uploadedImage = reader.result;
              setBeforeImage(uploadedImage);
              setAfterImage(uploadedImage);
            };
            reader.readAsDataURL(file);
          }} />
          <div>
            <label>Escolher filtro: </label>
            <select value={selectedFilterName} onChange={handleFilterChange}>
              <option value="none">Nenhum</option>
              {filters.map((filter) => (
                <option key={filter.id} value={filter.name}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
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
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
    {/* Agora o FilterDetails fica embaixo dos dois blocos */}
    <FilterDetails filters={filters} filter={filter} description={description} />
  </>
);
}

export default ImageComparison;