import React from "react";
import imagemTerapia from "../../assets/terapia1.png";

const ImagemTerapia = () => (
  <div className="hero-image-container">
    <div className="hero-image">
      <img
        src={imagemTerapia}
        alt="Ilustração de profissional"
      />
    </div>
  </div>
);

export default ImagemTerapia;