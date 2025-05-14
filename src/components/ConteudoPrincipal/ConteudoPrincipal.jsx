import React from "react";

const ConteudoPrincipal = ({ abrirLogin }) => (
  <div className="hero-text-container">
    <section className="hero-text">
      <h1>
        <strong>Consulta com psicólogo</strong>
        <br />
        acessível na sua jornada de autoconhecimento
      </h1>
      <p>
        Oferecemos atendimento psicológico acessível, com flexibilidade e
        conforto, proporcionando a <strong>oportunidade de cuidar do seu bem-estar em um ambiente acolhedor e presencial</strong>.
      </p>
      <div className="hero-button-container">
        <button className="hero-button" onClick={abrirLogin}>
          Agende já sua consulta
        </button>
      </div>
    </section>
  </div>
);

export default ConteudoPrincipal;