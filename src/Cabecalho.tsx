import "./estilos/Cabecalho.css"
import type { InfoUsuario } from "./ProcessadorListas";

interface CabecalhoProps {
    TemLogin: boolean;
    nivelAcesso?: string;
    usuario?: InfoUsuario | null;
    onClickLogin: () => void;
    clickOn?: () => void;
    onClickRemover?: () => void;
    onClickVisualizar?: () => void;
}


export function Cabecalho({ TemLogin, nivelAcesso, usuario, onClickLogin, clickOn, onClickRemover, onClickVisualizar }: CabecalhoProps) {
    return (
        <>
            <div className="cabecalho-departamento">
                <div className="logo-container">
                    <img
                        src="Logos/DPNClogo.png"
                        alt="Logo do Departamento"
                        className="logo-departamento"
                    />
                </div>
                <div className="conteiner-navegacao">
                    <h2 className="nome-departamento">
                        Departamento  de Policia Nexus City
                    </h2>
                    <div className="botoes-navegacao">
                        <button className="botao-inicio">Início</button>
                        <button className="botao-procurados" onClick={onClickVisualizar}>Procurados</button>
                        <button className="botao-desaparecidos">Desaparecidos</button>
                        <button className="botao-denuncia">Denúncia</button>
                        <button className="botao-saibaMais">Saiba Mais</button>
                        {TemLogin ? (
                            <div className="cracha-usuario" onClick={onClickLogin} title="Clique para Sair">
                                <img
                                    src={usuario?.imagemPerfil || "Icones/profile.svg"}
                                    alt="Perfil"
                                    className="cracha-avatar"
                                />
                                <div className="cracha-info">
                                    <span className="cracha-nome">{usuario?.nome.split(' ')[0]}</span>
                                    <span className="cracha-nivel">{nivelAcesso}</span>
                                </div>
                            </div>
                        ) : (
                            <button className="botao-login" onClick={onClickLogin}>
                                <img src={"Icones/profile.svg"} alt="Login" className="svg-icone" />
                                <span>LOGIN</span>
                            </button>
                        )}

                        {TemLogin && (nivelAcesso === "cacador" || nivelAcesso === "caçador" || nivelAcesso === "administrador") ? (

                            <button className="botao-recompensa" title="Minhas Recompensas">
                                <img
                                    src={"Icones/money-bag.svg"}
                                    alt="Recompensas"
                                    className="svg-icone"
                                />
                            </button>
                        ) : (null)}
                        {TemLogin && (nivelAcesso === "agente" || nivelAcesso === "administrador") ? (
                            <button className="botao-adiciona-criminoso" title="Adicionar Criminoso" onClick={clickOn}>
                                <img src={"Icones/icons8-plusx.svg"}
                                    alt="Adicionar Criminoso"
                                    className="svg-icone"
                                />
                            </button>) : (null)}
                        {TemLogin && (nivelAcesso === "agente" || nivelAcesso === "administrador") ? (
                            <button className="botao-remover-criminoso" title="Remover Criminoso" onClick={onClickRemover}>
                                <img src={"Icones/menos.png"}
                                    alt="Remover Criminoso"
                                    className="svg-icone"
                                />
                            </button>) : (null)}
                    </div>
                </div>
            </div>
        </>
    )
}