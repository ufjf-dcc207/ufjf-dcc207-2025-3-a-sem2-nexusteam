import { useState } from "react";
import type { InfoUsuario } from "../../ProcessadorListas";


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