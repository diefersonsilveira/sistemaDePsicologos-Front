import React, { useState } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import ConteudoPrincipal from "../../components/ConteudoPrincipal/ConteudoPrincipal";
import ImagemTerapia from "../../components/ImagemTerapia/ImagemTerapia";
import ModalDeLogin from "../../components/modals/ModalLogin";
import ModalDeCadastro from "../../components/modals/ModalCadastro";
import Diferenciais from "../../components/Diferenciais/Diferenciais";
import FaixaInformativa from "../../components/FaixaInformativa/FaixaInformativa";
import Rodape from "../../components/Rodape/Rodape";
import "./PaginaInicial.css";

function PaginaInicial() {
  const [modalAtual, setModalAtual] = useState("nenhum");

  const abrirCadastro = () => setModalAtual("cadastro");
  const abrirLogin = () => setModalAtual("login");
  const fecharModal = () => setModalAtual("nenhum");

  return (
    <>
      <div className="hero-container">
        <Cabecalho abrirLogin={abrirLogin} />

        <main className="hero-content">
          <ConteudoPrincipal abrirLogin={abrirLogin} />
          <ImagemTerapia />
        </main>

        <div className="modal-container">
          <ModalDeLogin
            estaAberto={modalAtual === "login"}
            aoFechar={fecharModal}
            abrirCadastro={abrirCadastro}
          />
          <ModalDeCadastro
            estaAberto={modalAtual === "cadastro"}
            aoFechar={fecharModal}
            abrirLogin={abrirLogin}
          />
        </div>
      </div>

      <FaixaInformativa />

      <Diferenciais setShowLoginModal={() => setModalAtual("login")} />

      <Rodape />
    </>
  );
}

export default PaginaInicial;