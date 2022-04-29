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
import ToDoForm from './components/ToDoForm.js';
import ProjectForm from './components/ProjectForm.js';


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
        axios.get('http://127.0.0.1:8000/api/0.1/users/', {headers})
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

    createProject(name, user, repo_link) {
        const headers = this.get_headers()
        const data = {name: name, user: user, repo_link: repo_link}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers}).then(response => {
        let new_project = response.data
        const user = this.state.users.filter((item) => item.uid === new_project.user)[0]?.uid
        new_project.user = user
        this.setState({projects: [...this.state.projects, new_project]}) }).catch(error => console.log(error))
    }

    deleteProject(id) {
        console.log('call deleteproject')
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
        .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => {
            console.log(error)
        })
    }

    createToDo(name, user, note_text) {
        const headers = this.get_headers()
        const data = {name: name, user: user, note_text: note_text}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers}).then(response => {
        let new_todo = response.data
        const user = this.state.users.filter((item) => item.uid === new_todo.user)[0]?.uid
        new_todo.user = user
        this.setState({todos: [...this.state.todos, new_todo]}) }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        console.log('call deleteToDo')
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers})
        .then(response => {
            this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
        }).catch(error => {
            console.log(error)
        })
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
                                <Link to='/todo'>ToDo list</Link>
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
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} /> }/>
                            <Route exact path='/todo' element={<ToDoList todos={this.state.todos} deleteToDo={(id)=>this.deleteToDo(id)}/> }/>
                            <Route exact path='/login' element={
                                <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                            <Route element={NotFound404} />
                            <Route exact path='/todo/create' element={<ToDoForm users={this.state.users}
                            createToDo={(name, user, note_text) => this.createToDo(name, user, note_text)} />} />
                            <Route exact path='/projects/create' element={<ProjectForm users = {this.state.users}
                            createProject={(name, user, repo_link) => this.createProject(name, user, repo_link)} />} />
                        </Routes>
                </HashRouter>
                <Footer />
            </div>
        )
    }
}

export default App;
