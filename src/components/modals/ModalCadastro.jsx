import React, { useEffect } from "react";
import "./Modal.css";
import CadastroPaciente from "../../features/auth/CadastroPaciente/CadastroPaciente";

const ModalCadastro = ({ estaAberto, aoFechar, abrirLogin }) => {
  useEffect(() => {
    document.body.classList.toggle("modal-aberto", estaAberto);
    return () => document.body.classList.remove("modal-aberto");
  }, [estaAberto]);

  useEffect(() => {
    const escFechar = (e) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", escFechar);
    return () => window.removeEventListener("keydown", escFechar);
  }, [aoFechar]);

  if (!estaAberto) return null;

  const fecharAoClicarFora = (e) => {
    if (e.target.className === "modal-sobreposicao") aoFechar();
  };

  return (
    <div className="modal-sobreposicao" onClick={fecharAoClicarFora}>
      <div className="modal-conteudo" role="dialog" aria-modal="true">
        <button className="modal-fechar" onClick={aoFechar} aria-label="Fechar modal">×</button>
        <CadastroPaciente modoModal abrirLogin={abrirLogin} />
      </div>
    </div>
  );
};

export default ModalCadastro;