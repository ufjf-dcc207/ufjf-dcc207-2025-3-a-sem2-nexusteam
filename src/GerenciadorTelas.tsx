import "./estilos/GerenciadorTelas.css";
import Login from "./Login";
import InterfaceExibicao from "./InterfaceExibicao";
import FormularioNovoCriminoso from "./FormularioNovoCriminoso";
import RemoverCriminosoDoSistema from "./RemoverCriminosoDoSistema";
import Ficha from "./Ficha";
import { Filtro } from "./Filtro";
import Personagem from "./Personagem";
import type { Procurado, InfoUsuario } from "./ProcessadorListas";

type GerenciadorProps = {
    login: {
        teveLogin: boolean;
        mostraLogin: boolean;
        userInfo: InfoUsuario | null;
    };
    navegacao: {
        mostrarFormAdd: boolean;
        mostrarRemocao: boolean;
    };
    dados: {
        lista: Procurado[];
        listaFiltrada: Procurado[];
        filtros: {
            nome: string;
            estrela: number;
            status: string;
        };
        personagemFicha: Procurado | null;
        ultimoId: number;
    };
    acoes: {
        loginCompleto: (user: InfoUsuario) => void;
        submeterNovo: (novo: Procurado) => void;
        cancelarFormulario: () => void;
        remover: (id: number) => void;
        voltarParaHome: () => void;
        setFiltros: (filtros: any) => void;
        abrirFicha: (p: Procurado) => void;
        fecharFicha: () => void;
        pegarRecompensa: () => void;
    };
}

export function GerenciadorDeTelas({ login, navegacao, dados, acoes }: GerenciadorProps) {
    const deveMostrarFormularioAdicao = login.teveLogin && navegacao.mostrarFormAdd;
    const deveMostrarRemocao = login.teveLogin && navegacao.mostrarRemocao;

    if (login.mostraLogin && !login.teveLogin) {
        return <Login TemLogin={acoes.loginCompleto} />;
    }

    if (deveMostrarFormularioAdicao) {
        return (
            <InterfaceExibicao>
                <FormularioNovoCriminoso
                    submeter={acoes.submeterNovo}
                    cancelaSubmeter={acoes.cancelarFormulario}
                    ultimoId={dados.ultimoId}
                />
            </InterfaceExibicao>
        );
    }

    if (deveMostrarRemocao) {
        return (
            <InterfaceExibicao>
                <RemoverCriminosoDoSistema
                    lista={dados.lista}
                    onRemover={acoes.remover}
                    voltarPrincipal={acoes.voltarParaHome}
                />
            </InterfaceExibicao>
        );
    }

    if (dados.personagemFicha) {
        return (
            <InterfaceExibicao>
                <Ficha
                    nome={dados.personagemFicha.Nome}
                    subnome={dados.personagemFicha.Subnome}
                    imagem={dados.personagemFicha.Imagem}
                    nivelPerigo={dados.personagemFicha.NivelPerigo}
                    status={dados.personagemFicha.Status}
                    idade={dados.personagemFicha.Idade}
                    dataNascimento={dados.personagemFicha.DataDeNascimento}
                    recompensa={dados.personagemFicha.Recompensa}
                    peso={dados.personagemFicha.Peso}
                    altura={dados.personagemFicha.Altura}
                    descricao={dados.personagemFicha.Descricao}
                    crimes={dados.personagemFicha.Crimes}
                    ultimaLocalizacao={dados.personagemFicha.UltimaLocalizacao}
                    onVoltar={acoes.fecharFicha}
                    onPegarRecompensa={acoes.pegarRecompensa}
                />
            </InterfaceExibicao>
        );
    }

    return (
        <>
            <div className="interface-procurados">
                <h1 className="titulo-principal">PROCURADOS</h1>
                <Filtro filtros={dados.filtros} setFiltros={acoes.setFiltros} />
            </div>
            <InterfaceExibicao>
                {dados.listaFiltrada.map((personagem) => (
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
                            onVerFicha={() => acoes.abrirFicha(personagem)}
                            TemLogin={login.teveLogin}
                            tipoAcesso={login.userInfo?.nivelAcesso || ""}
                        />
                    </div>
                ))}
            </InterfaceExibicao>
        </>
    );
}