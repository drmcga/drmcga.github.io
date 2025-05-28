import React, { useRef, useState } from "react";

export function ImageDropzone({ onFile }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFile(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        border: dragActive ? "2px solid #007bff" : "2px dashed #aaa",
        borderRadius: 8,
        padding: "2rem",
        textAlign: "center",
        background: dragActive ? "#f0f8ff" : "#fafafa",
        cursor: "pointer",
        minHeight: "23rem",
        transition: "border 0.2s, background 0.2s"
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <span style={{ color: "#555" }}>
        Arraste um arquivo para Upload ou <b>clique aqui</b>
      </span>
    </div>
  );
}