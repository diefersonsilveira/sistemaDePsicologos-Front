import React, { useState } from 'react';
import './PainelAdmin.css';
import ListaPsicologos from '../../components/Admin/ListaPsicologos';
import HistoricoConsultas from '../../components/Admin/HistoricoConsultas';
import Dashboard from '../../components/Admin/Dashboard';
import { FaHome, FaCalendarAlt, FaUserMd, FaSignOutAlt } from 'react-icons/fa';

const PainelAdmin = () => {
  const [menuAtivo, setMenuAtivo] = useState('dashboard');

  const renderizarConteudo = () => {
    switch (menuAtivo) {
      case 'dashboard':
        return <Dashboard />;
      case 'consultas':
        return <HistoricoConsultas />;
      case 'psicologos':
        return <ListaPsicologos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="painel-admin">
      <div className="menu-lateral">
        <div className="menu-header">
          <h2>Painel Admin</h2>
        </div>
        <nav>
          <ul>
            <li>
              <button 
                className={menuAtivo === 'dashboard' ? 'ativo' : ''}
                onClick={() => setMenuAtivo('dashboard')}
              >
                <FaHome className="menu-icon" />
                Dashboard
              </button>
            </li>
            <li>
              <button 
                className={menuAtivo === 'consultas' ? 'ativo' : ''}
                onClick={() => setMenuAtivo('consultas')}
              >
                <FaCalendarAlt className="menu-icon" />
                Histórico de Consultas
              </button>
            </li>
            <li>
              <button 
                className={menuAtivo === 'psicologos' ? 'ativo' : ''}
                onClick={() => setMenuAtivo('psicologos')}
              >
                <FaUserMd className="menu-icon" />
                Gerenciar Psicólogos
              </button>
            </li>
          </ul>
        </nav>
        <div className="menu-footer">
          <button className="btn-sair">
            <FaSignOutAlt className="menu-icon" />
            Sair
          </button>
        </div>
      </div>
      <div className="conteudo-principal">
        {renderizarConteudo()}
      </div>
    </div>
  );
};

export default PainelAdmin; 