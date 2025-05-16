import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Importa o Firestore configurado
import { ResetButton } from "./buttons/ResetButton";
import ImageFrame from "./ImageFrame";
import { FilterDetails } from "./filter-info/FilterDetails";

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

  const handleBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result;
        setBeforeImage(uploadedImage);
        setAfterImage(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (e) => {
    const filterName = e.target.value;
    const selectedFilter = filters.find((f) => f.name === filterName);
    setFilter(selectedFilter ? selectedFilter.cssValue : "none");
    setDescription(
      selectedFilter
        ? selectedFilter.description
        : "Nenhuma descrição disponível."
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

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <FilterDetails filters={filters} filter={filter} description={description} />
    </>
  );
}

export default ImageComparison;