import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado
import { ResetButton } from "./buttons/ResetButton";
import ImageFrame from "./ImageFrame";
import { FilterDetails } from "./filter-info/FilterDetails";
import { ImageDropzone } from "./buttons/ImageDropzone";

import { handleFilterChangeHelper, handleIntensityChangeHelper } from "./filter-info/filterUtils";



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
  const [intensity, setIntensity] = useState(100);
  
  const [description, setDescription] = useState("");

  const [selectedFilterName, setSelectedFilterName] = useState("none");

  const selectedFilter = filters.find(f => f.name === selectedFilterName);

const [exampleImage, setExampleImage] = useState(null);

  const min = selectedFilter?.min ?? 0;
  const max = selectedFilter?.max ?? 100;
  const step = selectedFilter?.step ?? 1;
  const unit = selectedFilter?.unit ?? "%";


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

  const handleIntensityChange = (e) => {
  handleIntensityChangeHelper(
    Number(e.target.value),
    selectedFilterName,
    filters,
    setFilter,
    setIntensity
  );
};


  const handleFilterChange = (e) => {
  handleFilterChangeHelper(
    e.target.value,
    filters,
    setSelectedFilterName,
    setFilter,
    setDescription,
    setIntensity,
    setExampleImage // <-- adicione aqui!

  );
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
          {selectedFilterName !== "none" && selectedFilter && (
            <div>
              <label>
                Intensidade: {intensity}{unit}
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={intensity}
                  onChange={handleIntensityChange}
                  style={{ width: "100%" }}
                />
              </label>
            </div>
          )}
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
    <FilterDetails
  filters={filters}
  filter={filter}
  description={description}
  exampleImage={exampleImage}
/>

    </>
);
}

export default ImageComparison;