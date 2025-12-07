import { useState } from "react";
import type { InfoUsuario } from "../../ProcessadorListas";
import { useNavegacao } from "./useNavegacao";


export function useLogin() {
  const [login, setLogin] = useState({ teveLogin: false, nivelAcesso: "", userInfo: null as InfoUsuario | null, mostraLogin: false });
  const { setMostrarFormAddCriminoso, setMostrarRemocaoCriminoso } = useNavegacao();

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

  const LoginCompleto = (user: InfoUsuario) => {
    processarLogin(user);
    setMostrarFormAddCriminoso(false);
    setMostrarRemocaoCriminoso(false);
  };

  const LogoutCompleto = () => {
    processarLogout();
    setMostrarFormAddCriminoso(false);
    setMostrarRemocaoCriminoso(false);
  };

  const alternarLogin = () => {
    if (login.teveLogin) {
      LogoutCompleto();
    } else {
      alternarVisualizacaoLogin();
    }
  };

  return { login, LoginCompleto, LogoutCompleto, alternarLogin };
}