// BIBLIOTECAS
import React, { Component } from "react";

// CSS
import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

// COMPONENTES
import Axios from "axios";
import Rodape from '../../components/Rodape';
import Titulo from '../../components/Titulos';

// IMG
import logo from '../../assets/img/icon-login.png'
import { promises } from "fs";
import { tupleTypeAnnotation } from "@babel/types";

export default class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaEvento: [],
            tituloE: '',
            localizacao: '',
            dataEvento: '',
            descricao: '',
            listaCategoria: [],
            ativo: '',
            idCategoria: ''
        }
    }

    listarEventos = () => {
        //event.preventDefault();
        Axios.get('http://192.168.7.85:5000/api/eventos')
            .then(response => {
                console.log(response.data)
                this.setState({ listaEvento: response.data })
            })
    };

    listarCategorias = () => {
        //axios - setar state
        Axios.get('http://192.168.7.85:5000/api/Categorias')
            .then(resposta => {
                this.setState({ listaCategoria: resposta.data })
            })
    };

    setarValorTitulo = (event) => {
        this.setState({ tituloE: event.target.value });
    }

    setarValorLocalizacao = (event) => {
        this.setState({ localizacao: event.target.value });
    }

    setarValorEvento = (event) => {
        this.setState({ dataEvento: event.target.value });
    }

    setarValorDescricao = (event) => {
        this.setState({ descricao: event.target.value });
    }

    setarValorSelect2 = (event) => {
        this.setState({ idCategoria: event.target.value });
        //console.log(event.target.value);
    }

    setarValorSelect1 = (event) => {
        if (event.target.value == 1) {
            this.setState({ ativo: true });
        }else{
            this.setState({ ativo: false });
        }
    }


    CadastrarEvento = (event) => {
        event.preventDefault();

        fetch('http://192.168.7.85:5000/api/eventos', {
            method: "POST",
            body: JSON.stringify({

                localizacao: this.state.localizacao,
                dataEvento: this.state.dataEvento,
                descricao: this.state.descricao,
                ativo: this.state.ativo,
                idCategoria: this.state.idCategoria
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(promise => this.listarEventos())
        .catch(erro => alert('Algum Erro Aconteceu, Tente Novamente'));
    }

    // EVitelli
    //----------

    componentDidMount() {
        this.listarEventos();
        this.listarCategorias();
    };

    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} />
                        <nav className="cabecalhoPrincipal-nav">Administrador</nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        {/* <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1> */}
                        <Titulo titulo='Eventos' />
                        <div className="container" id="conteudoPrincipal-lista">

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>
                                <tbody id="tabela-lista-corpo">
                                    {this.state.listaEvento.map(element => {
                                        return (
                                            <tr>
                                                <td> {element.idEvento} </td>
                                                <td> {element.titulo} </td>
                                                <td> {element.dataEvento} </td>
                                                <td> {(element.ativo) ? 'Sim' : 'Não'}</td>
                                                <td> {element.idCategoriaNavigation.nome} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 classNameName="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">
                                <input
                                    type="text"
                                    id="evento__titulo"
                                    placeholder="título do evento"
                                    value={this.state.tituloE}
                                    onChange={this.setarValorTitulo} />
                                <input
                                    type="text"
                                    id="evento__localizacao"
                                    placeholder="localização"
                                    value={this.state.localizacao}
                                    onChange={this.setarValorLocalizacao} />
                                <input
                                    type="date"
                                    id="evento__data"
                                    placeholder="dd/MM/yyyy"
                                    value={this.state.dataEvento}
                                    onChange={this.setarValorEvento} />

                                <select
                                    id="option__acessolivre"
                                    onChange={this.setarValorSelect1}
                                >
                                    <option value="1">Ativo</option>
                                    <option value="0">Desativo</option>
                                </select>

                                <select
                                    id="option__tipoevento"
                                    onChange={this.setarValorSelect2}
                                >
                                    <option value="0" selected disabled>Categoria</option>
                                    {this.state.listaCategoria.map(element => {
                                        return (
                                            <option
                                                value={element.idCategoria}
                                            >{element.nome}</option>
                                        );
                                    })}
                                </select>

                                <textarea
                                    rows="3"
                                    cols="50"
                                    placeholder="descrição do evento"
                                    id="evento__descricao"
                                    value={this.state.descricao}
                                    onChange={this.setarValorDescricao} >
                                </textarea>
                            </div>
                            <button
                                className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                onClick={this.CadastrarEvento}
                            >Cadastrar</button>
                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}