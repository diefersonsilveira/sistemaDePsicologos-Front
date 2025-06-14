import '../Usuario/Usuario.css';
import React from 'react';
import PainelUsuario from '../../components/PainelUsuario/PainelUsuario';

const Usuario = () => {
  const handleLogout = () => {
    alert('Você saiu!');
    // Aqui você pode adicionar a lógica de logout real, como redirecionar ou limpar tokens
  };

  return (
    <div className="pagina-usuario">
      <button className="botao-sair" onClick={handleLogout}>Sair</button>
      <PainelUsuario abaAtiva="todas" />
    </div>
  );
}

export default Usuario;