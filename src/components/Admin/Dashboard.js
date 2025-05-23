import React from 'react';
import { FaUsers, FaCalendarCheck, FaUserMd } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  // Dados mockados para exemplo
  const dados = {
    totalPacientes: 150,
    consultasHoje: 12,
    psicologosAtivos: 8
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">
            <FaUsers />
          </div>
          <div className="card-info">
            <h3>Total de Pacientes</h3>
            <p>{dados.totalPacientes}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <FaCalendarCheck />
          </div>
          <div className="card-info">
            <h3>Consultas Hoje</h3>
            <p>{dados.consultasHoje}</p>
          </div>
        </div>

      </div>

      <div className="dashboard-graficos">
        <div className="grafico-container">
          <h3>Consultas por Mês</h3>
          <div className="grafico-placeholder">
            {/* Aqui você pode adicionar um gráfico real usando bibliotecas como Chart.js ou Recharts */}
            <p>Gráfico de consultas por mês</p>
          </div>
        </div>

        <div className="grafico-container">
          <h3>Distribuição de Especialidades</h3>
          <div className="grafico-placeholder">
            {/* Aqui você pode adicionar um gráfico real usando bibliotecas como Chart.js ou Recharts */}
            <p>Gráfico de distribuição de especialidades</p>
          </div>
        </div>
      </div>

      <div className="dashboard-ultimas-atividades">
        <h3>Últimas Atividades</h3>
        <div className="atividades-lista">
          <div className="atividade-item">
            <span className="atividade-hora">10:30</span>
            <span className="atividade-descricao">Nova consulta agendada com Dr. João Silva</span>
          </div>
          <div className="atividade-item">
            <span className="atividade-hora">09:15</span>
            <span className="atividade-descricao">Psicóloga Maria Santos atualizou seu perfil</span>
          </div>
          <div className="atividade-item">
            <span className="atividade-hora">08:45</span>
            <span className="atividade-descricao">Nova paciente cadastrada no sistema</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 