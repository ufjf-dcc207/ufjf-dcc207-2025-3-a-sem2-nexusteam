import "./estilos/App.css";
import { useState } from "react";
import Personagem from "./Personagem";
import InterfaceExibicao from "./InterfaceExibicao";
import Ficha from "./Ficha";
import Login from "./Login";
import { Cabecalho } from "./Cabecalho";
import FormularioNovoCriminoso from "./FormularioNovoCriminoso";
import RemoverCriminosoDoSistema from "./RemoverCriminosoDoSistema";
import { type InfoUsuario, type Procurado } from "./ProcessadorListas";
import { useFiltroProcurados } from "./hooks/app/useFiltroProcurados";
import { useLogin } from "./hooks/app/useLogin";
import { useGerenciadorProcurados } from "./hooks/app/useGerenciadorProcurados";
import { Filtro } from "./Filtro";


function App() {

  const { login, processarLogin, processarLogout, alternarVisualizacaoLogin } = useLogin();
  const { listaAtualizada, adicionarProcurado, removerProcurado } = useGerenciadorProcurados();
  
  const [mostrarFormAddCriminoso, setMostrarFormAddCriminoso] = useState(false); 
  const [mostrarRemocaoCriminoso, setMostrarRemocaoCriminoso] = useState(false);
  const [personagemSelecionadoFicha, setPersonagemSelecionadoFicha] = useState<Procurado | null>(null);
  const { filtros, setFiltros, listaFiltrada } = useFiltroProcurados(listaAtualizada);
  

  const clickOn = () => {
    setMostrarFormAddCriminoso(true);
    setMostrarRemocaoCriminoso(false);
  };

  const clickRemover = () => {
    setMostrarRemocaoCriminoso(true);
    setMostrarFormAddCriminoso(false);
  };

  const voltarPrincipal = () => {
    setMostrarRemocaoCriminoso(false);
  };

  const submeterNovoCriminoso = (novo: Procurado) => {
    adicionarProcurado(novo);
    setMostrarFormAddCriminoso(false);
  };

  const cancelarNovoCriminoso = () => {
    setMostrarFormAddCriminoso(false);
  };

  const removerCriminoso = (id: number) => {
    removerProcurado(id);
  };

  const deveMostrarFormularioAdicao = login.teveLogin && mostrarFormAddCriminoso;
  const deveMostrarRemocao = login.teveLogin && mostrarRemocaoCriminoso;
  
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

  const clickVerFicha = (personagem: Procurado) => {
    setPersonagemSelecionadoFicha(personagem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clickVoltar = () => {
    setPersonagemSelecionadoFicha(null);
  };

  const clickPegarRecompensa = () => {
    alert("Recompensa Pega!");
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