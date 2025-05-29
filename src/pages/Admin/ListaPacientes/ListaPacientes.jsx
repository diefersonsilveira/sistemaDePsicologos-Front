import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import "./ListaPacientes.css";

const ListaPacientes = () => {
  const { pacientes, adicionarPaciente, editarPaciente, excluirPaciente } = useAppContext();

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    document.body.classList.toggle("modal-aberto", modalAberto);
    return () => document.body.classList.remove("modal-aberto");
  }, [modalAberto]);

  const abrirModalEdicao = (paciente) => {
    setModoEdicao(paciente.id);
    setForm({ nome: paciente.nome, email: paciente.email });
    setModalAberto(true);
  };

  const abrirModalNovo = () => {
    setModoEdicao(null);
    setForm({ nome: "", email: "" });
    setModalAberto(true);
  };

  const salvar = () => {
    if (modoEdicao) {
      editarPaciente(modoEdicao, form);
    } else {
      adicionarPaciente(form);
    }
    setModalAberto(false);
  };

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="pacientes-titulo">Lista de Pacientes</h1>
        <button className="btn-novo" onClick={abrirModalNovo}>+ Novo Paciente</button>

        <table className="tabela-pacientes">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.nome}</td>
                <td>{paciente.email}</td>
                <td>
                  <button className="btn-acao editar" onClick={() => abrirModalEdicao(paciente)}>Editar</button>
                  <button className="btn-acao excluir" onClick={() => excluirPaciente(paciente.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAberto && (
          <div className="modal-sobreposicao" onClick={(e) => e.target.className === "modal-sobreposicao" && setModalAberto(false)}>
            <div className="modal-conteudo" role="dialog" aria-modal="true">
              <button className="modal-fechar" onClick={() => setModalAberto(false)} aria-label="Fechar modal">×</button>
              <h2>{modoEdicao ? "Editar Paciente" : "Novo Paciente"}</h2>
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

export default ListaPacientes;