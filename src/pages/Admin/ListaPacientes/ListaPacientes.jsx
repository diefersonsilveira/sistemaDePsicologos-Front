import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import "./ListaPacientes.css";

const ListaPacientes = () => {
  const { pacientes } = useAppContext();

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(null);
  const [form, setForm] = useState({
    nomeCompleto: "",
    cpf: "",
    dataDeNascimento: "",
    celular: "",
    login: "",
    cep: "",
    cidade: "",
    endereco: "",
    observacoes: ""
  });

  useEffect(() => {
    document.body.classList.toggle("modal-aberto", modalAberto);
    return () => document.body.classList.remove("modal-aberto");
  }, [modalAberto]);

  const abrirModalEdicao = (paciente) => {
    setModoEdicao(paciente.id);
    setForm({
      nomeCompleto: paciente.nomeCompleto || "",
      cpf: paciente.cpf || "",
      dataDeNascimento: paciente.dataDeNascimento || "",
      celular: paciente.celular || "",
      login: paciente.login || "",
      cep: paciente.cep || "",
      cidade: paciente.cidade || "",
      endereco: paciente.endereco || "",
      observacoes: paciente.observacoes || ""
    });
    setModalAberto(true);
  };

  const abrirModalNovo = () => {
    setModoEdicao(null);
    setForm({
      nomeCompleto: "",
      cpf: "",
      dataDeNascimento: "",
      celular: "",
      login: "",
      cep: "",
      cidade: "",
      endereco: "",
      observacoes: ""
    });
    setModalAberto(true);
  };

  const salvar = () => {
    // TODO: Implementar salvar no backend usando fetch POST/PUT
    console.log("Salvar paciente:", form);
    setModalAberto(false);
  };

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="pacientes-titulo">Lista de Pacientes</h1>
        <button className="btn-novo" onClick={abrirModalNovo}>+ Novo Paciente</button>

        <table className="tabela-pacientes">
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Celular</th>
              <th>Login</th>
              <th>Cidade</th>
              <th>Endereço</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.nomeCompleto}</td>
                <td>{paciente.cpf}</td>
                <td>{paciente.dataDeNascimento}</td>
                <td>{paciente.celular}</td>
                <td>{paciente.login}</td>
                <td>{paciente.cidade}</td>
                <td>{paciente.endereco}</td>
                <td>{paciente.observacoes}</td>
                <td>
                  <button className="btn-acao editar" onClick={() => abrirModalEdicao(paciente)}>Editar</button>
                  {/* Para excluir implemente se quiser */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAberto && (
          <div
            className="modal-sobreposicao"
            onClick={(e) =>
              e.target.className === "modal-sobreposicao" && setModalAberto(false)
            }
          >
            <div className="modal-conteudo" role="dialog" aria-modal="true">
              <button
                className="modal-fechar"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar modal"
              >
                ×
              </button>
              <h2>{modoEdicao ? "Editar Paciente" : "Novo Paciente"}</h2>
              <div className="modal-form">
                <label>Nome Completo</label>
                <input
                  type="text"
                  value={form.nomeCompleto}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nomeCompleto: e.target.value }))
                  }
                />
                <label>CPF</label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cpf: e.target.value }))
                  }
                />
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  value={form.dataDeNascimento}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, dataDeNascimento: e.target.value }))
                  }
                />
                <label>Celular</label>
                <input
                  type="text"
                  value={form.celular}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, celular: e.target.value }))
                  }
                />
                <label>Login</label>
                <input
                  type="text"
                  value={form.login}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, login: e.target.value }))
                  }
                />
                <label>CEP</label>
                <input
                  type="text"
                  value={form.cep}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cep: e.target.value }))
                  }
                />
                <label>Cidade</label>
                <input
                  type="text"
                  value={form.cidade}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cidade: e.target.value }))
                  }
                />
                <label>Endereço</label>
                <input
                  type="text"
                  value={form.endereco}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, endereco: e.target.value }))
                  }
                />
                <label>Observações</label>
                <textarea
                  value={form.observacoes}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, observacoes: e.target.value }))
                  }
                ></textarea>

                <button className="btn-salvar" onClick={salvar}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPacientes;
