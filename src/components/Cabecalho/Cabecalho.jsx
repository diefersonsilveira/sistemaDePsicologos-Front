import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Cabecalho = ({ abrirLogin }) => (
  <header className="hero-header">
    <div className="hero-logo-container">
      <img src={logo} alt="Logo da clínica" className="hero-logo" />
    </div>
    <div className="hero-buttons">
      <Link to="/contato" className="top-button">
        Contato
      </Link>
      <button className="top-button" onClick={abrirLogin}>
        Agendar
      </button>
    </div>
  </header>
);

export default Cabecalho;