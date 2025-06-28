import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "./Consultas.css";

const Consultas = () => {
  const {
    consultas,
    adicionarConsulta,
    editarConsulta,
    excluirConsulta,
    psicologos,
    pacientes,
    carregarPacientes
  } = useAppContext();

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [form, setForm] = useState({ nome: "", data: "", hora: "", psicologo: "" });
  const [erro, setErro] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    carregarPacientes();
  }, [carregarPacientes]);

  const gerarHorariosDisponiveis = useCallback((psicologo, data) => {
    const diaSemana = new Date(data).getDay();
    if (diaSemana === 0 || diaSemana === 6) return setHorariosDisponiveis([]);

    const ocupados = consultas
      .filter(
        c =>
          c.psicologo === psicologo &&
          c.data === data &&
          c.status !== "Cancelada" &&
          (!modoEdicao || c.id !== modoEdicao)
      )
      .map(c => c.hora);

    const horarios = [];
    const pushHorario = h => {
      const horaStr = `${h.toString().padStart(2, "0")}:00`;
      if (!ocupados.includes(horaStr)) horarios.push(horaStr);
    };

    for (let h = 8; h <= 11; h++) pushHorario(h);
    for (let h = 13; h <= 17; h++) pushHorario(h);

    setHorariosDisponiveis(horarios);
  }, [consultas, modoEdicao]);

  useEffect(() => {
    if (form.psicologo && form.data) {
      gerarHorariosDisponiveis(form.psicologo, form.data);
    } else {
      setHorariosDisponiveis([]);
    }
  }, [form.psicologo, form.data, gerarHorariosDisponiveis]);

  const abrirModalEdicao = consulta => {
    setModoEdicao(consulta.id);
    setForm({
      nome: consulta.nome,
      data: consulta.data,
      hora: consulta.hora,
      psicologo: consulta.psicologo,
    });
    setErro("");
    setModalAberto(true);
  };

  const abrirModalNovo = () => {
    setModoEdicao(null);
    setForm({ nome: "", data: "", hora: "", psicologo: "" });
    setErro("");
    setModalAberto(true);
  };

  const salvar = () => {
    if (!form.hora) {
      setErro("Selecione um horário disponível.");
      return;
    }

    const payload = {
      nome: form.nome,
      data: form.data,
      hora: form.hora,
      psicologo: form.psicologo,
    };

    if (modoEdicao) {
      editarConsulta(modoEdicao, payload);
    } else {
      adicionarConsulta(payload);
    }
    setModalAberto(false);
  };

  const cancelarConsulta = id => {
    if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      const consulta = consultas.find(c => c.id === id);
      if (!consulta) return;

      editarConsulta(id, {
        nome: consulta.nome,
        data: consulta.data,
        hora: consulta.hora,
        psicologo: consulta.psicologo,
        status: "Cancelada",
      });
    }
  };

  const concluirConsulta = id => {
    if (window.confirm("Tem certeza que deseja marcar esta consulta como concluída?")) {
      const consulta = consultas.find(c => c.id === id);
      if (!consulta) return;

      editarConsulta(id, {
        nome: consulta.nome,
        data: consulta.data,
        hora: consulta.hora,
        psicologo: consulta.psicologo,
        status: "Concluída",
      });
    }
  };

  const formatarDataBR = dataISO => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const renderStatus = status => {
    const iconStyle = { marginRight: "0.4rem" };
    if (status === "Concluída") return <span className="status concluida"><FaCheckCircle style={iconStyle} /> Concluída</span>;
    if (status === "Cancelada") return <span className="status cancelada"><FaTimesCircle style={iconStyle} /> Cancelada</span>;
    return <span className="status em-espera"><FaClock style={iconStyle} /> Em espera</span>;
  };

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="consultas-titulo">Consultas Agendadas</h1>
        <button className="btn-novo" onClick={abrirModalNovo}>+ Nova Consulta</button>

        <table className="tabela-consultas">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Psicólogo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.sort((a, b) => new Date(`${b.data}T${b.hora}`) - new Date(`${a.data}T${a.hora}`)).map(c => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{formatarDataBR(c.data)}</td>
                <td>{c.hora}</td>
                <td>{c.psicologo}</td>
                <td>{renderStatus(c.status)}</td>
                <td>
                  <button className="btn-acao editar" onClick={() => abrirModalEdicao(c)}>Editar</button>
                  <button className="btn-acao excluir" onClick={() => excluirConsulta(c.id)}>Excluir</button>
                  {c.status !== "Cancelada" && c.status !== "Concluída" && (
                    <>
                      <button className="btn-acao cancelar" onClick={() => cancelarConsulta(c.id)}>Cancelar</button>
                      <button className="btn-acao concluir" onClick={() => concluirConsulta(c.id)}>Concluir</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAberto && (
          <div className="modal-sobreposicao" onClick={e => e.target.className === "modal-sobreposicao" && setModalAberto(false)}>
            <div className="modal-conteudo" role="dialog" aria-modal="true">
              <button className="modal-fechar" onClick={() => setModalAberto(false)} aria-label="Fechar modal">×</button>
              <h2>{modoEdicao ? "Editar Consulta" : "Nova Consulta"}</h2>
              <div className="modal-form">
                <label>Paciente</label>
                <select value={form.nome} onChange={e => setForm(prev => ({ ...prev, nome: e.target.value }))}>
                  <option value="">Selecione...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.nomeCompleto}>{p.nomeCompleto}</option>
                  ))}
                </select>

                <label>Data</label>
                <input type="date" value={form.data} onChange={e => setForm(prev => ({ ...prev, data: e.target.value }))} />

                <label>Psicólogo</label>
                <select value={form.psicologo} onChange={e => setForm(prev => ({ ...prev, psicologo: e.target.value }))}>
                  <option value="">Selecione...</option>
                  {psicologos.map(p => (
                    <option key={p.id} value={p.nome}>{p.nome}</option>
                  ))}
                </select>

                {horariosDisponiveis.length > 0 && (
                  <>
                    <label>Horários Disponíveis</label>
                    <div className="horarios-opcoes-wrap">
                      {horariosDisponiveis.map(h => (
                        <label key={h} className="horario-radio">
                          <input
                            type="radio"
                            name="horario"
                            value={h}
                            checked={form.hora === h}
                            onChange={e => setForm(prev => ({ ...prev, hora: e.target.value }))}
                          />
                          <span>{h}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {erro && <p className="form-erro">{erro}</p>}
                <button className="btn-salvar" onClick={salvar}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultas;
