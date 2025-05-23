import React, { useState } from "react";
import "./LoginPaciente.css";

const LoginPaciente = ({ modoModal = false, abrirCadastro }) => {
  const [dados, setDados] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const aoAlterar = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const novosErros = {};
    if (!dados.email.trim()) {
      novosErros.email = "E-mail é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(dados.email)) {
      novosErros.email = "E-mail inválido";
    }

    if (!dados.senha) {
      novosErros.senha = "Senha é obrigatória";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const aoEnviar = async (e) => {
  e.preventDefault();
  if (!validar()) return;

  setCarregando(true);
  try {
    const resposta = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: dados.email,
        senha: dados.senha,
      }),
    });

    if (!resposta.ok) {
      throw new Error("E-mail ou senha incorretos");
    }

    const resultado = await resposta.json();
    const token = resultado.token;

    localStorage.setItem("token", token);

    alert("Login realizado com sucesso!");

    // window.location.href = "/dashboard";

  } catch (erro) {
    setErros((prev) => ({
      ...prev,
      geral: erro.message || "Erro ao fazer login",
    }));
  } finally {
    setCarregando(false);
  }
};


  return (
    <div className={modoModal ? "" : "login-container"}>
      <form onSubmit={aoEnviar} className="login-formulario">
        <div className="login-header">
          <h2 className="login-titulo">Login do Paciente</h2>
          <p className="login-subtitulo">Acesse sua conta</p>
        </div>

        {erros.geral && <div className="login-erro-geral">{erros.geral}</div>}

        <div className="login-grupo-formulario">
          <label className="login-label">E-mail*</label>
          <input
            type="email"
            name="email"
            value={dados.email}
            onChange={aoAlterar}
            placeholder="seu@email.com"
            className="login-input"
          />
          {erros.email && <span className="login-erro">{erros.email}</span>}
        </div>

        <div className="login-grupo-formulario">
          <label className="login-label">Senha*</label>
          <input
            type="password"
            name="senha"
            value={dados.senha}
            onChange={aoAlterar}
            placeholder="Digite sua senha"
            className="login-input"
          />
          {erros.senha && <span className="login-erro">{erros.senha}</span>}
        </div>

        <label className="login-lembrar">
          <input
            type="checkbox"
            checked={lembrar}
            onChange={(e) => setLembrar(e.target.checked)}
            className="login-checkbox"
          />
          <span className="login-lembrar-texto">Lembrar de mim</span>
        </label>

        <button
          type="submit"
          disabled={carregando}
          className={`login-botao ${carregando ? "login-botao-carregando" : ""}`}
        >
          {carregando ? (
            <>
              <span className="login-botao-spinner" /> Carregando...
            </>
          ) : (
            "Entrar"
          )}
        </button>

        <div className="login-rodape-formulario">
          Não tem uma conta? {" "}
          <span className="login-link" onClick={abrirCadastro}>
            Cadastre-se
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPaciente;