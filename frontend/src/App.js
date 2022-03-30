import React from 'react';
import { render } from "react-dom";
import {HashRouter, Route, Routes, Link} from 'react-router-dom'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import ProjectList from './components/Project.js';
import ToDoList from './components/ToDo.js';
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена!</h1>
        </div>
    )

}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                const next_page_users = response.data.next
                const previous_page_users = response.data.previous
                    this.setState(
                        {
                            'next_page_users': next_page_users,
                            'previous_page_users': previous_page_users,
                            'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data.results
                const next_page_todos = response.data.next
                const previous_page_todos = response.data.previous
                    this.setState(
                        {
                            'next_page_todos': next_page_todos,
                            'previous_page_todos': previous_page_todos,
                            'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token})
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }


    render() {
        return (
            <div>
                <Menu />
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDo list</Link>
                            </li>
                            <li>
                                <h2>{this.state.login}</h2>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Выйти</button> :
                                    <Link to='/login'>Войти</Link>}
                            </li>
                        </ul>
                    </nav>
                        <Routes>
                            <Route exact path='/users' element={<UserList users={this.state.users} /> }/>
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> }/>
                            <Route exact path='/todos' element={<ToDoList todos={this.state.todos} /> }/>
                            <Route exact path='/login' element={
                                <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                            <Route element={NotFound404} />
                        </Routes>
                </HashRouter>
                <Footer />
            </div>
        )
    }
}

export default App;
