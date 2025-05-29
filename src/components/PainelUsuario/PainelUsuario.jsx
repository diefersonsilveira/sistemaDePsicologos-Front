import React, { useState } from "react";
import "./PainelUsuario.css";

const mockAgendamentos = [
  { id: 1, data: "2025-05-28", hora: "14:00", psicologo: "Dra. Ana Lima", status: "futuro" },
  { id: 2, data: "2025-05-20", hora: "10:00", psicologo: "Dr. João Silva", status: "passado" },
];

const mockDisponibilidade = [
  { data: "2025-05-29", hora: "10:00" },
  { data: "2025-05-29", hora: "14:00" },
  { data: "2025-05-30", hora: "09:00" },
];

export default function PainelUsuario() {
  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    telefone: "",
    genero: "",
    nascimento: "",
    preferenciaHorario: "",
    preferenciaPsicologo: "",
  });
  const [agendamentos, setAgendamentos] = useState(mockAgendamentos);
  const [disponibilidade] = useState(mockDisponibilidade);
  const [alerta, setAlerta] = useState("");
  const [reagendarId, setReagendarId] = useState(null);
  const [novoAgendamento, setNovoAgendamento] = useState({ data: "", hora: "" });
  const [editando, setEditando] = useState(false);

  function handleCancelar(id, data, hora) {
    const agora = new Date();
    const agendamento = new Date(`${data}T${hora}`);
    const diff = (agendamento - agora) / (1000 * 60 * 60);
    if (diff < 24) {
      setAlerta("Cancelamento em cima da hora! Entre em contato com a clínica.");
      return;
    }
    setAgendamentos(agendamentos.filter(a => a.id !== id));
    setAlerta("");
  }

  function handleReagendar(id) {
    setReagendarId(id);
  }

  function handleConfirmarReagendamento() {
    const disponivel = disponibilidade.some(
      (slot) => slot.data === novoAgendamento.data && slot.hora === novoAgendamento.hora
    );

    if (!disponivel) {
      setAlerta("O horário selecionado não está disponível. Por favor, escolha outro.");
      return;
    }

    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === reagendarId
          ? { ...a, data: novoAgendamento.data, hora: novoAgendamento.hora }
          : a
      )
    );
    setReagendarId(null);
    setNovoAgendamento({ data: "", hora: "" });
    setAlerta("");
  }

  function handleSalvarPerfil(e) {
    e.preventDefault();
    setEditando(false);
  }

  function handleEditarPerfil() {
    setEditando(true);
  }

  function handlePerfilChange(e) {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="painel-usuario-container">
      <section className="painel-dashboard">
        <h2>Painel do Paciente</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Próximo Agendamento</h3>
            {agendamentos.find(a => a.status === "futuro") ? (
              <div>
                <div>Data: {agendamentos.find(a => a.status === "futuro").data}</div>
                <div>Hora: {agendamentos.find(a => a.status === "futuro").hora}</div>
                <div>Psicólogo: {agendamentos.find(a => a.status === "futuro").psicologo}</div>
              </div>
            ) : (
              <div>Sem agendamentos futuros</div>
            )}
          </div>
        </div>
      </section>

      <section className="painel-agendamentos">
        <h2>Meus Agendamentos</h2>
        {alerta && <div className="painel-alerta">{alerta}</div>}
        <ul className="lista-agendamentos">
          {agendamentos.map(a => (
            <li key={a.id} className={a.status === "futuro" ? "agendamento-futuro" : "agendamento-passado"}>
              <div>
                <strong>{a.data}</strong> às <strong>{a.hora}</strong> — {a.psicologo}
              </div>
              {a.status === "futuro" && (
                <div className="acoes-agendamento">
                  <button className="btn-reagendar" onClick={() => handleReagendar(a.id)}>Reagendar</button>
                  <button className="btn-cancelar" onClick={() => handleCancelar(a.id, a.data, a.hora)}>Cancelar</button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {reagendarId && (
          <div className="modal-reagendamento">
            <h3>Escolha um novo horário</h3>
            <label>
              Data:
              <input
                type="date"
                value={novoAgendamento.data}
                onChange={(e) => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })}
              />
            </label>
            <label>
              Hora:
              <input
                type="time"
                value={novoAgendamento.hora}
                onChange={(e) => setNovoAgendamento({ ...novoAgendamento, hora: e.target.value })}
              />
            </label>
            <button onClick={handleConfirmarReagendamento}>Confirmar</button>
            <button onClick={() => setReagendarId(null)}>Cancelar</button>
            <button className="btn-fechar" onClick={() => setReagendarId(null)}>Fechar</button>
          </div>
        )}
      </section>

      <section className="painel-perfil">
        <h2>Perfil do Paciente</h2>
        <form className="form-perfil" onSubmit={handleSalvarPerfil}>
          <div className="form-group">
            <label>Nome</label>
            <input
              name="nome"
              value={perfil.nome}
              onChange={handlePerfilChange}
              disabled={!editando}
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              name="email"
              value={perfil.email}
              onChange={handlePerfilChange}
              disabled={!editando}
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              name="telefone"
              value={perfil.telefone}
              onChange={handlePerfilChange}
              disabled={!editando}
            />
          </div>
          <div className="form-group">
            <label>Gênero</label>
            <select
              name="genero"
              value={perfil.genero}
              onChange={handlePerfilChange}
              disabled={!editando}
            >
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="nascimento"
              value={perfil.nascimento}
              onChange={handlePerfilChange}
              disabled={!editando}
            />
          </div>
          <div className="form-group">
            <label>Psicólogo Preferido</label>
            <input
              name="preferenciaPsicologo"
              value={perfil.preferenciaPsicologo}
              onChange={handlePerfilChange}
              disabled={!editando}
            />
          </div>
          <div className="form-botoes">
            {editando ? (
              <button type="submit" className="btn-salvar">Salvar</button>
            ) : (
              <button
                type="button"
                className="btn-editar"
                onClick={handleEditarPerfil}
              >
                Editar
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
