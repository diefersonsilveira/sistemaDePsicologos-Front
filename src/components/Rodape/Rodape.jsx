import React from "react";
import "./Rodape.css";
import logo from "../../assets/logobranca.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Rodape = () => {
  return (
    <footer className="rodape">
      <div className="rodape-container">
        <div className="rodape-topo">
          <div className="rodape-logo">
            <img src={logo} alt="Logo Psicoterapia pra Você" />
          </div>

          <div className="rodape-contato">
            <p>
              <FaPhoneAlt className="rodape-icon" /> +55 55 99608-3080
            </p>
            <p>
              <FaEnvelope className="rodape-icon" /> 105078@urisantiago.br
            </p>
          </div>
        </div>

        <hr className="rodape-linha" />

        <div className="rodape-base">
          <p>© 2025 VivaMente pra Você</p>
          <p>
            Desenvolvido por <strong>Dieferson, Fred, Lucas, Leonardo</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;