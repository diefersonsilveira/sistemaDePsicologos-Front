import React from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "./Agenda.css";

const Agenda = () => {
  const { consultas } = useAppContext();
  const agora = new Date();

  const formatarDataHora = (data, hora) => new Date(`${data}T${hora}`);

  const getStatus = (data, hora, statusOriginal) => {
    if (statusOriginal === "Cancelada") return "Cancelada";
    const inicio = formatarDataHora(data, hora);
    const fim = new Date(inicio.getTime() + 30 * 60000);
    return agora > fim ? "Concluída" : "Em espera";
  };

  const formatarDataBR = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarClasseStatus = (status) =>
    `status-${status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "-")}`;

  const consultasOrdenadas = [...consultas].sort((a, b) => {
    const dataA = new Date(`${a.data}T${a.hora}`);
    const dataB = new Date(`${b.data}T${b.hora}`);
    return dataB - dataA;
  });

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="agenda-titulo">Agenda de Consultas</h1>
        <div className="agenda-lista">
          {consultasOrdenadas.map((consulta) => {
            const status = getStatus(
              consulta.data,
              consulta.hora,
              consulta.status
            );
            const statusClass = formatarClasseStatus(status);
            return (
              <div key={consulta.id} className="agenda-card">
                <p>
                  <strong>Paciente:</strong> {consulta.nome}
                </p>
                <p>
                  <strong>Data:</strong> {formatarDataBR(consulta.data)}
                </p>
                <p>
                  <strong>Hora:</strong> {consulta.hora}
                </p>
                <p>
                  <strong>Psicólogo:</strong> {consulta.psicologo}
                </p>
                <p className={`consulta-status ${statusClass}`}>
                  {status === "Concluída" && (
                    <FaCheckCircle className="status-icone" />
                  )}
                  {status === "Cancelada" && (
                    <FaTimesCircle className="status-icone" />
                  )}
                  {status === "Em espera" && (
                    <FaClock className="status-icone" />
                  )}
                  {status}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
