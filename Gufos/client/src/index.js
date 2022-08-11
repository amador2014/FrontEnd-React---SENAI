// BIBLIOTECAS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//COMPONENTES - PAGES
import App from './pages/Home/App.js';
import Categorias from './pages/Categorias/Categorias.js';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.js';
import Login from './pages/Login/Login.js';
import Eventos from './pages/Eventos/Eventos.js';

//ROTAS - elementos pegos
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

//--componete em maiusculo vem da rota
const RotaPrivada = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-gufos") !== null ?
                (
                    <Component {...props} />// APP, Home, Login, NaoEncontrado
                    // ... pega os atributos de outro componente e já o atribui
                ) : (
                    <Redirect 
                        to = {{pathname: "/login", state: {from: props.location}}}
                    />
            )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <RotaPrivada path='/categorias' component={Categorias} />
                <Route path='/login' component={Login} />
                <RotaPrivada path='/eventos' component={Eventos}/>
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
