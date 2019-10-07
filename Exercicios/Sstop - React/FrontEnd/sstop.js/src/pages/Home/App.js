import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      listaEstilos: [],
      nome: '',
      idBuscado: null,
      estiloBuscasdo: {
        idEstilo: null,
        nome: ''
      }
    }
  }

  listarEstilos = () => {
    fetch('http://localhost:5000/api/Estilos')
      .then(data => data.json())
      .then(res => { this.setState({ listaEstilos: res }) })
      .catch(erro => alert('Algum erro aconteceu :('))
    // console.log(this.state.listaEstilos)
  }

  getValorId = (event) => {
    this.setState({ idBuscado: event.target.value })
  }

  BuscarPorId = () => {
    fetch('http://localhost:5000/api/Estilos/' + this.state.idBuscado)
      .then(data => data.json())
      .then(res => {
        this.setState({
          estiloBuscasdo: {
            idEstilo: res.idEstilo,
            nome: res.nome
          }
        })
      })
      .catch(erro => alert('Algum erro aconteceu :('))
    console.log(this.state.estiloBuscasdo)
  }

  componentDidMount() {
    this.listarEstilos()
  }

  cadastrarEstilos = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:5000/api/Estilos', {
      nome: this.state.nome
    }, {
        'Content-Type': 'application/json'
      })
    this.listarEstilos()
  }

  setarInput = (event) => {
    this.setState({ nome: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-10">
              <div className="input-group mb-3">
                <input value={this.state.nome} onChange={this.setarInput} type="text" id="nomeEstilo" className="form-control" placeholder="Nome do Estilo Musical"
                  aria-label="nome" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group-prepend">
                <input
                  onChange={this.getValorId}
                  className="input-group-text form-control"
                  id="basic-addon1"
                  type="number"
                  placeholder="Id Estilo"
                  id="nomeEstilo"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-2">
              <input onClick={this.cadastrarEstilos} className="btn btn-primary" type="submit" value="Cadastrar" id="btnCadastrar" />
              <input onClick={this.BuscarPorId} className="btn btn-primary" type="submit" value="Buscar" id="btnCadastrar" />
            </div>

          </div>

          <div className="row">
            <div className="col-12">
              <table className="table table-hover" id="tabela-lista">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                  </tr>
                </thead>
                <tbody id="tabela-lista-corpo">
                  {this.state.listaEstilos.map(element => {
                    return (
                      <tr key={element.idEstilo}>
                        <td scope="col">{element.idEstilo}</td>
                        <td scope="col">{element.nome}</td>
                      </tr>
                    )
                  })}
                </tbody>
                </table>

                <table className="table table-hover" id="tabela-lista">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                    </tr>
                  </thead>
                  <tbody id="tabela-lista-corpo">

                    <tr >
                      <td scope="col">{this.state.estiloBuscasdo.idEstilo}</td>
                      <td scope="col">{this.state.estiloBuscasdo.nome}</td>
                    </tr>
                  </tbody>
                </table>
            </div >
          </div >
        </div >
      </div >
    )
  }
}

