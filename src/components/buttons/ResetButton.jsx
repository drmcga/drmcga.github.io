import React from "react";

export const ResetButton = ({ setBeforeImage, setAfterImage, setFilter, setPosition }) => {
  const handleReset = () => {
    // Reseta os estados para os valores iniciais
    setBeforeImage(
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
    );
    setAfterImage(
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
    );
    setFilter("none");
    setPosition(50);
  };

  return (
    <button onClick={handleReset} style={{ marginLeft: "1rem" }}>
      Resetar
    </button>
  );
};