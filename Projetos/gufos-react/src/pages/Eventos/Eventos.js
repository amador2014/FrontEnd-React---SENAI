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

export default class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaEvento: [],
            tituloE: '',
            listaCategoria: [],
        }
    }

    listarEventos = () => {
        //event.preventDefault();
        Axios.get('http://192.168.7.85:5000/api/eventos')
            .then(response => {
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
        this.setState({ tituloE: event.target.value});
        console.log(this.tituloE)
    }

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
                                    onChange={this.setarValorTitulo}
                                    value={this.state.tituloE} />
                                    
                                <input
                                    type="text"
                                    id="evento__localizacao"
                                    placeholder="localização" />
                                <input
                                    type="text"
                                    id="evento__data"
                                    placeholder="dd/MM/yyyy" />

                                <select id="option__acessolivre">
                                    <option value="1">Ativo</option>
                                    <option value="0">Desativo</option>
                                </select>

                                <select id="option__tipoevento">
                                    <option value="0" selected disabled>Categoria</option>
                                    {this.state.listaCategoria.map(element => {
                                        return (
                                            <option>{element.nome}</option>
                                        );
                                    })}
                                </select>

                                <textarea
                                    rows="3"
                                    cols="50"
                                    placeholder="descrição do evento"
                                    id="evento__descricao">
                                </textarea>
                            </div>
                            <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                        </div>
                    </section>
                </main>
                <Rodape />
            </div>
        )
    }
}