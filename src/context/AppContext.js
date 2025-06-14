import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const hoje = new Date();
  const formatarData = (data) => data.toISOString().slice(0, 10);

  const [consultas, setConsultas] = useState([
    {
      id: 1,
      nome: "Ana Souza",
      psicologo: "Dr. João Silva",
      data: formatarData(new Date(hoje.getTime() - 2 * 24 * 60 * 60 * 1000)),
      hora: "09:00",
      status: "Confirmada",
    },
    {
      id: 2,
      nome: "Carlos Lima",
      psicologo: "Dra. Marina Castro",
      data: formatarData(hoje),
      hora: "10:00",
      status: "Cancelada",
    },
    {
      id: 3,
      nome: "Fernanda Dias",
      psicologo: "Dr. Pedro Albuquerque",
      data: formatarData(new Date(hoje.getTime() + 2 * 24 * 60 * 60 * 1000)),
      hora: "15:00",
      status: "Confirmada",
    },
  ]);

  const [psicologos, setPsicologos] = useState([
    { id: 1, nome: "Dr. João Silva", email: "joao@clinica.com" },
    { id: 2, nome: "Dra. Marina Castro", email: "marina@clinica.com" },
    { id: 3, nome: "Dr. Pedro Albuquerque", email: "pedro@clinica.com" },
  ]);

  const [pacientes, setPacientes] = useState([]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Ana Souza", tipo: "Paciente" },
    { id: 2, nome: "Carlos Lima", tipo: "Paciente" },
    { id: 3, nome: "Fernanda Dias", tipo: "Paciente" },
    { id: 4, nome: "Dr. João Silva", tipo: "Psicologo" },
    { id: 5, nome: "Dra. Marina Castro", tipo: "Psicologo" },
    { id: 6, nome: "Dr. Pedro Albuquerque", tipo: "Psicologo" },
  ]);

  const [relatorios, setRelatorios] = useState([
    { id: 1, nome: "Consultas Maio 2025", tipo: "PDF" },
    { id: 2, nome: "Pacientes Ativos", tipo: "CSV" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8080/clientes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Falha ao buscar pacientes");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Pacientes carregados do backend:", data);
          setPacientes(data);
        })
        .catch((err) => {
          console.error("Erro ao buscar pacientes:", err);
        });
    } else {
      console.warn("Nenhum token encontrado — faça login primeiro.");
    }
  }, []);

  const adicionarConsulta = (data) => {
    setConsultas((prev) => [...prev, { id: Math.random(), ...data }]);
  };

  const editarConsulta = (id, novosDados) => {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...novosDados } : c))
    );
  };

  const excluirConsulta = (id) => {
    setConsultas((prev) => prev.filter((c) => c.id !== id));
  };

  const adicionarPsicologo = (data) => {
    setPsicologos((prev) => [...prev, { id: Math.random(), ...data }]);
  };

  const editarPsicologo = (id, novosDados) => {
    setPsicologos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...novosDados } : p))
    );
  };

  const excluirPsicologo = (id) => {
    setPsicologos((prev) => prev.filter((p) => p.id !== id));
  };

  const adicionarUsuario = (data) => {
    setUsuarios((prev) => [...prev, { id: Math.random(), ...data }]);
  };

  const editarUsuario = (id, novosDados) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...novosDados } : u))
    );
  };

  const excluirUsuario = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  // TODO: adicionar/editar/excluir pode ser implementado depois com fetch POST/PUT/DELETE
  const adicionarPaciente = (data) => {
    setPacientes((prev) => [...prev, { id: Math.random(), ...data }]);
  };

  const editarPaciente = (id, novosDados) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...novosDados } : p))
    );
  };

  const excluirPaciente = (id) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  const adicionarRelatorio = (data) => {
    setRelatorios((prev) => [...prev, { id: Math.random(), ...data }]);
  };

  const excluirRelatorio = (id) => {
    setRelatorios((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        consultas,
        adicionarConsulta,
        editarConsulta,
        excluirConsulta,
        psicologos,
        adicionarPsicologo,
        editarPsicologo,
        excluirPsicologo,
        usuarios,
        adicionarUsuario,
        editarUsuario,
        excluirUsuario,
        pacientes,
        adicionarPaciente,
        editarPaciente,
        excluirPaciente,
        relatorios,
        adicionarRelatorio,
        excluirRelatorio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
