import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { InfoUsuario } from "../../ProcessadorListas";
import { Usuario } from "../../ProcessadorListas";
import { buscarUsuario } from "../../utilitarios/utils";

export type DadosLogin = {
  email: string;
  senha: string;
};


export function useLogin() {
  const [login, setLogin] = useState({ teveLogin: false, nivelAcesso: "", userInfo: null as InfoUsuario | null, mostraLogin: false });

  const processarLogin = (user: InfoUsuario) => {
    setLogin(prevLogin => ({ ...prevLogin, userInfo: user, teveLogin: true, mostraLogin: false }));
  };

  const processarLogout = () => {
    setLogin(prevLogin => ({ ...prevLogin, userInfo: null, teveLogin: false, mostraLogin: false }));
  };

  const alternarVisualizacaoLogin = () => {
    if (login.teveLogin) {
      processarLogout();
    } else {
      setLogin(prevLogin => ({ ...prevLogin, mostraLogin: !prevLogin.mostraLogin }));
    }
  };

  return { login, processarLogin, processarLogout, alternarVisualizacaoLogin };
}

export function useLoginForm(TemLogin: (usuario: InfoUsuario) => void) {
  const [credencialLogin, setCredencialLogin] = useState<DadosLogin>({ email: "", senha: "" });
  const [erro, setErro] = useState<string>("");

  const inputUsuario = (evento: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setCredencialLogin({ ...credencialLogin, [name]: value });
  };

  const verificarLogin = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuarioEncontrado = buscarUsuario(Usuario, credencialLogin);
    if (usuarioEncontrado) {
      TemLogin(usuarioEncontrado);
      setErro("");
    } else {
      setErro("Email ou senha incorretos");
      setCredencialLogin({ email: "", senha: "" });
    }
  };

  return { credencialLogin, erro, inputUsuario, verificarLogin };
}
