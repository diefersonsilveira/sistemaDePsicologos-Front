import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import PaginaInicial from "./pages/PaginaInicial/PaginaInicial";
import Usuario from "./pages/Usuario/Usuario";

import DashboardAdmin from "./pages/Admin/DashboardAdmin/DashboardAdmin";
import ListaPacientes from "./pages/Admin/ListaPacientes/ListaPacientes";
import Agenda from "./pages/Admin/Agenda/Agenda";
import Graficos from "./pages/Admin/Graficos/Graficos";
import Psicologos from "./pages/Admin/Psicologos/Psicologos";
import Consultas from "./pages/Admin/Consultas/Consultas";

function App() {
  return (
    <Router>
      <div className="aplicativo">
        <div className="conteudo">
          <Routes>
            <Route path="/usuario" element={<Usuario/>} />
            <Route path="/" element={<PaginaInicial />} />

            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/admin/pacientes" element={<ListaPacientes />} />
            <Route path="/admin/agenda" element={<Agenda />} />
            <Route path="/admin/graficos" element={<Graficos />} />
            <Route path="/admin/psicologos" element={<Psicologos />} />
            <Route path="/admin/consultas" element={<Consultas />} />

            <Route path="/homepage" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/cadastro" element={<Navigate to="/" replace />} />

            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;