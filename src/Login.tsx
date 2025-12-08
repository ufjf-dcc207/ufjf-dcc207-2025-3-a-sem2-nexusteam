import React, { useState } from "react";
import { Usuario, type InfoUsuario } from "./ProcessadorListas";
import "./estilos/Login.css";
import { buscarUsuario } from "./utilitarios/utils";

type LoginProps = {
  TemLogin: (usuario: InfoUsuario) => void;
}

type DadosLogin = {
  email: string;
  senha: string;
}

export function Login({ TemLogin }: LoginProps) {
  const [credencialLogin, setCredencialLogin] = useState<DadosLogin>({ email: "", senha: "" });
  const [erro, setErro] = useState<string>("");

  const inputUsuario = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setCredencialLogin({ ...credencialLogin, [name]: value });
  }

  const verificarLogin = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuarioEncontrado = buscarUsuario(Usuario, credencialLogin);
    if (usuarioEncontrado) {
      TemLogin(usuarioEncontrado);
    } else {
      setErro("Email ou senha incorretos");
      setCredencialLogin({ email: "", senha: "" });
    }
  }

  return (
    <div className="container-acesso">
      <form className="caixa-acesso" onSubmit={verificarLogin}>
        <h2> Acesso ao sistema como Agente, Caçador ou Administrador</h2>
        <p>Insira suas credenciais</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credencialLogin.email}
          onChange={inputUsuario}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={credencialLogin.senha}
          onChange={inputUsuario}
          required
        />

        {erro && <p className="mensagem-erro">{erro}</p>}

        <button className="botao-cancelar-login" type="button" onClick={() => window.location.reload()}>Cancelar</button>
        <button className="botao-entrar" type="submit">Entrar</button>

        <p className="mensagem-aviso">
          Ex: exemplo@nexus.com / senha123
        </p>
      </form>
    </div>
  );
};

export default Login;
