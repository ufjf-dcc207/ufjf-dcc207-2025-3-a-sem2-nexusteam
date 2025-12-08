import type { InfoUsuario } from "./ProcessadorListas";
import "./estilos/Login.css";
import { useLoginForm } from "./hooks/app/useLogin";

type LoginProps = {
  TemLogin: (usuario: InfoUsuario) => void;
}

export function Login({ TemLogin }: LoginProps) {
  const { credencialLogin, erro, inputUsuario, verificarLogin } = useLoginForm(TemLogin);

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
