import "./estilos/App.css";
import type { InfoUsuario, Procurado } from "./ProcessadorListas";
import { Cabecalho } from "./Cabecalho";
import { GerenciadorDeTelas } from "./GerenciadorTelas";
import { useFiltroProcurados } from "./hooks/app/useFiltroProcurados";
import { useLogin } from "./hooks/login/useLogin";
import { useGerenciadorProcurados } from "./hooks/app/useGerenciadorProcurados";
import { useNavegacao } from "./hooks/app/useNavegacao";
import { useFicha } from "./hooks/app/useFicha";


function App() {

  const { login, processarLogin, processarLogout, alternarVisualizacaoLogin } = useLogin();
  const { listaAtualizada, adicionarProcurado, removerCriminoso } = useGerenciadorProcurados();
  const { mostrarFormAddCriminoso, mostrarRemocaoCriminoso, clickOn, clickRemover, voltarPrincipal } = useNavegacao();
  const { personagemSelecionadoFicha, clickVerFicha, clickVoltar, clickPegarRecompensa } = useFicha();
  const { filtros, setFiltros, listaFiltrada } = useFiltroProcurados(listaAtualizada);

  const LoginCompleto = (user: InfoUsuario) => {
    processarLogin(user);
    voltarPrincipal();
  };

  const alternarLogin = () => {
    if (login.teveLogin) {
      processarLogout();
      voltarPrincipal();
    } else {
      alternarVisualizacaoLogin();
    }
  };

  const submeterNovoCriminoso = (novo: Procurado) => {
    adicionarProcurado(novo);
    voltarPrincipal();
  };


  return (
    <div className="App">
      <Cabecalho
        TemLogin={login.teveLogin}
        nivelAcesso={login.userInfo?.nivelAcesso}
        usuario={login.userInfo}
        onClickLogin={alternarLogin}
        clickOn={clickOn}
        onClickRemover={clickRemover}
        onClickVisualizar={voltarPrincipal}
      />

      <GerenciadorDeTelas
        login={login}
        navegacao={{
          mostrarFormAdd: mostrarFormAddCriminoso,
          mostrarRemocao: mostrarRemocaoCriminoso,
        }}
        dados={{
          lista: listaAtualizada,
          listaFiltrada: listaFiltrada,
          filtros: filtros,
          personagemFicha: personagemSelecionadoFicha,
          ultimoId: listaAtualizada.length ? Math.max(...listaAtualizada.map((p) => p.id)) : 0,
        }}
        acoes={{
          loginCompleto: LoginCompleto,
          submeterNovo: submeterNovoCriminoso,
          cancelarFormulario: voltarPrincipal,
          remover: removerCriminoso,
          voltarParaHome: voltarPrincipal,
          setFiltros: setFiltros,
          abrirFicha: clickVerFicha,
          fecharFicha: clickVoltar,
          pegarRecompensa: clickPegarRecompensa,
        }}
      />
    </div>
  );
}

export default App;