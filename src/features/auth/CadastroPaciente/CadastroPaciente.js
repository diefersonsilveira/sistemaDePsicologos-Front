import React, { useState } from "react";
import "./CadastroPaciente.css";

const CadastroPaciente = ({ modoModal = false, abrirLogin }) => {
  const [dados, setDados] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    celular: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    endereco: "",
    cidade: "",
    observacoes: "",
  });

  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);

  const aoAlterar = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const novosErros = {};
    if (!dados.nomeCompleto.trim()) novosErros.nomeCompleto = "Nome completo é obrigatório";
    if (!dados.cpf.trim()) novosErros.cpf = "CPF é obrigatório";
    if (!dados.dataNascimento) novosErros.dataNascimento = "Data de nascimento é obrigatória";
    if (!dados.celular.trim()) novosErros.celular = "Celular é obrigatório";
    if (!dados.email.trim()) novosErros.email = "E-mail é obrigatório";
    if (!dados.senha) {
      novosErros.senha = "Senha é obrigatória";
    } else if (dados.senha.length < 6) {
      novosErros.senha = "Senha deve ter no mínimo 6 caracteres";
    }
    if (dados.senha !== dados.confirmarSenha) {
      novosErros.confirmarSenha = "Senhas não coincidem";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const aoEnviar = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setCarregando(true);
    try {
      console.log(dados);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Cadastro realizado com sucesso!");
      setDados({
        nomeCompleto: "",
        cpf: "",
        dataNascimento: "",
        celular: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        cep: "",
        endereco: "",
        cidade: "",
        observacoes: "",
      });
    } catch {
      setErros((prev) => ({
        ...prev,
        geral: "Erro ao cadastrar. Tente novamente.",
      }));
    } finally {
      setCarregando(false);
    }
  };

  const buscarEnderecoPorCEP = async (cep) => {
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setDados((prev) => ({
            ...prev,
            endereco: `${data.logradouro || ""}${data.bairro ? `, ${data.bairro}` : ""}`,
            cidade: data.localidade || "",
          }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  };

  const formatarCPF = (v) =>
    v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").slice(0, 14);

  const formatarCelular = (v) =>
    v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);

  const formatarCEP = (v) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

  const aoAlterarMascara = (e) => {
    const { name, value } = e.target;
    let valor = value;
    if (name === "cpf") valor = formatarCPF(value);
    if (name === "celular") valor = formatarCelular(value);
    if (name === "cep") valor = formatarCEP(value);
    setDados((prev) => ({ ...prev, [name]: valor }));
    if (name === "cep") buscarEnderecoPorCEP(value);
  };

  return (
    <div className={modoModal ? "" : "cadastro-container"}>
      <form onSubmit={aoEnviar} className="cadastro-formulario">
        <div className="cadastro-header">
          <h2 className="cadastro-titulo">Cadastro de Paciente</h2>
          <p className="cadastro-subtitulo">Preencha seus dados para criar uma conta</p>
        </div>

        {erros.geral && <div className="cadastro-erro-geral">{erros.geral}</div>}

        <div className="cadastro-grid">
          <Campo label="Nome Completo*" name="nomeCompleto" value={dados.nomeCompleto} onChange={aoAlterar} placeholder="Digite seu nome completo" error={erros.nomeCompleto} />
          <Campo label="CPF*" name="cpf" value={dados.cpf} onChange={aoAlterarMascara} placeholder="000.000.000-00" maxLength="14" error={erros.cpf} />
          <Campo label="Data de Nascimento*" name="dataNascimento" value={dados.dataNascimento} onChange={aoAlterar} type="date" placeholder="dd/mm/aaaa" error={erros.dataNascimento} />
          <Campo label="Celular*" name="celular" value={dados.celular} onChange={aoAlterarMascara} placeholder="(00) 00000-0000" maxLength="15" error={erros.celular} />
          <Campo label="E-mail*" name="email" value={dados.email} onChange={aoAlterar} placeholder="seu@email.com" type="email" error={erros.email} />
          <Campo label="Senha*" name="senha" value={dados.senha} onChange={aoAlterar} placeholder="Mínimo 6 caracteres" type="password" minLength="6" error={erros.senha} />
          <Campo label="Confirmar Senha*" name="confirmarSenha" value={dados.confirmarSenha} onChange={aoAlterar} placeholder="Repita a senha" type="password" minLength="6" error={erros.confirmarSenha} />
          <Campo label="CEP" name="cep" value={dados.cep} onChange={aoAlterarMascara} placeholder="00000-000" maxLength="9" />
          <Campo label="Cidade" name="cidade" value={dados.cidade} onChange={aoAlterar} placeholder="Cidade" disabled />
        </div>

        <div className="cadastro-grupo">
          <label className="cadastro-label">Endereço</label>
          <input
            name="endereco"
            value={dados.endereco}
            onChange={aoAlterar}
            className="cadastro-input"
            placeholder="Rua, Número, Bairro"
          />
        </div>

        <div className="cadastro-grupo">
          <label className="cadastro-label">Observações</label>
          <textarea
            name="observacoes"
            value={dados.observacoes}
            onChange={aoAlterar}
            className="cadastro-textarea"
            placeholder="Informações adicionais."
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className={`cadastro-botao ${carregando ? "cadastro-botao-carregando" : ""}`}
        >
          {carregando ? (
            <>
              <span className="cadastro-botao-spinner" /> Cadastrando...
            </>
          ) : (
            "Cadastrar Paciente"
          )}
        </button>

        <div className="cadastro-rodape">
          Já tem uma conta? {" "}
          <span className="cadastro-link" onClick={abrirLogin}>
            Faça login
          </span>
        </div>
      </form>
    </div>
  );
};

const Campo = ({ label, name, value, onChange, type = "text", error, placeholder, ...rest }) => (
  <div className="cadastro-grupo">
    <label className="cadastro-label">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="cadastro-input"
      placeholder={placeholder}
      {...rest}
    />
    {error && <span className="cadastro-erro">{error}</span>}
  </div>
);

export default CadastroPaciente;