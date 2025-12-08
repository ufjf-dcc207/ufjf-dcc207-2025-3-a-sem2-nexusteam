import "./estilos/App.css";
import Personagem from "./Personagem";
import type { InfoUsuario, Procurado } from "./ProcessadorListas";
import InterfaceExibicao from "./InterfaceExibicao";
import Ficha from "./Ficha";
import Login from "./Login";
import { Filtro } from "./Filtro";
import { Cabecalho } from "./Cabecalho";
import FormularioNovoCriminoso from "./FormularioNovoCriminoso";
import RemoverCriminosoDoSistema from "./RemoverCriminosoDoSistema";
import { useFiltroProcurados } from "./hooks/app/useFiltroProcurados";
import { useLogin } from "./hooks/app/useLogin";
import { useGerenciadorProcurados } from "./hooks/app/useGerenciadorProcurados";
import { useNavegacao } from "./hooks/app/useNavegacao";
import { useFicha } from "./hooks/app/useFicha";


function App() {

  const { login, processarLogin, processarLogout, alternarVisualizacaoLogin } = useLogin();
  const { listaAtualizada, adicionarProcurado, removerCriminoso } = useGerenciadorProcurados();
  const { mostrarFormAddCriminoso, mostrarRemocaoCriminoso, clickOn, clickRemover, voltarPrincipal } = useNavegacao();
  const { personagemSelecionadoFicha, clickVerFicha, clickVoltar, clickPegarRecompensa } = useFicha();
  const { filtros, setFiltros, listaFiltrada } = useFiltroProcurados(listaAtualizada);

  const deveMostrarFormularioAdicao = login.teveLogin && mostrarFormAddCriminoso;
  const deveMostrarRemocao = login.teveLogin && mostrarRemocaoCriminoso;


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

  const cancelarNovoCriminoso = () => {
    voltarPrincipal();
  };


  const renderizarConteudo = () => {
    if (login.mostraLogin && !login.teveLogin) {
      return <Login TemLogin={LoginCompleto} />;
    }

    if (deveMostrarFormularioAdicao) {
      return (
        <InterfaceExibicao>
          <FormularioNovoCriminoso
            submeter={submeterNovoCriminoso}
            cancelaSubmeter={cancelarNovoCriminoso}
            ultimoId={listaAtualizada.length ? Math.max(...listaAtualizada.map(p => p.id)) : 0}
          />
        </InterfaceExibicao>
      );
    }

    if (deveMostrarRemocao) {
      return (
        <InterfaceExibicao>
          <RemoverCriminosoDoSistema
            lista={listaAtualizada}
            onRemover={removerCriminoso}
            voltarPrincipal={voltarPrincipal}
          />
        </InterfaceExibicao>
      );
    }

    if (personagemSelecionadoFicha) {
      return (
        <InterfaceExibicao>
          <Ficha
            nome={personagemSelecionadoFicha.Nome}
            subnome={personagemSelecionadoFicha.Subnome}
            imagem={personagemSelecionadoFicha.Imagem}
            nivelPerigo={personagemSelecionadoFicha.NivelPerigo}
            status={personagemSelecionadoFicha.Status}
            idade={personagemSelecionadoFicha.Idade}
            dataNascimento={personagemSelecionadoFicha.DataDeNascimento}
            recompensa={personagemSelecionadoFicha.Recompensa}
            peso={personagemSelecionadoFicha.Peso}
            altura={personagemSelecionadoFicha.Altura}
            descricao={personagemSelecionadoFicha.Descricao}
            crimes={personagemSelecionadoFicha.Crimes}
            ultimaLocalizacao={personagemSelecionadoFicha.UltimaLocalizacao}
            onVoltar={clickVoltar}
            onPegarRecompensa={clickPegarRecompensa}
          />
        </InterfaceExibicao>
      );
    }

    return (
      <>
        <div className="interface-procurados">
          <h1 className="titulo-principal">PROCURADOS</h1>
          <Filtro filtros={filtros} setFiltros={setFiltros} />
        </div>
        <InterfaceExibicao>
          {listaFiltrada.map((personagem) => (
            <div className="card" key={personagem.id}>
              <Personagem
                nome={personagem.Nome}
                subnome={personagem.Subnome}
                imagem={personagem.Imagem}
                nivelPerigo={personagem.NivelPerigo}
                status={personagem.Status}
                idade={personagem.Idade}
                dataNascimento={personagem.DataDeNascimento}
                recompensa={personagem.Recompensa}
                onVerFicha={() => clickVerFicha(personagem)}
                TemLogin={login.teveLogin}
                tipoAcesso={login.userInfo?.nivelAcesso || ""}
              />
            </div>
          ))}
        </InterfaceExibicao>
      </>
    );
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
      {renderizarConteudo()}
    </div>
  );
}

export default App;