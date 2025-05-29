import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import "./Psicologos.css";

const Psicologos = () => {
  const { psicologos, adicionarPsicologo, editarPsicologo, excluirPsicologo } = useAppContext();

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    document.body.classList.toggle("modal-aberto", modalAberto);
    return () => document.body.classList.remove("modal-aberto");
  }, [modalAberto]);

  const abrirModalEdicao = (psicologo) => {
    setModoEdicao(psicologo.id);
    setForm({ nome: psicologo.nome, email: psicologo.email });
    setModalAberto(true);
  };

  const abrirModalNovo = () => {
    setModoEdicao(null);
    setForm({ nome: "", email: "" });
    setModalAberto(true);
  };

  const salvar = () => {
    if (modoEdicao) {
      editarPsicologo(modoEdicao, form);
    } else {
      adicionarPsicologo(form);
    }
    setModalAberto(false);
  };

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="psicologos-titulo">Gerenciar Psicólogos</h1>
        <button className="btn-novo" onClick={abrirModalNovo}>+ Novo Psicólogo</button>

        <table className="tabela-psicologos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {psicologos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>
                  <button className="btn-acao editar" onClick={() => abrirModalEdicao(p)}>Editar</button>
                  <button className="btn-acao excluir" onClick={() => excluirPsicologo(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAberto && (
          <div className="modal-sobreposicao" onClick={(e) => e.target.className === "modal-sobreposicao" && setModalAberto(false)}>
            <div className="modal-conteudo" role="dialog" aria-modal="true">
              <button className="modal-fechar" onClick={() => setModalAberto(false)} aria-label="Fechar modal">×</button>
              <h2>{modoEdicao ? "Editar Psicólogo" : "Novo Psicólogo"}</h2>
              <div className="modal-form">
                <label>Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                />
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <button className="btn-salvar" onClick={salvar}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Psicologos;
