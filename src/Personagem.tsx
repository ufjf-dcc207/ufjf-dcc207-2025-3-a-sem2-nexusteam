export type Status = "Foragido" | "Morto" | "Capturado" | "Desconhecido";
import './estilos/Personagem.css';
import {
    situacaoStatus, statusValido, idadeValida, nivelPerigoValido, trataRecompensa,
    formataIdade, checaDataNascimento, trataData, formataPalavra, mudarEstiloImgPorStatus,
} from './utilitarios/utils';
import { usePersonagem } from './hooks/personagem/usePersonagem';

type PersonagemProps = {
    nome: string;
    subnome: string;
    imagem: string;
    nivelPerigo: number;
    status: Status;
    idade: number | string;
    dataNascimento: string;
    recompensa: number;
    peso?: string;
    altura?: string;
    descricao?: string;
    crimes?: string[];
    ultimaLocalizacao?: string;
    onVerFicha: () => void;
    TemLogin: boolean;
    tipoAcesso: string;
}

export default function Personagem({ nome, subnome, imagem, nivelPerigo, status, idade, dataNascimento,
    recompensa, peso, altura, descricao, crimes, ultimaLocalizacao, onVerFicha, TemLogin, tipoAcesso }: PersonagemProps) {
    let desconhecidoData: string = "";
    let dataFormatada: string;
    let desconhecidoIdade: string = "";
    let situacao;
    let recompensaValida;

    status = statusValido(status);
    situacao = situacaoStatus(status);
    nivelPerigo = nivelPerigoValido(nivelPerigo);
    desconhecidoData = checaDataNascimento(dataNascimento);
    dataFormatada = trataData(dataNascimento);
    idade = idadeValida(idade);
    desconhecidoIdade = formataIdade(idade);
    recompensaValida = trataRecompensa(recompensa, situacao);

    const { atributos, onMudarStatus, onVoltarStatus, onAdicionarEstrela, onRemoverEstrela } = usePersonagem(nivelPerigo, situacao, recompensaValida);

    return (
        <div className={`personagem ${atributos.status === 'morto' ? 'morto' : ''} ${atributos.status === 'capturado' ? 'capturado' : ''}`}>
            <div className="nome"><h2>{nome}</h2></div>
            <div className='subnome'><h3>{subnome}</h3></div>
            <div className="imagem"><img className={mudarEstiloImgPorStatus(atributos.status)} src={imagem} alt={nome} />
            </div>
            <div className="nivel-perigo"><p>Nível de Perigo: </p></div>
            <div className='estrela'>
                {TemLogin && (tipoAcesso === 'administrador' || tipoAcesso === 'agente') ? <button className='botao-remove'> <img src="Icones/SetaEsq.png" alt="remover" onClick={onRemoverEstrela} /></button> : null}
                <p>{atributos.estrela}</p>
                {TemLogin && (tipoAcesso === 'administrador' || tipoAcesso === 'agente') ? <button className='botao-add'> <img src="Icones/SetaDir.png" alt="adicionar" onClick={onAdicionarEstrela} /></button> : null}
            </div>
            <div className="status">
                {TemLogin && (tipoAcesso === 'administrador' || tipoAcesso === 'agente') ? <button className='botao-voltar' ><img src="Icones/SetaEsq.png" alt="voltar" onClick={onVoltarStatus} /></button> : null}
                <p>Status: <span className={atributos.status}>{formataPalavra(atributos.status)}</span></p>
                {TemLogin && (tipoAcesso === 'administrador' || tipoAcesso === 'agente') ? <button className='botao-avancar'><img src="Icones/SetaDir.png" alt="avancar" onClick={onMudarStatus} /></button> : null}
            </div>
            <div className="idade"><p>Idade: <span className={desconhecidoIdade}>{idade}</span></p></div>
            <div className="data-nascimento"><p>Nascimento: <span className={desconhecidoData}>{dataFormatada}</span></p></div>
            <div className="recompensa">
                <p>Recompensa: {
                    atributos.status === 'capturado' || atributos.status === 'morto' ? 'Indisponível' : atributos.recompensa
                }</p>
            </div>
            {peso ? <div className="peso"><p>Peso: {peso}</p></div> : null}
            {altura ? <div className="altura"><p>Altura: {altura}</p></div> : null}
            {descricao ? <div className="descricao"><p>{descricao}</p></div> : null}
            {crimes && crimes.length > 0 ? <div className="crimes"><p><strong>Crimes:</strong> {crimes.slice(0, 5).join(', ')}{crimes.length > 5 ? '...' : ''}</p></div> : null}
            {ultimaLocalizacao ? <div className="ultima-localizacao"><p>Última Localização: {ultimaLocalizacao}</p></div> : null}
            <button className="botao-ficha" onClick={onVerFicha}>Ver Ficha</button>
        </div>
    );
}