import React, { useState } from 'react';
import './ListaPacientes.css'; 

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: 'Maria Oliveira', email: 'maria@exemplo.com', telefone: '11999990000' },
    { id: 2, nome: 'Carlos Lima', email: 'carlos@exemplo.com', telefone: '11888887777' }
  ]);
  const [novo, setNovo] = useState({ nome: '', email: '', telefone: '' });
  const [editando, setEditando] = useState(null);

  const handleChange = e => {
    setNovo({ ...novo, [e.target.name]: e.target.value });
  };

  const adicionar = e => {
    e.preventDefault();
    if (!novo.nome || !novo.email || !novo.telefone) return;
    setPacientes([...pacientes, { ...novo, id: Date.now() }]);
    setNovo({ nome: '', email: '', telefone: '' });
  };

  const remover = id => {
    setPacientes(pacientes.filter(p => p.id !== id));
  };

  const iniciarEdicao = paciente => {
    setEditando(paciente);
  };

  const salvarEdicao = e => {
    e.preventDefault();
    setPacientes(pacientes.map(p => (p.id === editando.id ? editando : p)));
    setEditando(null);
  };

  return (
    <div className="lista-pacientes-container">
      <h2>Pacientes da Clínica</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p =>
            editando && editando.id === p.id ? (
              <tr key={p.id}>
                <td>
                  <input
                    name="nome"
                    value={editando.nome}
                    onChange={e => setEditando({ ...editando, nome: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={editando.email}
                    onChange={e => setEditando({ ...editando, email: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    name="telefone"
                    value={editando.telefone}
                    onChange={e => setEditando({ ...editando, telefone: e.target.value })}
                  />
                </td>
                <td>
                  <button onClick={salvarEdicao}>Salvar</button>
                  <button onClick={() => setEditando(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>{p.telefone}</td>
                <td>
                  <button className="btnEditar" onClick={() => iniciarEdicao(p)}>Editar</button>
                  <button className="btnRemover" onClick={() => remover(p.id)}>Remover</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    
<h3>Adicionar Paciente</h3>
<form onSubmit={adicionar} className="form-adicionar-paciente">
  <div className="campo-form">
    <label>Nome</label>
    <input
      name="nome"
      placeholder="Nome"
      value={novo.nome}
      onChange={handleChange}
      type="text"
    />
  </div>
  <div className="campo-form">
    <label>Email</label>
    <input
      name="email"
      placeholder="Email"
      value={novo.email}
      onChange={handleChange}
      type="email"
    />
  </div>
  <div className="campo-form">
    <label>Telefone</label>
    <input
      name="telefone"
      placeholder="Telefone"
      value={novo.telefone}
      onChange={handleChange}
      type="tel"
    />
  </div>
  <button type="submit">Adicionar</button>
</form>
    </div>
  );
};

export default ListaPacientes;