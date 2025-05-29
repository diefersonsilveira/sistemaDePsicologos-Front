import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import PaginaInicial from "./pages/PaginaInicial/PaginaInicial";
import Usuario from "./pages/Usuario/Usuario";

function App() {
  return (
    <Router>
      <div className="aplicativo">
        <div className="conteudo">
          <Routes>
            <Route path="/usuario" element={<Usuario/>} />
            <Route path="/" element={<PaginaInicial />} />
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