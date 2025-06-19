import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import "./Psicologos.css";

const Psicologos = () => {
  const { psicologos, adicionarPsicologo, editarPsicologo, excluirPsicologo } = useAppContext();

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    especialidade: ""
  });


  useEffect(() => {
    document.body.classList.toggle("modal-aberto", modalAberto);
    return () => document.body.classList.remove("modal-aberto");
  }, [modalAberto]);

  const abrirModalEdicao = (psicologo) => {
    setModoEdicao(psicologo.id);
    setForm({
      nome: psicologo.nome,
      email: psicologo.login,
      telefone: psicologo.telefone || "",
      especialidade: psicologo.especialidade || ""
    });
    setModalAberto(true);
  };

  const abrirModalNovo = () => {
    setModoEdicao(null);
    setForm({
      nome: "",
      email: "",
      telefone: "",
      especialidade: ""
    });
    setModalAberto(true);
  };

  const salvar = () => {
    const payload = {
      nome: form.nome,
      login: form.email,
      telefone: form.telefone,
      especialidade: form.especialidade,
      senha: "senhaPadrao123"
    };

    if (modoEdicao) {
      editarPsicologo(modoEdicao, payload);
    } else {
      adicionarPsicologo(payload);
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
              <th>Telefone</th>
              <th>Especialidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {psicologos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.login}</td>
                <td>{p.telefone}</td>
                <td>{p.especialidade}</td>
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

                <label>Telefone</label>
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => setForm((prev) => ({ ...prev, telefone: e.target.value }))}
                />

                <label>Especialidade</label>
                <input
                  type="text"
                  value={form.especialidade}
                  onChange={(e) => setForm((prev) => ({ ...prev, especialidade: e.target.value }))}
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
