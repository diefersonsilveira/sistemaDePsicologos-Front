import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  const { consultas, pacientes } = useAppContext();
  const [dados, setDados] = useState({ atendidosHoje: 0, totalPacientes: 0, consultasMes: 0, consultasTodas: [] });

  useEffect(() => {
    const agora = new Date();
    const hoje = agora.toISOString().slice(0, 10);
    const mesAtual = hoje.slice(0, 7);

    const concluidasHoje = consultas.filter((c) => {
      const fim = new Date(`${c.data}T${c.hora}`);
      fim.setMinutes(fim.getMinutes() + 30);
      return c.data === hoje && fim < agora && c.status !== "Cancelada";
    }).length;

    const concluidasMes = consultas.filter((c) => {
      const fim = new Date(`${c.data}T${c.hora}`);
      fim.setMinutes(fim.getMinutes() + 30);
      return c.data.startsWith(mesAtual) && fim < agora && c.status !== "Cancelada";
    }).length;

    const todas = consultas
      .map((c) => {
        const fim = new Date(`${c.data}T${c.hora}`);
        fim.setMinutes(fim.getMinutes() + 30);
        const status = c.status === "Cancelada"
          ? "Cancelada"
          : fim < agora
          ? "Concluída"
          : "Em espera";
        return { ...c, status };
      })
      .sort((a, b) => new Date(`${b.data}T${b.hora}`) - new Date(`${a.data}T${a.hora}`));

    setDados({
      atendidosHoje: concluidasHoje,
      totalPacientes: pacientes.length,
      consultasMes: concluidasMes,
      consultasTodas: todas,
    });
  }, [consultas, pacientes]);

  const formatarDataBR = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const renderStatus = (status) => {
    const iconStyle = { marginRight: "0.4rem" };
    if (status === "Concluída") return <span className="status concluida"><FaCheckCircle style={iconStyle} /> Concluída</span>;
    if (status === "Cancelada") return <span className="status cancelada"><FaTimesCircle style={iconStyle} /> Cancelada</span>;
    return <span className="status em-espera"><FaClock style={iconStyle} /> Em espera</span>;
  };

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="dashboard-titulo">Painel do Administrador</h1>

        <div className="dashboard-cards">
          <div className="card-info">
            <h3>Atendidos Hoje</h3>
            <p>{dados.atendidosHoje}</p>
          </div>
          <div className="card-info">
            <h3>Total de Pacientes</h3>
            <p>{dados.totalPacientes}</p>
          </div>
          <div className="card-info">
            <h3>Consultas no Mês</h3>
            <p>{dados.consultasMes}</p>
          </div>
        </div>

        <div className="dashboard-lista">
          <h2>Histórico de Consultas</h2>
          <table className="dashboard-tabela">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Psicólogo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dados.consultasTodas.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{formatarDataBR(c.data)}</td>
                  <td>{c.hora}</td>
                  <td>{c.psicologo}</td>
                  <td>{renderStatus(c.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;