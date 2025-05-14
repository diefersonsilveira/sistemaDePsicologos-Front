import React from "react";
import {
  FaBrain,
  FaStopwatch,
  FaUserFriends,
  FaHeart
} from "react-icons/fa";

import "./Diferenciais.css";

function Diferenciais({ setShowLoginModal }) {
  return (
    <section className="diferenciais-container">
      <div className="diferenciais-conteudo">
        <div className="diferenciais-texto">
          <h4 className="diferenciais-subtitulo">Nossos diferenciais</h4>
          <h2 className="diferenciais-titulo">
            Por que escolher a <span>Psicoterapia pra Você?</span>
          </h2>
          <ul className="diferenciais-lista">
            <li><FaBrain className="icone" /> Atendimento acessível e humanizado</li>
            <li><FaStopwatch className="icone" /> Agendamentos rápidos e descomplicados</li>
            <li><FaUserFriends className="icone" /> Psicólogos qualificados e empáticos</li>
            <li><FaHeart className="icone" /> Compromisso real com seu bem-estar emocional</li>
          </ul>
          <button
            className="diferenciais-botao"
            onClick={() => setShowLoginModal(true)}
          >
            Começar agora
          </button>
        </div>

        <div className="diferenciais-video">
          <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/ywYTaJDXiWA"
            title="Vídeo de Apresentação"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="diferenciais-cards">
        <h5 className="diferenciais-secao">Nossas especialidades</h5>
        <h3 className="diferenciais-subsecoes">
          Atendimentos presenciais com <strong>escuta qualificada</strong>,<br />
          acolhimento e responsabilidade profissional
        </h3>

        <div className="cards-grid">
          <div className="card">
            <h4>Psicoterapia Individual</h4>
            <p>
              Sessões presenciais personalizadas para adolescentes, adultos e idosos,
              voltadas ao autoconhecimento e à saúde mental.
            </p>
          </div>
          <div className="card">
            <h4>Psicoterapia para Casais e Famílias</h4>
            <p>
              Atendimento em grupo presencial para promover empatia, diálogo e
              equilíbrio nas relações interpessoais.
            </p>
          </div>
          <div className="card">
            <h4>Avaliação Psicológica</h4>
            <p>
              Realização de avaliações clínicas, comportamentais e laudos para
              processos específicos com base ética e técnica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Diferenciais;