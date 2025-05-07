import React, { useState } from "react";

function ImageComparison() {
  const [position, setPosition] = useState(50);
  const [beforeImage, setBeforeImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
  );
  const [filter, setFilter] = useState("none");

  const intensity = 1.0

  const handleSliderChange = (e) => {
    setPosition(e.target.value);
  };

  const handleBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBeforeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div>cavalos</div>
      <div
        className="container"
        style={{ "--position": `${position}%` }}
      >
        <div className="image-container">
          <img
            className="image-before slider-image"
            src={beforeImage}
            alt="before"
            style={{filter}}
          />
          <img
            className="image-after slider-image"
            src={beforeImage}
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
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="none">Nenhum</option>
                <option value="grayscale(100%)">Preto e branco</option>
                <option value="sepia(100%)">Sépia</option>
                <option value="blur(5px)">Desfocar</option>
                <option value="contrast(200%)">Contraste</option>
                <option value="brightness(150%)">Mais brilho</option>
            </select>
        </div>
    </>
  );
}

export default ImageComparison;
