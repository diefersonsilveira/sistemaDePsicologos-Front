import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const hoje = new Date();
  // const formatarData = (data) => data.toISOString().slice(0, 10);

  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/consultas/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar consultas");
        return res.json();
      })
      .then((data) => {
        const consultasFormatadas = data.map((c) => ({
          id: c.id,
          nome: c.pacienteNome,
          data: c.dataHora.split("T")[0],
          hora: c.dataHora.split("T")[1].substring(0, 5),
          psicologo: c.psicologo?.nome || "",
          status:
            c.status === "EM_ESPERA"
              ? "Em espera"
              : c.status === "CONCLUIDA"
                ? "Concluída"
                : "Cancelada",
        }));
        setConsultas(consultasFormatadas);
      })
      .catch((err) => console.error(err));
  }, []);

  // CREATE
  const adicionarConsulta = (data) => {
    const token = localStorage.getItem("token");

    const payload = {
      pacienteNome: data.nome,
      dataHora: `${data.data}T${data.hora}`,
      descricao: "Consulta agendada via sistema", // ou campo custom
      status: "EM_ESPERA",
      psicologo: psicologos.find((p) => p.nome === data.psicologo) || null,
      cliente: pacientes.find((p) => p.nome === data.nome) || null,
    };

    fetch("http://localhost:8080/consultas/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao criar consulta");
        return res.json();
      })
      .then((novaConsulta) => {
        const consultaFormatada = {
          id: novaConsulta.id,
          nome: novaConsulta.pacienteNome,
          data: novaConsulta.dataHora.split("T")[0],
          hora: novaConsulta.dataHora.split("T")[1].substring(0, 5),
          psicologo: novaConsulta.psicologo?.nome || "",
          status:
            novaConsulta.status === "EM_ESPERA"
              ? "Em espera"
              : novaConsulta.status === "CONCLUIDA"
                ? "Concluída"
                : "Cancelada",
        };
        setConsultas((prev) => [...prev, consultaFormatada]);
      })
      .catch((err) => console.error(err));
  };

  // UPDATE
  const editarConsulta = (id, novosDados) => {
    const token = localStorage.getItem("token");

    const payload = {
      pacienteNome: novosDados.nome,
      dataHora: `${novosDados.data}T${novosDados.hora}`,
      descricao: "Consulta atualizada via sistema",
      status:
        novosDados.status === "Cancelada"
          ? "CANCELADA"
          : novosDados.status === "Concluída"
            ? "CONCLUIDA"
            : "EM_ESPERA",
      psicologo: psicologos.find((p) => p.nome === novosDados.psicologo) || null,
      cliente: pacientes.find((p) => p.nome === novosDados.nome) || null,
    };

    fetch(`http://localhost:8080/consultas/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar consulta");
        return res.json();
      })
      .then((consultaAtualizada) => {
        const consultaFormatada = {
          id: consultaAtualizada.id,
          nome: consultaAtualizada.pacienteNome,
          data: consultaAtualizada.dataHora.split("T")[0],
          hora: consultaAtualizada.dataHora.split("T")[1].substring(0, 5),
          psicologo: consultaAtualizada.psicologo?.nome || "",
          status:
            consultaAtualizada.status === "EM_ESPERA"
              ? "Em espera"
              : consultaAtualizada.status === "CONCLUIDA"
                ? "Concluída"
                : "Cancelada",
        };

        setConsultas((prev) =>
          prev.map((c) => (c.id === id ? consultaFormatada : c))
        );
      })
      .catch((err) => console.error(err));
  };

  // DELETE
  const excluirConsulta = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/consultas/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir consulta");
        setConsultas((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };


  const [psicologos, setPsicologos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "ADMIN") {
      fetch("http://localhost:8080/psicologos/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Falha ao buscar psicólogos");
          return res.json();
        })
        .then((data) => {
          setPsicologos(data);
        })
        .catch((err) => {
          console.error("Erro ao buscar psicólogos:", err);
        });
    } else {
      console.warn("Usuário sem role ADMIN ou sem token");
    }
  }, []);


  const adicionarPsicologo = (data) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "ADMIN") {
      fetch("http://localhost:8080/psicologos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Falha ao adicionar psicólogo");
          return res.json();
        })
        .then((novo) => {
          setPsicologos((prev) => [...prev, novo]);
        })
        .catch((err) => {
          console.error("Erro ao adicionar psicólogo:", err);
        });
    } else {
      console.warn("Usuário não autorizado para adicionar psicólogo.");
    }
  };

  const editarPsicologo = (id, novosDados) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/psicologos/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(novosDados)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao atualizar psicólogo");
        return res.json();
      })
      .then((atualizado) => {
        setPsicologos((prev) =>
          prev.map((p) => (p.id === id ? atualizado : p))
        );
      })
      .catch((err) => {
        console.error("Erro ao atualizar psicólogo:", err);
      });
  };

  const excluirPsicologo = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/psicologos/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setPsicologos((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao excluir psicólogo:", err);
      });
  };

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

  const carregarPacientes = () => {
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
          setPacientes(data);
        })
        .catch((err) => {
          console.error("Erro ao buscar pacientes:", err);
        });
    } else {
      console.warn("Nenhum token encontrado — faça login primeiro.");
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);


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

  const adicionarPaciente = (data) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/clientes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao adicionar paciente");
        return res.json();
      })
      .then((novo) => {
        setPacientes((prev) => [...prev, novo]);
      })
      .catch((err) => console.error(err));
  };

  const editarPaciente = (id, novosDados) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/clientes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novosDados),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao editar paciente");
        return res.json();
      })
      .then((atualizado) => {
        setPacientes((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
      })
      .catch((err) => console.error(err));
  };

  const excluirPaciente = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/clientes/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir paciente");
        setPacientes((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
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
        carregarPacientes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
