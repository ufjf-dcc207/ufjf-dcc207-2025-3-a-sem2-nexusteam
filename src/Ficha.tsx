import "./estilos/Ficha.css";
import type { PersonagemProps } from "./Personagem";
import {
    situacaoStatus, statusValido, idadeValida, nivelPerigoValido, trataRecompensa,
    formataIdade, checaDataNascimento, trataData
} from './utilitarios/utils';

interface FichaProps extends PersonagemProps {
    onVoltar: () => void;
    onPegarRecompensa: () => void;
}

export default function Ficha({ nome, subnome, imagem, nivelPerigo, status, idade, dataNascimento, recompensa, peso, altura, descricao, crimes, ultimaLocalizacao, onVoltar, onPegarRecompensa }: FichaProps) {
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
    recompensaValida = trataRecompensa(recompensa, status);

    return (
        <div className="ficha">
            <div className="nome-ficha"><h2>{nome}</h2></div>
            <div className='subnome-ficha'><h3>{subnome}</h3></div>
            <div className="imagem-ficha"><img src={imagem} alt={nome} /></div>
            <div className="nivel-perigo-ficha"><p>Nível de Perigo: </p></div>
            <div className='estrela-ficha'><p>{'⭐'.repeat(nivelPerigo) + '☆'.repeat(5 - nivelPerigo)}</p></div>
            <div className="status-ficha"><p>Status: <span className={situacao}>{status}</span></p></div>
            <div className="idade-ficha"><p>Idade: <span className={desconhecidoIdade}>{idade}</span></p></div>
            <div className="data-nascimento-ficha"><p>Nascimento: <span className={desconhecidoData}>{dataFormatada}</span></p></div>
            <div className="recompensa-ficha"><p>Recompensa: {recompensaValida}</p></div>
            <div className="peso-ficha"><p>Peso: {peso}</p></div>
            <div className="altura-ficha"><p>Altura: {altura}</p></div>
            <div className="descricao-ficha"><h4>Histórico</h4> <p>{descricao}</p></div>
            <div className="crimes-ficha"><h4>Crimes Conhecidos</h4> <p><strong>Crimes:</strong> {crimes?.join(', ')}</p></div>
            <div className="ultima-localizacao-ficha"><p>Última Localização: {ultimaLocalizacao}</p></div>
            <button className="botao-voltar" onClick={onVoltar}>Voltar</button>
            <button className="botao-pegar-recompensa" onClick={onPegarRecompensa}>Pegar Recompensa</button>
        </div>
    );
}