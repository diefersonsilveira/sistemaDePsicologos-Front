import React, { useState } from 'react';
import './ListaPsicologos.css';

const ListaPsicologos = () => {
  const [psicologos, setPsicologos] = useState([
    { id: 1, nome: 'Dra. Ana Silva', email: 'ana@clinica.com', telefone: '11999999999' },
    { id: 2, nome: 'Dr. João Souza', email: 'joao@clinica.com', telefone: '11888888888' }
  ]);
  const [novo, setNovo] = useState({ nome: '', email: '', telefone: '' });
  const [editando, setEditando] = useState(null);

  const handleChange = e => {
    setNovo({ ...novo, [e.target.name]: e.target.value });
  };

  const adicionar = e => {
    e.preventDefault();
    if (!novo.nome || !novo.email || !novo.telefone) return;
    setPsicologos([...psicologos, { ...novo, id: Date.now() }]);
    setNovo({ nome: '', email: '', telefone: '' });
  };

  const remover = id => {
    setPsicologos(psicologos.filter(p => p.id !== id));
  };

  const iniciarEdicao = psicologo => {
    setEditando(psicologo);
  };

  const salvarEdicao = e => {
    e.preventDefault();
    setPsicologos(psicologos.map(p => (p.id === editando.id ? editando : p)));
    setEditando(null);
  };

  return (
    <div className="lista-psicologos-container">
      <h2>Psicólogos da Clínica</h2>
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
          {psicologos.map(p =>
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
      <h3>Adicionar Psicólogo</h3>
      <form onSubmit={adicionar}>
        <input
          name="nome"
          placeholder="Nome"
          value={novo.nome}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={novo.email}
          onChange={handleChange}
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={novo.telefone}
          onChange={handleChange}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default ListaPsicologos;